# Testing Strategy

## Executive Summary

This document outlines the comprehensive testing strategy for Klear Karma's digital wellness platform. Our testing approach ensures high-quality, reliable, and secure software delivery through automated testing, continuous integration, and quality assurance practices.

### Key Objectives

- **Quality Assurance**: Maintain high code quality and user experience standards
- **Risk Mitigation**: Identify and prevent defects before production deployment
- **Compliance**: Ensure adherence to healthcare data protection regulations
- **Performance**: Validate system performance under various load conditions
- **Security**: Verify security controls and data protection measures
- **User Experience**: Ensure optimal user experience across all platforms

---

## Testing Philosophy

### Core Principles

1. **Shift-Left Testing**: Integrate testing early in the development lifecycle
2. **Test Automation**: Automate repetitive tests for efficiency and consistency
3. **Risk-Based Testing**: Prioritize testing based on business risk and impact
4. **Continuous Testing**: Implement testing throughout the CI/CD pipeline
5. **Quality Gates**: Establish quality criteria that must be met before deployment

### Testing Pyramid

```
    /\     E2E Tests (10%)
   /  \    - User journeys
  /____\   - Integration scenarios
 /      \  
/________\ Integration Tests (20%)
          - API testing
          - Service integration
__________________
Unit Tests (70%)
- Component testing
- Business logic
- Edge cases
```

---

## Test Types and Strategies

### 1. Unit Testing

**Scope**: Individual components, functions, and classes
**Coverage Target**: 90%+
**Tools**: Jest, React Testing Library, Vitest

#### Frontend Unit Tests

```javascript
// Example: Component testing
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingForm } from '../BookingForm';

describe('BookingForm', () => {
  it('should validate required fields', async () => {
    render(<BookingForm />);
    
    const submitButton = screen.getByRole('button', { name: /book appointment/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/practitioner is required/i)).toBeInTheDocument();
    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
  });
  
  it('should submit form with valid data', async () => {
    const mockOnSubmit = jest.fn();
    render(<BookingForm onSubmit={mockOnSubmit} />);
    
    // Fill form and submit
    fireEvent.change(screen.getByLabelText(/practitioner/i), {
      target: { value: 'dr-smith' }
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: '2024-01-15' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /book appointment/i }));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      practitionerId: 'dr-smith',
      date: '2024-01-15'
    });
  });
});
```

#### Backend Unit Tests

```javascript
// Example: Service testing
import { BookingService } from '../services/BookingService';
import { mockPrisma } from '../__mocks__/prisma';

describe('BookingService', () => {
  let bookingService;
  
  beforeEach(() => {
    bookingService = new BookingService(mockPrisma);
  });
  
  describe('createBooking', () => {
    it('should create booking with valid data', async () => {
      const bookingData = {
        userId: 'user-123',
        practitionerId: 'practitioner-456',
        serviceId: 'service-789',
        scheduledAt: new Date('2024-01-15T10:00:00Z')
      };
      
      mockPrisma.booking.create.mockResolvedValue({
        id: 'booking-123',
        ...bookingData,
        status: 'CONFIRMED'
      });
      
      const result = await bookingService.createBooking(bookingData);
      
      expect(result.id).toBe('booking-123');
      expect(result.status).toBe('CONFIRMED');
      expect(mockPrisma.booking.create).toHaveBeenCalledWith({
        data: bookingData
      });
    });
    
    it('should throw error for conflicting time slot', async () => {
      mockPrisma.booking.findFirst.mockResolvedValue({ id: 'existing-booking' });
      
      await expect(bookingService.createBooking({
        practitionerId: 'practitioner-456',
        scheduledAt: new Date('2024-01-15T10:00:00Z')
      })).rejects.toThrow('Time slot not available');
    });
  });
});
```

### 2. Integration Testing

**Scope**: API endpoints, database interactions, external services
**Coverage Target**: 80%+
**Tools**: Supertest, Test Containers, Postman/Newman

#### API Integration Tests

