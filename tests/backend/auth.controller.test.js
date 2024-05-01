import request from "supertest";
import mongoose from "mongoose";
import  {app, server} from "../../backend";
describe("POST /signin", () => {
  it("should let an user signin", async () => {
    const res = await request(app).post("/api/auth/signinTest").send({
      email: "gasteac@gmail.com",
      password: "pacheca",
    });
    expect(res.statusCode).toEqual(200);
  });
});

afterAll(() => {
  server.close();
  mongoose.connection.close();
});