import { NotFoundException } from "../common/exception/types/not-found.exception";
import { CharacterRepository } from "./character.repository";
import { CreateCharacterDto } from "./dto/create-character.dto";
import { UpdateCharacterDto } from "./dto/update-character.dto";

export class CharacterService {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const character = await this.characterRepository.create(createCharacterDto);

    return character;
  }

  async findAll() {
    const characters = await this.characterRepository.findAll();
    return characters;
  }

  async findOne(id: string) {
    const character = await this.characterRepository.findOne(id);
    if (!character)
      throw new NotFoundException(`Unable to find character with id ${id}`);
    return character;
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    const character = await this.characterRepository.update(
      id,
      updateCharacterDto
    );
    return character;
  }

  async remove(id: string) {
    await this.characterRepository.remove(id);
  }
}
