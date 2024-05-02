import { Request, Response } from "express";
import { ComicCreatorService } from "./comic-creator.service";

export class ComicCreatorController {
  constructor(private readonly comicCreatorService: ComicCreatorService) {}

  async create(req: Request, res: Response) {
    const comicCreator = await this.comicCreatorService.create(req.body);
    return res.status(201).json(comicCreator);
  }

  async findAll(req: Request, res: Response) {
    const comicCreators = await this.comicCreatorService.findAll();
    return res.status(200).json(comicCreators);
  }

  async findOne(req: Request, res: Response) {
    const comicCreator = await this.comicCreatorService.findOne(req.params.id);
    return res.status(200).json(comicCreator);
  }

  async update(req: Request, res: Response) {
    const comicCreator = await this.comicCreatorService.update(
      req.params.id,
      req.body
    );
    return res.status(200).json(comicCreator);
  }

  async remove(req: Request, res: Response) {
    await this.comicCreatorService.remove(req.params.id);
    return res.status(204).json();
  }
}
