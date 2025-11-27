require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const sequelize = require('./config/database');
const profileRoutes = require('./routes/profileRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json()); 
app.use(express.json()); 

app.use('/api', profileRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Connected to PostgreSQL');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('Database synced successfully');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.log('Server startup failed due to database error. Details:', err.message);
        process.exit(1); 
    });