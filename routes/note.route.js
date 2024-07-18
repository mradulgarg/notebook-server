const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {create, read, update, remove} = require("../controllers/note.controller");
const noteRouter = express.Router();

noteRouter.post("/create", auth, create);

noteRouter.get("/all", auth, read);

noteRouter.patch("/update/:noteId", auth, update);

noteRouter.delete("/delete/:noteId", auth, remove);

module.exports = noteRouter;
