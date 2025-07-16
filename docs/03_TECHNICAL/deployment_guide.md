# Klear Karma Deployment Guide

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Infrastructure Provisioning](#infrastructure-provisioning)
5. [Database Setup](#database-setup)
6. [Application Deployment](#application-deployment)
7. [Configuration Management](#configuration-management)
8. [Security Setup](#security-setup)
9. [Monitoring and Logging](#monitoring-and-logging)
10. [CI/CD Pipeline](#cicd-pipeline)
11. [Scaling and Load Balancing](#scaling-and-load-balancing)
12. [Backup and Recovery](#backup-and-recovery)
13. [Troubleshooting](#troubleshooting)
14. [Maintenance Procedures](#maintenance-procedures)

---

## Overview

This deployment guide provides comprehensive instructions for deploying Klear Karma's digital wellness platform across different environments (development, staging, production). The platform uses a microservices architecture deployed on AWS with containerized applications.

### Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CloudFront    │    │   Route 53      │    │   Certificate   │
│   (CDN)         │    │   (DNS)         │    │   Manager       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Application     │
                    │ Load Balancer   │
                    │ (ALB)           │
                    └─────────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │   ECS       │ │   ECS       │ │   ECS       │
    │ Cluster 1   │ │ Cluster 2   │ │ Cluster 3   │
    │ (Web App)   │ │ (API)       │ │ (Workers)   │
    └─────────────┘ └─────────────┘ └─────────────┘
              │              │              │
              └──────────────┼──────────────┘
                             │
                    ┌─────────────────┐
                    │   RDS           │
                    │ (PostgreSQL)    │
                    │ Multi-AZ        │
                    └─────────────────┘
```

### Deployment Environments

- **Development**: Single instance, minimal resources
- **Staging**: Production-like environment for testing
- **Production**: High availability, auto-scaling, multi-region

---

## Prerequisites

### Required Tools

```bash
# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Install Terraform
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### AWS Account Setup

```bash
# Configure AWS credentials
aws configure
# AWS Access Key ID: [Your Access Key]
# AWS Secret Access Key: [Your Secret Key]
# Default region name: us-east-1
# Default output format: json

# Verify access
aws sts get-caller-identity
```

### Domain and SSL Setup

```bash
# Register domain in Route 53
aws route53 create-hosted-zone --name klearkarma.com --caller-reference $(date +%s)

# Request SSL certificate
aws acm request-certificate \
  --domain-name klearkarma.com \
  --subject-alternative-names *.klearkarma.com \
  --validation-method DNS
```

---

## Environment Setup

### Environment Variables

Create environment-specific configuration files:

**`.env.development`**
```bash
# Application
NODE_ENV=development
PORT=3000
API_URL=http://localhost:8000
WEB_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/klearkarma_dev
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=dev-secret-key
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d

# External Services
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SENDGRID_API_KEY=SG...
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
S3_BUCKET=klearkarma-dev-uploads

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_NOTIFICATIONS=true
ENABLE_VIDEO_CALLS=false
```

**`.env.production`**
```bash
# Application
NODE_ENV=production
PORT=8080
API_URL=https://api.klearkarma.com
WEB_URL=https://app.klearkarma.com

# Database
DATABASE_URL=${DATABASE_URL}
REDIS_URL=${REDIS_URL}

# Authentication
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_EXPIRES_IN=7d

# External Services
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
SENDGRID_API_KEY=${SENDGRID_API_KEY}
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
AWS_REGION=us-east-1
S3_BUCKET=klearkarma-prod-uploads

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_NOTIFICATIONS=true
ENABLE_VIDEO_CALLS=true
```

### Docker Configuration

**`Dockerfile.api`**
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

USER nextjs
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

CMD ["npm", "start"]
```

**`Dockerfile.web`**
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

**`docker-compose.yml`** (Development)
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: klearkarma_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init-db.sql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  api:
    build:
      context: .
      dockerfile: Dockerfile.api
    ports:
      - "8000:8080"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/klearkarma_dev
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./src:/app/src
      - ./package.json:/app/package.json
    command: npm run dev

  web:
    build:
      context: ./web
      dockerfile: Dockerfile.web
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_URL=http://localhost:8000
    depends_on:
      - api

  worker:
    build:
      context: .
      dockerfile: Dockerfile.api
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/klearkarma_dev
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    command: npm run worker

volumes:
  postgres_data:
  redis_data:
```

---

## Infrastructure Provisioning

### Terraform Configuration

**`main.tf`**
```hcl
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket = "klearkarma-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "KlearKarma"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

# Variables
variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domain name"
  type        = string
  default     = "klearkarma.com"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "${var.environment}-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "${var.environment}-igw"
  }
}

# Public Subnets
resource "aws_subnet" "public" {
  count = 2
  
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index + 1}.0/24"
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
  
  tags = {
    Name = "${var.environment}-public-subnet-${count.index + 1}"
    Type = "Public"
  }
}

# Private Subnets
resource "aws_subnet" "private" {
  count = 2
  
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  tags = {
    Name = "${var.environment}-private-subnet-${count.index + 1}"
    Type = "Private"
  }
}

# NAT Gateways
resource "aws_eip" "nat" {
  count = 2
  
  domain = "vpc"
  
  tags = {
    Name = "${var.environment}-nat-eip-${count.index + 1}"
  }
}

resource "aws_nat_gateway" "main" {
  count = 2
  
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id
  
  tags = {
    Name = "${var.environment}-nat-gateway-${count.index + 1}"
  }
  
  depends_on = [aws_internet_gateway.main]
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  
  tags = {
    Name = "${var.environment}-public-rt"
  }
}

resource "aws_route_table" "private" {
  count = 2
  
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }
  
  tags = {
    Name = "${var.environment}-private-rt-${count.index + 1}"
  }
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  count = 2
  
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count = 2
  
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}
```

**`rds.tf`**
```hcl
# RDS Subnet Group
resource "aws_db_subnet_group" "main" {
  name       = "${var.environment}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id
  
  tags = {
    Name = "${var.environment}-db-subnet-group"
  }
}

# RDS Security Group
resource "aws_security_group" "rds" {
  name_prefix = "${var.environment}-rds-"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs.id]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${var.environment}-rds-sg"
  }
}

# RDS Parameter Group
resource "aws_db_parameter_group" "main" {
  family = "postgres15"
  name   = "${var.environment}-postgres-params"
  
  parameter {
    name  = "shared_preload_libraries"
    value = "pg_stat_statements"
  }
  
  parameter {
    name  = "log_statement"
    value = "all"
  }
  
  parameter {
    name  = "log_min_duration_statement"
    value = "1000"
  }
}

# RDS Instance
resource "aws_db_instance" "main" {
  identifier = "${var.environment}-postgres"
  
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = var.environment == "production" ? "db.r6g.large" : "db.t3.micro"
  
  allocated_storage     = var.environment == "production" ? 100 : 20
  max_allocated_storage = var.environment == "production" ? 1000 : 100
  storage_type          = "gp3"
  storage_encrypted     = true
  
  db_name  = "klearkarma"
  username = "postgres"
  password = random_password.db_password.result
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  parameter_group_name   = aws_db_parameter_group.main.name
  
  backup_retention_period = var.environment == "production" ? 7 : 1
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  multi_az               = var.environment == "production"
  publicly_accessible    = false
  deletion_protection    = var.environment == "production"
  
  performance_insights_enabled = true
  monitoring_interval         = 60
  monitoring_role_arn        = aws_iam_role.rds_monitoring.arn
  
  tags = {
    Name = "${var.environment}-postgres"
  }
}

# Random password for database
resource "random_password" "db_password" {
  length  = 32
  special = true
}

# Store database password in Secrets Manager
resource "aws_secretsmanager_secret" "db_password" {
  name = "${var.environment}/database/password"
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = random_password.db_password.result
}
```

### ECS Configuration

**`ecs.tf`**
```hcl
# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "${var.environment}-cluster"
  
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
  
  tags = {
    Name = "${var.environment}-ecs-cluster"
  }
}

# ECS Security Group
resource "aws_security_group" "ecs" {
  name_prefix = "${var.environment}-ecs-"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${var.environment}-ecs-sg"
  }
}

# ECS Task Execution Role
resource "aws_iam_role" "ecs_execution_role" {
  name = "${var.environment}-ecs-execution-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution_role_policy" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# ECS Task Role
resource "aws_iam_role" "ecs_task_role" {
  name = "${var.environment}-ecs-task-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# ECS Task Definition
resource "aws_ecs_task_definition" "api" {
  family                   = "${var.environment}-api"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.environment == "production" ? 1024 : 256
  memory                   = var.environment == "production" ? 2048 : 512
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  task_role_arn           = aws_iam_role.ecs_task_role.arn
  
  container_definitions = jsonencode([
    {
      name  = "api"
      image = "${aws_ecr_repository.api.repository_url}:latest"
      
      portMappings = [
        {
          containerPort = 8080
          protocol      = "tcp"
        }
      ]
      
      environment = [
        {
          name  = "NODE_ENV"
          value = var.environment
        },
        {
          name  = "PORT"
          value = "8080"
        }
      ]
      
      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = aws_secretsmanager_secret.database_url.arn
        }
      ]
      
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.api.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
      
      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:8080/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])
  
  tags = {
    Name = "${var.environment}-api-task"
  }
}

# ECS Service
resource "aws_ecs_service" "api" {
  name            = "${var.environment}-api"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = var.environment == "production" ? 3 : 1
  launch_type     = "FARGATE"
  
  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }
  
  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = "api"
    container_port   = 8080
  }
  
  depends_on = [aws_lb_listener.api]
  
  tags = {
    Name = "${var.environment}-api-service"
  }
}
```

---

## Database Setup

### Database Migration Scripts

**`scripts/migrate.js`**
```javascript
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

class DatabaseMigrator {
  constructor(databaseUrl) {
    this.pool = new Pool({ connectionString: databaseUrl });
    this.migrationsDir = path.join(__dirname, '../migrations');
  }

  async createMigrationsTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version VARCHAR(255) PRIMARY KEY,
        description TEXT,
        applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        execution_time_ms INTEGER,
        checksum VARCHAR(255)
      );
    `;
    await this.pool.query(query);
  }

  async getAppliedMigrations() {
    const result = await this.pool.query(
      'SELECT version FROM schema_migrations ORDER BY version'
    );
    return result.rows.map(row => row.version);
  }

  async getMigrationFiles() {
    const files = fs.readdirSync(this.migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    return files.map(file => ({
      version: file.replace('.sql', ''),
      filename: file,
      path: path.join(this.migrationsDir, file)
    }));
  }

  async runMigration(migration) {
    const startTime = Date.now();
    const sql = fs.readFileSync(migration.path, 'utf8');
    
    console.log(`Running migration: ${migration.version}`);
    
    try {
      await this.pool.query('BEGIN');
      await this.pool.query(sql);
      
      const executionTime = Date.now() - startTime;
      await this.pool.query(
        'INSERT INTO schema_migrations (version, execution_time_ms) VALUES ($1, $2)',
        [migration.version, executionTime]
      );
      
      await this.pool.query('COMMIT');
      console.log(`✓ Migration ${migration.version} completed in ${executionTime}ms`);
    } catch (error) {
      await this.pool.query('ROLLBACK');
      console.error(`✗ Migration ${migration.version} failed:`, error.message);
      throw error;
    }
  }

  async migrate() {
    await this.createMigrationsTable();
    
    const appliedMigrations = await this.getAppliedMigrations();
    const migrationFiles = await this.getMigrationFiles();
    
    const pendingMigrations = migrationFiles.filter(
      migration => !appliedMigrations.includes(migration.version)
    );
    
    if (pendingMigrations.length === 0) {
      console.log('No pending migrations');
      return;
    }
    
    console.log(`Found ${pendingMigrations.length} pending migrations`);
    
    for (const migration of pendingMigrations) {
      await this.runMigration(migration);
    }
    
    console.log('All migrations completed successfully');
  }

  async close() {
    await this.pool.end();
  }
}

// CLI usage
if (require.main === module) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is required');
    process.exit(1);
  }

  const migrator = new DatabaseMigrator(databaseUrl);
  
  migrator.migrate()
    .then(() => {
      console.log('Migration completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('Migration failed:', error);
      process.exit(1);
    })
    .finally(() => {
      migrator.close();
    });
}

module.exports = DatabaseMigrator;
```

### Database Seeding

**`scripts/seed.js`**
```javascript
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

class DatabaseSeeder {
  constructor(databaseUrl) {
    this.pool = new Pool({ connectionString: databaseUrl });
  }

  async seedSpecializations() {
    const specializations = [
      {
        name: 'Therapy & Counseling',
        category: 'Mental Health',
        description: 'Professional mental health support and counseling services'
      },
      {
        name: 'Nutrition Coaching',
        category: 'Nutrition',
        description: 'Personalized nutrition guidance and meal planning'
      },
      {
        name: 'Yoga Instruction',
        category: 'Fitness',
        description: 'Traditional and modern yoga practices for all levels'
      },
      {
        name: 'Meditation Guidance',
        category: 'Mindfulness',
        description: 'Mindfulness and meditation techniques for stress relief'
      },
      {
        name: 'Life Coaching',
        category: 'Personal Development',
        description: 'Goal setting and personal development coaching'
      }
    ];

    for (const spec of specializations) {
      await this.pool.query(
        `INSERT INTO specializations (id, name, category, description, active)
         VALUES ($1, $2, $3, $4, true)
         ON CONFLICT (name) DO NOTHING`,
        [uuidv4(), spec.name, spec.category, spec.description]
      );
    }

    console.log('✓ Specializations seeded');
  }

  async seedAdminUser() {
    const adminEmail = 'admin@klearkarma.com';
    const adminPassword = await bcrypt.hash('admin123!', 10);
    const adminId = uuidv4();

    await this.pool.query(
      `INSERT INTO users (id, email, password_hash, first_name, last_name, email_verified, status)
       VALUES ($1, $2, $3, $4, $5, true, 'active')
       ON CONFLICT (email) DO NOTHING`,
      [adminId, adminEmail, adminPassword, 'Admin', 'User']
    );

    console.log('✓ Admin user seeded');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: admin123!`);
  }

  async seedTestData() {
    if (process.env.NODE_ENV === 'production') {
      console.log('Skipping test data in production');
      return;
    }

    // Create test users
    const testUsers = [
      {
        email: 'user1@test.com',
        firstName: 'John',
        lastName: 'Doe'
      },
      {
        email: 'practitioner1@test.com',
        firstName: 'Jane',
        lastName: 'Smith'
      }
    ];

    for (const user of testUsers) {
      const userId = uuidv4();
      const password = await bcrypt.hash('password123', 10);

      await this.pool.query(
        `INSERT INTO users (id, email, password_hash, first_name, last_name, email_verified, status)
         VALUES ($1, $2, $3, $4, $5, true, 'active')
         ON CONFLICT (email) DO NOTHING`,
        [userId, user.email, password, user.firstName, user.lastName]
      );
    }

    console.log('✓ Test data seeded');
  }

  async seed() {
    try {
      await this.seedSpecializations();
      await this.seedAdminUser();
      await this.seedTestData();
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Database seeding failed:', error);
      throw error;
    }
  }

  async close() {
    await this.pool.end();
  }
}

// CLI usage
if (require.main === module) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is required');
    process.exit(1);
  }

  const seeder = new DatabaseSeeder(databaseUrl);
  
  seeder.seed()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('Seeding failed:', error);
      process.exit(1);
    })
    .finally(() => {
      seeder.close();
    });
}

module.exports = DatabaseSeeder;
```

---

## Application Deployment

### Build and Deploy Scripts

**`scripts/deploy.sh`**
```bash
#!/bin/bash

set -e

# Configuration
ENVIRONMENT=${1:-staging}
REGION=${AWS_REGION:-us-east-1}
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REPOSITORY_URI="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com"

echo "Deploying to environment: $ENVIRONMENT"
echo "AWS Region: $REGION"
echo "Account ID: $ACCOUNT_ID"

# Login to ECR
echo "Logging in to Amazon ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $REPOSITORY_URI

# Build and push API image
echo "Building API image..."
docker build -t klearkarma-api:latest -f Dockerfile.api .
docker tag klearkarma-api:latest $REPOSITORY_URI/klearkarma-api:latest
docker tag klearkarma-api:latest $REPOSITORY_URI/klearkarma-api:$ENVIRONMENT-$(git rev-parse --short HEAD)

echo "Pushing API image..."
docker push $REPOSITORY_URI/klearkarma-api:latest
docker push $REPOSITORY_URI/klearkarma-api:$ENVIRONMENT-$(git rev-parse --short HEAD)

# Build and push Web image
echo "Building Web image..."
cd web
docker build -t klearkarma-web:latest -f Dockerfile.web .
docker tag klearkarma-web:latest $REPOSITORY_URI/klearkarma-web:latest
docker tag klearkarma-web:latest $REPOSITORY_URI/klearkarma-web:$ENVIRONMENT-$(git rev-parse --short HEAD)

echo "Pushing Web image..."
docker push $REPOSITORY_URI/klearkarma-web:latest
docker push $REPOSITORY_URI/klearkarma-web:$ENVIRONMENT-$(git rev-parse --short HEAD)
cd ..

# Update ECS services
echo "Updating ECS services..."
aws ecs update-service \
  --cluster $ENVIRONMENT-cluster \
  --service $ENVIRONMENT-api \
  --force-new-deployment \
  --region $REGION

aws ecs update-service \
  --cluster $ENVIRONMENT-cluster \
  --service $ENVIRONMENT-web \
  --force-new-deployment \
  --region $REGION

# Wait for deployment to complete
echo "Waiting for deployment to complete..."
aws ecs wait services-stable \
  --cluster $ENVIRONMENT-cluster \
  --services $ENVIRONMENT-api $ENVIRONMENT-web \
  --region $REGION

echo "Deployment completed successfully!"

# Run health checks
echo "Running health checks..."
API_URL="https://api-$ENVIRONMENT.klearkarma.com"
WEB_URL="https://app-$ENVIRONMENT.klearkarma.com"

# Check API health
for i in {1..30}; do
  if curl -f "$API_URL/health" > /dev/null 2>&1; then
    echo "✓ API health check passed"
    break
  fi
  echo "Waiting for API to be healthy... ($i/30)"
  sleep 10
done

# Check Web health
for i in {1..30}; do
  if curl -f "$WEB_URL/health" > /dev/null 2>&1; then
    echo "✓ Web health check passed"
    break
  fi
  echo "Waiting for Web to be healthy... ($i/30)"
  sleep 10
done

echo "All health checks passed!"
echo "API URL: $API_URL"
echo "Web URL: $WEB_URL"
```

### Database Migration in Deployment

**`scripts/deploy-with-migrations.sh`**
```bash
#!/bin/bash

set -e

ENVIRONMENT=${1:-staging}

echo "Starting deployment with database migrations for $ENVIRONMENT"

# Get database connection details
DB_SECRET_ARN=$(aws secretsmanager describe-secret \
  --secret-id "$ENVIRONMENT/database/url" \
  --query 'ARN' --output text)

DATABASE_URL=$(aws secretsmanager get-secret-value \
  --secret-id "$DB_SECRET_ARN" \
  --query 'SecretString' --output text)

# Run database migrations
echo "Running database migrations..."
export DATABASE_URL="$DATABASE_URL"
node scripts/migrate.js

if [ $? -eq 0 ]; then
  echo "✓ Database migrations completed successfully"
else
  echo "✗ Database migrations failed"
  exit 1
fi

# Deploy application
echo "Deploying application..."
./scripts/deploy.sh $ENVIRONMENT

echo "Deployment with migrations completed successfully!"
```

---

## Configuration Management

### AWS Systems Manager Parameter Store

**`scripts/setup-parameters.sh`**
```bash
#!/bin/bash

ENVIRONMENT=${1:-staging}

echo "Setting up parameters for environment: $ENVIRONMENT"

# Application parameters
aws ssm put-parameter \
  --name "/$ENVIRONMENT/app/jwt-secret" \
  --value "$(openssl rand -base64 32)" \
  --type "SecureString" \
  --overwrite

aws ssm put-parameter \
  --name "/$ENVIRONMENT/app/encryption-key" \
  --value "$(openssl rand -base64 32)" \
  --type "SecureString" \
  --overwrite

# External service parameters (these should be set manually with actual values)
aws ssm put-parameter \
  --name "/$ENVIRONMENT/stripe/secret-key" \
  --value "sk_test_placeholder" \
  --type "SecureString" \
  --overwrite

aws ssm put-parameter \
  --name "/$ENVIRONMENT/stripe/webhook-secret" \
  --value "whsec_placeholder" \
  --type "SecureString" \
  --overwrite

aws ssm put-parameter \
  --name "/$ENVIRONMENT/sendgrid/api-key" \
  --value "SG.placeholder" \
  --type "SecureString" \
  --overwrite

echo "Parameters setup completed. Please update placeholder values with actual credentials."
```

### Environment Configuration

**`config/environment.js`**
```javascript
const AWS = require('aws-sdk');

class EnvironmentConfig {
  constructor() {
    this.ssm = new AWS.SSM({ region: process.env.AWS_REGION || 'us-east-1' });
    this.environment = process.env.NODE_ENV || 'development';
    this.cache = new Map();
  }

  async getParameter(name, decrypt = true) {
    const cacheKey = `${name}:${decrypt}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const result = await this.ssm.getParameter({
        Name: `/${this.environment}/${name}`,
        WithDecryption: decrypt
      }).promise();

      const value = result.Parameter.Value;
      this.cache.set(cacheKey, value);
      return value;
    } catch (error) {
      if (error.code === 'ParameterNotFound') {
        console.warn(`Parameter not found: /${this.environment}/${name}`);
        return null;
      }
      throw error;
    }
  }

  async getConfig() {
    const config = {
      environment: this.environment,
      port: process.env.PORT || 8080,
      
      // Database
      database: {
        url: process.env.DATABASE_URL || await this.getParameter('database/url'),
        ssl: this.environment === 'production'
      },
      
      // Redis
      redis: {
        url: process.env.REDIS_URL || await this.getParameter('redis/url')
      },
      
      // Authentication
      auth: {
        jwtSecret: process.env.JWT_SECRET || await this.getParameter('app/jwt-secret'),
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
      },
      
      // External services
      stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY || await this.getParameter('stripe/secret-key'),
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || await this.getParameter('stripe/webhook-secret')
      },
      
      sendgrid: {
        apiKey: process.env.SENDGRID_API_KEY || await this.getParameter('sendgrid/api-key')
      },
      
      aws: {
        region: process.env.AWS_REGION || 'us-east-1',
        s3Bucket: process.env.S3_BUCKET || `klearkarma-${this.environment}-uploads`
      },
      
      // Feature flags
      features: {
        analytics: process.env.ENABLE_ANALYTICS === 'true',
        notifications: process.env.ENABLE_NOTIFICATIONS === 'true',
        videoCalls: process.env.ENABLE_VIDEO_CALLS === 'true'
      }
    };

    return config;
  }

  clearCache() {
    this.cache.clear();
  }
}

module.exports = new EnvironmentConfig();
```

---

## Security Setup

### SSL/TLS Configuration

**`nginx.conf`**
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self'; object-src 'none'; child-src 'none'; worker-src 'none'; frame-ancestors 'none'; form-action 'self'; base-uri 'self';" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;
    
    server {
        listen 80;
        server_name _;
        
        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
        
        # Static files
        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
            try_files $uri $uri/ /index.html;
            
            # Cache static assets
            location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
                expires 1y;
                add_header Cache-Control "public, immutable";
            }
        }
        
        # API proxy
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            
            proxy_pass http://api-service:8080/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # Timeouts
            proxy_connect_timeout 30s;
            proxy_send_timeout 30s;
            proxy_read_timeout 30s;
        }
        
        # Login endpoint with stricter rate limiting
        location /api/auth/login {
            limit_req zone=login burst=5 nodelay;
            
            proxy_pass http://api-service:8080/auth/login;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### WAF Configuration

**`waf.tf`**
```hcl
# WAF Web ACL
resource "aws_wafv2_web_acl" "main" {
  name  = "${var.environment}-web-acl"
  scope = "CLOUDFRONT"
  
  default_action {
    allow {}
  }
  
  # Rate limiting rule
  rule {
    name     = "RateLimitRule"
    priority = 1
    
    action {
      block {}
    }
    
    statement {
      rate_based_statement {
        limit              = 2000
        aggregate_key_type = "IP"
      }
    }
    
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimitRule"
      sampled_requests_enabled   = true
    }
  }
  
  # AWS Managed Rules
  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 2
    
    override_action {
      none {}
    }
    
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }
    
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "CommonRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }
  
  # SQL injection protection
  rule {
    name     = "AWSManagedRulesSQLiRuleSet"
    priority = 3
    
    override_action {
      none {}
    }
    
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesSQLiRuleSet"
        vendor_name = "AWS"
      }
    }
    
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "SQLiRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }
  
  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${var.environment}WebAcl"
    sampled_requests_enabled   = true
  }
  
  tags = {
    Name = "${var.environment}-web-acl"
  }
}
```

---

## Monitoring and Logging

### CloudWatch Configuration

**`monitoring.tf`**
```hcl
# CloudWatch Log Groups
resource "aws_cloudwatch_log_group" "api" {
  name              = "/ecs/${var.environment}-api"
  retention_in_days = var.environment == "production" ? 30 : 7
  
  tags = {
    Name = "${var.environment}-api-logs"
  }
}

resource "aws_cloudwatch_log_group" "web" {
  name              = "/ecs/${var.environment}-web"
  retention_in_days = var.environment == "production" ? 30 : 7
  
  tags = {
    Name = "${var.environment}-web-logs"
  }
}

# CloudWatch Alarms
resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "${var.environment}-high-cpu"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This metric monitors ecs cpu utilization"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  
  dimensions = {
    ServiceName = aws_ecs_service.api.name
    ClusterName = aws_ecs_cluster.main.name
  }
}

resource "aws_cloudwatch_metric_alarm" "high_memory" {
  alarm_name          = "${var.environment}-high-memory"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "MemoryUtilization"
  namespace           = "AWS/ECS"
  period              = "300"
  statistic           = "Average"
  threshold           = "80"
  alarm_description   = "This metric monitors ecs memory utilization"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  
  dimensions = {
    ServiceName = aws_ecs_service.api.name
    ClusterName = aws_ecs_cluster.main.name
  }
}

resource "aws_cloudwatch_metric_alarm" "api_errors" {
  alarm_name          = "${var.environment}-api-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "HTTPCode_Target_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = "300"
  statistic           = "Sum"
  threshold           = "10"
  alarm_description   = "This metric monitors API 5xx errors"
  alarm_actions       = [aws_sns_topic.alerts.arn]
  
  dimensions = {
    TargetGroup = aws_lb_target_group.api.arn_suffix
  }
}

# SNS Topic for alerts
resource "aws_sns_topic" "alerts" {
  name = "${var.environment}-alerts"
}

resource "aws_sns_topic_subscription" "email_alerts" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email
}
```

### Application Monitoring

**`src/middleware/monitoring.js`**
```javascript
const prometheus = require('prom-client');
const responseTime = require('response-time');

// Create metrics
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new prometheus.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

const databaseConnections = new prometheus.Gauge({
  name: 'database_connections',
  help: 'Number of active database connections'
});

// Middleware to collect metrics
function metricsMiddleware(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
    
    httpRequestTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });
  
  next();
}

