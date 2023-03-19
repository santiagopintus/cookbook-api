"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_openid_connect_1 = require("express-openid-connect");
const router = (0, express_1.Router)();
const graphql_1 = require("../../controllers/graphql");
router.get("/", (0, express_openid_connect_1.requiresAuth)(), graphql_1.loadPlayground);
exports.default = router;
//# sourceMappingURL=index.js.map