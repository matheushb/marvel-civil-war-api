import { Request, Response } from "express";
import { CreatorService } from "./creator.service";

export class CreatorController {
  constructor(private readonly creatorService: CreatorService) {}

  async create(req: Request, res: Response) {
    const creator = await this.creatorService.create(req.body);
    return res.status(201).json(creator);
  }

  async findAll(req: Request, res: Response) {
    const creators = await this.creatorService.findAll();
    return res.status(200).json(creators);
  }

  async findOne(req: Request, res: Response) {
    const creator = await this.creatorService.findOne(req.params.id);
    return res.status(200).json(creator);
  }

  async update(req: Request, res: Response) {
    const creator = await this.creatorService.update(req.params.id, req.body);
    return res.status(200).json(creator);
  }

  async remove(req: Request, res: Response) {
    await this.creatorService.remove(req.params.id);
    return res.status(204).json();
  }
}
