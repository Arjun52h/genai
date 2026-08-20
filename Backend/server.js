require("dotenv").config();

const app = require("./src/config/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3000, () => {
    console.log("server is running on port 3000");
}); 

