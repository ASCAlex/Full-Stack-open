const { test, describe } = require('node:test')
const assert = require('node:assert')
const average = require('../utils/for_testing').average

describe('average', () => {
    test('average of [6, 6, 6]', () => {
        const result = average([6, 6, 6])

        assert.strictEqual(result, 6)
    })

    test('average of [1, 2, 3, 4, 5]', () => {
        assert.strictEqual(average([1, 2, 3, 4, 5]), 3)
    })

    test('average of [1, 3, 5, 7]', () => {
        const result = average([1, 3, 5, 7])

        assert.strictEqual(result, 4)
    })

    test('average of []', () => {
        const result = average([])

        assert.strictEqual(result, 0)
    })
})
