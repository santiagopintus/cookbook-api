"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlayground = void 0;
const loadPlayground = (req, res, next) => {
    /* Checks if there's an existing user */
    if (res.locals.user) {
        next();
    }
};
exports.loadPlayground = loadPlayground;
//# sourceMappingURL=graphql.js.map