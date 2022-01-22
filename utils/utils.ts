import * as mongoose from "mongoose"

const conn = {
    isConnected: false,
  };

  export async function dbConnect() {
    if (conn.isConected) return;
  
    const db = await mongoose.connect(process.env.MONGODB_URI);
  
    conn.isConnected = db.connections[0].readyState;
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongodb connected to db");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongodb connected to", err.message);
  });