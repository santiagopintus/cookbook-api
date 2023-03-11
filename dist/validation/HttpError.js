"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
const handleError = (err, objectName) => {
    if (err.code == "11000") {
        return new HttpError(`Could not create the ${objectName} since it already exists!`, 400);
    }
    else {
        return err;
    }
};
exports.handleError = handleError;
//# sourceMappingURL=HttpError.js.map