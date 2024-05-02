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
    const SERIES_ID = 344;

    const [characters, comics, creators] = await Promise.all([
      fetch(
        `${MARVEL_API_URL}/series/${SERIES_ID}/characters?ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
      ).then((res) => res.json()),
      fetch(
        `${MARVEL_API_URL}/series/${SERIES_ID}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
      ).then((res) => res.json()),
      fetch(
        `${MARVEL_API_URL}/series/${SERIES_ID}?ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
      ).then((res) => res.json()),
    ]);

    const charactersIds = characters.data.results.map((char: any) => char.id);

    const createdCharacters = characters.data.results.map((char: any) => {
      return this.characterService.create({
        name: char.name,
        description: char.description,
        thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      });
    });

    const createdComics = comics.data.results.map((comic: any) => {
      return this.comicService.create({
        title: comic.title,
        description: comic.description ?? comic.title,
        thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      });
    });

    const createdCreators = creators.data.results[0].creators.items.map(
      (creator: any) => {
        return this.creatorService.create({
          name: creator.name,
          role: creator.role.toUpperCase(),
        });
      }
    );

    const [charactersResult, comicsResult, creatorsResult] = await Promise.all([
      Promise.all(createdCharacters),
      Promise.all(createdComics),
      Promise.all(createdCreators),
    ]);

    for (let x = 0; x < charactersResult.length; x++) {
      charactersResult[x].id = charactersIds[x];
    }

    console.log(
      `${MARVEL_API_URL}/series/${SERIES_ID}/comics?ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
    );
    console.log(charactersResult);

    const teste = await fetch(
      `${MARVEL_API_URL}/comics?characters=avengers&ts=${MARVEL_TS}&apikey=${MARVEL_API_KEY}&hash=${MARVEL_HASH}`
    ).then((res) => res.json());

    console.log(teste);

    return {
      characters: charactersResult,
      comics: comicsResult,
      creators: creatorsResult,
    };
  }
}
