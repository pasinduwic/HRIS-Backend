import mongoose from "mongoose";
const mongooseConnectionString =
  "mongodb+srv://pasinduw:pasiD%40nc12345@psd1st.wtff6.mongodb.net/BusinessSystem?retryWrites=true&w=majority";

mongoose
  .connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log("error");
    console.log(e);
  });
