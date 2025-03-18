import type { Node, Root } from "mdast"
import { visit } from "unist-util-visit"
import { Options } from "./options"
import { log } from "./utils"

const remarkDirectiveToCustomTag = (options: Options) => {
	return function(tree: Root) {
		visit(tree, function(node: Node) {
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
				data.hName = element.tagName
				data.hProperties = { ...attributes }
			}
		})
	}
}

export default remarkDirectiveToCustomTag
