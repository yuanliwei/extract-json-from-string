import test from "node:test"
import { equal, deepEqual } from "node:assert"

import { extractJsonFromString } from './index.js'

await test('extractJsonFromString', { skip: false }, async (t) => {
    await t.test('应该返回一个空数组，当输入字符串中没有 JSON', () => {
        const inputString = 'This is not a JSON'
        const expectedOutput = []
        deepEqual(extractJsonFromString(inputString), expectedOutput)
    })

    await t.test('应该返回一个包含单个 JSON 对象的数组，当输入字符串中只有一个 JSON', () => {
        const inputString = '{"name": "John", "age": 30}'
        const expectedOutput = [JSON.parse(inputString)]
        deepEqual(extractJsonFromString(inputString), expectedOutput)
    })

    await t.test('应该返回一个包含多个 JSON 对象的数组，当输入字符串中有多个 JSON', () => {
        const inputString = '{"name": "John", "age": 30};{"name": "Jane", "age": 25}'
        const expectedOutput = [
            JSON.parse('{"name": "John", "age": 30}'),
            JSON.parse('{"name": "Jane", "age": 25}')
        ]
        deepEqual(extractJsonFromString(inputString), expectedOutput)
    })

    await t.test('应该返回一个包含嵌套 JSON 对象的数组，当输入字符串中有嵌套 JSON', () => {
        const inputString = '{"person":{"name": "John", "age": 30}}'
        const expectedOutput = [JSON.parse(inputString)]
        deepEqual(extractJsonFromString(inputString), expectedOutput)
    })

    await t.test('应该返回一个包含嵌套 JSON 数组的数组，当输入字符串中有嵌套 JSON 数组', () => {
        const inputString = '{"employees":[{"name":"John", "age":30}, {"name":"Jane", "age":25}]}'
        const expectedOutput = [JSON.parse(inputString)]
        deepEqual(extractJsonFromString(inputString), expectedOutput)
    })
})


await test('extractJsonFromString', { skip: false }, async (t) => {
    await t.test('should return an empty array if no JSON is found', () => {
        const str = 'This is a test string without any JSON'
        const result = extractJsonFromString(str)

        deepEqual(result, [])
    })

    await t.test('should extract a single JSON object from the string', () => {
        const str = 'This is a test string with a JSON object {"name": "John", "age": 30}'
        const result = extractJsonFromString(str)

        equal(result.length, 1)
        deepEqual(result[0], { "name": "John", "age": 30 })
    })

    await t.test('should extract multiple JSON objects from the string', () => {
        const str = 'This is a test string with multiple JSON objects {"name": "John", "age": 30} and {"name": "Jane", "age": 25}'
        const result = extractJsonFromString(str)

        equal(result.length, 2)
        deepEqual(result[0], { "name": "John", "age": 30 })
        deepEqual(result[1], { "name": "Jane", "age": 25 })
    })

    await t.test('should handle nested JSON objects', () => {
        const str = 'This is a test string with a nested JSON object {"user": {"name": "John", "age": 30}}'
        const result = extractJsonFromString(str)

        equal(result.length, 1)
        deepEqual(result[0], { "user": { "name": "John", "age": 30 } })
    })

    await t.test('should handle JSON arrays', () => {
        const str = 'This is a test string with a JSON array [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
        const result = extractJsonFromString(str)

        equal(result.length, 1)
        deepEqual(result[0], [{ "name": "John", "age": 30 }, { "name": "Jane", "age": 25 }])
    })

    await t.test('should handle invalid JSON strings', () => {
        const str = 'This is a test string with an invalid JSON object {"name": "John, "age": 30}'
        const result = extractJsonFromString(str)

        deepEqual(result, [])
    })
})

