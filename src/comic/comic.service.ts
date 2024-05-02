import { NotFoundException } from "../common/exception/types/not-found.exception";
import { ComicRepository } from "./comic.repository";
import { CreateComicDto } from "./dto/create-comic.dto";
import { UpdateComicDto } from "./dto/update-comic.dto";

export class ComicService {
  constructor(private readonly comicRepository: ComicRepository) {}

  async create(createComicDto: CreateComicDto) {
    const comic = await this.comicRepository.create(createComicDto);

    return comic;
  }

  async findAll() {
    const comics = await this.comicRepository.findAll();
    return comics;
  }

  async findOne(id: string) {
    const comic = await this.comicRepository.findOne(id);
    if (!comic)
      throw new NotFoundException(`Unable to find comic with id ${id}`);
    return comic;
  }

  async update(id: string, updateComicDto: UpdateComicDto) {
    const comic = await this.comicRepository.update(id, updateComicDto);
    return comic;
  }

  async remove(id: string) {
    await this.comicRepository.remove(id);
  }
}
