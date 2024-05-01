import request from "supertest";
import mongoose from "mongoose";
import  {app, server} from "../../backend";

describe("POST /signin", () => {
let res
  beforeEach(async()=> {
    res = await request(app).post("/api/auth/signinTest").send({
      email: "gasteac@gmail.com",
      password: "pacheca",
    });
  })
   
  it("should let an user signin", async () => {
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("Message");
  });
});

afterAll(async() => {
  server.close();
  await mongoose.disconnect();
  mongoose.connection.close();
});