import express from "express";
import morgan from "morgan";
import cors from "cors";
import history from "connect-history-api-fallback";
import path from "path";

import auth from "./routes/auth.routes";
import product from "./routes/product.routes";
import order from "./routes/order.routes";
const app = express();
//*middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* Importar--Rutas
app.use(auth);
app.use("/products", product);
app.use("/orders", order);

app.use(history());
//Hacer publica la carpeta de imagens
app.use("/uploads", express.static(path.resolve("uploads")));
//Ruta estatica
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

//*Setting
app.set("port", process.env.PORT || 4000);

export default function createServer() {
  app.listen(app.get("port"), () => {
    console.log("Server activo en " + app.get("port"));
  });
}
