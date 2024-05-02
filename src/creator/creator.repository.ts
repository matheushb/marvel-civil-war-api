import { Prisma, PrismaClient } from "@prisma/client";
import { CreateCreatorDto } from "./dto/create-creator.dto";
import { UpdateCreatorDto } from "./dto/update-creator.dto";

const prisma = new PrismaClient();

const CREATOR_SELECT_FIELDS = {
  id: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as Prisma.CreatorSelect;

export class CreatorRepository {
  constructor() {}

  async create(createCreatorDto: CreateCreatorDto) {
    return prisma.creator.create({
      data: {
        ...createCreatorDto,
      },
      select: CREATOR_SELECT_FIELDS,
    });
  }

  async findAll() {
    return prisma.creator.findMany({
      select: CREATOR_SELECT_FIELDS,
    });
  }

  async findOne(id: string) {
    return prisma.creator.findUnique({
      where: {
        id,
      },
      select: CREATOR_SELECT_FIELDS,
    });
  }

  async update(id: string, updateCreatorDto: UpdateCreatorDto) {
    return prisma.creator.update({
      where: {
        id,
      },
      data: {
        ...updateCreatorDto,
      },
      select: CREATOR_SELECT_FIELDS,
    });
  }

  async remove(id: string) {
    return prisma.creator.delete({
      where: {
        id,
      },
      select: CREATOR_SELECT_FIELDS,
    });
  }
}
