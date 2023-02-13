import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room
    });
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);
  if (!roomId) { return res.sendStatus(httpStatus.BAD_REQUEST); }
  try {
    const booking = await bookingService.postBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (error) {
    if (error.name === "CannotBookingError") { return res.sendStatus(httpStatus.FORBIDDEN); }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);
  if (!roomId) { return res.sendStatus(httpStatus.BAD_REQUEST); }
  try {
    const booking = await bookingService.postBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: booking.id });
  } catch (error) {
    if (error.name === "CannotBookingError") { return res.sendStatus(httpStatus.FORBIDDEN); }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
