import express from "express"
import fs from "fs"
import path from "path"

const port=8080;
const app=express();
const DATA_DIR="tmp/data/";
const readFileContent = (filename, lineNumber) => {
    const filePath = path.join(DATA_DIR, `${filename}.txt`);
    try {
        const data = fs.readFileSync(filePath, 'utf8').split('\n');
        if (lineNumber) {
            return data[lineNumber - 1] || 'Line number out of range';
        } else {
            return data.join('\n');
        }
    } catch (err) {
        return 'Error: File not found';
    }
};

app.get("/data",(req,res)=>{
    const {n,m} = req.query;
    if (!n) {
        return res.status(400).send("Error: 'n' parameter missing");
    }

    const lineNumber = m ? parseInt(m, 10) : null;
    const content = readFileContent(n, lineNumber);
    res.send(content);
});
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});
