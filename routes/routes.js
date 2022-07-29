const express = require('express');
const router = express.Router();
const Post = require('../model/model');

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err.message });
    }
})

router.post('/posts', async (req, res) => { 
    const post = new Post({
        title : req.body.title,
        description : req.body.description
    })
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(400).json({message : error.message});
    }
})

router.get('/posts/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);        
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

router.patch('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new : true});
        res.send(post);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
        
    }
)

router.delete('/posts/:id', async (req, res) => {
    try {
        const removedPost = await Post.findByIdAndDelete(req.params.id);
        res.json(removedPost);   
    } catch (error) {
        res.status(500).json({message : error.message});
    }
        
    }
)

module.exports = router;