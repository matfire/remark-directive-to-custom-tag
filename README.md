# remark-directive-to-custom-tag

![NPM Version](https://img.shields.io/npm/v/%40matfire%2Fremark-directive-to-custom-tag?style=for-the-badge)

> A remark extension to automatically parse markdown directives into specified tags while preserving all the provided attributes

## Install

> [!IMPORTANT]
> You need to have install the [remark-directive](https://github.com/remarkjs/remark-directive/tree/main) extension

```bash
npm install @matfire/remark-directive-to-custom-tag
```

## Usage

```js
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkDirective from 'remark-directive'
import remarkDirectiveToCustomTag from "@matfire/remark-directive-to-custom-tag"

const html = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkDirectiveToCustomTag, {/* config goes here */})
    .process('...')
```

## Configuration Options

The configuration options are structured as such:

```js
{
    log: boolean //whether or not to allow log output (useful for debugging): defaults to false,
    associations: [
        {
            type: string; // can be either "containerDirective", "leafDirective" or "textDirective"; check the remark-directive documentation to learn more
            directiveName: string; // the name of the directive you want to select. To target a directive written like ::youtube, you would write here 'youtube'
            tagName: string; // the name of the output node tag (here I personally use webcomponents, but you do you),
            validator?: StandardSchema // optional validator. Accepts any library implementing the StandardSchema specification (includind zod, arktype and more) 
        }
    ]
}
```


