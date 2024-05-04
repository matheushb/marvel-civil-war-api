import { after, describe, it } from "node:test";
import assert from "node:assert";
import * as request from "supertest";
import app from "../src/app";

describe("Auth Test", () => {
  after(async () => {
    await request
      .default(app)
      .delete(`/users/id/${id}`)
      .set("Authorization", `Bearer ${access_token}`);
  });

  let id: string;
  let access_token: string;

  describe("POST /signup", () => {
    it("should throw error when wrong email provided on signup", async () => {
      const response = await request.default(app).post("/signup").send({
        name: "Matheus Teste",
        email: "mail.com",
        password: "matheus123",
      });

      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.body.message, "email must be a valid email");
      assert.strictEqual(response.body.name, "Bad Request Exception");
      assert.strictEqual(response.body.statusCode, 400);
    });

    it("should throw error when required fields not sent", async () => {
      const response = await request.default(app).post("/signup").send({});

      assert.strictEqual(response.status, 400);
      assert.strictEqual(
        response.body.message,
        "name is required, email is required, password is required"
      );
      assert.strictEqual(response.body.name, "Bad Request Exception");
      assert.strictEqual(response.body.statusCode, 400);
    });

    it("should create user when correct data provided on signup", async () => {
      const response = await request.default(app).post("/signup").send({
        name: "Matheus Teste",
        email: "bhxhiczvcihyxbih@mail.com",
        password: "matheus123",
      });

      id = response.body.user.id;
      access_token = response.body.access_token;
      assert.equal(response.status, 201);
      assert.equal(response.body.user.name, "Matheus Teste");
      assert.equal(response.body.user.email, "bhxhiczvcihyxbih@mail.com");
      assert.ok(response.body.user.id);
      assert.equal(response.body.password, undefined);
      assert.ok(response.body.access_token);
    });

    it("should throw error when email already exists on signup", async () => {
      const response = await request.default(app).post("/signup").send({
        name: "Matheus Teste",
        email: "bhxhiczvcihyxbih@mail.com",
        password: "matheus123",
      });

      assert.strictEqual(response.status, 409);
      assert.strictEqual(
        response.body.message,
        "User already exists with this email"
      );
      assert.strictEqual(response.body.name, "Conflict Exception");
      assert.strictEqual(response.body.statusCode, 409);
    });
  });

  describe("POST /signin", () => {
    it("should throw error when wrong email provided on signin", async () => {
      const response = await request.default(app).post("/signin").send({
        email: "mail.com",
        password: "matheus123",
      });

      assert.strictEqual(response.status, 400);
      assert.strictEqual(response.body.message, "email must be a valid email");
      assert.strictEqual(response.body.name, "Bad Request Exception");
      assert.strictEqual(response.body.statusCode, 400);
    });

    it("should throw error when wrong password provided on signin", async () => {
      const response = await request.default(app).post("/signin").send({
        email: "bhxhiczvcihyxbih@mail.com",
        password: "wrongPassword",
      });

      assert.strictEqual(response.status, 401);
      assert.strictEqual(response.body.message, "Usuário ou senha inválidos");
      assert.strictEqual(response.body.name, "Unauthorized Exception");
      assert.strictEqual(response.body.statusCode, 401);
    });

    it("should throw error when required fields not sent", async () => {
      const response = await request.default(app).post("/signin").send({});

      assert.strictEqual(response.status, 400);
      assert.strictEqual(
        response.body.message,
        "Email is required, Password is required"
      );
      assert.strictEqual(response.body.name, "Bad Request Exception");
      assert.strictEqual(response.body.statusCode, 400);
    });

    it("should signin user when correct data provided on signin", async () => {
      const response = await request.default(app).post("/signin").send({
        email: "bhxhiczvcihyxbih@mail.com",
        password: "matheus123",
      });

      assert.equal(response.status, 200);
      assert.ok(response.body.access_token);
    });
  });
});
