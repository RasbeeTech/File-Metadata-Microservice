var express = require('express');
var cors = require('cors');
var multer  = require('multer')

const app = express();

// Declare upload storage destination
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
});

// Middleware.
app.use('/public', express.static(__dirname + '/public'));
app.use(cors({optionsSuccessStatus: 200}));
var upload = multer({ storage });

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

app.post('/api/fileAnalyze', upload.single('upfile'), (req, res) => {
    let fileName = req.file.filename;
    let fileType = req.file.mimetype;
    let fileSize = req.file.size;
    res.json({
        name: fileName,
        type: fileType,
        size: Number(fileSize),
    });
});