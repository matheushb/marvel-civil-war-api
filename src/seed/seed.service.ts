import { CharacterService } from "../character";
import { CharacterComicService } from "../character-comic";
import { CreateCharacterDto } from "../character/dto/create-character.dto";
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
    const seriesId = 344;

    const [characters, comics, creators] = await Promise.all([
      fetch(
        `${MARVEL_API_URL}/series/${seriesId}/characters?ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
      ).then((res) => res.json()),
      fetch(
        `${MARVEL_API_URL}/series/${seriesId}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
      ).then((res) => res.json()),
      fetch(
        `${MARVEL_API_URL}/series/${seriesId}?ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
      ).then((res) => res.json()),
    ]);

    const res = await Promise.all([
      characters.data.results.forEach((char: any) => {
        this.characterService.create({
          name: char.name,
          description: char.description,
          thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        });
      }),
      comics.data.results.forEach((comic: any) => {
        this.comicService.create({
          title: comic.title,
          description: comic.description,
          thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        });
      }),
      creators.data.results[0].creators.items.forEach((creator: any) => {
        this.creatorService.create({
          name: creator.name,
          role: creator.role.toUpperCase(),
        });
      }),
    ]);

    return res;
  }
}
