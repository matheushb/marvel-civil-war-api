import { CreatorRole } from "../entities/creator.entity";

export interface CreateCreatorDto {
  name: string;
  role: CreatorRole;
}

export const createCreatorDto = {
  name: {
    type: "string",
    required: "Name is required",
  },
  role: {
    type: "string",
    required: "Role is required",
    enum: Object.values(CreatorRole),
  },
};
