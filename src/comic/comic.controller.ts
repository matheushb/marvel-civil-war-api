import { Request, Response } from "express";
import { ComicService } from "./comic.service";

export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  async findAll(req: Request, res: Response) {
    const comics = await this.comicService.findAll();
    return res.status(200).json(comics);
  }

  async findOne(req: Request, res: Response) {
    const comic = await this.comicService.findOne(req.params.id);
    return res.status(200).json(comic);
  }

  async update(req: Request, res: Response) {
    const comic = await this.comicService.update(req.params.id, req.body);
    return res.status(200).json(comic);
  }

  async remove(req: Request, res: Response) {
    await this.comicService.remove(req.params.id);
    return res.status(204).json();
  }
}
