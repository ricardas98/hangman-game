const request = require("supertest");
const express = require("express");

const app = require("../app");

//------------------------------------------------------
//-------------------------POST-------------------------
//------------------------------------------------------

describe("POST /games", () => {
  describe("when game is started", () => {
    test("should respond with a 201 status code", async () => {
      const response = await request(app).post("/api/games").send();
      expect(response.statusCode).toBe(201);
    });

    test("should respond with a json object", async () => {
      const response = await request(app).post("/api/games").send();
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });

    test("should respond with an object containing parameters", async () => {
      const response = await request(app).post("/api/games").send();
      expect(response.body.id).toBeDefined();
      expect(response.body.data.word).toBeDefined();
      expect(response.body.data.misses).toBeDefined();
      expect(response.body.data.id).toBeDefined();
    });
  });
});

//------------------------------------------------------
//-------------------------PUT--------------------------
//------------------------------------------------------

describe("PUT /games", () => {
  describe("when an existing id and correct data is provided", () => {
    test("should respond with a 200 status code", async () => {
      const response1 = await request(app).post("/api/games").send();
      const response2 = await request(app).put(`/api/games/${response1.body.data.id}`).send({ letter: "g" });
      expect(response2.statusCode).toBe(200);
    });
  });

  test("should respond with a json object", async () => {
    const response1 = await request(app).post("/api/games").send();
    const response2 = await request(app).put(`/api/games/${response1.body.data.id}`).send();
    expect(response2.headers["content-type"]).toEqual(expect.stringContaining("json"));
  });

  describe("when an existing id and correct data is provided", () => {
    test("should respond with an object containing parameters", async () => {
      const response1 = await request(app).post("/api/games").send();
      const response2 = await request(app).put(`/api/games/${response1.body.data.id}`).send({ letter: "g" });
      expect(response2.body.id).toBeDefined();
      expect(response2.body.data.word).toBeDefined();
      expect(response2.body.data.misses).toBeDefined();
      expect(response2.body.data.id).toBeDefined();
    });
  });

  describe("when an existing id and incorrect correct data is provided", () => {
    test("should respond with a 400 status code", async () => {
      const response1 = await request(app).post("/api/games").send();
      const response2 = await request(app).put(`/api/games/${response1.body.data.id}`).send({ symbol: "g" });
      expect(response2.statusCode).toBe(400);
    });
  });

  describe("when an existing id is provided in the request but no other data is provided", () => {
    test("should respond with a 400 status code", async () => {
      const response1 = await request(app).post("/api/games").send();
      const response2 = await request(app).put(`/api/games/${response1.body.data.id}`).send();
      expect(response2.statusCode).toBe(400);
    });

    describe("when non existing id is provided in the request", () => {
      test("should respond with a 404 status code", async () => {
        const response = await request(app).put(`/api/games/`).send();
        expect(response.statusCode).toBe(404);
      });
    });

    describe("when no id is provided in the request", () => {
      test("should respond with a 404 status code", async () => {
        const response = await request(app).put(`/api/games/`).send();
        expect(response.statusCode).toBe(404);
      });
    });
  });
});

//------------------------------------------------------
//------------------------DELETE------------------------
//------------------------------------------------------

describe("DELETE /games", () => {
  describe("when an existing id is provided in the request", () => {
    test("should respond with a 204 status code", async () => {
      const response1 = await request(app).post("/api/games").send();

      const response2 = await request(app).delete(`/api/games/${response1.body.data.id}`).send();
      expect(response2.statusCode).toBe(204);
    });
  });

  describe("when non existing id is provided in the request", () => {
    test("should respond with a 404 status code", async () => {
      const response = await request(app).delete(`/api/games/${"123x123"}`).send();
      expect(response.statusCode).toBe(404);
    });
  });

  describe("when no id is provided in the request", () => {
    test("should respond with a 404 status code", async () => {
      const response = await request(app).delete(`/api/games/`).send();
      expect(response.statusCode).toBe(404);
    });
  });
});

//------------------------------------------------------
//-------------------------GET-------------------------
//------------------------------------------------------

describe("GET /games", () => {
  describe("when request sent", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/api/games").send();
      expect(response.statusCode).toBe(200);
    });

    test("should respond with a json object", async () => {
      const response = await request(app).get("/api/games").send();
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    });
  });
});
