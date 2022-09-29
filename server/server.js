const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;
const { getPostById } = require("./stub/posts");

const indexPath = path.resolve(__dirname, "..", "build", "index.html");
app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

app.get("/post*", (req, res, next) => {
  console.log(req);
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }
    // get post info
    const postId = req.query.id;
    const post = getPostById(postId);
    if (!post) return res.status(404).send("Post not found");

    // inject meta tags
    htmlData = htmlData
      .replace("<title>React App</title>", `<title>${post.title}</title>`)
      .replace("__META_OG_TITLE__", post.title)
      .replace("__META_OG_DESCRIPTION__", post.description)
      .replace("__META_DESCRIPTION__", post.description)
      .replace("__META_OG_IMAGE__", post.thumbnail);
    return res.send(htmlData);
  });
});

// static resources should just be served as they are

app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
