import { CreateComicCreatorDto } from "./comic-creator-create.dto";

export interface UpdateComicCreatorDto extends Partial<CreateComicCreatorDto> {}

export const updateComicCreatorDto = {
  creatorId: {},
  comicId: {},
};
