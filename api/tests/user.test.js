const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Model", () => {
  it("should hash the password before saving to the database", async () => {
    const userData = {
      email: "amine@example.com",
      password: "testpassword",
      role: "student",
    };

    const user = await User.create(userData);

    expect(user.password).not.toBe(userData.password);
  });

  it("should successfully login with correct credentials", async () => {
    const userData = {
      email: "test@example.com",
      password: "testpassword",
      role: "student",
    };

    await User.create(userData);

    const loggedInUser = await User.login("test@example.com", "testpassword");

    expect(loggedInUser).toBeDefined();
    expect(loggedInUser.email).toBe(userData.email);
    expect(loggedInUser.role).toBe(userData.role);
  });

  it("should throw an error when logging in with incorrect password", async () => {
    const userData = {
      email: "test0@example.com",
      password: "testpassword",
      role: "student",
    };

    await User.create(userData);

    await expect(
      User.login("test0@example.com", "incorrectpassword")
    ).rejects.toThrow("incorrect password");
  });

  it("should throw an error when logging in with incorrect email", async () => {
    const userData = {
      email: "test1@example.com",
      password: "testpassword",
      role: "student",
    };

    await User.create(userData);

    await expect(
      User.login("incorrect@example.com", "testpassword")
    ).rejects.toThrow("incorrect email");
  });
});
