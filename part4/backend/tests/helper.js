const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Hello World',
        author: 'Alex Scheick',
        url: 'https://www.google.com/',
        likes: 5
    },
    {
        title: 'Hello Earth',
        author: 'Alex Scheick',
        url: 'https://www.bing.com/',
        likes: 2
    }
]

const blogsInDB = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDB
}