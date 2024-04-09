const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    if (!body.title || !body.url) {
        return response.status(400).end()
    }

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user,
        likes: body.likes
    })
    const result = await newBlog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    if (!await Blog.findById(request.params.id)) {
        return response.status(401).json({ error: 'blogID invalid' })
    }
    const user = request.user
    console.log(user)
    const blog = await Blog.findById(request.params.id)
    //console.log(blog.user.toString())
    console.log(user.id)
    if (blog.user.toString() === user.id) {
        console.log('Test')
        await Blog.findByIdAndDelete(request.params.id)
        console.log('Test')
        return response.status(204).end()
    } else {
        return response.status(401).json({ error: 'invalid user' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true, context: 'query' })
    response.json(updatedBlog)
})

module.exports = blogsRouter