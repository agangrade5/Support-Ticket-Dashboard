import HttpResponse from "../utils/httpResponse.js";
import { getTickets, createTicket, updateTicket } from "../services/ticket.service.js";
import { PRIORITY, STATUS } from '../utils/constants.js';

class TicketController {

    /**
     * Retrieves all data
     * @route GET
     */
    static async getAll(req, res) {
        try {
            const { status, priority } = req.query;
            const tickets = getTickets({ status, priority });

            return HttpResponse.success(
                res,
                "Tickets retrieved successfully.",
                tickets,
                200
            );
        } catch (error) {
            console.error('Tickets get all Error:', error);
            return HttpResponse.error(res, "Tickets get all Error", 500);
        }
    }

    /**
     * Creates a new ticket
     * @route POST
     */
    static async create(req, res) {
        try {
            const { title, customer, priority } = req.body;

            // Validate required fields
            if (!title || !customer || !priority) {
                return HttpResponse.validation(res, "All fields are required.");
            }

            // Validate priority
            if (!Object.values(PRIORITY).includes(priority)) {
                return HttpResponse.validation(res, "Invalid priority.");
            }

            const ticket = createTicket({ title, customer, priority });

            return HttpResponse.success(
                res, 
                "Ticket created successfully", 
                ticket,
                201
            );
        } catch (error) {
            console.error("Ticket create Error:", error);
            return HttpResponse.error(res, "Ticket create Error", 500);
        }
    }

    /**
     * Updates a ticket
     * @route PUT
     */
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { status, priority } = req.body;

            // Validate required fields
            if (!id) {
                return HttpResponse.validation(res, "Ticket ID is required.");
            }

            // Validate status
            if (status && !Object.values(STATUS).includes(status)) {
                return HttpResponse.validation(res, "Invalid status.");
            }

            // Validate priority
            if ( priority && !Object.values(PRIORITY).includes(priority)) {
                return HttpResponse.validation(res, "Invalid priority.");
            }

            const ticket = updateTicket(id, { status, priority });

            return HttpResponse.success(
                res,
                "Ticket updated successfully.",
                ticket,
                200
            );
        } catch (error) {
            console.error("Ticket update Error:", error);
            return HttpResponse.error(res, "Ticket update Error", 500);
        }
    }
}

export default TicketController;