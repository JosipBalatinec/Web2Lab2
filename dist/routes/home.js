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
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
let xssEnabled = false;
let sdeEnabled = false;
let username = "";
let password = "";
router.get("/", (req, res) => {
    const message = req.query.message || '';
    res.render("home", {
        xssEnabled,
        message,
        sdeEnabled,
        username,
        password
    });
});
router.post('/xssToggle', (req, res) => {
    xssEnabled = req.body.xss === 'on';
    res.redirect('/home');
});
router.post('/sdeToggle', (req, res) => {
    sdeEnabled = req.body.sde === 'on';
    res.redirect('/home');
});
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pass } = req.body;
    if (!sdeEnabled) {
        const hashed = yield bcrypt_1.default.hash(pass, 10);
        username = user;
        password = hashed;
    }
    else {
        username = user;
        password = pass;
    }
    res.redirect("/home");
}));
exports.default = router;