```javascript
// Example: API endpoint testing
import request from 'supertest';
import { app } from '../app';
import { setupTestDatabase, cleanupTestDatabase } from '../test-utils';

describe('Booking API', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });
  
  afterAll(async () => {
    await cleanupTestDatabase();
  });
  
  describe('POST /api/bookings', () => {
    it('should create booking with valid data', async () => {
      const bookingData = {
        practitionerId: 'practitioner-123',
        serviceId: 'service-456',
        scheduledAt: '2024-01-15T10:00:00Z'
      };
      
      const response = await request(app)
        .post('/api/bookings')
        .set('Authorization', 'Bearer valid-token')
        .send(bookingData)
        .expect(201);
      
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.status).toBe('CONFIRMED');
    });
    
    it('should return 400 for invalid data', async () => {
      const response = await request(app)
        .post('/api/bookings')
        .set('Authorization', 'Bearer valid-token')
        .send({})
        .expect(400);
      
      expect(response.body.errors).toContain('practitionerId is required');
    });
    
    it('should return 401 for unauthorized request', async () => {
      await request(app)
        .post('/api/bookings')
        .send({})
        .expect(401);
    });
  });
});
```

#### Database Integration Tests

```javascript
// Example: Repository testing
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../repositories/UserRepository';
import { createTestUser, cleanupTestData } from '../test-utils';

describe('UserRepository', () => {
  let prisma;
  let userRepository;
  
  beforeAll(async () => {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.TEST_DATABASE_URL
        }
      }
    });
    userRepository = new UserRepository(prisma);
  });
  
  afterEach(async () => {
    await cleanupTestData(prisma);
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });
  
  it('should create user with encrypted password', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe'
    };
    
    const user = await userRepository.create(userData);
    
    expect(user.id).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(user.password).not.toBe(userData.password); // Should be hashed
    expect(user.emailVerified).toBe(false);
  });
  
  it('should find user by email', async () => {
    const testUser = await createTestUser(prisma);
    
    const foundUser = await userRepository.findByEmail(testUser.email);
    
    expect(foundUser.id).toBe(testUser.id);
    expect(foundUser.email).toBe(testUser.email);
  });
});
```

### 3. End-to-End (E2E) Testing

**Scope**: Complete user workflows and business scenarios
**Coverage Target**: Critical user journeys
**Tools**: Playwright, Cypress

#### E2E Test Examples

```javascript
// Example: User booking journey
import { test, expect } from '@playwright/test';

test.describe('Booking Journey', () => {
  test('user can complete booking process', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // Navigate to practitioners
    await page.click('[data-testid="find-practitioners"]');
    await expect(page).toHaveURL('/practitioners');
    
    // Search and select practitioner
    await page.fill('[data-testid="search-input"]', 'Dr. Smith');
    await page.click('[data-testid="search-button"]');
    await page.click('[data-testid="practitioner-card"]:first-child');
    
    // Select service and time
    await page.click('[data-testid="service-consultation"]');
    await page.click('[data-testid="date-picker"]');
    await page.click('[data-testid="date-tomorrow"]');
    await page.click('[data-testid="time-slot-10am"]');
    
    // Complete booking
    await page.click('[data-testid="book-appointment"]');
    await page.fill('[data-testid="notes"]', 'First consultation');
    await page.click('[data-testid="confirm-booking"]');
    
    // Verify booking confirmation
    await expect(page.locator('[data-testid="booking-confirmation"]')).toBeVisible();
    await expect(page.locator('[data-testid="booking-id"]')).toContainText(/BK-\d+/);
  });
  
  test('practitioner can manage availability', async ({ page }) => {
    // Login as practitioner
    await page.goto('/practitioner/login');
    await page.fill('[data-testid="email"]', 'practitioner@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // Navigate to schedule
    await page.click('[data-testid="schedule-menu"]');
    await expect(page).toHaveURL('/practitioner/schedule');
    
    // Add availability
    await page.click('[data-testid="add-availability"]');
    await page.selectOption('[data-testid="day-select"]', 'monday');
    await page.fill('[data-testid="start-time"]', '09:00');
    await page.fill('[data-testid="end-time"]', '17:00');
    await page.click('[data-testid="save-availability"]');
    
    // Verify availability added
    await expect(page.locator('[data-testid="availability-monday"]')).toContainText('09:00 - 17:00');
  });
});
```

