const { Router } = require("express");

const { renderPlanner, renderErrorPage } = require("../controllers/views");

const router = Router();

router.get("/", renderPlanner);
router.get("*", renderErrorPage);

module.exports = router;
