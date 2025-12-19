# ET Ticket API v1

RESTful API for ET Ticket platform, accessible by both mobile and web applications.

## Base URL
```
http://localhost:3000/api/v1
```

## CORS Support

All endpoints support CORS for cross-origin requests (mobile apps, web apps). The API automatically handles preflight OPTIONS requests.

**Note**: In production, update `middleware-api.ts` to restrict `Access-Control-Allow-Origin` to specific domains for security.

## Authentication

All endpoints (except `/health`, `/auth/login`, and public transaction creation) require authentication via session cookies.

Include the session cookie in your requests:
```
Cookie: session=<your-session-token>
```

For mobile apps, you can use the `/api/v1/auth/login` endpoint to get a session, then include the session cookie in subsequent requests.

## Response Format

All responses follow this structure:

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

## Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login (returns session cookie)
- `GET /api/v1/auth/me` - Get current authenticated user

### Health Check
- `GET /api/v1/health` - Check API health status

### Events
- `GET /api/v1/events` - List events (with filters: status, category, pagination)
- `POST /api/v1/events` - Create new event
- `GET /api/v1/events/[id]` - Get single event
- `PUT /api/v1/events/[id]` - Update event
- `DELETE /api/v1/events/[id]` - Delete event

### Tickets
- `GET /api/v1/tickets` - List tickets (with filters: eventId, pagination)
- `POST /api/v1/tickets` - Create new ticket
- `GET /api/v1/tickets/[id]` - Get single ticket
- `PUT /api/v1/tickets/[id]` - Update ticket
- `DELETE /api/v1/tickets/[id]` - Delete ticket

### Transactions
- `GET /api/v1/transactions` - List transactions (with filters: eventId, status, paymentMethod, pagination)
- `POST /api/v1/transactions` - Create transaction (public, for ticket purchases)
- `GET /api/v1/transactions/[id]` - Get single transaction
- `PUT /api/v1/transactions/[id]` - Update transaction (e.g., confirm payment, refund)
- `POST /api/v1/transactions/[id]/confirm` - Confirm payment (public, for payment gateways)

### Admin Endpoints
- `POST /api/v1/admin/events/[id]/approve` - Approve event (admin only)
- `POST /api/v1/admin/events/[id]/reject` - Reject event (admin only)

### Analytics
- `GET /api/v1/analytics/dashboard` - Get dashboard analytics

### Customers
- `GET /api/v1/customers` - List customers (with pagination)

## Payment Methods

Supported payment methods:
- `telebirr` - TeleBirr
- `cbe-birr` - CBE Birr
- `amole` - Amole
- `bank-transfer` - Bank Transfer (reference only)
- `cash` - Cash at venue (QR validation)

## Example Usage

### Create Event
```bash
POST /api/v1/events
Content-Type: application/json
Cookie: session=<token>

{
  "title": "Summer Music Festival",
  "description": "A great music festival...",
  "category": "Music",
  "startDate": "2024-07-15T18:00:00Z",
  "endDate": "2024-07-15T23:00:00Z",
  "venue": "Addis Ababa Stadium",
  "venueAddress": "Addis Ababa, Ethiopia"
}
```

### Purchase Ticket
```bash
POST /api/v1/transactions
Content-Type: application/json

{
  "eventId": "event_123",
  "ticketId": "ticket_456",
  "customerEmail": "customer@example.com",
  "customerName": "John Doe",
  "quantity": 2,
  "paymentMethod": "telebirr"
}
```

## Status Codes

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

