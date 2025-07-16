# DevOps and CI/CD Strategy

## Executive Summary

This document outlines the comprehensive DevOps and CI/CD strategy for Klear Karma's digital wellness platform. Our approach emphasizes automation, reliability, security, and rapid deployment while maintaining high quality standards and compliance requirements.

### Key Objectives

- **Deployment Velocity**: Enable multiple daily deployments with confidence
- **Quality Assurance**: Automated testing and quality gates throughout the pipeline
- **Security Integration**: Security scanning and compliance checks in every deployment
- **Infrastructure as Code**: Reproducible and version-controlled infrastructure
- **Monitoring Integration**: Comprehensive observability from development to production
- **Compliance Automation**: Automated compliance checks for healthcare regulations

---

## DevOps Philosophy and Culture

### Core Principles

1. **Automation First**: Automate repetitive tasks and manual processes
2. **Fail Fast**: Detect issues early in the development cycle
3. **Continuous Improvement**: Regular retrospectives and process optimization
4. **Shared Responsibility**: Development and operations teams collaborate closely
5. **Security by Design**: Security considerations integrated throughout the pipeline
6. **Observability**: Comprehensive monitoring and logging at all stages

### Team Structure

```mermaid
graph TB
    subgraph "DevOps Team"
        TL[Team Lead]
        SRE1[SRE Engineer 1]
        SRE2[SRE Engineer 2]
        SEC[Security Engineer]
    end
    
    subgraph "Development Teams"
        FE[Frontend Team]
        BE[Backend Team]
        MOB[Mobile Team]
        QA[QA Team]
    end
    
    subgraph "Platform Team"
        INFRA[Infrastructure]
        MON[Monitoring]
        SEC2[Security]
    end
    
    TL --> SRE1
    TL --> SRE2
    TL --> SEC
    
    SRE1 --> FE
    SRE1 --> BE
    SRE2 --> MOB
    SRE2 --> QA
    
    SEC --> INFRA
    SEC --> MON
    SEC --> SEC2
```

---

## CI/CD Pipeline Architecture

### Pipeline Overview

```mermaid
graph LR
    subgraph "Source Control"
        GIT[Git Repository]
        PR[Pull Request]
    end
    
    subgraph "CI Pipeline"
        BUILD[Build & Test]
        SCAN[Security Scan]
        PACKAGE[Package]
    end
    
    subgraph "CD Pipeline"
        DEV[Deploy to Dev]
        STAGING[Deploy to Staging]
        PROD[Deploy to Production]
    end
    
    subgraph "Quality Gates"
        QG1[Code Quality]
        QG2[Security Check]
        QG3[Performance Test]
        QG4[Manual Approval]
    end
    
    GIT --> PR
    PR --> BUILD
    BUILD --> QG1
    QG1 --> SCAN
    SCAN --> QG2
    QG2 --> PACKAGE
    PACKAGE --> DEV
    DEV --> QG3
    QG3 --> STAGING
    STAGING --> QG4
    QG4 --> PROD
```

### Pipeline Stages

#### 1. Source Control Integration
- **Git Workflow**: GitFlow with feature branches
- **Branch Protection**: Required reviews, status checks
- **Commit Standards**: Conventional commits with semantic versioning
- **Pre-commit Hooks**: Code formatting, linting, security checks

#### 2. Continuous Integration
- **Build Automation**: Multi-stage Docker builds
- **Test Execution**: Unit, integration, and security tests
- **Code Quality**: SonarQube analysis with quality gates
- **Artifact Generation**: Container images, deployment manifests

#### 3. Continuous Deployment
- **Environment Promotion**: Dev → Staging → Production
- **Blue-Green Deployments**: Zero-downtime deployments
- **Canary Releases**: Gradual rollout with monitoring
- **Rollback Capability**: Automated rollback on failure detection

---

## GitHub Actions Workflows

### Main CI/CD Workflow

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
  release:
    types: [ published ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}
  NODE_VERSION: '18'
  PYTHON_VERSION: '3.11'

