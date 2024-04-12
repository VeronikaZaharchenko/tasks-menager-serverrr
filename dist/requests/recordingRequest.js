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
exports.RecordingRequest = void 0;
const confirmRefreshToken_1 = __importDefault(require("../middlewares/confirmRefreshToken"));
const ganerates_1 = require("../utils/ganerates");
const uuid_1 = require("uuid");
const server_config_json_1 = require("../config/server.config.json");
const database_1 = require("../database");
class RecordingRequest {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.refreshToken) {
                try {
                    const user = yield (0, confirmRefreshToken_1.default)(req.body.refreshToken);
                    const accessToken = (0, ganerates_1.generateAccessToken)(user.id, user.login);
                    const refreshId = (0, uuid_1.v4)();
                    const refreshToken = (0, ganerates_1.generateRefreshToken)(refreshId);
                    try {
                        yield database_1.db.query("UPDATE users SET refresh_id=$1 WHERE login=$2", [
                            refreshId,
                            user.login
                        ]);
                        res.status(200).json({ message: 'Токен обновлён',
                            accessToken,
                            refreshToken,
                            access_expiresIn: server_config_json_1.access_token.time,
                            access_createDate: new Date().getTime()
                        });
                    }
                    catch (e) {
                        res.status(500).json({ message: "Ошибка сервера" });
                    }
                }
                catch (e) {
                    res.status(403).json({ message: "Токен не валидный" });
                }
            }
            else {
                res.status(400).json({ message: "Нет данных" });
            }
        });
    }
}
exports.RecordingRequest = RecordingRequest;
exports.default = new RecordingRequest();
