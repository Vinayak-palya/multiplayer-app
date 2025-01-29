import {Router} from "express";
import {
  sendChat,
  getChat,
  editChat,
  deleteChat,
} from "../controllers/chat.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.post("/send", upload.none(), sendChat);
router.get("/:roomId", upload.none(), getChat);
router.put("/edit/:messageId", upload.none(), editChat);
router.delete("/delete/:messageId", upload.none(),deleteChat);

export default router;