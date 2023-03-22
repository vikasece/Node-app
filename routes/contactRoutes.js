const express = require("express");
const {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
} = require("../controllers/contractController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.use(validateToken);

router.route("/").get(getContacts).post(addContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