jobs:
  # Code Quality and Security Checks
  code-quality:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run Prettier check
        run: npm run format:check
      
      - name: Run TypeScript check
        run: npm run type-check
      
      - name: SonarQube Scan
        uses: sonarqube-quality-gate-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        with:
          scanMetadataReportFile: target/sonar/report-task.txt

  # Security Scanning
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
      
      - name: Run OWASP Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          project: 'klear-karma'
          path: '.'
          format: 'JSON'
          args: >
            --enableRetired
            --enableExperimental
            --failOnCVSS 7

  # Unit and Integration Tests
  test:
    runs-on: ubuntu-latest
    needs: [code-quality]
    
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
        ports:
          - 5432:5432
      
      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run database migrations
        run: npm run db:migrate
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/klearkarma_test
      
      - name: Run unit tests
        run: npm run test:unit
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/klearkarma_test
          REDIS_URL: redis://localhost:6379
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          NODE_ENV: test
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/klearkarma_test
          REDIS_URL: redis://localhost:6379
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
          fail_ci_if_error: true

  # Build and Push Container Images
  build:
    runs-on: ubuntu-latest
    needs: [test, security-scan]
    outputs:
      image-tag: ${{ steps.meta.outputs.tags }}
      image-digest: ${{ steps.build.outputs.digest }}
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}
      
      - name: Build and push Docker image
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          platforms: linux/amd64,linux/arm64
      
      - name: Sign container image
        uses: sigstore/cosign-installer@v3
      
      - name: Sign the published Docker image
        env:
          COSIGN_EXPERIMENTAL: 1
        run: |
          cosign sign --yes ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}@${{ steps.build.outputs.digest }}

  # Deploy to Development Environment
  deploy-dev:
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/develop'
    environment:
      name: development
      url: https://dev.klearkarma.com
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-2
      
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster klear-karma-dev \
            --service api-service \
            --force-new-deployment
      
      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster klear-karma-dev \
            --services api-service
      
      - name: Run smoke tests
        run: |
          npm run test:smoke -- --baseUrl=https://dev-api.klearkarma.com

  # Deploy to Staging Environment
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/main'
    environment:
      name: staging
      url: https://staging.klearkarma.com
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-2
      
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster klear-karma-staging \
            --service api-service \
            --force-new-deployment
      
      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster klear-karma-staging \
            --services api-service
      
      - name: Run E2E tests
        run: |
          npm run test:e2e -- --baseUrl=https://staging.klearkarma.com
      
      - name: Run performance tests
        run: |
          npm run test:performance -- --target=https://staging-api.klearkarma.com

  # Deploy to Production Environment
  deploy-production:
    runs-on: ubuntu-latest
    needs: [deploy-staging]
    if: github.event_name == 'release'
    environment:
      name: production
      url: https://klearkarma.com
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-2
      
      - name: Blue-Green Deployment
        run: |
          # Get current task definition
          TASK_DEFINITION=$(aws ecs describe-services \
            --cluster klear-karma-prod \
            --services api-service \
            --query 'services[0].taskDefinition' \
            --output text)
          
          # Update task definition with new image
          NEW_TASK_DEFINITION=$(aws ecs describe-task-definition \
            --task-definition $TASK_DEFINITION \
            --query 'taskDefinition' \
            --output json | \
            jq --arg IMAGE "${{ needs.build.outputs.image-tag }}" \
            '.containerDefinitions[0].image = $IMAGE | del(.taskDefinitionArn, .revision, .status, .requiresAttributes, .placementConstraints, .compatibilities, .registeredAt, .registeredBy)')
          
          # Register new task definition
          NEW_TASK_DEF_ARN=$(echo $NEW_TASK_DEFINITION | \
            aws ecs register-task-definition \
            --cli-input-json file:///dev/stdin \
            --query 'taskDefinition.taskDefinitionArn' \
            --output text)
          
          # Update service with new task definition
          aws ecs update-service \
            --cluster klear-karma-prod \
            --service api-service \
            --task-definition $NEW_TASK_DEF_ARN
      
      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster klear-karma-prod \
            --services api-service
      
      - name: Run production smoke tests
        run: |
          npm run test:smoke -- --baseUrl=https://api.klearkarma.com
      
      - name: Notify deployment success
        uses: 8398a7/action-slack@v3
        with:
          status: success
          channel: '#deployments'
          text: '🚀 Production deployment successful!'
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Feature Branch Workflow

```yaml
# .github/workflows/feature-branch.yml
name: Feature Branch CI

on:
  pull_request:
    branches: [ develop ]

jobs:
  validate:
    runs-on: ubuntu-latest
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
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Build application
        run: npm run build
      
      - name: Comment PR
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ All checks passed! Ready for review.'
            })
```

### Hotfix Workflow

