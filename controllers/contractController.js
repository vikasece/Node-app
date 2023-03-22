const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route Get /api/contact
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc get one contact
//@route Get /api/contact/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

//@desc add contact
//@route Create /api/contact
//@access private

const addContact = asyncHandler(async (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    res.status(401);
    throw new Error("all the fields are mandatory");
  }
  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.json(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.json(403);
    throw new Error(
      "User don't have necessary permission to update the contact "
    );
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc delete contact
//@route delete /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.json(403);
    throw new Error(
      "User don't have necessary permission to delete the contact "
    );
  }
  await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
