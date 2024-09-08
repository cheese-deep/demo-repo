const express = require("express"); //
const fs = require("fs");

const path = require("path");
const app = express();


// fs.readFile("hi.txt","utf-8",function(err,data){
//     if(err){
//         console.error("Error reading the file:",err)
//         return;
//     }
//     console.log("file contains : ", data);
// });

// try{
//     const data = fs.readFileS
// };




app.get("/", function (req, res) {

    res.send("hello from root route ");
})

app.get("/files", function (req, res) {
    const dirPath = path.join(__dirname, 'files');
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read the directory' });
        }
        else { res.status(200).json({ files }); }
    });
});

// similar function typed by self for practice 
// app.get("/files",(req,res)=>{
//     const dirPath = path.join(__dirname,'files');
//     fs.readdir(dirPath,(err,data)=>{
//         if(err){
//             return res.status(500).json({ error: "Unable to read the directory or does not exist"});
//         }
//         else{return res.status(200).json(files);}
//     });
// });

// app.get("/files/:filename", function (req, res) {
//     const name = req.params.filename;
//     fs.readFile(name,"utf-8" ,(err, data) => {
//     if (err) 
//         {
//             return res.status(400).json({ error: 'oher route not defined in the server returns 404' });
//         }
//     else{
//         return res.status(200).json(data);
//     }
//     })
//     console.log(name);
//     // return res.status(200).json(data);

// })



app.get('/file/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'files', filename); // Path to the file
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return res.status(404).send('File not found'); // File not found
        }
        return res.status(500).send('Error reading file'); // General error
      }
      res.status(200).send(data); // Send the file content
    });
  });
  
// For any other routes not defined, return 404
app.use((req, res) => {
    res.status(404).send('Route not found');
  });


app.listen(3000);


// app.listen(3000,()=>{
//     console.log("Server is running on port 3000");
// })

module.exports = app;

/*1. GET /files - Returns a list of files present in `./files/` directory
Response: 200 OK with an array of file names in JSON format.
 Example: GET http://localhost:3000/files

/**  2. GET /file/:filename - Returns content of given file by name
 Description: Use the filename from the request path parameter to read the file from `./files/` directory
 Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
 Example: GET http://localhost:3000/file/example.txt
 */