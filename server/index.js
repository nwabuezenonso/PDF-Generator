//Node js doesn't support ES6 import directly.

//express pdf for creating server and make http request
const express = require('express');
// It is responsible for parsing the incoming request bodies in a middleware before you handle i
const bodyParser = require('body-parser');
//HTML to PDF converter 
const pdf = require('html-pdf');
//CORS is for providing a Connect/Express middleware that can be used to enable CORS(Cross-Origin Resource Sharing.) with various options.
const cors = require('cors');

//a pdf document to be loaded that consist of html
const pdfTemplate = require('./documents');

//prepare express for htmlm routing
const app = express();

//create the port that the server will run on
const port = process.env.PORT || 5000;

//middle that will parse data when sent to the client
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//handling post request for create-pdf
app.post('/create-pdf', (req, res) => {
    //create pdf  with the html document and parse the data
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        //promises are widely use in http request
        //pass an error when there is an erro
        if(err) {
            res.send(Promise.reject());
        }
        //pass a data when there is result
        res.send(Promise.resolve());
    });
});

//server load a route and send a response with the sendfile(current directory and result)
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

app.listen(port, () => console.log(`Listening on port ${port}`));