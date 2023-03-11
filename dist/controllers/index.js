"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
// Define middleware to serve the index.html file
const serveIndexHtml = (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
};
exports.default = serveIndexHtml;
//# sourceMappingURL=index.js.map