### 4. Performance Testing

**Scope**: Load, stress, and scalability testing
**Tools**: K6, Artillery, JMeter

#### Load Testing Scripts

```javascript
// Example: K6 load test
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '2m', target: 10 }, // Ramp up
    { duration: '5m', target: 50 }, // Stay at 50 users
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.1'], // Error rate under 10%
    errors: ['rate<0.1'],
  },
};

export default function() {
  // Test user registration
  let registrationResponse = http.post('https://api.klearkarma.com/auth/register', {
    email: `user${Math.random()}@example.com`,
    password: 'password123',
    firstName: 'Test',
    lastName: 'User'
  });
  
  let registrationSuccess = check(registrationResponse, {
    'registration status is 201': (r) => r.status === 201,
    'registration response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  errorRate.add(!registrationSuccess);
  
  if (registrationSuccess) {
    let token = registrationResponse.json('data.token');
    
    // Test authenticated API calls
    let practitionersResponse = http.get('https://api.klearkarma.com/practitioners', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    let practitionersSuccess = check(practitionersResponse, {
      'practitioners status is 200': (r) => r.status === 200,
      'practitioners response time < 300ms': (r) => r.timings.duration < 300,
      'practitioners data exists': (r) => r.json('data.length') > 0,
    });
    
    errorRate.add(!practitionersSuccess);
  }
  
  sleep(1);
}
```

### 5. Security Testing

**Scope**: Authentication, authorization, data protection, vulnerability scanning
**Tools**: OWASP ZAP, Burp Suite, npm audit, Snyk

#### Security Test Cases

```javascript
// Example: Security testing
import request from 'supertest';
import { app } from '../app';

describe('Security Tests', () => {
  describe('Authentication', () => {
    it('should reject requests without valid token', async () => {
      await request(app)
        .get('/api/users/profile')
        .expect(401);
    });
    
    it('should reject requests with expired token', async () => {
      const expiredToken = 'expired.jwt.token';
      
      await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);
    });
    
    it('should implement rate limiting', async () => {
      const requests = Array(101).fill().map(() => 
        request(app)
          .post('/api/auth/login')
          .send({ email: 'test@example.com', password: 'wrong' })
      );
      
      const responses = await Promise.all(requests);
      const rateLimitedResponses = responses.filter(r => r.status === 429);
      
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });
  
  describe('Input Validation', () => {
    it('should sanitize SQL injection attempts', async () => {
      const maliciousInput = "'; DROP TABLE users; --";
      
      const response = await request(app)
        .get('/api/practitioners')
        .query({ search: maliciousInput })
        .set('Authorization', 'Bearer valid-token')
        .expect(200);
      
      // Should return empty results, not cause database error
      expect(response.body.data).toEqual([]);
    });
    
    it('should prevent XSS attacks', async () => {
      const xssPayload = '<script>alert("xss")</script>';
      
      const response = await request(app)
        .post('/api/practitioners/profile')
        .set('Authorization', 'Bearer practitioner-token')
        .send({ bio: xssPayload })
        .expect(400);
      
      expect(response.body.errors).toContain('Invalid characters in bio');
    });
  });
  
  describe('Data Protection', () => {
    it('should not expose sensitive data in responses', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', 'Bearer valid-token')
        .expect(200);
      
      expect(response.body.data.password).toBeUndefined();
      expect(response.body.data.passwordHash).toBeUndefined();
    });
    
    it('should encrypt sensitive data at rest', async () => {
      // This would be tested at the database level
      // Verify that PII fields are encrypted in the database
    });
  });
});
```

### 6. Accessibility Testing