```yaml
# .github/workflows/hotfix.yml
name: Hotfix Deployment

on:
  push:
    branches: [ 'hotfix/*' ]

jobs:
  emergency-deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://klearkarma.com
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Fast track validation
        run: |
          npm ci
          npm run test:critical
          npm run build
      
      - name: Build and deploy
        run: |
          # Build container image
          docker build -t klear-karma:hotfix .
          
          # Push to registry
          docker tag klear-karma:hotfix ${{ env.REGISTRY }}/klear-karma:hotfix
          docker push ${{ env.REGISTRY }}/klear-karma:hotfix
          
          # Deploy immediately
          aws ecs update-service \
            --cluster klear-karma-prod \
            --service api-service \
            --force-new-deployment
      
      - name: Notify emergency deployment
        uses: 8398a7/action-slack@v3
        with:
          status: custom
          custom_payload: |
            {
              "channel": "#alerts",
              "text": "🚨 HOTFIX DEPLOYED",
              "color": "warning",
              "fields": [
                {
                  "title": "Branch",
                  "value": "${{ github.ref }}",
                  "short": true
                },
                {
                  "title": "Commit",
                  "value": "${{ github.sha }}",
                  "short": true
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## Infrastructure as Code

### Terraform Configuration

```hcl
# terraform/main.tf
terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket         = "klear-karma-terraform-state"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "klear-karma"
      Environment = var.environment
      ManagedBy   = "terraform"
      Owner       = "devops-team"
    }
  }
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

# Local values
locals {
  name_prefix = "klear-karma-${var.environment}"
  
  common_tags = {
    Project     = "klear-karma"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "database_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "ecs_task_cpu" {
  description = "CPU units for ECS tasks"
  type        = number
  default     = 256
}

variable "ecs_task_memory" {
  description = "Memory for ECS tasks"
  type        = number
  default     = 512
}
```

### ECS Service Configuration

```hcl
# terraform/ecs.tf
resource "aws_ecs_cluster" "main" {
  name = local.name_prefix
  
  configuration {
    execute_command_configuration {
      logging = "OVERRIDE"
      
      log_configuration {
        cloud_watch_encryption_enabled = true
        cloud_watch_log_group_name     = aws_cloudwatch_log_group.ecs.name
      }
    }
  }
  
  tags = local.common_tags
}

resource "aws_ecs_cluster_capacity_providers" "main" {
  cluster_name = aws_ecs_cluster.main.name
  
  capacity_providers = ["FARGATE", "FARGATE_SPOT"]
  
  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = "FARGATE"
  }
}

# Task Definition
resource "aws_ecs_task_definition" "api" {
  family                   = "${local.name_prefix}-api"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.ecs_task_cpu
  memory                   = var.ecs_task_memory
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn           = aws_iam_role.ecs_task.arn
  
  container_definitions = jsonencode([
    {
      name  = "api"
      image = "${aws_ecr_repository.api.repository_url}:latest"
      
      portMappings = [
        {
          containerPort = 3000
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
          value = "3000"
        }
      ]
      
      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = aws_ssm_parameter.database_url.arn
        },
        {
          name      = "JWT_SECRET"
          valueFrom = aws_ssm_parameter.jwt_secret.arn
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
        command     = ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])
  
  tags = local.common_tags
}

# ECS Service
resource "aws_ecs_service" "api" {
  name            = "api-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = var.environment == "prod" ? 3 : 1
  launch_type     = "FARGATE"
  
  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = false
  }
  
  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = "api"
    container_port   = 3000
  }
  
  deployment_configuration {
    maximum_percent         = 200
    minimum_healthy_percent = 100
    
    deployment_circuit_breaker {
      enable   = true
      rollback = true
    }
  }
  
  enable_execute_command = true
  
  depends_on = [aws_lb_listener.api]
  
  tags = local.common_tags
}

# Auto Scaling
resource "aws_appautoscaling_target" "api" {
  max_capacity       = var.environment == "prod" ? 10 : 3
  min_capacity       = var.environment == "prod" ? 2 : 1
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.api.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "api_cpu" {
  name               = "${local.name_prefix}-api-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.api.resource_id
  scalable_dimension = aws_appautoscaling_target.api.scalable_dimension
  service_namespace  = aws_appautoscaling_target.api.service_namespace
  
  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value = 70.0
  }
}

resource "aws_appautoscaling_policy" "api_memory" {
  name               = "${local.name_prefix}-api-memory-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.api.resource_id
  scalable_dimension = aws_appautoscaling_target.api.scalable_dimension
  service_namespace  = aws_appautoscaling_target.api.service_namespace
  
  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value = 80.0
  }
}
```

### Database Configuration

```hcl
# terraform/rds.tf
resource "aws_db_subnet_group" "main" {
  name       = local.name_prefix
  subnet_ids = aws_subnet.private[*].id
  
  tags = merge(local.common_tags, {
    Name = "${local.name_prefix} DB subnet group"
  })
}

