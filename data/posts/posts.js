const express = require('express')

const router = express.Router()

const db = require('../db.js')





router.post('/', (req, res) => {
    if (req.body.title && req.body.contents) {
       db.insert(req.body)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    errorMessage: "Please provide title and contents for the post."
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
})

router.post('/:id/comments', (req, res) => {
    const  post_id  = req.body.post_id
    const { text } = req.body
    const comment = {...req.body}
    if (post_id && text) {
        db.insertComment(comment)
            .then(comment => {
                res.status(200).json(comment)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: "There was an error while saving the comment to the database"
                })
            })
    } else if (id === false) {
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    } else {
        res.status(400).json({
            errorMessage: "Please provide text for the comment."
        })
    }
})

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "The posts information could not be retrieved"
            })
        })
})



router.get('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: "The post information could not be retrieved."
                })
        })
})

router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
        .then(comments => {
            if (comments) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "The comments information could not be retrieved."
            })
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    db.remove(id)
        .then(id => {
            if (id > 0) {
                res.status(200).json({
                    message: 'post has been deleted'
                })

            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    const id = req.params.id
    if (id === false) {
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
        
    } else {
        if (req.body.title && req.body.contents) {
            db.update(id, changes)
                .then(post => {
                    res.status(200).json(post)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: "The post information could not be modified."
                    })
                })
        } else {
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post."
            })
        }
            
    }
})

module.exports = router;
