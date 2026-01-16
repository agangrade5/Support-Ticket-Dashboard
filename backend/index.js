import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();

import { ticketRoutes, masterRoutes } from './routes/index.js';
// Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { frontendUrl } from './utils/constants.js';
import { seedTickets, simulateChanges } from './utils/ticket.seed.js';

const app = express();

// Middleware & Body parser
app.use(express.json({ extended: true, limit: '50mb' })); // For parsing application/json
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // For parsing application/x-www-form-urlencoded

// CORS config for development
app.use(cors(
    {
        credentials: true, 
        origin: frontendUrl(), 
    }
)); // For development

// Routes
// test api route
app.get(`/api/${process.env.API_VERSION}/test`, (req, res) => {
    res.send(`Hello ${process.env.APP_NAME} API! This is a testing route.`);
});
// Ticket routes
app.use(`/api/${process.env.API_VERSION}/tickets`, ticketRoutes);
// Master routes
app.use(`/api/${process.env.API_VERSION}/master`, masterRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Initialize
seedTickets();
// Start simulation
simulateChanges();

// Server start
const hostname = '0.0.0.0'; // Always listen on all network interfaces (production-safe)
const port = process.env.PORT || 3001;
app.listen(port, hostname, () => {
    console.log(`Server is running on port: ${port}`);
});