// Health check endpoint
function healthCheck(req, res) {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  };
  
  res.json(health);
}

// Metrics endpoint
function metricsEndpoint(req, res) {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
}

// Update connection metrics
function updateConnectionMetrics(activeCount, dbCount) {
  activeConnections.set(activeCount);
  databaseConnections.set(dbCount);
}

module.exports = {
  metricsMiddleware,
  healthCheck,
  metricsEndpoint,
  updateConnectionMetrics
};
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

**`.github/workflows/deploy.yml`**
```yaml
name: Deploy to AWS

on:
  push:
    branches:
      - main
      - develop
  pull_request:
    branches:
      - main

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY_API: klearkarma-api
  ECR_REPOSITORY_WEB: klearkarma-web

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: klearkarma_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm test
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/klearkarma_test
          REDIS_URL: redis://localhost:6379
      
      - name: Run security audit
        run: npm audit --audit-level moderate
  
  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
      
      - name: Set environment
        id: set-env
        run: |
          if [[ $GITHUB_REF == 'refs/heads/main' ]]; then
            echo "environment=production" >> $GITHUB_OUTPUT
          else
            echo "environment=staging" >> $GITHUB_OUTPUT
          fi
      
      - name: Build, tag, and push API image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
          ENVIRONMENT: ${{ steps.set-env.outputs.environment }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY_API:$IMAGE_TAG -f Dockerfile.api .
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY_API:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY_API:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_API:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_API:latest
      
      - name: Build, tag, and push Web image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
          ENVIRONMENT: ${{ steps.set-env.outputs.environment }}
        run: |
          cd web
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY_WEB:$IMAGE_TAG -f Dockerfile.web .
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY_WEB:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY_WEB:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_WEB:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_WEB:latest
      
      - name: Run database migrations
        env:
          ENVIRONMENT: ${{ steps.set-env.outputs.environment }}
        run: |
          # Get database URL from AWS Secrets Manager
          DATABASE_URL=$(aws secretsmanager get-secret-value \
            --secret-id "$ENVIRONMENT/database/url" \
            --query 'SecretString' --output text)
          export DATABASE_URL
          node scripts/migrate.js
      
      - name: Deploy to ECS
        env:
          ENVIRONMENT: ${{ steps.set-env.outputs.environment }}
        run: |
          aws ecs update-service \
            --cluster $ENVIRONMENT-cluster \
            --service $ENVIRONMENT-api \
            --force-new-deployment
          
          aws ecs update-service \
            --cluster $ENVIRONMENT-cluster \
            --service $ENVIRONMENT-web \
            --force-new-deployment
      
      - name: Wait for deployment
        env:
          ENVIRONMENT: ${{ steps.set-env.outputs.environment }}
        run: |
          aws ecs wait services-stable \
            --cluster $ENVIRONMENT-cluster \
            --services $ENVIRONMENT-api $ENVIRONMENT-web
      
      - name: Run smoke tests
        env:
          ENVIRONMENT: ${{ steps.set-env.outputs.environment }}
        run: |
          if [[ $ENVIRONMENT == "production" ]]; then
            API_URL="https://api.klearkarma.com"
          else
            API_URL="https://api-staging.klearkarma.com"
          fi
          
          # Wait for service to be healthy
          for i in {1..30}; do
            if curl -f "$API_URL/health" > /dev/null 2>&1; then
              echo "✓ API health check passed"
              break
            fi
            echo "Waiting for API... ($i/30)"
            sleep 10
          done
```

