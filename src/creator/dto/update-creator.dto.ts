import { CreatorRole } from "../entities/creator.entity";
import { CreateCreatorDto } from "./create-creator.dto";

export interface UpdateCreatorDto extends Partial<CreateCreatorDto> {}

export const updateCreatorDto = {
  name: {
    type: "string",
  },
  role: {
    type: "string",
    enum: Object.values(CreatorRole),
  },
};
