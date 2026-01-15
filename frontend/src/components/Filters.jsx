const Filters = ({ filters, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;

        onChange({
            ...filters,
            [name]: value || undefined // remove filter when empty
        });
    };

    return (
        <div className="mb-4">
            <h4>Filter Tickets</h4> {/* Heading added */}
            <div className="row g-3">
                <div className="col-md-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={filters.status || ""}
                        onChange={e => onChange({ ...filters, status: e.target.value })}
                    >
                        <option value="">All</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <label className="form-label">Priority</label>
                    <select
                        className="form-select"
                        value={filters.priority || ""}
                        onChange={e => onChange({ ...filters, priority: e.target.value })}
                    >
                        <option value="">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Filters
