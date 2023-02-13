import { notFoundError } from "@/errors";
import { cannotBookingError } from "@/errors/cannot-booking-error";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import roomRepository from "@/repositories/room-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) {throw notFoundError;}
  const booking = await bookingRepository.findByUserId(userId);
  if(!booking) {throw notFoundError;}
  return booking;
}
async function postBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) {throw notFoundError;}
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if(!ticket||ticket.status==="RESERVED"||ticket.TicketType.isRemote||!ticket.TicketType.includesHotel) {
    throw notFoundError;
  }
  const room = await roomRepository.findById(roomId);
  const bookings = await bookingRepository.findByRoomId(roomId);
  if(room.capacity<=bookings.length) {
    throw cannotBookingError();
  }
  return bookingRepository.create({ roomId, userId });
}
const bookingService = {
  getBooking,
  postBooking
};
export default bookingService;
