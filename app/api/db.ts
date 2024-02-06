import { Client } from "pg";

const connectionString = process.env.DBURL;

const connectionEstablished = async () => {
  const client : Client = new Client({
    connectionString: connectionString,
  });
  try {
      await client.connect();
      return client;

  } catch (err) {
    console.log("Connection Failed", err);
  }
};

export { connectionEstablished };
