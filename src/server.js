const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const connectDB = require('./configer/dbConnect')

connectDB()
const app = express();
app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials: true
}
));
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
