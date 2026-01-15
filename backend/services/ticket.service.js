import { PRIORITY, STATUS } from '../utils/constants.js';

// Array to store tickets
let tickets = [];
// Counter for ticket IDs
let nextId = 1;

/**
 * Retrieves tickets based on filters and pagination options
 * 
 * @param {Object} filters - Optional filters to apply to the tickets
 * @param {Object} options - Optional pagination options
 * @property {string} [filters.status] - Filter tickets by status (open, in_progress, resolved)
 * @property {string} [filters.priority] - Filter tickets by priority (low, medium, high)
 * @property {number} [options.page] - Page number to retrieve (d   efault: 1)
 * @property {number} [options.limit] - Number of tickets to retrieve per page (default: 10)
 * @returns {Object} - An object containing the filtered tickets and pagination details
 * @returns {Object.data} - An array of tickets
 * 
 * @returns {Object.pagination} - An object containing pagination details (total, page, limit, totalPages)
 */
export const getTickets = (filters = {}, options = {}) => {
    let data = [...tickets];

    // Filters
    if (filters.status) {
        data = data.filter(t => t.status === filters.status);
    }

    if (filters.priority) {
        data = data.filter(t => t.priority === filters.priority);
    }

    // Sort newest first
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
        data: data.slice(start, end),
        pagination: {
            total: data.length,
            page,
            limit,
            totalPages: Math.ceil(data.length / limit)
        }
    };
};


/**
 * Creates a new ticket with the given title, customer and priority.
 * @param {Object} ticketData - Object containing title, customer and priority.
 * 
 * @returns {Object} The newly created ticket.
 */
export const createTicket = ({ title, customer, priority }) => {
    const ticket = {
        id: nextId++,
        title,
        customer,
        priority,
        status: STATUS.OPEN,
        createdAt: new Date().toISOString()
    };

    tickets.push(ticket);
    return ticket;
};

/**
 * Updates a ticket with the given id.
 * @param {number} id - The id of the ticket to update.
 * @param {object} updates - An object containing the fields to update.
 * 
 * @returns {object|null} The updated ticket, or null if not found.
 */
export const updateTicket = (id, updates) => {
    const ticketId = Number(id);

    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return null;

    if (updates.status) ticket.status = updates.status;
    if (updates.priority) ticket.priority = updates.priority;

    return ticket;
};

export { tickets };
