import { after, before, describe, it } from "node:test";
import assert from "node:assert";
import * as request from "supertest";
import app from "../src/app";

let id = "";
let accessToken = "";
let comicId = "";

describe("setup", async () => {
  before(async () => {
    const response = await request.default(app).post("/signup").send({
      name: "Matheus Teste",
      email: "hgdsaffyigsaiyfgd@teste.com",
      password: "matheus123",
    });

    id = response.body.user.id;
    accessToken = response.body.access_token;
  });
});

describe("It should test comic routes", () => {
  it("should create a comic", async () => {
    const response = await request
      .default(app)
      .post("/comics")
      .send({
        title: "Comic Test",
        description: "This is a comic test",
        thumbnail: "https://example.com/image.jpg",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    comicId = response.body.id;
    assert.equal(response.status, 201);
  });

  it("should throw error when required fields not sent", async () => {
    const response = await request
      .default(app)
      .post("/comics")
      .send({})
      .set("Authorization", `Bearer ${accessToken}`);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(
      response.body.message,
      "Title is required, Description is required, Thumbnail is required"
    );
    assert.strictEqual(response.body.name, "Bad Request Exception");
    assert.strictEqual(response.body.statusCode, 400);
  });

  it("should list comics", async () => {
    const response = await request
      .default(app)
      .get("/comics")
      .set("Authorization", `Bearer ${accessToken}`);
    assert.equal(response.status, 200);
  });

  it("should get comic by id", async () => {
    const response = await request
      .default(app)
      .get(`/comics/id/${comicId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    assert.equal(response.status, 200);
  });

  it("should update comic", async () => {
    const response = await request
      .default(app)
      .patch(`/comics/id/${comicId}`)
      .send({
        title: "Updated Comic Title",
        description: "Updated comic description",
        thumbnail: "https://example.com/updated-image.jpg",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 200);
  });

  it("should throw error when comic not found", async () => {
    const response = await request
      .default(app)
      .patch(`/comics/id/123`)
      .send({
        title: "Updated Comic Title",
        description: "Updated comic description",
        thumbnail: "https://example.com/updated-image.jpg",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 404);
  });

  it("should delete comic", async () => {
    const response = await request
      .default(app)
      .delete(`/comics/id/${comicId}`)
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