### Jenkins Pipeline (Alternative)

**`Jenkinsfile`**
```groovy
pipeline {
    agent any
    
    environment {
        AWS_REGION = 'us-east-1'
        ECR_REPOSITORY_API = 'klearkarma-api'
        ECR_REPOSITORY_WEB = 'klearkarma-web'
        DOCKER_BUILDKIT = '1'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm ci'
                        sh 'npm run test:unit'
                    }
                    post {
                        always {
                            publishTestResults testResultsPattern: 'test-results.xml'
                        }
                    }
                }
                
                stage('Integration Tests') {
                    steps {
                        sh 'docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit'
                    }
                    post {
                        always {
                            sh 'docker-compose -f docker-compose.test.yml down'
                        }
                    }
                }
                
                stage('Security Scan') {
                    steps {
                        sh 'npm audit --audit-level moderate'
                        sh 'docker run --rm -v "$PWD:/app" securecodewarrior/docker-security-scan'
                    }
                }
            }
        }
        
        stage('Build') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    def environment = env.BRANCH_NAME == 'main' ? 'production' : 'staging'
                    
                    // Login to ECR
                    sh 'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com'
                    
                    // Build and push API
                    sh "docker build -t $ECR_REPOSITORY_API:$BUILD_NUMBER -f Dockerfile.api ."
                    sh "docker tag $ECR_REPOSITORY_API:$BUILD_NUMBER $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_API:latest"
                    sh "docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_API:latest"
                    
                    // Build and push Web
                    dir('web') {
                        sh "docker build -t $ECR_REPOSITORY_WEB:$BUILD_NUMBER -f Dockerfile.web ."
                        sh "docker tag $ECR_REPOSITORY_WEB:$BUILD_NUMBER $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_WEB:latest"
                        sh "docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_WEB:latest"
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    def environment = env.BRANCH_NAME == 'main' ? 'production' : 'staging'
                    
                    // Run migrations
                    sh "./scripts/deploy-with-migrations.sh $environment"
                    
                    // Deploy to ECS
                    sh "aws ecs update-service --cluster $environment-cluster --service $environment-api --force-new-deployment"
                    sh "aws ecs update-service --cluster $environment-cluster --service $environment-web --force-new-deployment"
                    
                    // Wait for deployment
                    sh "aws ecs wait services-stable --cluster $environment-cluster --services $environment-api $environment-web"
                }
            }
        }
        
        stage('Smoke Tests') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    def environment = env.BRANCH_NAME == 'main' ? 'production' : 'staging'
                    def apiUrl = environment == 'production' ? 'https://api.klearkarma.com' : 'https://api-staging.klearkarma.com'
                    
                    sh "curl -f $apiUrl/health"
                    sh "npm run test:smoke -- --url=$apiUrl"
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            emailext (
                subject: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Build failed. Check console output at ${env.BUILD_URL}",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}
```

