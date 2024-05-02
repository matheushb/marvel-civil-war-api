import { Prisma, PrismaClient } from "@prisma/client";
import { CreateComicCreatorDto } from "./dto/comic-creator-create.dto";
import { UpdateComicCreatorDto } from "./dto/comic-creator-update.dto";

const prisma = new PrismaClient();

const COMIC_CREATOR_SELECT_FIELDS = {
  id: true,
  creatorId: true,
  creator: true,
  comicId: true,
  comic: true,
  createdAt: true,
  updatedAt: true,
} as Prisma.ComicCreatorSelect;

export class ComicCreatorRepository {
  constructor() {}

  async create(createComicCreatorDto: CreateComicCreatorDto) {
    return prisma.comicCreator.create({
      data: createComicCreatorDto,
      select: COMIC_CREATOR_SELECT_FIELDS,
    });
  }

  async findAll() {
    return prisma.comicCreator.findMany({
      select: COMIC_CREATOR_SELECT_FIELDS,
    });
  }

  async findOne(id: string) {
    return prisma.comicCreator.findUnique({
      where: {
        id,
      },
      select: COMIC_CREATOR_SELECT_FIELDS,
    });
  }

  async update(id: string, updateComicCreatorDto: UpdateComicCreatorDto) {
    return prisma.comicCreator.update({
      where: {
        id,
      },
      data: updateComicCreatorDto,
      select: COMIC_CREATOR_SELECT_FIELDS,
    });
  }

  async remove(id: string) {
    return prisma.comicCreator.delete({
      where: {
        id,
      },
      select: COMIC_CREATOR_SELECT_FIELDS,
    });
  }
}
