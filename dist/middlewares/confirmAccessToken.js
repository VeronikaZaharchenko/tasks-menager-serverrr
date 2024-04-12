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
function confirmAccessToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (req.method === 'OPTIONS') {
            next();
        }
        const token = ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
        if (!token) {
            console.log('Токен не найденный в заголовках');
            res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        try {
            const payload = yield jsonwebtoken_1.default.verify(token, server_config_json_1.access_token.secret_key);
            try {
                const user = yield database_1.db.query('SELECT * FROM users WHERE id=$1 AND login=$2', [
                    payload.id,
                    payload.login
                ]);
                req.user = user[0];
                next();
            }
            catch (e) {
                console.log(e);
                res.status(403).json({ message: 'Пользователь не авторизован' });
            }
        }
        catch (e) {
            console.log(e);
            res.status(403).json({ message: "Пользователь не авторизован" });
        }
    });
}
exports.default = confirmAccessToken;
