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
exports.serverStart = void 0;
const server_config_json_1 = __importDefault(require("./server.config.json"));
const host = server_config_json_1.default.host;
const port = process.env.PORT || server_config_json_1.default.port.toString();
const serverStart = (app, db) => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(+port, host, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield db.connect();
            console.log('connected database');
        }
        catch (e) {
            console.log('not connected database', e);
        }
        console.log('server listening on port ' + port);
    }));
});
exports.serverStart = serverStart;