await test('extractJsonFromString should return an array of extracted JSON objects', { skip: false }, async (t) => {
    // 包含一个JSON对象
    deepEqual(extractJsonFromString('{ "name": "John", "age": 25 }'), [{ "name": "John", "age": 25 }])

    // 包含多个JSON对象
    deepEqual(extractJsonFromString('{ "name": "John" } { "name": "Jane" }'), [{ "name": "John" }, { "name": "Jane" }])

    // 包含嵌套的JSON对象
    deepEqual(extractJsonFromString('{ "name": "John", "address": { "city": "New York" } }'), [{ "name": "John", "address": { "city": "New York" } }])

    // 包含特殊字符的JSON对象
    deepEqual(extractJsonFromString('{ "name": "John", "color": "green/blue" }'), [{ "name": "John", "color": "green/blue" }])

    // 包含特殊字符的JSON对象（转义字符）
    deepEqual(extractJsonFromString('{ \'name\': "John", "color": "green\\/blue" }'), [{ "name": "John", "color": "green/blue" }])

    // 包含无效的JSON对象
    deepEqual(extractJsonFromString('{ "name": "John" }] [{ "name": "Jane" }[{ "name": "Jane" }]'), [{ "name": "John" }, { "name": "Jane" }, [{ "name": "Jane" }]])

    // 多层嵌套
    deepEqual(extractJsonFromString('------>{"a":{"b":{"c":{"d":{"e":{"f":{"g":{"a":{"b":{"c":{"d":{"e":{"f":{"g":{"a":{"b":{"c":{"d":{"e":{"f":{"g":{}}}}}}}}}}}}}}}}}}}}}}<------------'),
        [{ a: { b: { c: { d: { e: { f: { g: { a: { b: { c: { d: { e: { f: { g: { a: { b: { c: { d: { e: { f: { g: {} } } } } } } } } } } } } } } } } } } } } }])

    // 空字符串
    deepEqual(extractJsonFromString(''), [])

    // 不包含JSON对象的字符串
    deepEqual(extractJsonFromString('Hello World'), [])
})

await test('extractJsonFromString', { skip: false }, async (t) => {
    await t.test('should return an array of extracted JSON objects from a given string', () => {
        const str = 'This is a test string with {"name": "John", "age": 30} and {"name": "Jane", "age": 25} JSON objects.'
        const expected = [
            { "name": "John", "age": 30 },
            { "name": "Jane", "age": 25 }
        ]
        deepEqual(extractJsonFromString(str), expected)
    })

    await t.test('should return an empty array if no JSON object is found in the string', () => {
        const str = 'This is a test string without any JSON objects.'
        deepEqual(extractJsonFromString(str), [])
    })

    await t.test('should return an array with a single JSON object if only one JSON object is found in the string', () => {
        const str = 'This is a test string with only one {"name": "John", "age": 30} JSON object.'
        const expected = [{ "name": "John", "age": 30 }]
        deepEqual(extractJsonFromString(str), expected)
    })

    await t.test('should handle special characters in the string and JSON objects', () => {
        const str = 'This is a test string with {"name": "John", "age": 30, "description": "Special chara}cters: \\"%$#@!^&*()\\", \\"{Key}\\""} and {"name": "Jane", "age": 25, "description": "\\"Special\\" characters: \\"%$#@!^&*(){}[]\\""} JSON objects.'
        const expected = [
            { "name": "John", "age": 30, "description": 'Special chara}cters: "%$#@!^&*()", "{Key}"' },
            { "name": "Jane", "age": 25, "description": '"Special" characters: "%$#@!^&*(){}[]"' }
        ]
        deepEqual(extractJsonFromString(str), expected)
    })

    await t.test('should handle special characters in the string and JSON objects', () => {

        const str = 'This is a test string with {"na m\ne": "John", "age": 30, "description": "Special chara}cters: \\"%$#@!^&*()\\", \\"{Key}\\""} and {"name": "Jane", "age": 25, "description": "\\"Special\\" characters: \\"%$#@!^&*(){}[]\\""} JSON objects.'
        const expected = [
            { "name": "Jane", "age": 25, "description": '"Special" characters: "%$#@!^&*(){}[]"' }
        ]
        deepEqual(extractJsonFromString(str), expected)

    })

    await t.test('should handle special characters in the string and JSON objects', () => {

        const str = 'This is a test string with {"na me": "Jo\nhn", "age": 30, "description": "Special chara}cters: \\"%$#@!^&*()\\", \\"{Key}\\""} and {"name": "Jane", "age": 25, "description": "\\"Special\\" characters: \\"%$#@!^&*(){}[]\\""} JSON objects.'
        const expected = [
            { "name": "Jane", "age": 25, "description": '"Special" characters: "%$#@!^&*(){}[]"' }
        ]
        deepEqual(extractJsonFromString(str), expected)

    })

    await t.test('should handle special characters in the string and JSON objects', () => {

        const str = 'This is a test string with {"ok":true, "notok":  false,} {"mobile": null, "age": 30,  } and {"name": "Jane", "age": 25, "description": "\\"Special\\" characters: \\"%$#@!^&*(){}[]\\""} JSON objects.'
        const expected = [
            { "ok": true, "notok": false },
            { "mobile": null, "age": 30, },
            { "name": "Jane", "age": 25, "description": '"Special" characters: "%$#@!^&*(){}[]"' }
        ]
        deepEqual(extractJsonFromString(str), expected)

    })

})

test('extract json 1', async () => {
    // node --test-name-pattern="^extract json 1$" index.test.js
    const str = `This is a test string with {ok:true, 'notok':  false,}`
    const expected = [
        { "ok": true, "notok": false },
    ]
    deepEqual(extractJsonFromString(str), expected)
})