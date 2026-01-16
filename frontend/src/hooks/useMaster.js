import { useEffect, useState } from "react";
import { getStatuses, getPriorities } from "../services/master.service";

const useTicketMeta = () => {
    const [statuses, setStatuses] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMeta = async () => {
            try {
                setLoading(true);

                const [statusRes, priorityRes] = await Promise.all([
                    getStatuses(),
                    getPriorities()
                ]);

                setStatuses(statusRes.data);
                setPriorities(priorityRes.data);
                setError("");
            } catch (err) {
                setError("Failed to load ticket metadata");
            } finally {
                setLoading(false);
            }
        };

        loadMeta();
    }, []);

    return { statuses, priorities, loading, error };
};

export default useTicketMeta;
