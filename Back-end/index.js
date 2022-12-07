const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");

const { multerUploads } = require("./utils/multer");

const { uploadStorage } = require("./utils/multerFile");

const authRouter = require("./routes/users/auth");

const authAdminRouter = require("./routes/admin/auth");

const userRouter = require("./routes/users/user");

const uploadRouter = require("./routes/upload");

const sendEmail = require("./routes/sendMail");

const dashboard = require("./routes/dashboard");

const adminRouter = require("./routes/admin/company");

const jobRequisition = require("./routes/admin/jobRequisition");

const candidates = require("./routes/admin/candidates");

const activities = require("./routes/admin/activities");

const contacts = require("./routes/admin/contact");

const tagRouter = require("./routes/admin/tag");

var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors(
    { origin: "http://localhost:4200" },
    // { origin: "http://localhost:59057" },
    { origin: "http://localhost:52986" }
  )
);
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ keepExtensions: true, uploadDir: "uploads" }));
app.engine("jade", require("jade").__express);

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to mongoDB");
});

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users/me", userRouter);

app.use("/api/v1/admin/auth", authAdminRouter);

app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/requisitions", jobRequisition);

app.use("/api/v1/candidates", candidates);

app.use("/api/v1/activities", activities);

app.use("/api/v1/contacts", contacts);

app.use("/api/v1/upload", multerUploads, uploadRouter);

app.use("/api/v1/uploadFile", uploadStorage, uploadRouter);

app.use("/api/v1/send-mail", sendEmail);

app.use("/api/v1/dash-board", dashboard);

app.use("/api/v1/tags", tagRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
