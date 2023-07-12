# `lwc-timer` Web Component

The `lwc-timer` is a custom web component that provides a countdown timer functionality with customizable size, interval, minimum, maximum, and initial values. This component is built using the LitElement library.

## Attributes

- `value`: The current value of the timer. It decreases over time until it reaches the minimum value.
- `min`: The minimum value that the timer can reach. When the timer reaches this value, a `lwc-timer-expired` event is dispatched.
- `max`: The maximum value that the timer can reach.
- `interval`: The interval in milliseconds at which the timer updates.
- `size`: The size of the timer element in pixels.

All attributes are optional and have default values.

Here is an example of how to use the `lwc-timer` tag in your HTML:

```html
<lwc-timer 
  value="50" 
  min="0" 
  max="100" 
  interval="1000" 
  size="200">
</lwc-timer>
```

You can also add an event listener for the `lwc-timer-expired` event:

```ts
document.querySelector('lwc-timer').addEventListener('lwc-timer-expired', (e) => {
  console.log('Timer expired', e.detail);
});
```

## Styling

The component uses CSS variables for styling. You can set these in your CSS:

```css
lwc-timer {
  --primary: teal;
  --warning: yellow;
  --danger: red;
}
```

## Custom Events

- `lwc-timer-expired`: This event is dispatched when the timer reaches its minimum value.
