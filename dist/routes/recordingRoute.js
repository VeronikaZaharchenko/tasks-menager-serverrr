"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recordingRequest_1 = __importDefault(require("../requests/recordingRequest"));
const router = express_1.default.Router();
router.post('/', recordingRequest_1.default.update);
exports.default = router;
