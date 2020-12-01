require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT;
const saveLocation = process.env.SAVE_LOCATION || __dirname;
console.log(`save location: ${saveLocation}`);

app.use(fileUpload());
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/upload", (req, res) => {
    res.redirect("/");
});

app.get("/files", async (req, res) => {
    const files = fs.readdirSync(saveLocation);
    res.send({ files });
});

app.get("/file/:name", async (req, res) => {
    const requestedFile = req.params.name;
    console.log(`Download of file ${requestedFile} requested!`);
    res.sendFile(path.join(__dirname, saveLocation, requestedFile));
});

app.post("/upload", async (req, res) => {
    try {
        const file = req.files.file;
        console.log(`Received file: ${file.name}, Size: ${file.size}`);
        const filePath = path.join(saveLocation, file.name);
        console.log(`Writing file to: ${filePath}`);
        fs.writeFile(filePath, file.data, (err) => console.log(err ?? `File successfully written!`));
        res.send("File received.");

    } catch(err) {
        console.log(err);
        res.sendStatus(415);
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}!`));
