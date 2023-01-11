const { GetAll,getById,Create,Update,Delete  } = require("../Controllers/AdminController");
const router = require("express").Router();

router.post("/create", Create);
router.get("/get/:id", getById);
router.get("/all", GetAll);
router.post("/update", Update);
router.delete("/delete/:id", Delete);

module.exports = router;