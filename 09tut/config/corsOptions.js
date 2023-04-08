const whitelist = [
  "https://www.yoursite.com",
  "https://localhost:3500",
  "https://www.google.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatu: 200,
};

module.exports = corsOptions;
