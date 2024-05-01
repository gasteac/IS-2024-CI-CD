import User from "../../backend/models/user.model";
import request from "supertest";
import mongoose from "mongoose";
import { app, server } from "../../backend";
import bcryptjs from "bcryptjs";
// describe("POST /signin", () => {
//   let res;
//   beforeEach(async () => {
//     res = await request(app).post("/api/auth/signinTest").send({
//       email: "gasteac@gmail.com",
//       password: "pacheca",
//     });
//   });

//   it("should let an user signin", async () => {
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("Message");
//   });
// });

// afterAll(async () => {
//   server.close();
//   await mongoose.disconnect();
//   mongoose.connection.close();
// });

// beforeEach(async () => {
//   mongoose.connect(process.env.MONGO);
// });

beforeEach(async () => {
  await User.deleteMany({ username: "testuser" });
});

describe('POST /signin', () => {
  it("should sign in a user and return a token", async () => {
    // Create a test user
    const hashedPassword = bcryptjs.hashSync('pacheca', 10);
    const testUser = new User({
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
    });
    await testUser.save();

    // Make a POST request to sign in

    const response = await request(app).post("/api/auth/signin").send({
      email: "test@example.com",
      password: "pacheca",
    });

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.headers["set-cookie"]).toBeDefined();
  });

  it("should return an error if email is not registered", async () => {
    const response = await request(app).post("/api/auth/signin").send({
      email: "unregistered@example.com",
      password: "pacheca",
    });

    // Assert the response
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Email not registered");
  });

  it("should return an error if password is invalid", async () => {
    // Create a test user
    const hashedPassword = bcryptjs.hashSync('pacheca', 10);
    const testUser = new User({
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
    });
    await testUser.save();

    // Make a POST request with an invalid password
    const response = await request(app).post("/api/auth/signin").send({
      email: "test@example.com",
      password: "invalidpassword",
    });

    // Assert the response
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid password");
  });

  it("should return an error if required fields are missing", async () => {
    // Make a POST request with missing fields
    const response = await request(app).post("/api/auth/signin").send({});

    // Assert the response
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "All fields are required");
  });

  afterAll(async () => {
    await User.deleteMany({ username: "testuser" });
    server.close();
    await mongoose.disconnect();
    mongoose.connection.close();
  });
});