import { describe, test, expect } from "vitest"
import { readFile } from "node:fs/promises"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import remarkDirective from "remark-directive"
import remarkDirectiveToCustomTag from "../src/index.js"
import { type } from "arktype"



describe("schema validation for attributes", () => {
	test("simple schema", async () => {
		const file = await readFile("./tests/files/schemas.md", "utf-8")
		const processed = await unified().use(remarkParse).use(remarkDirective).use(remarkDirectiveToCustomTag, {
			associations: [{
				type: "leafDirective",
				directiveName: "test",
				tagName: "test",
				validator: type({
					name: "string"
				})
			}]
		}).use(remarkRehype).use(rehypeStringify).process(file)
		expect(String(processed)).toBe("<test name=\"pippo\"></test>")
	})
	test("invalid schema", async () => {
		const file = await readFile("./tests/files/schemas.md", "utf-8")
		const processed = await unified().use(remarkParse).use(remarkDirective).use(remarkDirectiveToCustomTag, {
			associations: [{
				type: "leafDirective",
				directiveName: "test",
				tagName: "test",
				validator: type({
					name: "string",
					surname: "string"
				})
			}]
		}).use(remarkRehype).use(rehypeStringify).process(file)
		expect(processed.messages.pop().fatal).toBe(true)
	})
})
