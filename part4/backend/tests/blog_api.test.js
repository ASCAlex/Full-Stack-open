const { test, after, beforeEach, describe } = require('node:test')
const Blogs = require('../models/blog')
const Users = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const helper = require('./helper')

const api = supertest(app)

beforeEach(async () => {
    await Blogs.deleteMany({})
    await Users.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blogs(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    const userObjects = helper.initialUsers
        .map(user => new Users(user))
    const promiseArray2 = userObjects.map(user => user.save())
    await Promise.all(promiseArray2)
})

describe('blogTests', () => {
    beforeEach(async () => {
        await Blogs.deleteMany({})

        const blogObjects = helper.initialBlogs
            .map(blog => new Blogs(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('verify that a get request returns the correct amount of blogs in JSON format', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('verify that identifier of a blog is id not _id', async () => {
        const blogs = await helper.blogsInDB()
        const blogToView = blogs[0]

        const response = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)

        assert.strictEqual(response.body.id, blogToView.id)
    })

    test('verify that POST creates a new blog post', async() => {
        const newBlog = {
            title: 'Hello Darkness',
            author: 'Alex Scheick',
            url: 'https://www.google.com/',
            likes: 11
        }
        await helper.createUser()
        const token = await helper.login(helper.newUser.username, helper.newUser.password)

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await helper.blogsInDB()
        assert.strictEqual(blogsAfter.length, helper.initialBlogs.length + 1)

        const titles = blogsAfter.map(b => b.title)
        assert(titles.includes('Hello Darkness'))
    })

    test('Verify likes are 0 on default if likes-property is missing', async() => {
        const newBlog = {
            title: 'Hello Darkness',
            author: 'Alex Scheick',
            url: 'https://www.google.com/',
        }
        await helper.createUser()
        const token = await helper.login(helper.newUser.username, helper.newUser.password)

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await helper.blogsInDB()
        const blog = blogsAfter.find(b => b.title === 'Hello Darkness')
        assert(blog.likes === 0)
    })

    test('Verify that if URL or title is not passed return status code 400', async() => {
        const newBlog = {
            author: 'Alex Scheick',
            likes: 7
        }
        await helper.createUser()
        const token = await helper.login(helper.newUser.username, helper.newUser.password)

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('Verify that deleting a single blog works correctly', async() => {
        const newBlog = {
            title: 'Hello Darkness',
            author: 'Alex Scheick',
            url: 'https://www.google.com/',
        }
        await helper.createUser()
        const token = await helper.login(helper.newUser.username, helper.newUser.password)

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsBefore = await helper.blogsInDB()
        const id = blogsBefore[2].id
        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAfter = await helper.blogsInDB()
        assert.strictEqual(blogsAfter.length, blogsBefore.length - 1)
    })

    test('Verify that updating a blog works correctly', async() => {
        const newBlog = {
            title: 'Good Morning',
            author: 'Gustav Johnson',
            url: 'http://www.google.com',
            likes: 3
        }

        const blogs = await helper.blogsInDB()
        const id = blogs[0].id

        const response = await api
            .put(`/api/blogs/${id}`)
            .send(newBlog)

        assert.strictEqual(response.body.title, newBlog.title)
    })

    test('Verify that adding a blog with wrong token returns status code 401', async() => {
        const newBlog = {
            title: 'Good Morning',
            author: 'Gustav Johnson',
            url: 'http://www.google.com',
            likes: 3
        }

        const token = 'eyKhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFsZXgiLCJpZCI6IjY2MTRlYzJlNGExYTRlYTNmZGQ3N2NlZSIsImlhdCI6MTcxMjY0NzIxNH0.7yuoFPgCmFnMtvs9zHlFZAjy3BGwdWp1oXJ-oakVNu4'

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(401)
    })
})

describe('userTests', () => {
    beforeEach(async () => {
        await Users.deleteMany({})

        const userObjects = helper.initialUsers
            .map(user => new Users(user))
        const promiseArray = userObjects.map(user => user.save())
        await Promise.all(promiseArray)
    })
    test('Verify invalid users are not created and response with correct status code and error message', async() => {
        const user = {
            username: 'ha',
            name: 'Gustav',
            password: 'Sappa'
        }

        const users = await helper.usersInDB()

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.error, 'username must be longer than 3 characters')

        const usersAfter = await helper.usersInDB()
        assert.strictEqual(users.length, usersAfter.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})