---

## Scaling and Load Balancing

### Auto Scaling Configuration

**`autoscaling.tf`**
```hcl
# Application Auto Scaling Target
resource "aws_appautoscaling_target" "ecs_target" {
  max_capacity       = var.environment == "production" ? 10 : 3
  min_capacity       = var.environment == "production" ? 2 : 1
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.api.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

# Auto Scaling Policy - CPU
resource "aws_appautoscaling_policy" "ecs_policy_cpu" {
  name               = "${var.environment}-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value = 70.0
    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }
}

# Auto Scaling Policy - Memory
resource "aws_appautoscaling_policy" "ecs_policy_memory" {
  name               = "${var.environment}-memory-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value = 80.0
    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }
}

# Auto Scaling Policy - Request Count
resource "aws_appautoscaling_policy" "ecs_policy_requests" {
  name               = "${var.environment}-request-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ALBRequestCountPerTarget"
      resource_label = "${aws_lb.main.arn_suffix}/${aws_lb_target_group.api.arn_suffix}"
    }
    target_value = 1000.0
    scale_in_cooldown  = 300
   scale_out_cooldown = 300
 }
}
```

### Load Balancer Configuration

**`load_balancer.tf`**
```hcl
# Application Load Balancer
resource "aws_lb" "main" {
  name               = "${var.environment}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id
  
  enable_deletion_protection = var.environment == "production"
  
  access_logs {
    bucket  = aws_s3_bucket.alb_logs.bucket
    prefix  = "alb"
    enabled = true
  }
  
  tags = {
    Name = "${var.environment}-alb"
  }
}

# ALB Security Group
resource "aws_security_group" "alb" {
  name_prefix = "${var.environment}-alb-"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${var.environment}-alb-sg"
  }
}

# Target Groups
resource "aws_lb_target_group" "api" {
  name     = "${var.environment}-api-tg"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  
  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }
  
  tags = {
    Name = "${var.environment}-api-tg"
  }
}

resource "aws_lb_target_group" "web" {
  name     = "${var.environment}-web-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  
  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }
  
  tags = {
    Name = "${var.environment}-web-tg"
  }
}

# ALB Listeners
resource "aws_lb_listener" "web_https" {
  load_balancer_arn = aws_lb.main.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = aws_acm_certificate.main.arn
  
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web.arn
  }
}

resource "aws_lb_listener" "api_https" {
  load_balancer_arn = aws_lb.main.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = aws_acm_certificate.main.arn
  
  default_action {
    type = "fixed-response"
    
    fixed_response {
      content_type = "text/plain"
      message_body = "Not Found"
      status_code  = "404"
    }
  }
}

# API routing rule
resource "aws_lb_listener_rule" "api" {
  listener_arn = aws_lb_listener.api_https.arn
  priority     = 100
  
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }
  
  condition {
    host_header {
      values = ["api.${var.domain_name}", "api-${var.environment}.${var.domain_name}"]
    }
  }
}

# HTTP to HTTPS redirect
resource "aws_lb_listener" "web_http" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"
  
  default_action {
    type = "redirect"
    
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}
```

