import type { Node, Root } from "mdast"
import type { Transformer } from "unified"
import { visit } from "unist-util-visit"
import { Options } from "./options"
import { log } from "./utils"

const remarkDirectiveToCustomTag = (options: Options): Transformer<Root> => {
	return async function(tree: Root, file) {
		await visit(tree, async function(node: Node) {
			if (node.type === 'containerDirective' || node.type === 'leafDirective' || node.type === 'textDirective') {
				if (options.log) {
					log("found element", node.name)
				}
				const element = options.associations.find((e) => e.type === node.type && e.directiveName === node.name)
				if (!element) {
					if (options.log) {
						log("no matching association found")
					}
					return
				}
				const data = node.data || (node.data = {})
				const attributes = node.attributes || {}
				if (element.validator) {
					const result = await element.validator["~standard"].validate(attributes)
					if (result.issues) {
						file.fail(result.issues)
					}
				}
				data.hName = element.tagName
				data.hProperties = { ...attributes }
			}
		})
	}
}

export default remarkDirectiveToCustomTag
