const { test, after, beforeEach} = require('node:test')
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

test.only('verify that identifier of a blog is id not _id', async () => {
    const blogs = await helper.blogsInDB()
    const blogToView = blogs[0]

    const response = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)

    assert.strictEqual(response.body.id, blogToView.id)
})

after(async () => {
    await mongoose.connection.close()
})