"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
}
// Queries with fields not defined in the schema will be rejected.
mongoose_1.default.set("strictQuery", true);
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .catch((err) => console.log(err));
// Export the Mongoose connection object
exports.default = mongoose_1.default.connection;
//# sourceMappingURL=index.js.map