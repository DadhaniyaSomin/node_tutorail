const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const {logger} = require('./middleware/logEvents');
const cors = require('cors');

//custom middleware
app.use(logger);

//cors 
app.use(cors());

//build in middleware // handle form data
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/public')));


//routes
app.get('^/$|/index(.html)?', (req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    
});



app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html'))
    {
        res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json("404 not found");
    }
})

app.listen(PORT, ( ) => console.log(`Server running on port ${PORT}`));