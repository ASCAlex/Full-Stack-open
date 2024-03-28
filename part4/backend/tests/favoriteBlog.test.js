const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('Most favorite Blog', () => {

    test('when list has only one blog, return that blog', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(listHelper.listWithOneBlog), {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('when list has more entries, return the one with most likes', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog(listHelper.blogs), {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })

    test('when list is empty return 0', () => {
        assert.deepStrictEqual(listHelper.favoriteBlog([]), 0)
    })
})