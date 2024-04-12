"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_config_json_1 = require("./../config/server.config.json");
const generateAccessToken = (id, login) => {
    const payload = {
        id,
        login
    };
    return jsonwebtoken_1.default.sign(payload, server_config_json_1.access_token.secret_key, { expiresIn: server_config_json_1.access_token.time });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = id => {
    const payload = {
        id,
    };
    return jsonwebtoken_1.default.sign(payload, server_config_json_1.refresh_token.secret_key, { expiresIn: server_config_json_1.refresh_token.time });
};
exports.generateRefreshToken = generateRefreshToken;
