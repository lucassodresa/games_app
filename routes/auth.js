const express = require("express");
const router = express.Router();

router.get("/signup", async (req, res) => {
  setTimeout(() => res.send("signup"), 5000);
});

module.exports = router;
