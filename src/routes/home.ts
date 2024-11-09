import express, {Request, Response, Router} from 'express';
import bcryptjs from 'bcryptjs';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const router: Router = express.Router();
let xssEnabled = false;
let sdeEnabled = false;

let username: string = "";
let password: string = "";

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 5432,
    ssl: true
});

pool.connect()
    .then(() => console.log("Spojena baza."))
    .catch(err => console.error("Greška: ", err));

router.get("/", (req: Request, res: Response) => {
    const message = req.query.message || '';

    res.render("home", { 
        xssEnabled,
        message,
        sdeEnabled,
        username,
        password
    });
});

router.post('/xssToggle', (req: Request, res: Response) => {
    xssEnabled = req.body.xss === 'on';
    res.redirect('/home');
});

router.post('/sdeToggle', (req: Request, res: Response) => {
    sdeEnabled = req.body.sde === 'on';
    res.redirect('/home');
});

router.post('/login', async(req: Request, res: Response) => {
    const {user, pass} = req.body;

    if (!sdeEnabled) {
        const hashed = await bcryptjs.hash(pass, 10);
        username = user;
        password = hashed;

        try {
            await pool.query(
                'INSERT INTO tablica (username, password) VALUES ($1, $2)',
                [user, hashed]
            );
        } catch (error) {
            console.error("Greška:", error);
        }
    } else {
        username = user;
        password = pass;
        try {
            await pool.query(
                'INSERT INTO tablica (username, password) VALUES ($1, $2)',
                [user, pass]
            );
        } catch (error) {
            console.error("Greška:", error);
        }
    }

    res.redirect("/home");
});

export default router;
