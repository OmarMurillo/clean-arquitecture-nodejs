"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_connection_1 = require("./utils/mongo.connection");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/routes");
const data_source_connection_1 = __importDefault(require("./domain/db/data-source.connection"));
dotenv_1.default.config();
// CREATE SERVER
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('*', (0, cors_1.default)());
app.use(routes_1.routes);
function assertDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield data_source_connection_1.default.authenticate();
            yield data_source_connection_1.default.sync();
            console.log("CONNECTED TO MYSQL");
        }
        catch (error) {
        }
    });
}
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    // START EXPRESS SERVER
    yield assertDatabaseConnection();
    app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, mongo_connection_1.connectDB)();
        console.log(`[server]: Server is running at http://localhost:${port}`);
    }));
});
start();