resource "aws_db_parameter_group" "main" {
  family = "postgres15"
  name   = local.name_prefix
  
  parameter {
    name  = "log_statement"
    value = "all"
  }
  
  parameter {
    name  = "log_min_duration_statement"
    value = "1000"
  }
  
  parameter {
    name  = "shared_preload_libraries"
    value = "pg_stat_statements"
  }
  
  tags = local.common_tags
}

resource "aws_db_instance" "main" {
  identifier = local.name_prefix
  
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = var.database_instance_class
  
  allocated_storage     = var.environment == "prod" ? 100 : 20
  max_allocated_storage = var.environment == "prod" ? 1000 : 100
  storage_type          = "gp3"
  storage_encrypted     = true
  
  db_name  = "klearkarma"
  username = "postgres"
  password = random_password.db_password.result
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  parameter_group_name   = aws_db_parameter_group.main.name
  
  backup_retention_period = var.environment == "prod" ? 30 : 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = var.environment != "prod"
  final_snapshot_identifier = var.environment == "prod" ? "${local.name_prefix}-final-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}" : null
  
  performance_insights_enabled = var.environment == "prod"
  monitoring_interval         = var.environment == "prod" ? 60 : 0
  monitoring_role_arn        = var.environment == "prod" ? aws_iam_role.rds_monitoring[0].arn : null
  
  enabled_cloudwatch_logs_exports = ["postgresql"]
  
  deletion_protection = var.environment == "prod"
  
  tags = merge(local.common_tags, {
    Name = "${local.name_prefix} database"
  })
}

resource "random_password" "db_password" {
  length  = 32
  special = true
}

resource "aws_ssm_parameter" "database_url" {
  name  = "/${var.environment}/klear-karma/database-url"
  type  = "SecureString"
  value = "postgresql://${aws_db_instance.main.username}:${random_password.db_password.result}@${aws_db_instance.main.endpoint}/${aws_db_instance.main.db_name}"
  
  tags = local.common_tags
}

# Read Replica for Production
resource "aws_db_instance" "read_replica" {
  count = var.environment == "prod" ? 1 : 0
  
  identifier = "${local.name_prefix}-read-replica"
  
  replicate_source_db = aws_db_instance.main.identifier
  instance_class      = var.database_instance_class
  
  auto_minor_version_upgrade = false
  
  tags = merge(local.common_tags, {
    Name = "${local.name_prefix} read replica"
  })
}
```

---

## Deployment Strategies

### Blue-Green Deployment

```bash
#!/bin/bash
# scripts/blue-green-deploy.sh

set -e

ENVIRONMENT=${1:-staging}
IMAGE_TAG=${2:-latest}
CLUSTER_NAME="klear-karma-${ENVIRONMENT}"
SERVICE_NAME="api-service"

echo "Starting blue-green deployment for ${ENVIRONMENT}"
echo "Image tag: ${IMAGE_TAG}"

# Get current task definition
CURRENT_TASK_DEF=$(aws ecs describe-services \
  --cluster $CLUSTER_NAME \
  --services $SERVICE_NAME \
  --query 'services[0].taskDefinition' \
  --output text)

echo "Current task definition: $CURRENT_TASK_DEF"

# Create new task definition with updated image
NEW_TASK_DEF=$(aws ecs describe-task-definition \
  --task-definition $CURRENT_TASK_DEF \
  --query 'taskDefinition' \
  --output json | \
  jq --arg IMAGE "$IMAGE_TAG" \
  '.containerDefinitions[0].image = $IMAGE | del(.taskDefinitionArn, .revision, .status, .requiresAttributes, .placementConstraints, .compatibilities, .registeredAt, .registeredBy)')

# Register new task definition
NEW_TASK_DEF_ARN=$(echo $NEW_TASK_DEF | \
  aws ecs register-task-definition \
  --cli-input-json file:///dev/stdin \
  --query 'taskDefinition.taskDefinitionArn' \
  --output text)

echo "New task definition: $NEW_TASK_DEF_ARN"

# Update service with new task definition
echo "Updating service..."
aws ecs update-service \
  --cluster $CLUSTER_NAME \
  --service $SERVICE_NAME \
  --task-definition $NEW_TASK_DEF_ARN

