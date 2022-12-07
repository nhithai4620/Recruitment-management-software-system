const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/email/sendEmail");

const sendEmailController = {
  sendEmail: async (req, res) => {
    try {
      const email = sendEmail(
        req.body.to,
        req.body.title,
        { content: req.body.content, file: req.body?.document },
        "./template/emailtempalte.handlebars"
      );

      return res.status(200).json("send mail success");
    } catch (err) {
      res.status(500).json(err, { err: "Something went wrong" });
    }
  },
};

module.exports = sendEmailController;
