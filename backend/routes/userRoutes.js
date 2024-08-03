import express from "express";
import { deleteUser, getAllUsers, getProfile, getUsersOrderData, updateProfile, userPromote } from "../controllers/userController.js";
import protect from "../middleware/protectMiddleware.js";

const router = express.Router();

router.use(protect());

router.route("/").get(getProfile).put(updateProfile);
router.route("/allusers").get(getAllUsers);
router.route("/:id").get(getUsersOrderData).delete(deleteUser).put(userPromote);

export default router;
