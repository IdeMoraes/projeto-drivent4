import { prisma } from "@/config";

async function findById(id: number) {
  return prisma.room.findFirst({
    where: {
      id
    }
  });
}
const roomRepository = {
  findById
};
export default roomRepository;
