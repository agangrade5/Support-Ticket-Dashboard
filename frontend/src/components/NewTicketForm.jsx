import { useState } from "react";
import { createTicket } from "../services/ticket.service";
import useMaster from "../hooks/useMaster";

const NewTicketForm = ({ onCreate }) => {
    const { priorities, loading: masterLoading } = useMaster();

    const [form, setForm] = useState({
        title: "",
        customer: "",
        priority: ""
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const res = await createTicket(form);

            setSuccess(res.message);
            setForm({ title: "", customer: "", priority: "" });

            onCreate();

            // Auto-hide success message
            setTimeout(() => setSuccess(""), 3000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (masterLoading) return <p>Loading form...</p>;

    return (
        <div className="mb-4">
            {/* <h4>Create Ticket</h4> */}

            {success && (
                <div className="alert alert-success alert-dismissible fade show">
                    {success}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setSuccess("")}
                    ></button>
                </div>
            )}

            {error && (
                <div className="alert alert-danger alert-dismissible fade show">
                    {error}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError("")}
                    ></button>
                </div>
            )}

            <form onSubmit={submit} className="row g-3 align-items-end">
                <div className="col-md-4">
                    {/* <label className="form-label">Title</label> */}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter ticket title"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-4">
                    {/* <label className="form-label">Customer</label> */}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter customer name"
                        value={form.customer}
                        onChange={e => setForm({ ...form, customer: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-2">
                    {/* <label className="form-label">Priority</label> */}
                    <select
                        className="form-select"
                        value={form.priority}
                        onChange={e => setForm({ ...form, priority: e.target.value })}
                        required
                    >
                        <option value="">Select Priority</option>
                        {
                            priorities.map(p => (
                                <option key={p.value} value={p.value}>
                                    {p.label}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="col-md-2 d-grid">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Ticket"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewTicketForm;
