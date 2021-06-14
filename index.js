var express = require('express');
var cors = require('cors');
const app = express();

// Middleware.
app.use('/public', express.static(__dirname + '/public'));
app.use(cors({optionsSuccessStatus: 200}));

// Listen to port.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// Routes.
app.get('/', (req, res) => {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});