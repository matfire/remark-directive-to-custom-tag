import { StandardSchemaV1 } from "../node_modules/@standard-schema/spec/dist/index";

export interface Options {
	log?: boolean;
	associations: Array<DirectiveAssociation>;
}


interface DirectiveAssociation {
	type: 'containerDirective' | 'leafDirective' | 'textDirective';
	directiveName: string;
	tagName: string;
	validator?: StandardSchemaV1
}
