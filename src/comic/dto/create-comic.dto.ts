export interface CreateComicDto {
  title: string;
  description: string;
  thumbnail: string;
}

export const createComicDto = {
  title: {
    required: "Title is required",
  },
  description: {
    required: "Description is required",
  },
  thumbnail: {
    required: "Thumbnail is required",
  },
};
