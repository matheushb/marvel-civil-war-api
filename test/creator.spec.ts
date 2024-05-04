import { after, before, describe, it } from "node:test";
import assert from "node:assert";
import * as request from "supertest";
import app from "../src/app";

let id = "";
let accessToken = "";
let creatorId = "";

describe("setup", async () => {
  before(async () => {
    const response = await request.default(app).post("/signup").send({
      name: "Matheus Teste",
      email: "ijsdabgf@teste.com",
      password: "matheus123",
    });

    id = response.body.user.id;
    accessToken = response.body.access_token;
  });
});

describe("It should test creator routes", () => {
  it("should create a creator", async () => {
    const response = await request
      .default(app)
      .post("/creators")
      .send({
        name: "Matheus Teste",
        role: "WRITER",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    console.log(accessToken);
    console.log(response);
    console.log(response.body);
    creatorId = response.body.id;
    assert.equal(response.status, 201);
  });

  it("should throw error when required fields not sent", async () => {
    const response = await request
      .default(app)
      .post("/creators")
      .send({})
      .set("Authorization", `Bearer ${accessToken}`);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(
      response.body.message,
      "Name is required, Role is required"
    );
    assert.strictEqual(response.body.name, "Bad Request Exception");
    assert.strictEqual(response.body.statusCode, 400);
  });

  it("should throw error when wrong role provided on creator post", async () => {
    const response = await request
      .default(app)
      .post("/creators")
      .send({
        name: "Matheus Teste",
        role: "TESTE",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(
      response.body.message,
      "role must be one of WRITER, PENCILLER, PENCILLER, INKER, COLORIST, LETTERER, EDITOR, COVER_ARTIST, OTHER"
    );
    assert.strictEqual(response.body.name, "Bad Request Exception");
    assert.strictEqual(response.body.statusCode, 400);
  });

  it("should list creators", async () => {
    const response = await request
      .default(app)
      .get("/creators")
      .set("Authorization", `Bearer ${accessToken}`);
    assert.equal(response.status, 200);
  });

  it("should get creator by id", async () => {
    const response = await request
      .default(app)
      .get(`/creators/id/${creatorId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    assert.equal(response.status, 200);
  });

  it("should update creator", async () => {
    const response = await request
      .default(app)
      .patch(`/creators/id/${creatorId}`)
      .send({
        name: "Matheus Baraldi",
        role: "WRITER",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 200);
  });

  it("should throw error when creator not found", async () => {
    const response = await request
      .default(app)
      .patch(`/creators/id/123`)
      .send({
        name: "Matheus Baraldi",
        role: "WRITER",
      })
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 404);
  });

  it("should delete creator", async () => {
    const response = await request
      .default(app)
      .delete(`/creators/id/${creatorId}`)
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
