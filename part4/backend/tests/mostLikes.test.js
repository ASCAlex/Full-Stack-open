const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('mostLikes', () => {
    test('when list has only one blog, return that author', () => {
        assert.deepStrictEqual(listHelper.mostLikes(listHelper.listWithOneBlog), { author: 'Edsger W. Dijkstra', likes: 5 })
    })

    test('when list has more entries, return author with most likes', () => {
        assert.deepStrictEqual(listHelper.mostLikes(listHelper.blogs), { author: 'Edsger W. Dijkstra', likes: 17 })
    })

    test('when list is empty, return 0', () => {
        assert.deepStrictEqual(listHelper.mostLikes([]), 0)
    })
})