const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('totalLikes', () => {

    test('when list has only one blog, equals the likes of that', () => {
        assert.strictEqual(listHelper.totalLikes(listHelper.listWithOneBlog), 5)
    })

    test('combine all likes of the entries in blogs', () => {
        assert.strictEqual(listHelper.totalLikes(listHelper.blogs), 36)
    })
})