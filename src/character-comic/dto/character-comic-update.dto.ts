import { CreateCharacterComicDto } from "./character-comic-create.dto";

export interface UpdateCharacterComicDto
  extends Partial<CreateCharacterComicDto> {}

export const updateCharacterComicDto = {
  characterId: {},
  comicId: {},
};
