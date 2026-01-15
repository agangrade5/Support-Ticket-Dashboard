class HttpResponse {
    
    // normal success
    static success(res, message = "Success", data = {}, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    // json success
    static jsonSuccess(message = "Success", data = {}, statusCode = 200) {
        return {
            success: true,
            message,
            data,
            statusCode
        };
    }

    // json error
    static jsonError(message = "Something went wrong", statusCode = 500, errors = null) {
        const response = {
            success: false,
            message,
            statusCode
        };
        if (errors) response.errors = errors;
        return response;
    }

    // error
    static error(res, message = "Something went wrong", statusCode = 500, errors = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            ...(errors ? { errors } : {})   // include errors only if passed
        });
    }

    // validation
    static validation(res, message = "Validation failed", statusCode = 400, errors = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            ...(errors ? { errors } : {})   // include errors only if passed
        });
    }

    // unauthorized
    static unauthorized(res, message = "Unauthorized", statusCode = 401) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }

    // not found
    static notFound(res, message = "Resource not found", statusCode = 404) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }

    // server error
    static serverError(res, message = "Internal server error", statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }
}

export default HttpResponse;
