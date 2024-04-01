const { test, after, beforeEach } = require('node:test')
const Blogs = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const helper = require('./helper')

const api = supertest(app)

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

    await api
        .post('/api/blogs')
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

    await api
        .post('/api/blogs')
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

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('Verify that deleting a single blog works correctly', async() => {
    const blogsBefore = await helper.blogsInDB()
    const id = blogsBefore[0].id

    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)

    const blogsAfter = await helper.blogsInDB()
    assert.strictEqual(blogsAfter.length, blogsBefore.length - 1)
})

test.only('Verify that updating a blog works correctly', async() => {
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

after(async () => {
    await mongoose.connection.close()
})