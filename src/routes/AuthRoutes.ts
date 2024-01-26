import { Router } from "express";
import { loginController,signupController} from "../controller/authController"

const router = Router()

router.route("/login").post(loginController)
router.route("/signup").post(signupController)

export default router