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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class TasksRequest {
    addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (req.body.title && typeof req.body.done === "boolean" && ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                try {
                    yield database_1.db.query("INSERT INTO tasks (title, done, user_id) VALUES ($1, $2, $3)", [
                        req.body.title,
                        req.body.done,
                        req.user.id
                    ]);
                    res.status(200).json({ message: 'Задача добавлена' });
                }
                catch (e) {
                    console.log('Ошибка на сервере:', e.message);
                    res.status(500).json({ message: 'Ошибка сервера' });
                }
            }
            else {
                res.status(400).json({ message: 'Нет данных' });
            }
        });
    }
    deleteTaskOrTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.id) {
                try {
                    yield database_1.db.query("DELETE FROM tasks WHERE id=$1", [+req.query.id]);
                    res.status(200).json({ message: 'Задача удалена' });
                }
                catch (e) {
                    console.log('Ошибка на сервере:', e.message);
                    res.status(500).json({ message: 'Ошибка сервера' });
                }
            }
            else {
                try {
                    yield database_1.db.query("DELETE FROM tasks");
                    res.status(200).json({ message: 'Задачи удалены' });
                }
                catch (e) {
                    console.log('Ошибка на сервере:', e.message);
                    res.status(500).json({ message: 'Ошибка сервера' });
                }
            }
        });
    }
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                try {
                    const tasks = yield database_1.db.query("SELECT * FROM tasks WHERE user_id=$1", [req.user.id]);
                    const data = tasks;
                    res.status(200).json(data);
                }
                catch (e) {
                    console.log('Ошибка на сервере:', e.message);
                    res.status(500).json({ message: 'Ошибка сервера' });
                }
            }
            else {
                res.status(500).json({ message: 'Ошибка сервера' });
            }
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.id && typeof req.body.done === "boolean") {
                try {
                    yield database_1.db.query("UPDATE tasks SET done=$1 WHERE id=$2", [req.body.done, req.body.id]);
                    res.status(200).json({ message: 'Задача обновлена' });
                }
                catch (e) {
                    console.log('Ошибка на сервере:', e.message);
                    res.status(500).json({ message: 'Ошибка сервера' });
                }
            }
            else {
                res.status(400).json({ message: 'Нет данных' });
            }
        });
    }
}
exports.default = new TasksRequest();
