import useMaster from "../hooks/useMaster";
import { FaSyncAlt } from "react-icons/fa";

const Filters = ({ filters, onChange }) => {
    const { statuses, priorities } = useMaster();

    const resetFilters = () => {
        onChange({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        onChange({
            ...filters,
            [name]: value || undefined // remove filter when empty
        });
    };

    return (
        <div className="mb-4">
            {/* <h4>Filter Tickets</h4>  */}
            <div className="row g-3">
                <div className="col-md-2">
                    {/* <label className="form-label">Status</label> */}
                    <select
                        className="form-select"
                        value={filters.status || ""}
                        onChange={e => onChange({ ...filters, status: e.target.value })}
                    >
                        <option value="">All Status</option>
                        {
                            statuses.map(s => (
                                <option key={s.value} value={s.value}>
                                    {s.label}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="col-md-2">
                    {/* <label className="form-label">Priority</label> */}
                    <select
                        className="form-select"
                        value={filters.priority || ""}
                        onChange={e => onChange({ ...filters, priority: e.target.value })}
                    >
                        <option value="">All Priority</option>
                        {
                            priorities.map(p => (
                                <option key={p.value} value={p.value}>
                                    {p.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-md-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={resetFilters}
                        title="Reset Filters"
                    >
                        <FaSyncAlt />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filters
