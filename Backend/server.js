// require("dotenv").config();

// const app = require("./src/config/app");
// const connectToDB = require("./src/config/database");

// connectToDB();

// app.listen(3000, () => {
//     console.log("server is running on port 3000");
// }); 

require("dotenv").config();

const app = require("./src/config/app");
const connectToDB = require("./src/config/database");

connectToDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`server is running on port ${PORT}`);
});