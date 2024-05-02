import { CreateComicDto } from "./create-comic.dto";

export interface UpdateComicDto extends Partial<CreateComicDto> {}

export const updateComicDto = {
  title: {},
  description: {},
  thumbnail: {},
};
