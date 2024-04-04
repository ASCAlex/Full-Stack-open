const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
    {
        username: 'Gustav',
        name: 'Gustav',
        passwordHash: '$2b$10$3FHV9aV/3igJKOC7Q.3XSeI37i08oZh9PY1XzZ3YqJr14unzfx/j2'
    },
    {
        username: 'Hans',
        name: 'Hans',
        passwordHash: '$2b$10$3FHV9aV/3igJKC07Q.3XSeI37i08oZh9PY1XzZ3YqJr14unzfx/j2'
    }
]

const blogsInDB = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async() => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, blogsInDB, usersInDB
}