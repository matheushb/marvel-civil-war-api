import { CreateCharacterDto } from "./create-character.dto";

export interface UpdateCharacterDto extends Partial<CreateCharacterDto> {}

export const updateCharacterDto = {
  name: {
    type: "string",
  },
  description: {
    type: "string",
  },
  thumbnail: {
    type: "string",
  },
};
