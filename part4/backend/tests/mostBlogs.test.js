const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('mostBlogs', () => {
    test('when list has only one blog, return that author', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(listHelper.listWithOneBlog), {author: 'Edsger W. Dijkstra', blogs: 1})
    })

    test('when list has more entries, return author with most blogs', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(listHelper.blogs), {author: 'Robert C. Martin', blogs: 3})
    })

    test('when list is empty, return 0', () => {
        assert.deepStrictEqual(listHelper.mostBlogs([]), 0)
    })
})