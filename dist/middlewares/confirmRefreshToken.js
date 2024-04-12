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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_config_json_1 = require("./../config/server.config.json");
const database_1 = require("../database");
function confirmRefreshToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = yield jsonwebtoken_1.default.verify(refreshToken, server_config_json_1.refresh_token.secret_key);
            const user = yield database_1.db.query('SELECT * FROM users WHERE refresh_id=$1', [
                payload.id
            ]);
            return user[0];
        }
        catch (e) {
            throw Error('Токен не валидный');
        }
    });
}
exports.default = confirmRefreshToken;
