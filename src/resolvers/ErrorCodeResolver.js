function resolveHttpError(code) {
    const errorMap = {
        400: {
            brief: "Bad Request",
            detail: "The server could not understand the request due to invalid syntax."
        },
        401: {
            brief: "Unauthorized",
            detail: "The client must authenticate itself to get the requested response."
        },
        403: {
            brief: "Forbidden",
            detail: "The client does not have access rights to the content."
        },
        404: {
            brief: "Not Found",
            detail: "The server can not find the requested resource."
        },
        500: {
            brief: "Internal Server Error",
            detail: "The server has encountered a situation it doesn't know how to handle."
        },
        502: {
            brief: "Bad Gateway",
            detail: "The server, while acting as a gateway or proxy, received an invalid response from the upstream server."
        },
        503: {
            brief: "Service Unavailable",
            detail: "The server is not ready to handle the request. Common causes include server maintenance or overload."
        },
        504: {
            brief: "Gateway Timeout",
            detail: "The server, while acting as a gateway or proxy, did not get a response in time from the upstream server."
        }
        // Add more error codes as needed
    };

    if (errorMap[code]) {
        return {
            errorCode: code,
            briefDescription: errorMap[code].brief,
            detailDescription: errorMap[code].detail
        };
    } else {
        return {
            errorCode: code,
            briefDescription: "Unknown Error",
            detailDescription: "An unknown error occurred. Please consult the website owner for more details."
        };
    }
}

export default resolveHttpError;
