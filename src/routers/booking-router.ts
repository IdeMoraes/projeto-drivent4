import { getBooking, postBooking, putBooking } from "@/controllers/booking-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const bookingRouter = Router();
bookingRouter
  .all("/", authenticateToken)
  .get("", getBooking)
  .post("", postBooking)
  .put("/:bookingId", authenticateToken, putBooking);

export { bookingRouter };
