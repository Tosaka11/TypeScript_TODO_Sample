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
const body_parser_1 = __importDefault(require("body-parser"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "ty_sample",
    password: "asaPosgre",
    port: 5432,
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/api/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT * FROM todos ORDER BY id ASC");
        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}));
app.post("/api/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const result = yield pool.query("INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *", [title, false]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}));
app.put("/api/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const result = yield pool.query("UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *", [title, completed, id]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}));
app.delete("/api/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield pool.query("DELETE FROM todos WHERE id = $1", [id]);
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}));
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
