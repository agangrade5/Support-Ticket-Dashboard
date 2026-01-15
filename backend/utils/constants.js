import dotenv from "dotenv";
dotenv.config();

// Ticket priority and status
export const PRIORITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
};
export const STATUS = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved'
};

// Get frontend url
export const frontendUrl = () => {
    return process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_CLIENT_URL : process.env.DEVELOPMENT_CLIENT_URL;
}
