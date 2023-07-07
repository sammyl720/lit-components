# A Lit Web Components Library

This is a library of web components built using Lit and TypeScript. The library is bundled with Rollup and can be used in any JavaScript or TypeScript project.

## Installation

To install the library in your project, run:

```bash
npm install @sammyl/lit-components
```

## Usage

Import individual components like this:

```javascript
import { SimpleLink } from '@sammyl/lit-components';
```

Then you can use them in your HTML:

```html
<lwc-simple-link 
  href="https://github.com/sammyl720/lit-components" 
  text="Github Link">
</lwc-simple-link>
```

Or you can import multiple components from the main entry point:

```javascript
import { LwcExpandingText, SimpleLink } from '@sammyl/lit-components';
```


### In a simple HTML file

You can also use the library directly in an HTML file through Unpkg:

```html
<script type="module">
  import { SimpleButton, SimpleLink } from 'https://unpkg.com/@sammyl/lit-components@latest';
</script>

<lwc-simple-link href="https://github.com" text="Github Link"></lwc-simple-link>
<lwc-expanding-text
  lines="5"
  text="Web development forms the backbone of the digital universe. It comprises of a plethora of languages like HTML, CSS, and JavaScript, each with specific functions. With billions of websites online, each has a unique DNA coded by developers. Responsive design is now a standard, ensuring sites adapt to any device. Ever-evolving, the field embraces advancements such as Web 3.0, emphasizing machine learning and semantic metadata. APIs now facilitate seamless interconnectivity between platforms, improving user experience. Constant learning remains key, as frameworks like React and Angular redefine the landscape. Security and privacy also remain paramount in web development."
  >
</lwc-expanding-text>

```

---
#### [See components](./components.md)
---

## Building

To build the library, run:

```bash
npm run build
```

This command will compile the TypeScript code into JavaScript, bundle the components, and put the bundle into the `dist` directory.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
