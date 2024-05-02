import { NotFoundException } from "../common/exception/types/not-found.exception";
import { CharacterComicRepository } from "./character-comic.repository";
import { CreateCharacterComicDto } from "./dto/character-comic-create.dto";
import { UpdateCharacterComicDto } from "./dto/character-comic-update.dto";

export class CharacterComicService {
  constructor(
    private readonly characterComicRepository: CharacterComicRepository
  ) {}

  async create(createCharacterComicDto: CreateCharacterComicDto) {
    const creator = await this.characterComicRepository.create(
      createCharacterComicDto
    );
    return creator;
  }

  async findAll() {
    const creators = await this.characterComicRepository.findAll();
    return creators;
  }

  async findOne(id: string) {
    const creator = await this.characterComicRepository.findOne(id);
    if (!creator)
      throw new NotFoundException(`Unable to find creator with id ${id}`);
    return creator;
  }

  async update(id: string, updateCharacterComicDto: UpdateCharacterComicDto) {
    const creator = await this.characterComicRepository.update(
      id,
      updateCharacterComicDto
    );
    return creator;
  }

  async remove(id: string) {
    await this.characterComicRepository.remove(id);
  }
}
