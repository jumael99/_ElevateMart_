import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.route('/').get(getProfile).put(updateProfile);

export default router;
