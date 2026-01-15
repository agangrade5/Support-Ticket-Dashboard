import { useState } from "react";
import { createTicket } from "../services/ticketApi";

const NewTicketForm = ({ onCreate }) => {
    const [form, setForm] = useState({
        title: "",
        customer: "",
        priority: "low"
    });

    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createTicket(form);
            setForm({ title: "", customer: "", priority: "low" });
            onCreate();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4">
            <h4>Create Ticket</h4> {/* Heading added */}
            <form onSubmit={submit} className="row g-3 align-items-end">
                <div className="col-md-4">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter issue title"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Customer</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Customer name"
                        value={form.customer}
                        onChange={e => setForm({ ...form, customer: e.target.value })}
                        required
                    />
                </div>

                <div className="col-md-2">
                    <label className="form-label">Priority</label>
                    <select
                        className="form-select"
                        value={form.priority}
                        onChange={e => setForm({ ...form, priority: e.target.value })}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
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
