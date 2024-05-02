import { Prisma, PrismaClient } from "@prisma/client";
import { CreateComicDto } from "./dto/create-comic.dto";
import { UpdateComicDto } from "./dto/update-comic.dto";

const prisma = new PrismaClient();

const COMIC_SELECT_FIELDS = {
  id: true,
  title: true,
  description: true,
  thumbnail: true,
  createdAt: true,
  updatedAt: true,
} as Prisma.ComicSelect;

export class ComicRepository {
  constructor() {}

  async create(createComicDto: CreateComicDto) {
    return prisma.comic.create({
      data: {
        ...createComicDto,
      },
      select: COMIC_SELECT_FIELDS,
    });
  }

  async findAll() {
    return prisma.comic.findMany({
      select: COMIC_SELECT_FIELDS,
    });
  }

  async findOne(id: string) {
    return prisma.comic.findUnique({
      where: {
        id,
      },
      select: COMIC_SELECT_FIELDS,
    });
  }

  async update(id: string, updateComicDto: UpdateComicDto) {
    return prisma.comic.update({
      where: {
        id,
      },
      data: {
        ...updateComicDto,
      },
      select: COMIC_SELECT_FIELDS,
    });
  }

  async remove(id: string) {
    return prisma.comic.delete({
      where: {
        id,
      },
      select: COMIC_SELECT_FIELDS,
    });
  }
}
