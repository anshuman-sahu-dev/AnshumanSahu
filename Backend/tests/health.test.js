const request = require("supertest");
const app = require("../src/app");

describe("GET /api/v1/health", () => {
  it("should return 200 OK with service diagnostics", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty(
      "service",
      "anshuman-portfolio-backend",
    );
    expect(res.body.data).toHaveProperty("status");
  });
});
