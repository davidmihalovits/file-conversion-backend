const express = require("express");
const multer = require("multer");
const cors = require("cors");
const upload = multer({ dest: "uploads/" });
const { uploadFile, modifyExtension } = require("./s3");

const app = express();

app.use(cors());
app.use(express.json());

// upload file to s3 bucket - route
app.post("/uploadFile", upload.single("file"), async (req, res) => {
    const file = req.file;

    const result = await uploadFile(file);

    res.send(result);
});

// modify file extension on s3 bucket - route
app.put("/modifyExtension/:key", async (req, res) => {
    const ext = req.body.ext;
    const key = req.params.key;
    const name = req.body.filename;

    const result = await modifyExtension({ data: ext, key, name });

    res.send(result);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
