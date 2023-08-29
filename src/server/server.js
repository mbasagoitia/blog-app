import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import articleRouter from "./routes/articles";
import Article from "./models/article";
import methodOverride from "method-override";

mongoose.connect('mongodb://127.0.0.1:27017');

mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res, next) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
})
app.use("/articles", articleRouter);

app.use(errorHandler);

app.listen(8080, () =>
  console.log(`Server listening on port 8080...`)
);