# Wait for deployment to complete
echo "Waiting for deployment to complete..."
aws ecs wait services-stable \
  --cluster $CLUSTER_NAME \
  --services $SERVICE_NAME

# Verify deployment
echo "Verifying deployment..."
HEALTH_CHECK_URL="https://${ENVIRONMENT}-api.klearkarma.com/health"
for i in {1..10}; do
  if curl -f $HEALTH_CHECK_URL; then
    echo "Health check passed"
    break
  else
    echo "Health check failed, attempt $i/10"
    sleep 10
  fi
done

# Run smoke tests
echo "Running smoke tests..."
npm run test:smoke -- --baseUrl="https://${ENVIRONMENT}-api.klearkarma.com"

if [ $? -eq 0 ]; then
  echo "✅ Blue-green deployment completed successfully"
else
  echo "❌ Smoke tests failed, rolling back..."
  
  # Rollback to previous task definition
  aws ecs update-service \
    --cluster $CLUSTER_NAME \
    --service $SERVICE_NAME \
    --task-definition $CURRENT_TASK_DEF
  
  aws ecs wait services-stable \
    --cluster $CLUSTER_NAME \
    --services $SERVICE_NAME
  
  echo "Rollback completed"
  exit 1
fi
```

### Canary Deployment

```bash
#!/bin/bash
# scripts/canary-deploy.sh

set -e

ENVIRONMENT=${1:-prod}
IMAGE_TAG=${2:-latest}
CANARY_PERCENTAGE=${3:-10}
CLUSTER_NAME="klear-karma-${ENVIRONMENT}"
SERVICE_NAME="api-service"
CANARY_SERVICE_NAME="api-service-canary"

echo "Starting canary deployment for ${ENVIRONMENT}"
echo "Image tag: ${IMAGE_TAG}"
echo "Canary percentage: ${CANARY_PERCENTAGE}%"

# Create canary service with new image
echo "Creating canary service..."

# Get current task definition and modify for canary
CURRENT_TASK_DEF=$(aws ecs describe-services \
  --cluster $CLUSTER_NAME \
  --services $SERVICE_NAME \
  --query 'services[0].taskDefinition' \
  --output text)

CANARY_TASK_DEF=$(aws ecs describe-task-definition \
  --task-definition $CURRENT_TASK_DEF \
  --query 'taskDefinition' \
  --output json | \
  jq --arg IMAGE "$IMAGE_TAG" \
  '.family = "klear-karma-prod-api-canary" | .containerDefinitions[0].image = $IMAGE | del(.taskDefinitionArn, .revision, .status, .requiresAttributes, .placementConstraints, .compatibilities, .registeredAt, .registeredBy)')

# Register canary task definition
CANARY_TASK_DEF_ARN=$(echo $CANARY_TASK_DEF | \
  aws ecs register-task-definition \
  --cli-input-json file:///dev/stdin \
  --query 'taskDefinition.taskDefinitionArn' \
  --output text)

# Create canary service
aws ecs create-service \
  --cluster $CLUSTER_NAME \
  --service-name $CANARY_SERVICE_NAME \
  --task-definition $CANARY_TASK_DEF_ARN \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-xxx],assignPublicIp=DISABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:us-west-2:xxx:targetgroup/canary-tg/xxx,containerName=api,containerPort=3000"

# Wait for canary service to be stable
echo "Waiting for canary service to be stable..."
aws ecs wait services-stable \
  --cluster $CLUSTER_NAME \
  --services $CANARY_SERVICE_NAME

# Update ALB to route traffic to canary
echo "Routing ${CANARY_PERCENTAGE}% traffic to canary..."
# This would involve updating ALB target group weights
# Implementation depends on your load balancer configuration

# Monitor canary for specified duration
MONITOR_DURATION=300 # 5 minutes
echo "Monitoring canary for ${MONITOR_DURATION} seconds..."

# Check metrics during monitoring period
for i in $(seq 1 $((MONITOR_DURATION/30))); do
  echo "Checking metrics... (${i}/${MONITOR_DURATION/30})"
  
  # Check error rate
  ERROR_RATE=$(aws cloudwatch get-metric-statistics \
    --namespace "AWS/ApplicationELB" \
    --metric-name "HTTPCode_Target_5XX_Count" \
    --dimensions Name=TargetGroup,Value=canary-tg \
    --start-time $(date -u -d '5 minutes ago' +%Y-%m-%dT%H:%M:%S) \
    --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
    --period 300 \
    --statistics Sum \
    --query 'Datapoints[0].Sum' \
    --output text)
  
  if [ "$ERROR_RATE" != "None" ] && [ "$ERROR_RATE" -gt 5 ]; then
    echo "❌ High error rate detected: $ERROR_RATE"
    echo "Rolling back canary..."
    
    # Delete canary service
    aws ecs delete-service \
      --cluster $CLUSTER_NAME \
      --service $CANARY_SERVICE_NAME \
      --force
    
    exit 1
  fi
  
  sleep 30
