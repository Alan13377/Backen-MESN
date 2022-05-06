import createServer from "./server";
import connectDB from "./database";

async function main() {
  try {
    await connectDB();
    createServer();
  } catch (error) {
    console.log(error);
  }
}

main();
