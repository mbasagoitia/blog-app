import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./routes";
import config from "./config";
import join from "express";
import { errorHandler } from "./middlewares/errorHandler";
import articleRouter from "./routes/articles";

mongoose.connect("mongodb://localhost/blog");

const app = express();

/**
 * Parses incoming request body as json if header indicates application/json
 */
app.use(express.json());

/**
 * Enables incoming requests from cross origin domains
 */
app.use(cors());

/**
 * Logs incoming request information to the dev console
 */
app.use(morgan("dev"));

/**
 * Directs incoming static asset requests to the public folder
 */
// app.use(express.static(join(__dirname, "../client/build")));

/**
 * Directs all routes starting with /api to the top level api express router
 */
app.use("/api", apiRouter);

/**
 * Sends the react app index.html for page requests
 * Only needed in production when you are not using the react dev server
 */
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  const articles = [{
    title: "test article",
    createdAt: new Date(),
    description: "test description"
  }];
  res.render("articles/index", { articles: articles });
})
// app.use((req, res, next) => {
//   try {
//     res.sendFile(join(__dirname, "../client/build/index.html"));
//   } catch (error) {
//     next(error);
//   }
// });

/**
 * Error handler middleware
 */
app.use("/articles", articleRouter);

app.use(errorHandler);

/**
 * Bind the app to a specified port
 * You can access your app at http://localhost:<port>
 */
app.listen(config.port || 8080, () =>
  console.log(`Server listening on port ${config.port}...`)
);
