---
title: Detecting scroll direction with JavaScript
excerpt: Learn how to detect scroll direction with JavaScript, handle the overscroll bouncing effect, and use throttling to improve scroll event performance.
description: Learn how to detect scroll direction with JavaScript and use it to hide or show a navigation bar, including overscroll handling and throttling.
created_at: 2022-11-26
updated_at: 2026-09-26
---

A common use case for detecting scroll direction is hiding the navigation bar
when the user scrolls down and showing it again when they scroll up. In this
article, we'll look at a simple way to do this with JavaScript.

Let's start with a basic example:

```js
let yprev = window.pageYOffset;

window.addEventListener('scroll', () => {
  const y = window.pageYOffset;
  console.log(y > yprev ? 'down' : 'up');
  yprev = y;
});
```

First, we create an event listener for the scroll event and pass an event
handler to it. This event handler is called every time the user scrolls the
page up or down.

Inside the event handler, we compare the current Y position with the previous Y
position. If the current position is greater than the previous position, the
direction is down. If the current position is lower than the previous position,
the direction is up.

## Dealing with the overscroll bouncing issue

The problem with the example above is that it doesn't take care of situations
where the so-called overscroll effect, also known as the rubber band effect or
elastic scrolling, happens.

The overscroll effect is a feature in some browsers that allows the user to
continue scrolling with a pull gesture after the top or bottom of the page has
been reached. The browser then automatically bounces back to the min/max
boundary of the scrolling area when the user releases the pull gesture. This
causes the scroll direction to change automatically.

There is a CSS property called `overscroll-behavior` that can disable the
overscroll effect when set to `none`. However, if you need to support browsers
where this behavior is not available or doesn't work as expected, we can also
handle the problem in JavaScript.

To fix this in our JavaScript code, we update the previous Y position with the
current Y position only when the current Y is inside the boundaries of the
document. Otherwise, we set the previous Y position to the boundary value,
either min or max, that has been reached.

```js
let yprev = window.pageYOffset;

window.addEventListener('scroll', () => {
  const y = window.pageYOffset;
  const ymax = document.documentElement.scrollHeight -
    window.innerHeight;

  if (y > yprev) {
    console.log('down');
  }
  else if (y < yprev) {
    console.log('up');
  }

  // This limits yprev between 0 and ymax
  yprev = Math.min(Math.max(y, 0), ymax);
});
```

## Optimizing the performance

Since scroll events on regular web pages usually happen at a high rate, the
event handler should not perform DOM modifications or other expensive
operations directly every time the event fires.

Two commonly used patterns for optimizing event handler performance in
JavaScript are called **throttle** and **debounce**.

In a nutshell, the throttle pattern calls a function at intervals of a
specified amount of time while the user is carrying out an event. The debounce
pattern calls a function after the user hasn't carried out the event for a
specified amount of time.

Which one to use depends on what you are doing with the scroll event.

One of the most common use cases for scroll direction detection is hiding a
fixed-position navigation bar when the user scrolls down and showing it again
when the user starts scrolling back up.

If you use the debounce pattern here, the user can keep scrolling while the
navbar stays in its current shown or hidden state. The show/hide function is
called only after the user has stopped scrolling for the specified amount of
time.

If you want the navbar to show up while the user is still scrolling up,
throttling is usually a better choice.

Let's implement this in practice, first without any optimizations.

## Showing and hiding the navbar depending on scroll direction

Instead of simply hiding and showing the navbar, we change its top margin. We
use a negative margin to hide it and a zero margin to show it.

This also allows us to add a nice animation using the CSS `transition-duration`
property, making the navbar look like it is sliding up and down.

```js
const navbar = document.querySelector('.navbar');
let yprev = window.pageYOffset;

window.addEventListener('scroll', () => {
  const y = window.pageYOffset;
  const ymax = document.documentElement.scrollHeight - 
    window.innerHeight;

  if (y > yprev) {
    navbar.style.marginTop = '-100px';
  }
  else if (y < yprev) {
    navbar.style.marginTop = '0px';
  }
  
  yprev = Math.min(Math.max(y, 0), ymax);
});
```

Now let's implement the throttle pattern to optimize this:

```js
const navbar = document.querySelector('.navbar');
let yprev = window.pageYOffset;

const throttle = (callback, timeout) => {
  let wait = false;

  return () => {
    if (wait) return;
    callback.call();
    wait = true;
    setTimeout(() => { wait = false; }, timeout);
  };
};

const handler = () => {
  const y = window.pageYOffset;
  const ymax = document.documentElement.scrollHeight - 
    window.innerHeight;

  if (y > yprev) {
    navbar.style.marginTop = '-100px';
  }
  else if (y < yprev) {
    navbar.style.marginTop = '0px';
  }
  
  yprev = Math.min(Math.max(y, 0), ymax);
};

window.addEventListener('scroll', throttle(handler, 250));
```

Inside our `throttle()` function, we call the event handler only if it hasn't
been called during the last 250 milliseconds.

This can save a lot of unnecessary work when we are doing more expensive tasks
inside the event handler, such as modifying the DOM. At the same time, the
handler still runs often enough while scrolling to react to changes in the
scroll direction.
