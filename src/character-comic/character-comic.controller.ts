import { Request, Response } from "express";
import { CharacterComicService } from "./character-comic.service";

export class CharacterComicController {
  constructor(private readonly characterComicService: CharacterComicService) {}

  async create(req: Request, res: Response) {
    const characterComic = await this.characterComicService.create(req.body);
    return res.status(201).json(characterComic);
  }

  async findAll(req: Request, res: Response) {
    const characterComics = await this.characterComicService.findAll();
    return res.status(200).json(characterComics);
  }

  async findOne(req: Request, res: Response) {
    const characterComic = await this.characterComicService.findOne(
      req.params.id
    );
    return res.status(200).json(characterComic);
  }

  async update(req: Request, res: Response) {
    const characterComic = await this.characterComicService.update(
      req.params.id,
      req.body
    );
    return res.status(200).json(characterComic);
  }

  async remove(req: Request, res: Response) {
    await this.characterComicService.remove(req.params.id);
    return res.status(204).json();
  }
}
