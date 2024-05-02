export interface CreateComicCreatorDto {
  creatorId: string;
  comicId: string;
}

export const createComicCreatorDto = {
  creatorId: {
    required: "creatorId is required",
  },
  comicId: {
    required: "ComicId is required",
  },
};
