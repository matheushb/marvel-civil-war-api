import { Request, Response } from "express";
import { SeedService } from "./seed.service";

export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  async seed(req: Request, res: Response) {
    const resp = await this.seedService.seed();
    res.send(resp);
  }
}
