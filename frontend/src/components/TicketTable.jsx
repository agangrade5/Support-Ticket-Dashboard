import TicketRow from "./TicketRow";

const TicketTable = ({ tickets, onUpdate }) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Customer</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No tickets found
                            </td>
                        </tr>
                    )}

                    {tickets.map(ticket => (
                        <TicketRow
                            key={ticket.id}
                            ticket={ticket}
                            onUpdate={onUpdate}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TicketTable