---

## Backup and Recovery

### Database Backup Strategy

**`scripts/backup.sh`**
```bash
#!/bin/bash

set -e

ENVIRONMENT=${1:-production}
BACKUP_TYPE=${2:-full}  # full, incremental, or point-in-time
RETENTION_DAYS=${3:-30}

echo "Starting backup for environment: $ENVIRONMENT"
echo "Backup type: $BACKUP_TYPE"
echo "Retention: $RETENTION_DAYS days"

# Configuration
S3_BUCKET="klearkarma-$ENVIRONMENT-backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_PREFIX="database/$BACKUP_TYPE/$TIMESTAMP"

# Get database connection details
DB_SECRET_ARN=$(aws secretsmanager describe-secret \
  --secret-id "$ENVIRONMENT/database/url" \
  --query 'ARN' --output text)

DATABASE_URL=$(aws secretsmanager get-secret-value \
  --secret-id "$DB_SECRET_ARN" \
  --query 'SecretString' --output text)

# Parse database URL
DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_PASS=$(echo $DATABASE_URL | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')

export PGPASSWORD="$DB_PASS"

case $BACKUP_TYPE in
  "full")
    echo "Creating full database backup..."
    pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME \
      --verbose --no-password --format=custom \
      --compress=9 --no-privileges --no-owner \
      | aws s3 cp - "s3://$S3_BUCKET/$BACKUP_PREFIX/full_backup.dump"
    ;;
    
  "schema")
    echo "Creating schema-only backup..."
    pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME \
      --verbose --no-password --schema-only \
      --format=custom --compress=9 \
      | aws s3 cp - "s3://$S3_BUCKET/$BACKUP_PREFIX/schema_backup.dump"
    ;;
    
  "data")
    echo "Creating data-only backup..."
    pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME \
      --verbose --no-password --data-only \
      --format=custom --compress=9 \
      | aws s3 cp - "s3://$S3_BUCKET/$BACKUP_PREFIX/data_backup.dump"
    ;;
    
  *)
    echo "Unknown backup type: $BACKUP_TYPE"
    exit 1
    ;;
esac

# Create backup metadata
cat > backup_metadata.json << EOF
{
  "timestamp": "$TIMESTAMP",
  "environment": "$ENVIRONMENT",
  "backup_type": "$BACKUP_TYPE",
  "database_host": "$DB_HOST",
  "database_name": "$DB_NAME",
  "retention_days": $RETENTION_DAYS,
  "size_bytes": $(aws s3api head-object --bucket $S3_BUCKET --key "$BACKUP_PREFIX/" --query ContentLength --output text 2>/dev/null || echo 0)
}
EOF

aws s3 cp backup_metadata.json "s3://$S3_BUCKET/$BACKUP_PREFIX/metadata.json"
rm backup_metadata.json

# Clean up old backups
echo "Cleaning up backups older than $RETENTION_DAYS days..."
CUTOFF_DATE=$(date -d "$RETENTION_DAYS days ago" +"%Y-%m-%d")

aws s3api list-objects-v2 \
  --bucket $S3_BUCKET \
  --prefix "database/$BACKUP_TYPE/" \
  --query "Contents[?LastModified<='$CUTOFF_DATE'].Key" \
  --output text | \
while read -r key; do
  if [ "$key" != "None" ] && [ -n "$key" ]; then
    echo "Deleting old backup: $key"
    aws s3 rm "s3://$S3_BUCKET/$key"
  fi
done

echo "Backup completed successfully!"
echo "Backup location: s3://$S3_BUCKET/$BACKUP_PREFIX/"
```

