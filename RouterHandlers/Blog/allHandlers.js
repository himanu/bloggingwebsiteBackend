const { ObjectId } = require('mongodb');
function addBlog(client) {
    return async(req,res,next)=>{
        try {
            await client.connect();
            console.log('connected to server');
            const database = client.db();
            const isBlogAlreadyPresent = await database.collection('yourBlogs').findOne({title: req.body.title});
            console.log(isBlogAlreadyPresent);
            if(!isBlogAlreadyPresent) {
                await database.collection('yourBlogs').insertOne({
                    title: req.body.title,
                    body: req.body.body,
                });
                console.log("Collection inserted");
                res.status(200).json("Collection is inserted");
            } else {
                console.log("Blog is already present with same title");
                res.status(205).json("Blog with same title is already present");
            }
        } catch(err) {
            console.log(err);
            res.status(500).json("Something went wrong on the server");
        }
    }
}

function getAllBlogs(client) {
    return async(req,res)=>{
        try {
            await client.connect();
            console.log('connected to server');
            const database = client.db();
            const collection = database.collection('yourBlogs');
            const documents = await collection.find();
            let arr = [];
            await documents.forEach((doc)=>{
                arr = [...arr, doc];
            });
            res.send(arr);
    
        } catch(err){
            console.log(err);
        }
    }
}

function editBlog(client) {
    return async(req,res,next)=>{
        console.log(req.body);
        try {
            await client.connect();
            const collection = client.db().collection('yourBlogs');
            await collection.updateOne({
                _id: new ObjectId(req.body.id)
            }, {
               $set: {
                   title: req.body.title,
                   body: req.body.body
               } 
            })
            console.log("Collection updated");
            res.end();
        } catch(err) {
            console.log(err);
            res.status(400).send("Error");
        }
    }
}

function deleteBlog(client) {
    return async (req,res)=>{
        console.log(req.params);
        try {
            await client.connect();
            const collection = client.db().collection('yourBlogs');
            await collection.deleteOne({
                _id: new ObjectId(req.params.blogId)
            })
            console.log("Collection deleted");
            res.end();
        } catch(err) {
            console.log(err);
            res.status(400).send("Error");
        }
    }
}
module.exports = {getAllBlogs, addBlog, editBlog, deleteBlog};