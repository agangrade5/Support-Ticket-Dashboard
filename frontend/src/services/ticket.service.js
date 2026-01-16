const API_URL = `${import.meta.env.VITE_DEVELOPMENT_BACKEND_URL}/tickets`;

/**
 * Retrieves tickets based on filters and pagination options
 * 
 * @param {Object} [filters] - Optional filters to apply to the tickets
 * @param {number} [page=1] - Page number to retrieve (default: 1)
 * @param {number} [limit=10] - Number of tickets to retrieve per page (default: 10)
 * 
 * @returns {Promise<Object>} - An object containing the filtered tickets and pagination details
 * @returns {Object.data} - An array of tickets
 * 
 * @returns {Object.pagination} - An object containing pagination details (total, page, limit, totalPages)
 * @throws {Error} - If the request fails
 */
const fetchTickets = async (filters = {}, page = 1, limit = 10) => {
    const params = new URLSearchParams({
        ...filters,
        page,
        limit
    });
    const res = await fetch(`${API_URL}?${params}`);
    if (!res.ok) throw new Error("Failed to fetch tickets");
    return res.json();
};

/**
 * Creates a new ticket with the given data.
 * 
 * @param {Object} data - An object containing the ticket data to create.
 * 
 * @returns {Promise<Object>} - The newly created ticket.
 * @throws {Error} - If the request fails
 */
const createTicket = async (data) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to create ticket");
    return res.json();
};

/**
 * Updates a ticket with the given id and data.
 * 
 * @param {number} id - The id of the ticket to update.
 * @param {Object} data - An object containing the data to update on the ticket.
 * 
 * @returns {Promise<Object>} - The updated ticket.
 * @throws {Error} - If the request fails
 */
const updateTicket = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update ticket");
    return res.json();
};

export { fetchTickets, createTicket, updateTicket };
