import { updateTicket } from "../services/ticketApi";

const TicketRow = ({ ticket, onUpdate }) => {
    const handleChange = async (field, value) => {
        await updateTicket(ticket.id, { [field]: value });
        onUpdate();
    };

    return (
        <tr>
            <td>{ticket.title}</td>
            <td>{ticket.customer}</td>

            <td>
                <select
                    className="form-select form-select-sm"
                    value={ticket.priority}
                    onChange={e => handleChange("priority", e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </td>

            <td>
                <select
                    className="form-select form-select-sm"
                    value={ticket.status}
                    onChange={e => handleChange("status", e.target.value)}
                >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                </select>
            </td>

            <td>
                {new Date(ticket.createdAt).toLocaleString()}
            </td>
        </tr>
    );
}

export default TicketRow
