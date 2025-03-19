import { VFile } from "vfile";
import { DirectiveAssociation } from "./options";

export default async function validate(file:VFile, association: DirectiveAssociation, attributes: Record<string, unknown>) {
    if (association.validator) {
        const result = await association.validator["~standard"].validate(attributes)
        if (result.issues) {
            file.fail(`validation failed for element ${association.directiveName}`, {
                source: "@matfire/remark-directive-to-custom-tag",
                cause: new Error(result.issues.join(", "))
            })
        }
    }
}