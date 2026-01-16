import { useState } from "react";
import useTickets from "./hooks/useTickets";
import TicketTable from "./components/TicketTable";
import NewTicketForm from "./components/NewTicketForm";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";

const App = () => {
    const [filters, setFilters] = useState({});
    const {
        tickets,
        loading,
        error,
        pagination,
        setPage,
        reload
    } = useTickets(filters);

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center">Support Ticket Dashboard</h2>

            <div className="card mb-3">
                <div className="card-body">
                    <NewTicketForm onCreate={reload} />
                </div>
            </div>

            {/* <div className="card mb-3">
                <div className="card-body">
                    <Filters filters={filters} onChange={setFilters} />
                </div>
            </div> */}

            {loading && <div className="alert alert-info">Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card">
                <div className="card-body">
                    <Filters filters={filters} onChange={setFilters} />
                    <TicketTable tickets={tickets} onUpdate={reload} />
                    <Pagination
                        page={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default App
