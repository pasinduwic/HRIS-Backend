import allowedOrigins from "./allowedOrigins.js";

const Corsoptions = {
  credentials: true,
  origin: (origin, callback) => {
    // console.log(origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // origin: "https://ydk5nw.csb.app",
};

export default Corsoptions;
