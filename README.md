<h1 align="center"> gatsby-md-fenced-block  <img src="glue.png" alt="drawing" width="40"/></h1> 
<p align="center">A fenced code block generator for md/mdx files used for making gatsby pages.</p> 


## Why ?

In noraml md/mdx this \``` ``` generates a syntax highlighted code block but [gatsby-plugin-mdx](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/) or any other mdx to html coverter, while converting these md/mdx pages to html pages does not do it for you. [prism-react-renderer](prism-react-renderer) a "syntax highlighting library" gives you a REACT component but combining it with gatsby needs a bit of configuration and it doesn't work directly with markdown files.

**gatsby-md-fenced-block is a glue layer between the two ( Prism and gatsby-plugin-mdx ). It is a very small but handly library to save some of your time.** 

> **Note:** This is a part of [gatsby-md-style]() which provides styles to every html files coverted from md by gatsby. Like the quotes,tables etc. 

## Installation 

This module is distributed via npm which is bundled with node and should be installed as one of your project's `dependencies`:

```bash
# npm
npm install --save gatsby-md-fenced-block

# yarn
yarn add gatsby-md-fenced-block
```

> The module needs the latest version of REACT to be installed, please make sure to install react.


## Usage

The simple usage of the module.

```javascript
/** The module gatsby-md-fenced-block*/
import fencedBlock from "gatsby-md-fenced-block";

/** Call fencedBlock function and pass the prism-react-renderer component. Here named Code*/
let component = fencedBlock(Code)

/** Finally pass the component to MDXProvider to use fence block in md/mdx files.*/
<MDXProvider components={component}>{children}</MDXProvider>
```

## Example

> **Note:** The example assumes that you have created a gatsby project, added [gatsby-plugin-mdx](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/)  and have installed [prism-react-renderer](prism-react-renderer)

**1. Create a component (here Code)**

```javascript
/** React import */
import React from 'react'

/** prism-react-renderer import */
import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";

/** Code component with language and code props */
const Code = ({language,code}) => {
    return (
        /** Code taken directly from prism-react-renderer docs. */
        <Highlight
          {...defaultProps}
          theme={nightOwl}
          code={code}
          language={language}
        >
          {({
            className,
            style,
            tokens,
            getLineProps,
            getTokenProps,
          }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
    )
}

export default Code
```

The above code is taken from prism-react-renderer docs. The only thing to note here is that the ***language and the code shall be passed as props to this component.***

**2. In your mdx/md Layout File add this code. This code can be in a seperate layout file passed as default to gatsby-plugin-mdx options in gatsby-config file or can be added to gatsby-ssr and gatsby-browser file.**

```javascript
/** React import */
import React from "react";

/** MDX provider */
import { MDXProvider } from "@mdx-js/react";

/** Code component we created just now in step 1. */
import Code from "../components/Code";

/** The module gatsby-md-fenced-block*/
import fencedBlock from "gatsby-md-fenced-block";


/** Layout component **/
const Layout = ({ children }) => {
  return (
    /** call fencedBlock function and pass the code component */  
    <MDXProvider components={fencedBlock(Code)}>{children}</MDXProvider>
  );
};


export default Layout;

```

***That's all now using this \```  ``` in the md/mdx file will show syntax highlighting***

## API Reference

#### Replaces pre component 

```javascript
  fenceBlock(react_component)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `react_component` | `Function` | **Required** |

The function returns a object which replaces the default "pre" with the "react_component" when passed to MDXProvider.

## Style

To style the code block ( like spacing, padding, margins) select the pre tag.

```css
pre{
  /** Style goes here **/
}

```

## Attribute

The icon is taken from  <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>

## License

[MIT](https://choosealicense.com/licenses/mit/)
