import { describe, test, expect } from "vitest"
import { readFile } from "node:fs/promises"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import remarkDirective from "remark-directive"
import remarkDirectiveToCustomTag from "../src/index"

describe("basic test suite", () => {
	test("baseline test", async () => {
		const file = await readFile("./tests/files/normal.md", "utf-8")
		const processed = await unified().use(remarkParse).use(remarkDirective).use(remarkDirectiveToCustomTag).use(remarkRehype).use(rehypeStringify).process(file)
		expect(String(processed)).toBe("<p>this is just a regular markdown file</p>")

	})

	test("a file with a conversion", async () => {
		const file = await readFile("./tests/files/with_associated_directive.md", "utf-8")
		const processed = await unified().use(remarkParse).use(remarkDirective).use(remarkDirectiveToCustomTag, {
			associations: [
				{
					type: "leafDirective",
					directiveName: "test",
					tagName: "custom-name"
				}
			]
		}).use(remarkRehype).use(rehypeStringify).process(file)
		expect(String(processed)).toContain("<custom-name></custom-name>")


	})

	test("a file with a conversion and a non mapped directive", async () => {
		const file = await readFile("./tests/files/with_associated_directive.md", "utf-8")
		const processed = await unified().use(remarkParse).use(remarkDirective).use(remarkDirectiveToCustomTag, {
			associations: [
				{
					type: "leafDirective",
					directiveName: "test",
					tagName: "custom-name"
				}
			]
		}).use(remarkRehype).use(rehypeStringify).process(file)
		expect(String(processed)).toContain("<custom-name></custom-name>")
		//a non mapped leafDirective becomes a div
		expect(String(processed)).toContain("<div></div>")
	})

	test("translates the attributes properly", async () => {
		const file = await readFile("./tests/files/with_associated_directive.md", "utf-8")
		const processed = await unified().use(remarkParse).use(remarkDirective).use(remarkDirectiveToCustomTag, {
			associations: [
				{
					type: "leafDirective",
					directiveName: "attributes",
					tagName: "custom-name"
				}
			]
		}).use(remarkRehype).use(rehypeStringify).process(file)
		expect(String(processed)).toContain("<custom-name test=\"true\"></custom-name>")
	})
})
