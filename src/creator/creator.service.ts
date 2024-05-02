import { NotFoundException } from "../common/exception/types/not-found.exception";
import { CreatorRepository } from "./creator.repository";
import { CreateCreatorDto } from "./dto/create-creator.dto";
import { UpdateCreatorDto } from "./dto/update-creator.dto";

export class CreatorService {
  constructor(private readonly creatorRepository: CreatorRepository) {}

  async create(createCreatorDto: CreateCreatorDto) {
    const creator = await this.creatorRepository.create(createCreatorDto);

    return creator;
  }

  async findAll() {
    const creators = await this.creatorRepository.findAll();
    return creators;
  }

  async findOne(id: string) {
    const creator = await this.creatorRepository.findOne(id);
    if (!creator)
      throw new NotFoundException(`Unable to find creator with id ${id}`);
    return creator;
  }

  async update(id: string, updateCreatorDto: UpdateCreatorDto) {
    const creator = await this.creatorRepository.update(id, updateCreatorDto);
    return creator;
  }

  async remove(id: string) {
    await this.creatorRepository.remove(id);
  }
}
