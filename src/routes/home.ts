import express, {Request, Response, Router} from 'express';
import bcrypt from 'bcrypt';

const router: Router = express.Router();
let xssEnabled = false;
let sdeEnabled = false;

let username: string = "";
let password: string = "";

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
        const hashed = await bcrypt.hash(pass, 10);
        username = user;
        password = hashed;
    } else {
        username = user;
        password = pass;
    }

    res.redirect("/home");
});

export default router;
