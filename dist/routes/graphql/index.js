"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//Loads on /graphql route
router.get("/", (rq, rs, next) => {
    //By now lets Apollo default middleware to be called on /graphql route
    next();
});
exports.default = router;
//# sourceMappingURL=index.js.map