### Restore Procedures

**`scripts/restore.sh`**
```bash
#!/bin/bash

set -e

ENVIRONMENT=${1:-staging}
BACKUP_TIMESTAMP=${2}
RESTORE_TYPE=${3:-full}

if [ -z "$BACKUP_TIMESTAMP" ]; then
  echo "Usage: $0 <environment> <backup_timestamp> [restore_type]"
  echo "Example: $0 staging 20231201_143000 full"
  exit 1
fi

echo "Starting restore for environment: $ENVIRONMENT"
echo "Backup timestamp: $BACKUP_TIMESTAMP"
echo "Restore type: $RESTORE_TYPE"

# Configuration
S3_BUCKET="klearkarma-production-backups"  # Always restore from production backups
BACKUP_PREFIX="database/$RESTORE_TYPE/$BACKUP_TIMESTAMP"

# Get target database connection details
DB_SECRET_ARN=$(aws secretsmanager describe-secret \
  --secret-id "$ENVIRONMENT/database/url" \
  --query 'ARN' --output text)

DATABASE_URL=$(aws secretsmanager get-secret-value \
  --secret-id "$DB_SECRET_ARN" \
  --query 'SecretString' --output text)

# Parse database URL
DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_PASS=$(echo $DATABASE_URL | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')

export PGPASSWORD="$DB_PASS"

# Verify backup exists
echo "Verifying backup exists..."
if ! aws s3 ls "s3://$S3_BUCKET/$BACKUP_PREFIX/" > /dev/null 2>&1; then
  echo "Error: Backup not found at s3://$S3_BUCKET/$BACKUP_PREFIX/"
  exit 1
fi

# Download backup metadata
aws s3 cp "s3://$S3_BUCKET/$BACKUP_PREFIX/metadata.json" ./restore_metadata.json
echo "Backup metadata:"
cat restore_metadata.json

# Confirm restore (production safety)
if [ "$ENVIRONMENT" = "production" ]; then
  echo "WARNING: You are about to restore to PRODUCTION!"
  echo "This will overwrite the current production database."
  read -p "Are you sure you want to continue? (yes/no): " confirm
  if [ "$confirm" != "yes" ]; then
    echo "Restore cancelled."
    exit 1
  fi
fi

# Create restore database if it doesn't exist
echo "Preparing target database..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres \
  -c "DROP DATABASE IF EXISTS ${DB_NAME}_restore;"
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres \
  -c "CREATE DATABASE ${DB_NAME}_restore;"

# Download and restore backup
echo "Downloading and restoring backup..."
case $RESTORE_TYPE in
  "full")
    aws s3 cp "s3://$S3_BUCKET/$BACKUP_PREFIX/full_backup.dump" - | \
    pg_restore -h $DB_HOST -p $DB_PORT -U $DB_USER \
      -d "${DB_NAME}_restore" --verbose --no-password \
      --clean --if-exists
    ;;
    
  "schema")
    aws s3 cp "s3://$S3_BUCKET/$BACKUP_PREFIX/schema_backup.dump" - | \
    pg_restore -h $DB_HOST -p $DB_PORT -U $DB_USER \
      -d "${DB_NAME}_restore" --verbose --no-password
    ;;
    
  "data")
    aws s3 cp "s3://$S3_BUCKET/$BACKUP_PREFIX/data_backup.dump" - | \
    pg_restore -h $DB_HOST -p $DB_PORT -U $DB_USER \
      -d "${DB_NAME}_restore" --verbose --no-password \
      --data-only
    ;;
    
  *)
    echo "Unknown restore type: $RESTORE_TYPE"
    exit 1
    ;;
esac

# Verify restore
echo "Verifying restore..."
RESTORE_COUNT=$(psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d "${DB_NAME}_restore" \
  -t -c "SELECT COUNT(*) FROM users;" | tr -d ' ')

echo "Restored database contains $RESTORE_COUNT users"

# Switch databases (atomic operation)
echo "Switching to restored database..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres << EOF
BEGIN;
ALTER DATABASE $DB_NAME RENAME TO ${DB_NAME}_old_$(date +%Y%m%d_%H%M%S);
ALTER DATABASE ${DB_NAME}_restore RENAME TO $DB_NAME;
COMMIT;
EOF

echo "Restore completed successfully!"
echo "Old database has been renamed with timestamp suffix"
echo "You can drop it manually after verifying the restore"

# Cleanup
rm -f restore_metadata.json
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Application Won't Start

**Symptoms:**
- ECS tasks keep restarting
- Health checks failing
- Application logs show startup errors

**Diagnosis:**
```bash
# Check ECS service status
aws ecs describe-services \
  --cluster production-cluster \
  --services production-api

