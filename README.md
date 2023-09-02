# extract json from string

## Summary
Extract random JSON and javascript objects from a longer string

## Install
- `npm i extract-json-from-string-y`

## Example
```js
import { extractJsonFromString } from 'extract-json-from-string-y'

await test('extractJsonFromString', async (t) => {
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

```