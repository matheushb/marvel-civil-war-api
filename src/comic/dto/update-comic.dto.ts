import { CreateComicDto } from "./create-comic.dto";

export interface UpdateComicDto extends Partial<CreateComicDto> {}

export const updateComicDto = {
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
  thumbnail: {
    type: "string",
  },
};
