const API_URL = `${import.meta.env.VITE_DEVELOPMENT_BACKEND_URL}/tickets`;

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

const createTicket = async (data) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to create ticket");
    return res.json();
};

const updateTicket = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update ticket");
    return res.json();
};

export { API_URL, fetchTickets, createTicket, updateTicket };
