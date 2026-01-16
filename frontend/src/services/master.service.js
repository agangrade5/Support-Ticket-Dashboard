const API_URL = `${import.meta.env.VITE_DEVELOPMENT_BACKEND_URL}/master`;

/**
 * Retrieves all ticket statuses from the backend
 * 
 * @returns {Promise<object[]>} - A promise resolving to an array of ticket statuses
 * @throws {Error} - If the backend fails to return the statuses
 */
const getStatuses = async () => {
    const res = await fetch(`${API_URL}/statuses`);
    if (!res.ok) throw new Error("Failed to fetch statuses");
    return res.json();
};

/**
 * Retrieves all ticket priorities from the backend
 * 
 * @returns {Promise<object[]>} - A promise resolving to an array of ticket priorities
 * @throws {Error} - If the backend fails to return the priorities
 */
const getPriorities = async () => {
    const res = await fetch(`${API_URL}/priorities`);
    if (!res.ok) throw new Error("Failed to fetch priorities");
    return res.json();
};

export { getStatuses, getPriorities };
