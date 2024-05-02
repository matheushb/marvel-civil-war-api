export interface CreateCharacterComicDto {
  characterId: string;
  comicId: string;
}

export const createCharacterComicDto = {
  characterId: {
    required: "CharacterId is required",
  },
  comicId: {
    required: "ComicId is required",
  },
};
