import { CreateCreatorDto } from "./create-creator.dto";

export interface UpdateCreatorDto extends Partial<CreateCreatorDto> {}

export const updateCreatorDto = {
  name: {},
  role: {},
};
