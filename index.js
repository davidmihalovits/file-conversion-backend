const express = require("express");
const multer = require("multer");
const cors = require("cors");
const upload = multer({ dest: "uploads/" });
const { uploadFile, modifyExtension } = require("./s3");

// initialize server
const app = express();

// allow cors and parse incoming JSON
app.use(cors());
app.use(express.json());

// route - upload file to s3 bucket with multer
app.post("/uploadFile", upload.single("file"), async (req, res) => {
    // file chosen by user
    const file = req.file;

    // upload file
    const result = await uploadFile(file);

    res.send(result);
});

// route - modify file extension on s3 bucket
app.put("/modifyExtension/:key", async (req, res) => {
    // get the chosen extension, file key and original name from client
    const ext = req.body.ext;
    const key = req.params.key;
    const name = req.body.filename;

    // modify file extension, delete old file
    const result = await modifyExtension({ data: ext, key, name });

    res.send(result);
});

// server runs on port 5000 locally or on Heroku environment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
