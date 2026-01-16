import { useEffect, useState } from "react";
import { fetchTickets } from "../services/ticket.service";

const useTickets = (filters) => {
    const [tickets, setTickets] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        total: 0,
        limit: 10
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadTickets = async (page = pagination.page) => {
        try {
            setLoading(true);

            const res = await fetchTickets(filters, page, pagination.limit);

            setTickets(res.data.data);
            setPagination(res.data.pagination);

            setError("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTickets(1); // reset to page 1 on filter change

        const interval = setInterval(() => {
            loadTickets(pagination.page);
        }, 5000); // polling every 5 sec

        return () => clearInterval(interval);
    }, [filters]);

    return {
        tickets,
        loading,
        error,
        pagination,
        setPage: (page) => loadTickets(page),
        reload: () => loadTickets(pagination.page)
    };
};

export default useTickets;
