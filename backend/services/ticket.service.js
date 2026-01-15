import { PRIORITY, STATUS } from '../utils/constants.js';

// Array to store tickets
let tickets = [];
// Counter for ticket IDs
let nextId = 1;

/**
 * Retrieves all tickets with optional filters.
 * @param {Object} filters - An object containing status and/or priority filters.
 * 
 * @returns {Array} An array of tickets sorted by creation time in descending order.
 */
export const getTickets = (filters = {}) => {
    let data = [...tickets];

    if (filters.status) {
        data = data.filter(t => t.status === filters.status);
    }

    if (filters.priority) {
        data = data.filter(t => t.priority === filters.priority);
    }

    return data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
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
