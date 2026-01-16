import { updateTicket } from "../services/ticket.service";
import useMaster from "../hooks/useMaster";

const TicketRow = ({ ticket, onUpdate }) => {
    const { statuses, priorities } = useMaster();

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
                    {
                        priorities.map(p => (
                            <option key={p.value} value={p.value}>
                                {p.label}
                            </option>
                        ))
                    }
                </select>
            </td>

            <td>
                <select
                    className="form-select form-select-sm"
                    value={ticket.status}
                    onChange={e => handleChange("status", e.target.value)}
                >
                    {
                        statuses.map(s => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))
                    }
                </select>
            </td>

            <td>
                {new Date(ticket.createdAt).toLocaleString()}
            </td>
        </tr>
    );
}

export default TicketRow
