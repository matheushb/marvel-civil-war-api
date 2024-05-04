export interface CreateCharacterDto {
  name: string;
  description: string;
  thumbnail: string;
}

export const createCharacterDto = {
  name: {
    type: "string",
    required: "Name is required",
  },
  description: {
    type: "string",
    required: "Description is required",
  },
  thumbnail: {
    type: "string",
    required: "Thumbnail is required",
  },
};
