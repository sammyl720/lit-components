# LwcExpandingText Component

The `LwcExpandingText` is a web component created using Lit, a simple and lightweight JavaScript library. It provides a functionality of an expandable/collapsible text block, which can be used to manage the visibility of large content areas.

Initially, the component displays a limited number of lines from the provided text, and if the text is more than the set limit, a button saying "Show more" appears at the bottom. Clicking this button will expand the text block to show all the text and change the button label to "Show less". If the button is clicked again, the text block will collapse back to show the limited number of lines.

## Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `text` | String | The text content to be displayed in the expanding text component. The default value is 'lwc-expanding-text loaded!'. |
| `lines` | Number | The number of lines to display when the text block is collapsed. The default value is 3. |

## Usage

Here is an example of how to use the `LwcExpandingText` component:

```html
<lwc-expanding-text text="This is a long text that needs to be expanded..." lines="3"></lwc-expanding-text>
```

This example will create an expanding text block that initially displays 3 lines of the provided text. If the text is longer than 3 lines, a "Show more" button will be displayed at the bottom. When clicked, it will expand to show all the text and the button label will change to "Show less". When the "Show less" button is clicked, the text block will collapse back to showing only the first 3 lines of text.