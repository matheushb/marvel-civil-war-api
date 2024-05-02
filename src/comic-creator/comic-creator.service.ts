import { NotFoundException } from "../common/exception/types/not-found.exception";
import { ComicCreatorRepository } from "./comic-creator.repository";
import { CreateComicCreatorDto } from "./dto/comic-creator-create.dto";
import { UpdateComicCreatorDto } from "./dto/comic-creator-update.dto";

export class ComicCreatorService {
  constructor(
    private readonly comicCreatorRepository: ComicCreatorRepository
  ) {}

  async create(ComicCreatorDto: CreateComicCreatorDto) {
    const creator = await this.comicCreatorRepository.create(ComicCreatorDto);
    return creator;
  }

  async findAll() {
    const creators = await this.comicCreatorRepository.findAll();
    return creators;
  }

  async findOne(id: string) {
    const creator = await this.comicCreatorRepository.findOne(id);
    if (!creator)
      throw new NotFoundException(`Unable to find creator with id ${id}`);
    return creator;
  }

  async update(id: string, ComicCreatorDto: UpdateComicCreatorDto) {
    const creator = await this.comicCreatorRepository.update(
      id,
      ComicCreatorDto
    );
    return creator;
  }

  async remove(id: string) {
    await this.comicCreatorRepository.remove(id);
  }
}
