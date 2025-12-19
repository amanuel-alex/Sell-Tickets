# AmazingComp API Documentation

Complete RESTful API for AmazingComp platform, accessible by both mobile and web applications.

## 🚀 Quick Start

**Base URL**: `http://localhost:3000/api/v1`

All endpoints return JSON responses with consistent structure.

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Response Format](#response-format)
3. [Endpoints](#endpoints)
4. [Error Handling](#error-handling)
5. [Payment Methods](#payment-methods)
6. [Examples](#examples)

---

## 🔐 Authentication

### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "identifier": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "role": "organizer",
      "name": "John Doe",
      "businessName": "My Business",
      "status": "approved"
    }
  },
  "message": "Login successful"
}
```

The response includes a `Set-Cookie` header with the session token. Include this cookie in subsequent requests.

### Get Current User
```http
GET /api/v1/auth/me
Cookie: session=<your-session-token>
```

---

## 📦 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🛣️ Endpoints

### Health Check

#### GET /api/v1/health
Check API health status (public endpoint)

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "1.0.0",
    "services": {
      "database": "operational",
      "authentication": "operational"
    }
  }
}
```

---

### Events

#### GET /api/v1/events
List events with optional filters

**Query Parameters:**
- `status` - Filter by status (draft, active, ended, cancelled)
- `category` - Filter by category
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

**Example:**
```http
GET /api/v1/events?status=active&category=Music&page=1&limit=10
Cookie: session=<token>
```

#### POST /api/v1/events
Create new event

**Request Body:**
```json
{
  "title": "Summer Music Festival",
  "description": "A great music festival with amazing artists",
  "category": "Music",
  "startDate": "2024-07-15T18:00:00Z",
  "endDate": "2024-07-15T23:00:00Z",
  "venue": "Addis Ababa Stadium",
  "venueAddress": "Addis Ababa, Ethiopia"
}
```

#### GET /api/v1/events/[id]
Get single event details

#### PUT /api/v1/events/[id]
Update event

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "status": "active",
  ...
}
```

#### DELETE /api/v1/events/[id]
Delete event

---

### Tickets

#### GET /api/v1/tickets
List tickets

**Query Parameters:**
- `eventId` - Filter by event ID
- `page` - Page number
- `limit` - Items per page

#### POST /api/v1/tickets
Create new ticket

**Request Body:**
```json
{
  "eventId": "event_123",
  "ticketType": "VIP",
  "price": 500,
  "quantity": 100
}
```

#### GET /api/v1/tickets/[id]
Get single ticket

#### PUT /api/v1/tickets/[id]
Update ticket

#### DELETE /api/v1/tickets/[id]
Delete ticket (only if no tickets sold)

---

### Transactions

#### GET /api/v1/transactions
List transactions

**Query Parameters:**
- `eventId` - Filter by event
- `status` - Filter by status (pending, completed, refunded, failed)
- `paymentMethod` - Filter by payment method
- `page` - Page number
- `limit` - Items per page

#### POST /api/v1/transactions
Create transaction (public endpoint for ticket purchases)

**Request Body:**
```json
{
  "eventId": "event_123",
  "ticketId": "ticket_456",
  "customerEmail": "customer@example.com",
  "customerName": "John Doe",
  "quantity": 2,
  "paymentMethod": "telebirr"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "txn_789",
    "amount": 1000,
    "status": "pending",
    ...
  },
  "message": "Transaction created successfully. Please complete payment."
}
```

#### GET /api/v1/transactions/[id]
Get single transaction

#### PUT /api/v1/transactions/[id]
Update transaction status

**Request Body:**
```json
{
  "status": "completed"
}
```

#### POST /api/v1/transactions/[id]/confirm
Confirm payment (public endpoint for payment gateways)

---

### Analytics

#### GET /api/v1/analytics/dashboard
Get dashboard analytics for organizer

**Response:**
```json
{
  "success": true,
  "data": {
    "today": {
      "sales": 5000,
      "ticketsSold": 25,
      "events": 3,
      "transactions": 12
    },
    "sales7d": [...],
    "totals": {
      "revenue": 125000,
      "ticketsSold": 3456,
      "events": 12,
      "activeEvents": 3
    }
  }
}
```

---

### Customers

#### GET /api/v1/customers
List customers with purchase history

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "email": "customer@example.com",
      "name": "John Doe",
      "totalSpent": 5000,
      "totalTickets": 10,
      "transactions": 5,
      "lastPurchase": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

### Admin Endpoints

#### POST /api/v1/admin/events/[id]/approve
Approve event (admin only)

#### POST /api/v1/admin/events/[id]/reject
Reject event (admin only)

---

## 💳 Payment Methods

Supported payment methods:
- `telebirr` - TeleBirr mobile money
- `cbe-birr` - CBE Birr mobile money
- `amole` - Amole mobile money
- `bank-transfer` - Bank transfer (reference only)
- `cash` - Cash at venue (QR validation)

---

## ❌ Error Handling

### Status Codes

- `200` - Success
- `400` - Bad Request (validation errors, business logic errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions, account suspended)
- `404` - Not Found
- `422` - Validation Error (with detailed error messages)
- `500` - Internal Server Error

### Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "data": {
    "errors": [
      {
        "field": "email",
        "message": "Invalid email address"
      }
    ]
  }
}
```

---

## 📱 Mobile App Integration

### Example: React Native / Flutter

```javascript
// Login
const loginResponse = await fetch('http://your-domain.com/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    identifier: 'user@example.com',
    password: 'password123'
  })
});

const loginData = await loginResponse.json();
// Store session cookie for subsequent requests

// Get Events
const eventsResponse = await fetch('http://your-domain.com/api/v1/events?status=active', {
  headers: {
    'Cookie': `session=${sessionToken}`, // Include session cookie
  }
});

const eventsData = await eventsResponse.json();
```

---

## 🔒 Security Notes

1. **CORS**: Currently set to `*` for development. In production, restrict to specific domains.
2. **Session Cookies**: Use HTTP-only cookies for web, or implement token-based auth for mobile.
3. **Rate Limiting**: Consider adding rate limiting for production.
4. **HTTPS**: Always use HTTPS in production.
5. **Input Validation**: All inputs are validated using Zod schemas.

---

## 🧪 Testing

### Using cURL

```bash
# Health check
curl http://localhost:3000/api/v1/health

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"admin@etticket.com","password":"admin123"}' \
  -c cookies.txt

# Get events (using saved cookie)
curl http://localhost:3000/api/v1/events \
  -b cookies.txt
```

### Using Postman / Insomnia

1. Create a new request
2. Set method and URL
3. For authenticated endpoints, add cookie: `session=<your-token>`
4. For POST/PUT requests, set `Content-Type: application/json` in headers

---

## 📝 Notes

- All dates should be in ISO 8601 format (e.g., `2024-07-15T18:00:00Z`)
- All monetary values are in ETB (Ethiopian Birr)
- Pagination is 1-indexed (page 1 is the first page)
- The API is stateless - each request must include authentication

