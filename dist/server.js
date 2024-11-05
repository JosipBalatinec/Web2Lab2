"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const home_1 = __importDefault(require("./routes/home"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.set("views", path_1.default.join(__dirname, '../views'));
app.set("view engine", "ejs");
app.use('/scripts', express_1.default.static(path_1.default.join(__dirname, '/scripts')));
app.use('/styles', express_1.default.static(path_1.default.join(__dirname, '../styles')));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/home', home_1.default);
app.get('/', (req, res) => {
    res.redirect('/home');
});
app.listen(3000, () => {
});
