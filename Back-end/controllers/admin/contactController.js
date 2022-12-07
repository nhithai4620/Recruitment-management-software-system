const { Contacts } = require("../../models/contact");

const contactsController = {
  addContact: async (req, res) => {
    try {
      var contact = req.body;

      Contacts.findOne({ email: contact.email }, async (err, data) => {
        if (!data) {
          const newContact = await new Contacts({
            name: contact?.name,
            email: contact?.email,
            phone: contact?.phone,
            website: contact?.website,
            location: contact?.location,
            facebook: contact?.facebook,
            linkedin: contact?.linkedin,
            twitter: contact?.twitter,
          });

          const saveContact = await newContact.save();
          res.status(200).json(saveContact);
        } else {
          res.status(500).json({
            status: "error",
            error: "Contact already exists",
            message: "Contact already exists",
          });
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  listContact: async (req, res) => {
    try {
      Contacts.find((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getContact: async (req, res) => {
    try {
      const contactId = req.params.id;
      Contacts.findById({ _id: contactId }, (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteContact: async (req, res) => {
    try {
      const contactId = req.params.id;
      console.log(contactId);
      Contacts.findByIdAndRemove({ _id: contactId }, (err, data) => {
        if (data) {
          res.status(200).json({ message: "success" });
        } else {
          res.status(500).json(err);
        }
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Delete contact fail, please try again!",
      });
    }
  },
  updateContact: async (req, res) => {
    try {
      const contactId = req.params.id;
      let contact = req.body;

      console.log(contact);

      const updateContact = await Contacts.findByIdAndUpdate(
        { _id: contactId },
        contact
      );

      res.status(200).json(updateContact);
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Update contact fail, please try again!",
      });
    }
  },
};

module.exports = contactsController;
