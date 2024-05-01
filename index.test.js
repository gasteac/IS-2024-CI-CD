const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    const mongoUri = process.env.MONGO;
    const dbName = process.env.DB_NAME;

    connection = await MongoClient.connect(mongoUri);
    db = connection.db(dbName);
  });

  afterAll(async () => {
    await connection.close(); // Cierra la conexión
  });

  afterEach(async () => {
    const users = db.collection("users");

    // Limpia el documento creado durante la prueba
    await users.deleteOne({ username: "gasteacTest" });
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("users");

    const mockUser = { username: "gasteacTest", email: "gasteacTest@gmail.com" };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ username: "gasteacTest" });
    expect(insertedUser).toEqual(mockUser);
  });
});