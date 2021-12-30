const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const blog = require('./RouterHandlers/Blog/index');

const app = express();

app.use(bodyParser.json({extended: true}));
app.use(cors());

app.use('/blog', blog);

app.listen(4000,()=>{
    console.log("Server is on");
})


//  app.use(express.static(path.join(__dirname, '../build/')));

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: 'POST',
//     allowedHeaders: 'Content-Type'
// }));

// app.get('/',(req,res)=>{
//     console.log("I got the request");
// })

// app.get('/addBlog', (req,res)=>{
//     console.log("I got the addBlog request");
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// })
