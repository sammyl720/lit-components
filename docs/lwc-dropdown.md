# LwcDropdown Component

This is a web component created using Lit, a simple and lightweight JavaScript library. The component is called `LwcDropdown` and it represents a dropdown menu that the user can interact with. 

This dropdown menu displays a list of items and allows the user to select an item from the list. The component provides a way to customize the displayed title and the list of items. It also emits an event when an item is selected.

When the dropdown is not active, it shows only the title with an arrow icon indicating the dropdown action. When clicked, the dropdown expands to show the list of items.

## Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `title` | String | The title displayed on the dropdown button. Default value is "lwc-dropdown loaded!". |
| `items` | Array<DropdownItem> | An array of items to be displayed when the dropdown is open. Each item in the array is an object with a `text` property. |

> Note: The `DropdownItem` interface is defined as:
>
> ```typescript
> export interface DropdownItem {
>   text: string;
> }
> ```

## Events

The `LwcDropdown` component emits a `itemSelected` event when a dropdown item is selected. The selected item object is sent as a detail of the event.

## Usage

Here is an example of how to use the `LwcDropdown` component:

```html
<lwc-dropdown title="Select an option" 
    items='[
      { "text": "Option 1" },
      { "text": "Option 2" },
      { "text": "Option 3" }
    ]'
>
</lwc-dropdown>
```

This will create a dropdown with the title "Select an option", and three options to choose from: "Option 1", "Option 2", and "Option 3".

You can also listen for the `itemSelected` event like this:

```javascript
document.querySelector('lwc-dropdown').addEventListener('itemSelected', event => {
  console.log('Selected item:', event.detail);
});
```

This will log the selected item object to the console when an item is selected.