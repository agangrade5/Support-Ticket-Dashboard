# Real-Time Support Ticket Dashboard

A full-stack application for managing support tickets with automatic real-time updates.

## Features

- **Real-time Updates**: Dashboard updates automatically every 5 seconds via polling
- **Ticket Management**: Create, view, and update support tickets
- **Filtering**: Filter tickets by status and priority
- **Auto-Simulation**: Backend automatically creates or updates tickets every 20-30 seconds

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: React (Vite)
- **Real-time**: Polling (5-second intervals)

## Project Structure

```
support-ticket-dashboard/
├── backend/
│   ├── src/
│   │   └── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## How to Run

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   Test API: http://localhost:3001/api/v1/test
   Tickets API: http://localhost:3001/api/v1/tickets
   The server seeds 10 initial tickets on startup.

### Frontend

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown (typically `http://localhost:5173`)

## API Endpoints

### GET /api/v1/tickets
Returns all tickets, optionally filtered by status and/or priority.

**Query Parameters:**
- `status` (optional): `open`, `in_progress`, or `resolved`
- `priority` (optional): `low`, `medium`, or `high`

### POST /api/v1/tickets
Creates a new ticket.

**Body:**
```json
{
  "title": "Issue description",
  "customer": "Customer name",
  "priority": "low|medium|high"
}
```

### PATCH /api/v1/tickets/:id
Updates an existing ticket.

**Body:**
```json
{
  "status": "open|in_progress|resolved",
  "priority": "low|medium|high"
}
```

### GET /api/v1/master/statuses
Returns all ticket statuses.

### GET /api/v1/master/priorities
Returns all ticket priorities.


## Real-Time Approach: Polling

I chose **polling** for the real-time updates because:

### Pros:
- Simple to implement and understand
- No special server infrastructure required
- Works with any HTTP server
- Easy to debug
- Compatible with all browsers and proxies

### Cons:
- Higher network overhead (requests every 5 seconds)
- Slight delay in updates (up to 5 seconds)
- More server load compared to push-based solutions

## Tradeoffs & TODOs

## Auto-Simulation

The backend automatically simulates ticket activity:
- Every 20-30 seconds, it either creates a new random ticket OR updates an existing ticket
- This demonstrates the real-time update functionality
- Watch the dashboard automatically refresh to show these changes

## Development Notes

- The frontend polls the backend every 5 seconds
- Filters trigger new API calls (server-side filtering)
- Changes via dropdowns immediately call PATCH endpoints
- All state is maintained in-memory (resets on server restart)
- CORS is enabled for local development