**Scope**: WCAG 2.1 AA compliance, screen reader compatibility
**Tools**: axe-core, Lighthouse, WAVE

```javascript
// Example: Accessibility testing
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('homepage should be accessible', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
  
  test('booking form should be keyboard navigable', async ({ page }) => {
    await page.goto('/book-appointment');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="practitioner-select"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="service-select"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="date-picker"]')).toBeFocused();
  });
  
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/practitioners');
    
    // Check for proper ARIA labels
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toHaveAttribute('aria-label', 'Search practitioners');
    
    const filterButton = page.locator('[data-testid="filter-button"]');
    await expect(filterButton).toHaveAttribute('aria-expanded', 'false');
  });
});
```

---

## Test Environment Management

### Environment Configuration

```yaml
# docker-compose.test.yml
version: '3.8'
services:
  test-db:
    image: postgres:15
    environment:
      POSTGRES_DB: klearkarma_test
      POSTGRES_USER: test_user
      POSTGRES_PASSWORD: test_password
    ports:
      - "5433:5432"
    volumes:
      - test_db_data:/var/lib/postgresql/data
  
  test-redis:
    image: redis:7-alpine
    ports:
      - "6380:6379"
  
  test-api:
    build:
      context: .
      dockerfile: Dockerfile.test
    environment:
      NODE_ENV: test
      DATABASE_URL: postgresql://test_user:test_password@test-db:5432/klearkarma_test
      REDIS_URL: redis://test-redis:6379
    depends_on:
      - test-db
      - test-redis
    volumes:
      - ./src:/app/src
      - ./tests:/app/tests

volumes:
  test_db_data:
```

### Test Data Management

```javascript
// test-utils/database.js
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function setupTestDatabase() {
  // Run migrations
  await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
  // Seed test data
  await seedTestData();
}

export async function cleanupTestDatabase() {
  // Clean up in reverse order of dependencies
  await prisma.booking.deleteMany();
  await prisma.practitioner.deleteMany();
  await prisma.user.deleteMany();
}

export async function seedTestData() {
  // Create test users
  const testUsers = await Promise.all(
    Array(10).fill().map(() => 
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          passwordHash: '$2b$10$hashedpassword',
          emailVerified: true
        }
      })
    )
  );
  
  // Create test practitioners
  const testPractitioners = await Promise.all(
    Array(5).fill().map(() => 
      prisma.practitioner.create({
        data: {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          specialization: faker.helpers.arrayElement(['Therapy', 'Counseling', 'Coaching']),
          bio: faker.lorem.paragraph(),
          verified: true
        }
      })
    )
  );
  
  return { testUsers, testPractitioners };
}

export function createTestUser(overrides = {}) {
  return {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    passwordHash: '$2b$10$hashedpassword',
    emailVerified: true,
    ...overrides
  };
}
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  unit-tests:
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
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
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
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella

  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Start test environment
      run: docker-compose -f docker-compose.test.yml up -d
    
    - name: Wait for services
      run: |
        timeout 60 bash -c 'until docker-compose -f docker-compose.test.yml exec -T test-db pg_isready; do sleep 1; done'
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Stop test environment
      run: docker-compose -f docker-compose.test.yml down

  e2e-tests:
    runs-on: ubuntu-latest
    needs: integration-tests
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright
      run: npx playwright install --with-deps
    
    - name: Start application
      run: |
        npm run build
        npm run start:test &
        timeout 60 bash -c 'until curl -f http://localhost:3000/health; do sleep 1; done'
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30

  security-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Run security audit
      run: npm audit --audit-level moderate
    
    - name: Run Snyk security scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high
    
    - name: Run OWASP ZAP scan
      uses: zaproxy/action-baseline@v0.7.0
      with:
        target: 'http://localhost:3000'
```

### Quality Gates

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
    '!src/serviceWorker.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    './src/services/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}'
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
};
```

---

## Test Reporting and Metrics

### Coverage Reporting

```javascript
// scripts/coverage-report.js
const fs = require('fs');
const path = require('path');

