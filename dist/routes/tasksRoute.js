"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const confirmAccessToken_1 = __importDefault(require("../middlewares/confirmAccessToken"));
const tasksRequest_1 = __importDefault(require("../requests/tasksRequest"));
const router = express_1.default.Router();
router.get('/', confirmAccessToken_1.default, tasksRequest_1.default.getTasks);
router.post('/', confirmAccessToken_1.default, tasksRequest_1.default.addTask);
router.put('/', confirmAccessToken_1.default, tasksRequest_1.default.updateTask);
router.delete('/', confirmAccessToken_1.default, tasksRequest_1.default.deleteTaskOrTasks);
exports.default = router;
