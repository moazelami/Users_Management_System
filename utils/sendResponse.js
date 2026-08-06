let sendResponse = function (res , statusCode ,success, message, data = null) {
    res.writeHead(statusCode, {'Content-Type': 'application/json'});
    const response = {
        success,
        message,
    };

    if (data !== null) {
        response.data = data;
    }
    res.end(JSON.stringify(response));
}

module.exports = sendResponse;