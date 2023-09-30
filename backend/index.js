const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const brandRoute = require("./routes/brand");
const categoryRoute = require("./routes/category");
const cartRoute = require("./routes/cart");

dotenv.config();
//CONNECT DATABASE

const connect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/GHN');
    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connected failed");
  }
}
app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

//ROUTES
app.use("/v1/product", productRoute);

app.use("/v1/user", userRoute)

app.use("/v1/auth", authRoute)

app.use("/v1/brand", brandRoute)

app.use("/v1/category", categoryRoute)

app.use("/v1/cart", cartRoute)

app.listen(8000, () => {
  connect()
  console.log("Server is running...");
});
