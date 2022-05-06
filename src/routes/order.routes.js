import { Router } from "express";
import { TokenValidation } from "../middlewares/verifyToken";
import { createOrder, readOrder } from "../controllers/order.controlles";
const router = Router();

router.use(TokenValidation);
router.route("/").post(createOrder);
router.route("/:id").get(readOrder);

export default router;
