export interface CreateCharacterDto {
  name: string;
  description: string;
  thumbnail: string;
}

export const createCharacterDto = {
  name: {
    required: "Name is required",
  },
  description: {
    required: "Description is required",
  },
  thumbnail: {
    required: "Thumbnail is required",
  },
};
