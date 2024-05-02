import { Request, Response } from "express";
import { CharacterService } from "./character.service";

export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  async create(req: Request, res: Response) {
    const character = await this.characterService.create(req.body);
    return res.status(201).json(character);
  }

  async findAll(req: Request, res: Response) {
    const characters = await this.characterService.findAll();
    return res.status(200).json(characters);
  }

  async findOne(req: Request, res: Response) {
    const character = await this.characterService.findOne(req.params.id);
    return res.status(200).json(character);
  }

  async update(req: Request, res: Response) {
    const character = await this.characterService.update(
      req.params.id,
      req.body
    );
    return res.status(200).json(character);
  }

  async remove(req: Request, res: Response) {
    await this.characterService.remove(req.params.id);
    return res.status(204).json();
  }
}
