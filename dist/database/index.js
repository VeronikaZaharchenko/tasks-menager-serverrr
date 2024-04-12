"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const connection = {
    "user": "postgres",
    "password": "111",
    "port": 5432,
    "host": "localhost",
    "database": "menager"
};
exports.db = (0, pg_promise_1.default)()(connection);
console.log(Object.assign({}, connection));