done

echo "✅ Canary monitoring completed successfully"
echo "Promoting canary to full deployment..."

# Update main service with canary image
aws ecs update-service \
  --cluster $CLUSTER_NAME \
  --service $SERVICE_NAME \
  --task-definition $CANARY_TASK_DEF_ARN

# Wait for main service update
aws ecs wait services-stable \
  --cluster $CLUSTER_NAME \
  --services $SERVICE_NAME

# Clean up canary service
aws ecs delete-service \
  --cluster $CLUSTER_NAME \
  --service $CANARY_SERVICE_NAME \
  --force

echo "✅ Canary deployment completed successfully"
```

---

## Configuration Management

### Environment Configuration

```yaml
# config/environments/development.yml
environment: development

database:
  host: localhost
  port: 5432
  name: klearkarma_dev
  ssl: false
  pool_size: 10
  timeout: 30000

redis:
  host: localhost
  port: 6379
  db: 0
  password: null

aws:
  region: us-west-2
  s3_bucket: klear-karma-dev-uploads
  cloudfront_domain: dev-cdn.klearkarma.com

logging:
  level: debug
  format: json
  destinations:
    - console
    - file

monitoring:
  enabled: true
  metrics_endpoint: http://localhost:9090
  tracing_endpoint: http://localhost:14268

security:
  jwt_expiry: 24h
  bcrypt_rounds: 10
  rate_limit:
    window: 15m
    max_requests: 100

feature_flags:
  new_booking_flow: true
  payment_v2: false
  ai_recommendations: true
```

```yaml
# config/environments/production.yml
environment: production

database:
  host: ${DATABASE_HOST}
  port: 5432
  name: klearkarma
  ssl: true
  pool_size: 20
  timeout: 30000

redis:
  host: ${REDIS_HOST}
  port: 6379
  db: 0
  password: ${REDIS_PASSWORD}

aws:
  region: us-west-2
  s3_bucket: klear-karma-prod-uploads
  cloudfront_domain: cdn.klearkarma.com

logging:
  level: info
  format: json
  destinations:
    - elasticsearch

monitoring:
  enabled: true
  metrics_endpoint: ${PROMETHEUS_ENDPOINT}
  tracing_endpoint: ${JAEGER_ENDPOINT}

security:
  jwt_expiry: 1h
  bcrypt_rounds: 12
  rate_limit:
    window: 15m
    max_requests: 60

feature_flags:
  new_booking_flow: true
  payment_v2: true
  ai_recommendations: true
```

### Configuration Loader

```javascript
// config/index.js
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class ConfigManager {
  constructor() {
    this.config = null;
    this.environment = process.env.NODE_ENV || 'development';
    this.loadConfig();
  }
  
  loadConfig() {
    try {
      // Load base configuration
      const basePath = path.join(__dirname, 'base.yml');
      const baseConfig = yaml.load(fs.readFileSync(basePath, 'utf8'));
      
      // Load environment-specific configuration
      const envPath = path.join(__dirname, 'environments', `${this.environment}.yml`);
      const envConfig = yaml.load(fs.readFileSync(envPath, 'utf8'));
      
      // Merge configurations
      this.config = this.mergeDeep(baseConfig, envConfig);
      
      // Interpolate environment variables
      this.config = this.interpolateEnvVars(this.config);
      
      // Validate required configuration
      this.validateConfig();
      
    } catch (error) {
      console.error('Failed to load configuration:', error);
      process.exit(1);
    }
  }
  
  mergeDeep(target, source) {
    const output = Object.assign({}, target);
    
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.mergeDeep(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    
    return output;
  }
  
  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
  
  interpolateEnvVars(obj) {
    if (typeof obj === 'string') {
      return obj.replace(/\$\{([^}]+)\}/g, (match, envVar) => {
        const value = process.env[envVar];
        if (value === undefined) {
          throw new Error(`Environment variable ${envVar} is not defined`);
        }
        return value;
      });
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.interpolateEnvVars(item));
    }
    
    if (this.isObject(obj)) {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = this.interpolateEnvVars(value);
      }
      return result;
    }
    
    return obj;
  }
  
  validateConfig() {
    const required = [
      'database.host',
      'database.name',
      'redis.host',
      'aws.region',
      'security.jwt_expiry'
    ];
    
    for (const path of required) {
      if (!this.get(path)) {
        throw new Error(`Required configuration missing: ${path}`);
      }
    }
  }
  
  get(path, defaultValue = null) {
    const keys = path.split('.');
    let current = this.config;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    }
    
    return current;
  }
  
  getAll() {
    return this.config;
  }
  
  isDevelopment() {
    return this.environment === 'development';
  }
  
  isProduction() {
    return this.environment === 'production';
  }
  
  isStaging() {
    return this.environment === 'staging';
  }
}

