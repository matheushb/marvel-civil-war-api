import { after, before, describe, it } from "node:test";
import assert from "node:assert";
import * as request from "supertest";
import app from "../src/app";

let id = "";
let accessToken = "";
let characterId = "";

describe("setup", async () => {
  before(async () => {
    const response = await request.default(app).post("/signup").send({
      name: "Matheus Teste",
      email: "gfesaoepwdsfgiujgh@teste.com",
      password: "matheus123",
    });

    id = response.body.user.id;
    accessToken = response.body.access_token;
  });
});

describe("It should test character routes", () => {
  it("should create a character", async () => {
    const response = await request
      .default(app)
      .post("/characters")
      .send({
        name: "Character Test",
        description: "This is a character test",
        thumbnail: "https://example.com/image.jpg",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    characterId = response.body.id;
    assert.equal(response.status, 201);
  });

  it("should throw error when required fields not sent", async () => {
    const response = await request
      .default(app)
      .post("/characters")
      .send({})
      .set("Authorization", `Bearer ${accessToken}`);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(
      response.body.message,
      "Name is required, Description is required, Thumbnail is required"
    );
    assert.strictEqual(response.body.name, "Bad Request Exception");
    assert.strictEqual(response.body.statusCode, 400);
  });

  it("should list characters", async () => {
    const response = await request
      .default(app)
      .get("/characters")
      .set("Authorization", `Bearer ${accessToken}`);
    assert.equal(response.status, 200);
  });

  it("should get character by id", async () => {
    const response = await request
      .default(app)
      .get(`/characters/id/${characterId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    assert.equal(response.status, 200);
  });

  it("should update character", async () => {
    const response = await request
      .default(app)
      .patch(`/characters/id/${characterId}`)
      .send({
        name: "Updated Character Name",
        description: "Updated character description",
        thumbnail: "https://example.com/updated-image.jpg",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 200);
  });

  it("should throw error when character not found", async () => {
    const response = await request
      .default(app)
      .patch(`/characters/id/123`)
      .send({
        name: "Updated Character Name",
        description: "Updated character description",
        thumbnail: "https://example.com/updated-image.jpg",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 404);
  });

  it("should delete character", async () => {
    const response = await request
      .default(app)
      .delete(`/characters/id/${characterId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 204);
  });

  after(async () => {
    await request
      .default(app)
      .delete(`/users/id/${id}`)
      .set("Authorization", `Bearer ${accessToken}`);
  });
});
