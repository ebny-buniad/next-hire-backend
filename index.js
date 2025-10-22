const express = require('express')
require('dotenv').config()
const app = express()
const port = 3000 || process.env.port
const cors = require('cors')
const { connectDB } = require('./config/database')
app.use(cors())
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const planRoutes = require('./routes/planRoutes');
const companyProfileRouter = require('./routes/companyProfileRouter');

app.get('/', (req, res) => {
    res.send('Next hire is runnning');
})

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/company', companyProfileRouter);

app.listen(port, () => {
    console.log(`Next hire on port ${port}`)
})
