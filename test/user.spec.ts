import { describe, it } from "node:test";
import assert from "node:assert";
import * as request from "supertest";
import app from "../src/app";

let id = "";
let accessToken = "";

describe("Should test create user endpoint", () => {
  const createUserPayload = {
    name: "Matheus Teste",
    email: "ihbfafggcmlxnv@mail.com",
    password: "matheus123",
  };

  it("should create user with valid credentals", async () => {
    const response = await request
      .default(app)
      .post("/signup")
      .send(createUserPayload);

    id = response.body.user.id;
    accessToken = response.body.access_token;
    assert.equal(response.status, 201);
    assert.ok(response.body.access_token);
    assert.ok(response.body.user.id);
    assert.ok(response.body.user.email);
    assert.ok(response.body.user.name);
    assert.ok(response.body.user.createdAt);
    assert.ok(response.body.user.updatedAt);
  });

  it("should throw conflict exception when user with same email already exists", async () => {
    const response = await request
      .default(app)
      .post("/signup")
      .send(createUserPayload);

    assert.equal(response.status, 409);
  });
});

describe("Should test find all users endpoint", () => {
  it("should find all users", async () => {
    const response = await request
      .default(app)
      .get("/users")
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
  });
});

describe("Should test find user by id endpoint", () => {
  it("should return created user by id", async () => {
    const response = await request
      .default(app)
      .get(`/users/id/${id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.id, id);
  });

  it("should throw not found when user doesnt exist", async () => {
    const response = await request
      .default(app)
      .get(`/users/id/0`)
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 404);
  });
});

describe("Should test update user endpoint", () => {
  it("should update user with valid credentals", async () => {
    const response = await request
      .default(app)
      .patch(`/users/id/${id}`)
      .send({ name: "Matheus Updated Name" })
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.id, id);
    assert.equal(response.body.name, "Matheus Updated Name");
  });

  it("should throw not found when updating user with unexistant id", async () => {
    const response = await request
      .default(app)
      .put(`/users/id/0`)
      .send({ name: "Matheus Teste" })
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 404);
  });
});

describe("Should test delete user endpoint", () => {
  it("should throw not found when deleting user unexistant id", async () => {
    const response = await request
      .default(app)
      .delete(`/users/id/0`)
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 404);
  });

  it("should delete created user", async () => {
    const response = await request
      .default(app)
      .delete(`/users/id/${id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    assert.equal(response.status, 204);
  });
});
