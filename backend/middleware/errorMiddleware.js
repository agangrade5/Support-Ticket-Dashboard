import HttpResponse from "../utils/httpResponse.js";

export const notFound = (req, res, next) => {
    return HttpResponse.notFound(res, `Not Found - ${req.originalUrl}`, 404);
};

export const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    const statusCode = error.statusCode || error.code || 500;
    const message = error.message || "Something went wrong";

    return HttpResponse.error(res, message, statusCode);
};
