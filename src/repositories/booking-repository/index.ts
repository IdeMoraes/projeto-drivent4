import { prisma } from "@/config";
import { Booking } from "@prisma/client";

async function create({ roomId, userId }: CreateBookingParams): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId,
      userId
    }
  });
}
async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId
    }
  });
}
async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    }
  });
}
type CreateBookingParams = Omit<Booking, "id"|"createdAt"|"updatedAt">
const bookingRepository = {
  create,
  findByRoomId,
  findByUserId,
};
export default bookingRepository;
