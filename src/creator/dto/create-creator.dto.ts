import { CreatorRole } from "@prisma/client";

export interface CreateCreatorDto {
  name: string;
  role: CreatorRole;
}

export const createCreatorDto = {
  name: {
    required: "Name is required",
  },
  role: {
    required: "Role is required",
  },
};
