import { prisma } from "@/config";

export function createBooking({ roomId, userId }: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });
}
type CreateBookingParams = {
    roomId: number,
    userId: number
}
