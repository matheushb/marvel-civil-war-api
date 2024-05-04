export interface CreateComicDto {
  title: string;
  description: string;
  thumbnail: string;
}

export const createComicDto = {
  title: {
    type: "string",
    required: "Title is required",
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