module.exports = new ConfigManager();
```

---

## Secret Management

### AWS Systems Manager Parameter Store

```bash
#!/bin/bash
# scripts/manage-secrets.sh

set -e

ENVIRONMENT=${1:-dev}
ACTION=${2:-list}

case $ACTION in
  "create")
    echo "Creating secrets for $ENVIRONMENT environment..."
    
    # Database password
    aws ssm put-parameter \
      --name "/$ENVIRONMENT/klear-karma/database-password" \
      --value "$(openssl rand -base64 32)" \
      --type "SecureString" \
      --description "Database password for $ENVIRONMENT"
    
    # JWT secret
    aws ssm put-parameter \
      --name "/$ENVIRONMENT/klear-karma/jwt-secret" \
      --value "$(openssl rand -base64 64)" \
      --type "SecureString" \
      --description "JWT secret for $ENVIRONMENT"
    
    # API keys
    aws ssm put-parameter \
      --name "/$ENVIRONMENT/klear-karma/stripe-secret-key" \
      --value "sk_test_..." \
      --type "SecureString" \
      --description "Stripe secret key for $ENVIRONMENT"
    
    aws ssm put-parameter \
      --name "/$ENVIRONMENT/klear-karma/sendgrid-api-key" \
      --value "SG...." \
      --type "SecureString" \
      --description "SendGrid API key for $ENVIRONMENT"
    
    echo "✅ Secrets created successfully"
    ;;
  
  "list")
    echo "Listing secrets for $ENVIRONMENT environment..."
    aws ssm get-parameters-by-path \
      --path "/$ENVIRONMENT/klear-karma" \
      --recursive \
      --query 'Parameters[].Name' \
      --output table
    ;;
  
  "rotate")
    SECRET_NAME=${3}
    if [ -z "$SECRET_NAME" ]; then
      echo "Usage: $0 $ENVIRONMENT rotate <secret-name>"
      exit 1
    fi
    
    echo "Rotating secret: $SECRET_NAME"
    
    # Generate new value based on secret type
    case $SECRET_NAME in
      *"password"*|*"secret"*)
        NEW_VALUE=$(openssl rand -base64 32)
        ;;
      *"jwt"*)
        NEW_VALUE=$(openssl rand -base64 64)
        ;;
      *)
        echo "Unknown secret type. Please provide new value:"
        read -s NEW_VALUE
        ;;
    esac
    
    # Update parameter
    aws ssm put-parameter \
      --name "/$ENVIRONMENT/klear-karma/$SECRET_NAME" \
      --value "$NEW_VALUE" \
      --type "SecureString" \
      --overwrite
    
    echo "✅ Secret rotated successfully"
    echo "⚠️  Remember to restart services to pick up the new value"
    ;;
  
  "backup")
    echo "Backing up secrets for $ENVIRONMENT environment..."
    
    BACKUP_FILE="secrets-backup-$ENVIRONMENT-$(date +%Y%m%d-%H%M%S).json"
    
    aws ssm get-parameters-by-path \
      --path "/$ENVIRONMENT/klear-karma" \
      --recursive \
      --with-decryption \
      --query 'Parameters' \
      --output json > "$BACKUP_FILE"
    
    echo "✅ Secrets backed up to $BACKUP_FILE"
    echo "⚠️  This file contains sensitive data. Store it securely!"
    ;;
  
  *)
    echo "Usage: $0 <environment> <action>"
    echo "Actions: create, list, rotate, backup"
    exit 1
    ;;
esac
```

### Secret Rotation Lambda

```javascript
// lambda/secret-rotation.js
const AWS = require('aws-sdk');
const ssm = new AWS.SSM();
const ecs = new AWS.ECS();
const crypto = require('crypto');

