import express from "express";
import "./db/mongoose.js";
import officeRouter from "./routers/office-router.js";
import salaryRouter from "./routers/salary-router.js";
import payrolRouter from "./routers/payrol-router.js";
import leaveRecordrRouter from "./routers/leave-records-router.js";
import employeeRouter from "./routers/employee-router.js";
import departmentRouter from "./routers/dept-router.js";
import attendanceRouter from "./routers/attendance-router.js";
import designationRouter from "./routers/designation-router.js";
import leaveRouter from "./routers/leave-router.js";
import userRouter from "./routers/user-router.js";
import verifyJWT from "./middleware/verifyJWT.js";
import Credentials from "./middleware/credentials.js";
import Corsoptions from "./middleware/corsOptions.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// require("./db/mongoose");

const app = express();

const port = 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Credentials);
app.use(cors(Corsoptions));

// routers
app.use(userRouter);

//verify JWT
app.use(verifyJWT);

app.use(officeRouter);
app.use(salaryRouter);
app.use(payrolRouter);
app.use(leaveRecordrRouter);
app.use(employeeRouter);
app.use(departmentRouter);
app.use(attendanceRouter);
app.use(designationRouter);
app.use(leaveRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
