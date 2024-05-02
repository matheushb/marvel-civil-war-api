import { Prisma, PrismaClient } from "@prisma/client";
import { CreateCharacterComicDto } from "./dto/character-comic-create.dto";
import { UpdateCharacterComicDto } from "./dto/character-comic-update.dto";

const prisma = new PrismaClient();

const CHARACTER_COMIC_SELECT_FIELDS = {
  id: true,
  characterId: true,
  character: true,
  comicId: true,
  comic: true,
  createdAt: true,
  updatedAt: true,
} as Prisma.CharacterComicSelect;

export class CharacterComicRepository {
  constructor() {}

  async create(createCharacterComicDto: CreateCharacterComicDto) {
    return prisma.characterComic.create({
      data: createCharacterComicDto,
      select: CHARACTER_COMIC_SELECT_FIELDS,
    });
  }

  async findAll() {
    return prisma.characterComic.findMany({
      select: CHARACTER_COMIC_SELECT_FIELDS,
    });
  }

  async findOne(id: string) {
    return prisma.characterComic.findUnique({
      where: {
        id,
      },
      select: CHARACTER_COMIC_SELECT_FIELDS,
    });
  }

  async update(id: string, updateCharacterComicDto: UpdateCharacterComicDto) {
    return prisma.characterComic.update({
      where: {
        id,
      },
      data: updateCharacterComicDto,
      select: CHARACTER_COMIC_SELECT_FIELDS,
    });
  }

  async remove(id: string) {
    return prisma.characterComic.delete({
      where: {
        id,
      },
      select: CHARACTER_COMIC_SELECT_FIELDS,
    });
  }
}
