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

/* 
 * Regular expressions for email, password, full name, and message validation.
 */
export const regex_validation = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

// Get frontend url
export const frontendUrl = () => {
    return process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_CLIENT_URL : process.env.DEVELOPMENT_CLIENT_URL;
}
