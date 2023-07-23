import mongoose from "mongoose";

const Connection = async (USERNAME, PASSWORD) => {
  const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-gu86s0d-shard-00-00.i7fve5i.mongodb.net:27017,ac-gu86s0d-shard-00-01.i7fve5i.mongodb.net:27017,ac-gu86s0d-shard-00-02.i7fve5i.mongodb.net:27017/Project0?ssl=true&replicaSet=atlas-x816x4-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("Database connected.")
  } catch (error) {
    console.log("Error while connecting to the database: ", error.message);
  }
};

export default Connection;
