const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const newBlog = new Blog(request.body)

    newBlog.save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter