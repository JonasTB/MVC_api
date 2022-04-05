const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/database/database');
dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 3000

const app = express();
connectDB();

app.use(cors());
app.options('*', cors());
app.use(morgan('dev'));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(require('./src/view/index'));
app.all('*', require('./src/routes/index'));

app.get('/', (req, res) => {
    return res.status(200).json({ OK: 'API is running successfully' });
})

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`)});