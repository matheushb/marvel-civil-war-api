import { CharacterService } from "../character";
import { CharacterComicService } from "../character-comic";
import { ComicService } from "../comic";
import { ComicCreatorService } from "../comic-creator";
import {
  MARVEL_API_KEY,
  MARVEL_API_URL,
  MARVEL_HASH,
  MARVEL_TS,
} from "../common/constants";
import { CreatorService } from "../creator";

export class SeedService {
  constructor(
    private readonly characterService: CharacterService,
    private readonly comicService: ComicService,
    private readonly creatorService: CreatorService,
    private readonly characterComicService: CharacterComicService,
    private readonly comicCreatorService: ComicCreatorService
  ) {}

  async seed() {
    const SERIES_ID = 1067;

    const [characters, comics, creators] = await Promise.all([
      fetch(
        `${MARVEL_API_URL}/series/${SERIES_ID}/characters?limit=100&ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
      ).then((res) => res.json()),
      fetch(
        `${MARVEL_API_URL}/series/${SERIES_ID}/comics?limit=100&ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
      ).then((res) => res.json()),
      fetch(
        `${MARVEL_API_URL}/series/${SERIES_ID}?ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
      ).then((res) => res.json()),
    ]);

    const createdCharacters = await Promise.all(
      characters.data.results.map(async (char: any) => {
        const createdCharacter = await this.characterService.create({
          name: char.name,
          description: char.description,
          thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        });
        return {
          marvel_id: char.id,
          id: createdCharacter.id,
          name: char.name,
          description: char.description,
          thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        };
      })
    );

    const createdComics = await Promise.all(
      comics.data.results.map(async (comic: any) => {
        const createdComic = await this.comicService.create({
          title: comic.title,
          description: comic.description ?? comic.title,
          thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        });
        return {
          marvel_id: comic.id,
          id: createdComic.id,
          title: comic.title,
          description: comic.description ?? comic.title,
          thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        };
      })
    );

    const createdCreators = await Promise.all(
      creators.data.results[0].creators.items.map(async (creator: any) => {
        const createdCreator = await this.creatorService.create({
          name: creator.name,
          role: creator.role.split(" ")[0].toUpperCase(),
        });
        return {
          marvel_id: creator.resourceURI.split("/").pop(),
          id: createdCreator.id,
          name: creator.name,
          role: creator.role.split(" ")[0].toUpperCase(),
        };
      })
    );

    const marvelLinkedIdsPromises = createdComics.map((comic) => {
      return fetch(
        `${MARVEL_API_URL}/comics/${comic.marvel_id}?ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
      )
        .then((res) => res.json())
        .then((marvelApiResponse) => ({
          comic_id: comic.id,
          comic_marvel_id: comic.marvel_id,
          creators_id: marvelApiResponse.data.results[0].creators.items.map(
            (creator: any) => creator.resourceURI.split("/").pop()
          ),
          characters_id: marvelApiResponse.data.results[0].characters.items.map(
            (char: any) => char.resourceURI.split("/").pop()
          ),
        }));
    });

    const marvelLinkedIds = await Promise.all(marvelLinkedIdsPromises);

    const linkedCreations = [];

    for (const comicRelation of marvelLinkedIds) {
      for (const creator of createdCreators) {
        if (comicRelation.creators_id.includes(creator.marvel_id)) {
          linkedCreations.push(
            this.comicCreatorService.create({
              comicId: comicRelation.comic_id,
              creatorId: creator.id,
            })
          );
        }
      }
      for (const character of createdCharacters) {
        if (comicRelation.characters_id.includes(String(character.marvel_id))) {
          linkedCreations.push(
            this.characterComicService.create({
              comicId: comicRelation.comic_id,
              characterId: character.id,
            })
          );
        }
      }
    }

    await Promise.all(linkedCreations);

    return "Seeded Successfully";
  }
}