function generateCoverageReport() {
  const coverageData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../coverage/coverage-final.json'), 'utf8')
  );
  
  const summary = {
    total: {
      lines: { total: 0, covered: 0, pct: 0 },
      functions: { total: 0, covered: 0, pct: 0 },
      statements: { total: 0, covered: 0, pct: 0 },
      branches: { total: 0, covered: 0, pct: 0 }
    },
    files: []
  };
  
  Object.entries(coverageData).forEach(([filePath, data]) => {
    const fileReport = {
      path: filePath,
      lines: {
        total: Object.keys(data.statementMap).length,
        covered: Object.values(data.s).filter(count => count > 0).length
      },
      functions: {
        total: Object.keys(data.fnMap).length,
        covered: Object.values(data.f).filter(count => count > 0).length
      },
      statements: {
        total: Object.keys(data.statementMap).length,
        covered: Object.values(data.s).filter(count => count > 0).length
      },
      branches: {
        total: Object.keys(data.branchMap).length * 2,
        covered: Object.values(data.b).flat().filter(count => count > 0).length
      }
    };
    
    // Calculate percentages
    Object.keys(fileReport).forEach(key => {
      if (typeof fileReport[key] === 'object' && fileReport[key].total) {
        fileReport[key].pct = fileReport[key].total > 0 
          ? Math.round((fileReport[key].covered / fileReport[key].total) * 100)
          : 100;
      }
    });
    
    summary.files.push(fileReport);
    
    // Add to totals
    Object.keys(summary.total).forEach(key => {
      summary.total[key].total += fileReport[key].total;
      summary.total[key].covered += fileReport[key].covered;
    });
  });
  
  // Calculate total percentages
  Object.keys(summary.total).forEach(key => {
    summary.total[key].pct = summary.total[key].total > 0
      ? Math.round((summary.total[key].covered / summary.total[key].total) * 100)
      : 100;
  });
  
  return summary;
}

if (require.main === module) {
  const report = generateCoverageReport();
  console.log('Coverage Summary:');
  console.log(`Lines: ${report.total.lines.pct}% (${report.total.lines.covered}/${report.total.lines.total})`);
  console.log(`Functions: ${report.total.functions.pct}% (${report.total.functions.covered}/${report.total.functions.total})`);
  console.log(`Statements: ${report.total.statements.pct}% (${report.total.statements.covered}/${report.total.statements.total})`);
  console.log(`Branches: ${report.total.branches.pct}% (${report.total.branches.covered}/${report.total.branches.total})`);
}

module.exports = { generateCoverageReport };
```

### Test Metrics Dashboard

```javascript
// scripts/test-metrics.js
const fs = require('fs');
const path = require('path');

class TestMetrics {
  constructor() {
    this.metrics = {
      testRuns: [],
      coverage: {},
      performance: {},
      flaky: []
    };
  }
  
  recordTestRun(results) {
    const run = {
      timestamp: new Date().toISOString(),
      duration: results.duration,
      passed: results.numPassedTests,
      failed: results.numFailedTests,
      total: results.numTotalTests,
      coverage: results.coverageMap
    };
    
    this.metrics.testRuns.push(run);
    this.saveMetrics();
  }
  
  identifyFlakyTests() {
    const testResults = {};
    
    this.metrics.testRuns.forEach(run => {
      run.testResults?.forEach(test => {
        if (!testResults[test.fullName]) {
          testResults[test.fullName] = [];
        }
        testResults[test.fullName].push(test.status);
      });
    });
    
    const flakyTests = Object.entries(testResults)
      .filter(([name, results]) => {
        const uniqueResults = [...new Set(results)];
        return uniqueResults.length > 1 && results.length >= 5;
      })
      .map(([name, results]) => ({
        name,
        runs: results.length,
        failures: results.filter(r => r === 'failed').length,
        flakyScore: results.filter(r => r === 'failed').length / results.length
      }));
    
    this.metrics.flaky = flakyTests;
    return flakyTests;
  }
  
