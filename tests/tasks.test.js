const request = require("supertest");
const app = require("../server");

describe("Tasks API", () => {

  it("should create a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Study Node",
        description: "Practice REST API",
        status: "pending"
      });

    expect(res.statusCode).toEqual(201);
  });

});