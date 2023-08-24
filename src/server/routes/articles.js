import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("articles");
})

export default router;