const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const newUser = {
    username: 'Alex',
    name: 'Alex',
    password: 'Kalli'
}

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

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const createUser = async () => {
    const user = {
        username: newUser.username,
        name: newUser.name,
        password: newUser.password
    }
    await api
        .post('/api/users')
        .send(user)
}

const login = async (username, password) => {
    const loginResponse = await api
        .post('/api/login')
        .send({ username: username, password: password })

    return loginResponse.body.token
}

module.exports = {
    initialBlogs, initialUsers, newUser, blogsInDB, usersInDB, createUser, login
}