exports.handler = async (event) => {
  console.log('Secret rotation event:', JSON.stringify(event, null, 2));
  
  const { secretName, environment } = event;
  
  try {
    // Generate new secret value
    const newValue = generateSecretValue(secretName);
    
    // Update parameter in SSM
    await ssm.putParameter({
      Name: `/${environment}/klear-karma/${secretName}`,
      Value: newValue,
      Type: 'SecureString',
      Overwrite: true
    }).promise();
    
    console.log(`Secret ${secretName} updated successfully`);
    
    // Restart ECS services to pick up new secret
    await restartECSServices(environment);
    
    // Send notification
    await sendNotification({
      message: `Secret ${secretName} rotated successfully in ${environment}`,
      severity: 'info'
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Secret rotation completed successfully',
        secretName,
        environment
      })
    };
    
  } catch (error) {
    console.error('Secret rotation failed:', error);
    
    await sendNotification({
      message: `Secret rotation failed for ${secretName} in ${environment}: ${error.message}`,
      severity: 'error'
    });
    
    throw error;
  }
};

function generateSecretValue(secretName) {
  if (secretName.includes('jwt')) {
    return crypto.randomBytes(64).toString('base64');
  } else if (secretName.includes('password') || secretName.includes('secret')) {
    return crypto.randomBytes(32).toString('base64');
  } else {
    throw new Error(`Unknown secret type: ${secretName}`);
  }
}

async function restartECSServices(environment) {
  const clusterName = `klear-karma-${environment}`;
  
  // List services in cluster
  const services = await ecs.listServices({
    cluster: clusterName
  }).promise();
  
  // Force new deployment for each service
  for (const serviceArn of services.serviceArns) {
    await ecs.updateService({
      cluster: clusterName,
      service: serviceArn,
      forceNewDeployment: true
    }).promise();
    
    console.log(`Restarted service: ${serviceArn}`);
  }
}

async function sendNotification(notification) {
  // Implementation depends on your notification system
  // Could be SNS, Slack, email, etc.
  console.log('Notification:', notification);
}
```

---

## Monitoring and Alerting Integration

### Pipeline Monitoring

```yaml
# prometheus/pipeline-rules.yml
groups:
  - name: pipeline.rules
    rules:
      # Build failure rate
      - alert: HighBuildFailureRate
        expr: |
          (
            sum(increase(github_actions_workflow_runs_total{conclusion="failure"}[1h])) /
            sum(increase(github_actions_workflow_runs_total[1h]))
          ) > 0.2
        for: 5m
        labels:
          severity: warning
          team: devops
        annotations:
          summary: "High build failure rate detected"
          description: "Build failure rate is {{ $value | humanizePercentage }} over the last hour"
      
      # Deployment frequency
      - alert: LowDeploymentFrequency
        expr: |
          sum(increase(deployments_total[24h])) < 1
        for: 1h
        labels:
          severity: info
          team: devops
        annotations:
          summary: "Low deployment frequency"
          description: "Only {{ $value }} deployments in the last 24 hours"
      
      # Long-running builds
      - alert: LongRunningBuild
        expr: |
          github_actions_workflow_run_duration_seconds > 1800
        for: 0m
        labels:
          severity: warning
          team: devops
        annotations:
          summary: "Long-running build detected"
          description: "Build {{ $labels.workflow_name }} has been running for {{ $value | humanizeDuration }}"
```

### Deployment Metrics

```javascript
// metrics/deployment.js
const prometheus = require('prom-client');

class DeploymentMetrics {
  constructor() {
    this.deploymentCounter = new prometheus.Counter({
      name: 'deployments_total',
      help: 'Total number of deployments',
      labelNames: ['environment', 'service', 'status']
    });
    
    this.deploymentDuration = new prometheus.Histogram({
      name: 'deployment_duration_seconds',
      help: 'Deployment duration in seconds',
      labelNames: ['environment', 'service'],
      buckets: [30, 60, 120, 300, 600, 1200, 1800]
    });
    
    this.leadTime = new prometheus.Histogram({
      name: 'lead_time_seconds',
      help: 'Lead time from commit to production',
      buckets: [300, 600, 1800, 3600, 7200, 14400, 28800]
    });
    
    this.mttr = new prometheus.Histogram({
      name: 'mean_time_to_recovery_seconds',
      help: 'Mean time to recovery from incidents',
      buckets: [300, 600, 1800, 3600, 7200, 14400, 28800]
    });
  }
  
  recordDeployment(environment, service, status, duration) {
    this.deploymentCounter.inc({ environment, service, status });
    
    if (status === 'success') {
      this.deploy