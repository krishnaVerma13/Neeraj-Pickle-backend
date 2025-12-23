const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const connectDB = require('./configer/dbConnect')
const path = require('path');

connectDB()
const app = express();
app.use(cors(
  {
    origin:["http://localhost:5173",
      "https://neeraj-traders.vercel.app",
      "neeraj-traders-krishnaverma13s-projects.vercel.app"],
    credentials: true
  }
));
app.use("/uploads/product", express.static(path.join(__dirname, "../uploads/product")))
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.use('/user',userRoutes)
app.use('/admin',adminRoutes) 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});