# Check task logs
aws logs get-log-events \
  --log-group-name /ecs/production-api \
  --log-stream-name ecs/api/$(aws ecs list-tasks \
    --cluster production-cluster \
    --service-name production-api \
    --query 'taskArns[0]' --output text | cut -d'/' -f3)

# Check task definition
aws ecs describe-task-definition \
  --task-definition production-api
```

**Solutions:**
- Verify environment variables are set correctly
- Check database connectivity
- Ensure Docker image is built correctly
- Verify IAM permissions

#### 2. Database Connection Issues

**Symptoms:**
- Connection timeouts
- Authentication failures
- SSL/TLS errors

**Diagnosis:**
```bash
# Test database connectivity
psql $DATABASE_URL -c "SELECT version();"

# Check RDS instance status
aws rds describe-db-instances \
  --db-instance-identifier production-postgres

# Check security groups
aws ec2 describe-security-groups \
  --group-ids sg-xxxxxxxxx
```

**Solutions:**
- Verify security group rules
- Check database credentials in Secrets Manager
- Ensure RDS instance is in correct subnet
- Verify SSL configuration

#### 3. High Memory Usage

**Symptoms:**
- Tasks being killed by ECS
- Out of memory errors in logs
- Poor application performance

**Diagnosis:**
```bash
# Check CloudWatch metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/ECS \
  --metric-name MemoryUtilization \
  --dimensions Name=ServiceName,Value=production-api \
  --start-time $(date -d '1 hour ago' -u +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 300 \
  --statistics Average
```

**Solutions:**
- Increase task memory allocation
- Optimize application memory usage
- Check for memory leaks
- Implement proper garbage collection

#### 4. SSL Certificate Issues

**Symptoms:**
- HTTPS not working
- Certificate warnings in browser
- SSL handshake failures

**Diagnosis:**
```bash
# Check certificate status
aws acm describe-certificate \
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/12345678-1234-1234-1234-123456789012

# Test SSL connection
openssl s_client -connect api.klearkarma.com:443 -servername api.klearkarma.com
```

**Solutions:**
- Verify certificate is validated
- Check DNS records
- Ensure certificate covers all required domains
- Update load balancer listener configuration

### Debugging Tools and Commands

**`scripts/debug.sh`**
```bash
#!/bin/bash

ENVIRONMENT=${1:-production}
SERVICE=${2:-api}

echo "Debugging $SERVICE in $ENVIRONMENT environment"

# Get service information
echo "=== Service Status ==="
aws ecs describe-services \
  --cluster $ENVIRONMENT-cluster \
  --services $ENVIRONMENT-$SERVICE \
  --query 'services[0].{Status:status,Running:runningCount,Pending:pendingCount,Desired:desiredCount}'

# Get recent tasks
echo "\n=== Recent Tasks ==="
aws ecs list-tasks \
  --cluster $ENVIRONMENT-cluster \
  --service-name $ENVIRONMENT-$SERVICE \
  --query 'taskArns[0:3]' --output table

# Get task details
TASK_ARN=$(aws ecs list-tasks \
  --cluster $ENVIRONMENT-cluster \
  --service-name $ENVIRONMENT-$SERVICE \
  --query 'taskArns[0]' --output text)

if [ "$TASK_ARN" != "None" ] && [ -n "$TASK_ARN" ]; then
  echo "\n=== Task Details ==="
  aws ecs describe-tasks \
    --cluster $ENVIRONMENT-cluster \
    --tasks $TASK_ARN \
    --query 'tasks[0].{LastStatus:lastStatus,HealthStatus:healthStatus,CreatedAt:createdAt}'
  
  # Get recent logs
  echo "\n=== Recent Logs ==="
  TASK_ID=$(echo $TASK_ARN | cut -d'/' -f3)
  aws logs get-log-events \
    --log-group-name "/ecs/$ENVIRONMENT-$SERVICE" \
    --log-stream-name "ecs/$SERVICE/$TASK_ID" \
    --start-time $(date -d '10 minutes ago' +%s)000 \
    --query 'events[*].[timestamp,message]' \
    --output table
fi

# Check load balancer health
echo "\n=== Load Balancer Health ==="
TARGET_GROUP_ARN=$(aws elbv2 describe-target-groups \
  --names "$ENVIRONMENT-$SERVICE-tg" \
  --query 'TargetGroups[0].TargetGroupArn' --output text)

if [ "$TARGET_GROUP_ARN" != "None" ] && [ -n "$TARGET_GROUP_ARN" ]; then
  aws elbv2 describe-target-health \
    --target-group-arn $TARGET_GROUP_ARN \
    --query 'TargetHealthDescriptions[*].{Target:Target.Id,Health:TargetHealth.State,Reason:TargetHealth.Reason}' \
    --output table
fi

# Check CloudWatch alarms
echo "\n=== Active Alarms ==="
aws cloudwatch describe-alarms \
  --state-value ALARM \
  --query 'MetricAlarms[?contains(AlarmName,`'$ENVIRONMENT'`)].{Name:AlarmName,State:StateValue,Reason:StateReason}' \
  --output table
```

---

## Maintenance Procedures

### Regular Maintenance Tasks

#### Daily Tasks

**`scripts/daily-maintenance.sh`**
```bash
#!/bin/bash

set -e

ENVIRONMENT=${1:-production}

echo "Starting daily maintenance for $ENVIRONMENT"

# Check system health
echo "=== System Health Check ==="
./scripts/health-check.sh $ENVIRONMENT

# Database maintenance
echo "=== Database Maintenance ==="
# Update table statistics
psql $DATABASE_URL -c "ANALYZE;"

# Check for long-running queries
psql $DATABASE_URL -c "
SELECT pid, now() - pg_stat_activity.query_start AS duration, query 
FROM pg_stat_activity 
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes'
AND state = 'active';
"

# Clean up old sessions
psql $DATABASE_URL -c "
DELETE FROM user_sessions 
WHERE expires_at < NOW() - INTERVAL '7 days';
"

# Log rotation
echo "=== Log Cleanup ==="
aws logs describe-log-groups \
  --log-group-name-prefix "/ecs/$ENVIRONMENT" \
  --query 'logGroups[*].logGroupName' --output text | \
while read -r log_group; do
  # Delete log streams older than retention period
  aws logs describe-log-streams \
    --log-group-name "$log_group" \
    --order-by LastEventTime \
    --query "logStreams[?lastEventTime<$(date -d '30 days ago' +%s)000].logStreamName" \
    --output text | \
  while read -r stream; do
    if [ "$stream" != "None" ] && [ -n "$stream" ]; then
      aws logs delete-log-stream \
        --log-group-name "$log_group" \
        --log-stream-name "$stream"
    fi
  done
done

# Backup verification
echo "=== Backup Verification ==="
LATEST_BACKUP=$(aws s3 ls s3://klearkarma-$ENVIRONMENT-backups/database/full/ \
  --recursive | sort | tail -n 1 | awk '{print $4}')

if [ -n "$LATEST_BACKUP" ]; then
  BACKUP_AGE=$(( ($(date +%s) - $(date -d "$(aws s3api head-object \
    --bucket klearkarma-$ENVIRONMENT-backups \
    --key "$LATEST_BACKUP" \
    --query LastModified --output text | cut -d'T' -f1)" +%s)) / 86400 ))
  
  if [ $BACKUP_AGE -gt 1 ]; then
    echo "WARNING: Latest backup is $BACKUP_AGE days old"
  else
    echo "✓ Recent backup found (${BACKUP_AGE} days old)"
  fi
else
  echo "ERROR: No backups found"
fi

echo "Daily maintenance completed"
```

#### Weekly Tasks

**`scripts/weekly-maintenance.sh`**
```bash
#!/bin/bash

set -e

ENVIRONMENT=${1:-production}

echo "Starting weekly maintenance for $ENVIRONMENT"

# Database optimization
echo "=== Database Optimization ==="
psql $DATABASE_URL -c "VACUUM ANALYZE;"
psql $DATABASE_URL -c "REINDEX DATABASE klearkarma;"

# Security updates
echo "=== Security Scan ==="
# Scan Docker images for vulnerabilities
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image klearkarma-api:latest

# Check for outdated dependencies
npm audit --audit-level moderate

# SSL certificate check
echo "=== SSL Certificate Check ==="
CERT_EXPIRY=$(openssl s_client -connect api.klearkarma.com:443 -servername api.klearkarma.com 2>/dev/null | \
  openssl x509 -noout -dates | grep notAfter | cut -d= -f2)

CERT_EXPIRY_EPOCH=$(date -d "$CERT_EXPIRY" +%s)
CURRENT_EPOCH=$(date +%s)
DAYS_UNTIL_EXPIRY=$(( (CERT_EXPIRY_EPOCH - CURRENT_EPOCH) / 86400 ))

if [ $DAYS_UNTIL_EXPIRY -lt 30 ]; then
  echo "WARNING: SSL certificate expires in $DAYS_UNTIL_EXPIRY days"
else
  echo "✓ SSL certificate valid for $DAYS_UNTIL_EXPIRY days"
fi

# Performance metrics review
echo "=== Performance Review ==="
aws cloudwatch get-metric-statistics \
  --namespace AWS/ECS \
  --metric-name CPUUtilization \
  --dimensions Name=ServiceName,Value=$ENVIRONMENT-api \
  --start-time $(date -d '7 days ago' -u +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 86400 \
  --statistics Average,Maximum \
  --query 'Datapoints[*].[Timestamp,Average,Maximum]' \
  --output table

echo "Weekly maintenance completed"
```

### Emergency Procedures

#### Rollback Procedure

**`scripts/rollback.sh`**
```bash
#!/bin/bash

set -e

ENVIRONMENT=${1:-production}
TARGET_VERSION=${2}

if [ -z "$TARGET_VERSION" ]; then
  echo "Usage: $0 <environment> <target_version>"
  echo "Example: $0 production v1.2.3"
  exit 1
fi

echo "Starting rollback to version $TARGET_VERSION in $ENVIRONMENT"

# Confirm rollback
read -p "Are you sure you want to rollback to $TARGET_VERSION? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
  echo "Rollback cancelled"
  exit 1
fi

# Get ECR repository URI
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION=$(aws configure get region)
ECR_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"

# Update task definition with target version
echo "Updating task definition..."
TASK_DEF=$(aws ecs describe-task-definition \
  --task-definition $ENVIRONMENT-api \
  --query 'taskDefinition')

# Update image URI in task definition
UPDATED_TASK_DEF=$(echo $TASK_DEF | jq \
  --arg image "$ECR_URI/klearkarma-api:$TARGET_VERSION" \
  '.containerDefinitions[0].image = $image | del(.taskDefinitionArn, .revision, .status, .requiresAttributes, .placementConstraints, .compatibilities, .registeredAt, .registeredBy)')

# Register new task definition
NEW_TASK_DEF_ARN=$(echo $UPDATED_TASK_DEF | aws ecs register-task-definition \
  --cli-input-json file:///dev/stdin \
  --query 'taskDefinition.taskDefinitionArn' --output text)

echo "New task definition: $NEW_TASK_DEF_ARN"

# Update service
echo "Updating service..."
aws ecs update-service \
  --cluster $ENVIRONMENT-cluster \
  --service $ENVIRONMENT-api \
  --task-definition $NEW_TASK_DEF_ARN

# Wait for deployment
echo "Waiting for rollback to complete..."
aws ecs wait services-stable \
  --cluster $ENVIRONMENT-cluster \
  --services $ENVIRONMENT-api

# Verify rollback
echo "Verifying rollback..."
CURRENT_VERSION=$(curl -s https://api.klearkarma.com/version | jq -r '.version')
if [ "$CURRENT_VERSION" = "$TARGET_VERSION" ]; then
  echo "✓ Rollback successful! Current version: $CURRENT_VERSION"
else
  echo "✗ Rollback verification failed. Current version: $CURRENT_VERSION"
  exit 1
fi

echo "Rollback completed successfully"
```

---

## Conclusion

This deployment guide provides comprehensive instructions for deploying and maintaining Klear Karma's digital wellness platform. The guide covers:

- **Infrastructure as Code**: Using Terraform for reproducible infrastructure
- **Containerized Deployment**: Docker and ECS for scalable application deployment
- **Security Best Practices**: WAF, SSL/TLS, and security groups
- **Monitoring and Alerting**: CloudWatch metrics and alarms
- **Backup and Recovery**: Automated backup strategies and restore procedures
- **CI/CD Pipeline**: Automated testing and deployment workflows
- **Maintenance Procedures**: Regular maintenance and emergency procedures

### Next Steps

1. **Initial Setup**: Follow the prerequisites and environment setup sections
2. **Infrastructure Deployment**: Use Terraform to provision AWS resources
3. **Application Deployment**: Deploy the application using the provided scripts
4. **Monitoring Setup**: Configure CloudWatch dashboards and alerts
5. **Backup Configuration**: Set up automated backup schedules
6. **Team Training**: Ensure team members are familiar with deployment procedures

### Support and Documentation

- **Internal Documentation**: Refer to the technical architecture documentation
- **AWS Documentation**: Consult AWS service documentation for detailed configuration options
- **Emergency Contacts**: Maintain an updated list of emergency contacts and escalation procedures

For questions or issues with deployment, refer to the troubleshooting section or contact the DevOps team.