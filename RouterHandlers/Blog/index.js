const express = require('express');
const { MongoClient } = require('mongodb');
const { getAllBlogs, addBlog, editBlog, deleteBlog } = require('./allHandlers');

const url = 'mongodb+srv://HimanshuYadav:bJD0E1aG4OfMPMCM@cluster0.zmg0v.mongodb.net/blogsList?retryWrites=true&w=majority';
const client = new MongoClient(url);

const router = express.Router();

router.get('/',getAllBlogs(client));
router.post('/',addBlog(client));
router.put('/', editBlog(client));
router.delete('/:blogId', deleteBlog(client));

module.exports = router;
