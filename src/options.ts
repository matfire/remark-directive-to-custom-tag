export interface Options {
	log?: boolean;
	associations: Array<DirectiveAssociation>;
}


interface DirectiveAssociation {
	type: 'containerDirective' | 'leafDirective' | 'textDirective';
	directiveName: string;
	tagName: string;
}
