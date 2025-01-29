import { Router } from "express";
import {upload} from "../middleware/multer.middleware.js"
import {verifyJWT} from "../middleware/auth.middleware.js"
import { loginUser, registerUser, googleLogin, googleCallback, refreshAccessToken, changeCurrentPassword, getCurrentUser, logoutUser} from "../controllers/user.controller.js"
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
    ]),
    registerUser

);

router.route("/login").post(upload.none(), loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(upload.none(), verifyJWT, changeCurrentPassword);
router.route("/current-user").get(upload.none(), verifyJWT, getCurrentUser);
router.route("/refresh-token").post(upload.none(), refreshAccessToken);
router.get("/auth/google", googleLogin);
router.get("/google/callback", googleCallback);
export default router;