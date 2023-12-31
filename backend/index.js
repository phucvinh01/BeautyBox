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
const orderRoute = require("./routes/order");
const distributorRoute = require("./routes/distributor")
const collectionRoute = require("./routes/collection")
const empRoute = require("./routes/emp")
const receiptRoute = require("./routes/receipt")

const { task } = require('./task/discountScheduler')
dotenv.config();
//CONNECT DATABASE
const passDb = process.env.passDb
const db = process.env.MONGODB_URL
const connect = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
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

app.use("/v1/order", orderRoute)

app.use("/v1/distributor", distributorRoute)

app.use("/v1/collection", collectionRoute)

app.use("/v1/emp", empRoute)

app.use("/v1/receipt", receiptRoute)

task.start()

const PORT = 8000

app.listen(PORT, () => {
  connect()
  console.log("Server is running...", PORT);
});