  generateReport() {
    const recent = this.metrics.testRuns.slice(-10);
    const avgDuration = recent.reduce((sum, run) => sum + run.duration, 0) / recent.length;
    const successRate = recent.reduce((sum, run) => sum + (run.passed / run.total), 0) / recent.length;
    
    return {
      summary: {
        totalRuns: this.metrics.testRuns.length,
        averageDuration: Math.round(avgDuration),
        successRate: Math.round(successRate * 100),
        flakyTests: this.metrics.flaky.length
      },
      trends: {
        duration: recent.map(r => r.duration),
        successRate: recent.map(r => r.passed / r.total)
      },
      flakyTests: this.metrics.flaky.sort((a, b) => b.flakyScore - a.flakyScore)
    };
  }
  
  saveMetrics() {
    fs.writeFileSync(
      path.join(__dirname, '../test-metrics.json'),
      JSON.stringify(this.metrics, null, 2)
    );
  }
  
  loadMetrics() {
    try {
      const data = fs.readFileSync(path.join(__dirname, '../test-metrics.json'), 'utf8');
      this.metrics = JSON.parse(data);
    } catch (error) {
      // File doesn't exist, start with empty metrics
    }
  }
}

module.exports = TestMetrics;
```

---

## Best Practices and Guidelines

### Test Writing Guidelines

1. **Test Naming**: Use descriptive test names that explain the expected behavior
   ```javascript
   // Good
   it('should return 400 when email is missing from registration request')
   
   // Bad
   it('should fail')
   ```

2. **Test Structure**: Follow the Arrange-Act-Assert pattern
   ```javascript
   it('should create booking with valid data', async () => {
     // Arrange
     const bookingData = { /* test data */ };
     const mockUser = await createTestUser();
     
     // Act
     const result = await bookingService.create(bookingData);
     
     // Assert
     expect(result.id).toBeDefined();
     expect(result.status).toBe('CONFIRMED');
   });
   ```

3. **Test Independence**: Each test should be independent and not rely on other tests
   ```javascript
   beforeEach(async () => {
     await cleanupTestData();
     await seedRequiredData();
   });
   ```

4. **Mock External Dependencies**: Mock external services and APIs
   ```javascript
   jest.mock('../services/EmailService', () => ({
     sendEmail: jest.fn().mockResolvedValue({ success: true })
   }));
   ```

### Performance Testing Guidelines

1. **Baseline Establishment**: Establish performance baselines for critical operations
2. **Realistic Load**: Use realistic user behavior patterns in load tests
3. **Environment Parity**: Test in environments similar to production
4. **Monitoring**: Monitor system resources during performance tests

### Security Testing Guidelines

1. **Input Validation**: Test all input validation and sanitization
2. **Authentication**: Verify authentication and authorization mechanisms
3. **Data Protection**: Ensure sensitive data is properly protected
4. **Vulnerability Scanning**: Regularly scan for known vulnerabilities

---

## Conclusion

This testing strategy provides a comprehensive framework for ensuring the quality, security, and performance of Klear Karma's digital wellness platform. The multi-layered approach covers:

- **Unit Testing**: Comprehensive component and function testing
- **Integration Testing**: API and service integration validation
- **End-to-End Testing**: Complete user journey verification
- **Performance Testing**: Load and scalability validation
- **Security Testing**: Vulnerability and compliance verification
- **Accessibility Testing**: WCAG compliance and usability validation

### Success Metrics

- **Code Coverage**: 90%+ for critical components
- **Test Execution Time**: Under 10 minutes for full test suite
- **Flaky Test Rate**: Less than 2% of total tests
- **Security Scan**: Zero high-severity vulnerabilities
- **Performance**: 95% of requests under 500ms response time

### Continuous Improvement

- Regular review and update of test strategies
- Analysis of test metrics and trends
- Integration of new testing tools and techniques
- Team training on testing best practices
- Feedback incorporation from production incidents

For questions or suggestions regarding the testing strategy, contact the QA team or refer to the internal testing documentation.