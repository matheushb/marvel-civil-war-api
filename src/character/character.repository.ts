import { Prisma, PrismaClient } from "@prisma/client";
import { CreateCharacterDto } from "./dto/create-character.dto";
import { UpdateCharacterDto } from "./dto/update-character.dto";

const prisma = new PrismaClient();

const CHARACTER_SELECT_FIELDS = {
  id: true,
  name: true,
  thumbnail: true,
  description: true,
  createdAt: true,
  updatedAt: true,
} as Prisma.CharacterSelect;

export class CharacterRepository {
  constructor() {}

  async create(createCharacterDto: CreateCharacterDto) {
    return prisma.character.create({
      data: {
        ...createCharacterDto,
      },
      select: CHARACTER_SELECT_FIELDS,
    });
  }

  async findAll() {
    return prisma.character.findMany({
      select: CHARACTER_SELECT_FIELDS,
    });
  }

  async findOne(id: string) {
    return prisma.character.findUnique({
      where: {
        id,
      },
      select: CHARACTER_SELECT_FIELDS,
    });
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return prisma.character.update({
      where: {
        id,
      },
      data: {
        ...updateCharacterDto,
      },
      select: CHARACTER_SELECT_FIELDS,
    });
  }

  async remove(id: string) {
    return prisma.character.delete({
      where: {
        id,
      },
      select: CHARACTER_SELECT_FIELDS,
    });
  }
}
