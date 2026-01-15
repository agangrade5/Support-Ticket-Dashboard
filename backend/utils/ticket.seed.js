import { createTicket, updateTicket, tickets } from "../services/ticket.service.js";
import { PRIORITY, STATUS } from '../utils/constants.js';

// Counter for ticket IDs
let seedId = 1;

/**
 * Seed initial tickets on server start
 */
export const seedTickets = () => {
    const customers = [
        'Acme Corp',
        'TechStart Inc',
        'Global Solutions',
        'DataPro Ltd',
        'CloudNine Co'
    ];

    const titles = [
        'Login issues on mobile app',
        'Payment gateway timeout',
        'Dashboard not loading',
        'API rate limit exceeded',
        'Email notifications delayed',
        'Database connection errors',
        'Export feature broken',
        'Search functionality slow',
        'User profile update failing',
        'Report generation error'
    ];

    for (let i = 0; i < 10; i++) {
        createTicket({
            id: seedId++,
            title: titles[i],
            customer: customers[Math.floor(Math.random() * customers.length)],
            priority: Object.values(PRIORITY)[Math.floor(Math.random() * 3)],
            status: Object.values(STATUS)[Math.floor(Math.random() * 3)],
            createdAt: new Date(
                Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
            ).toISOString()
        });
    }

    console.log(`Seeded ${tickets.length} tickets`);
};

/**
 * Auto-change simulation
 * Creates or updates tickets every 20–30 seconds
 */
export const simulateChanges = () => {
    const delay = 20000 + Math.random() * 10000; // 20–30 sec

    setTimeout(() => {
        const action = Math.random() > 0.5 ? 'create' : 'update';

        if (action === 'create') {
            const titles = [
                'System performance degraded',
                'File upload not working',
                'Password reset broken',
                'Mobile app crashes',
                'Integration sync failed'
            ];

            const customers = [
                'Beta Systems',
                'Alpha Corp',
                'Omega Ltd',
                'Delta Inc'
            ];

            const newTicket = createTicket({
                id: seedId++,
                title: titles[Math.floor(Math.random() * titles.length)],
                customer: customers[Math.floor(Math.random() * customers.length)],
                priority: Object.values(PRIORITY)[Math.floor(Math.random() * 3)],
                status: STATUS.OPEN,
                createdAt: new Date().toISOString()
            });

            console.log('Auto-created ticket:', newTicket.id);
        } else if (tickets.length > 0) {

            const randomTicket = tickets[Math.floor(Math.random() * tickets.length)];

            updateTicket(randomTicket.id, {
                status: Object.values(STATUS)[Math.floor(Math.random() * 3)]
            });

            console.log('Auto-updated ticket:', randomTicket.id);
        }

        simulateChanges(); // recursive scheduling
    }, delay);
};
