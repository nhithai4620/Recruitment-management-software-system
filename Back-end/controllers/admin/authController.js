const { Admin } = require("../../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Token } = require("../../models/token");
const sendEmail = require("../../utils/email/sendEmail");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

let refreshTokens = [];

const clientURL = process.env.CLIENT_URL;

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      Admin.findOne({ username: username }, async (err, data) => {
        if (data) {
          const validPassword = await bcrypt.compare(password, data.password);
          if (validPassword) {
            const accessToken = authController.generateAccessToken(data);
            const refreshToken = authController.generateRefreshToken(data);
            refreshTokens.push(refreshToken);

            res.status(200).json({
              message: "success",
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          } else {
            res.status(403).json({
              status: "error",
              error: "UnauthorizedException",
              message: "Unauthorized",
            });
          }
        } else {
          res.status(403).json({
            status: "error",
            message: "This email is not regestered! please register",
          });
        }
      });
    } catch (error) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      Admin.findOne({ username: email }, async (err, data) => {
        if (data) {
          let token = await Token.findOne({ userId: data._id });
          if (token) await token.deleteOne();
          let resetToken = crypto.randomBytes(32).toString("hex");
          const hash = await bcrypt.hash(resetToken, Number(10));

          await new Token({
            userId: data._id,
            token: hash,
            createdAt: Date.now(),
          }).save();

          const link = `${clientURL}/#/reset-password?token=${resetToken}&id=${data._id}`;

          sendEmail(
            email,
            "Password Reset Request",
            { link: link },
            "./template/requestResetPassword.handlebars"
          );

          return res.json("send mail success");
        } else {
          res.status(403).json({
            status: "error",
            message: "Wrong account!",
          });
        }
      });
    } catch (error) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const admin = await new Admin({
        username: req.body.username,
        password: hashed,
      });

      Admin.findOne({ username: req.body.username }, async (err, data) => {
        if (!data) {
          const saveAdmin = await admin.save();
          res.status(200).json(saveAdmin);
        } else {
          res
            .status(500)
            .json({ status: "error", error: "Username already in use" });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  resetPassword: async (req, res) => {
    try {
      let { password, token, userId } = req.body;
      if (!req.body.userId) {
        res
          .status(403)
          .json({ error: "error", message: "Authentication error" });
      }
      Token.findOne({ userId }, async (err, data) => {
        if (!data) {
          res.status(401).json({
            status: "error",
            message: "Invalid or expired password reset token",
          });
        } else {
          const isValid = await bcrypt.compare(token, data.token);
          if (!isValid) {
            res.status(401).json({
              status: "error",
              message: "Invalid or expired password reset token",
            });
          } else {
            const hash = await bcrypt.hash(password, Number(10));
            const saveAdmin = await Admin.updateOne(
              { _id: userId },
              { $set: { password: hash } },
              { new: true }
            );
            res.status(200).json(saveAdmin);
          }
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(403).json("You're not authenticated");

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },
};

module.exports = authController;
