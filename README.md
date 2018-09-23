
# (React)Vision3000

[Vision3000](https://github.com/ezekielaquino/Vision3000) 👁 LazyLoading for the new Millenium™ as a React component.

For more information about `Vision3000` please head over to its [README](https://github.com/ezekielaquino/Vision3000).


## Demo

Click [here](https://ezekielaquino.github.io/ReactVision3000/)! Try clicking around the navigation, scrolling fast, or using the scrollbar to scrub!


## Usage

First add `ReactVision3000` as one of your project's dependencies.

`yarn add vision3000-react`

Great! Then the next steps:

a) We import and initialize a `Vision3000` observer
b) Use the component for your observables!
c) Get creative and profit.

**Further details below–**

First, in your index.js we initialize an instance of the `Vision3000` observer.

```js
  // index.js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';
  import { initVision3000 } from 'vision3000-react';

  // initialize! pow!
  initVision3000();

  ReactDOM.render(<App />, document.getElementById('root'));
```

Simple! Now we can use the component like so anywhere in your :sparkles:App:sparkles:

```js
  // Somewhere in your app
  // Note: In this example we are using a css-in-js library (emotion)
  // More information about styling after "Usage"

  import React from 'react';
  import styled, { css } from 'react-emotion';

  // This is ReactVision right here!
  // Call it however you want, but for this example
  // we're calling it "ObservedImage", see usage below
  import ObservedImage from 'vision3000-react';


  class SomeComponent extends React.Component {
    render() {
      return (
        <main>
          <h1>OMG these images only load when you intend to!</h1>

          { myImageArray.map((image, index) => (
            <MyImageContainer key={`vision3k-${index}`}>
              <ObservedImage
                placeholder={image.placeholder}
                src={image.src}
                classNames={{
                  containerBase: styles.container,
                  containerLoading: styles.containerLoading,
                  containerLoaded: styles.containerLoaded,
                  imageBase: styles.image,
                  imageLoading: styles.imageLoading,
                  imageLoaded: styles.imageLoaded,
                }}
                onIntersect={this.onIntersect}
                onLoadStart={this.onLoadStart}
                onLoad={this.onLoad} />
            </MyImageContainer>
          )) }
        </main>
      )
    }
  }

  const MyImageContainer = styled('div')`
    // Your styling for container etc.
    // Remember, Vision3000 component is only composed of
    // a wrapper element <figure>, and the <img> itself
  `;


  export default SomeComponent;
```

`OK` so what's going on up there?

### Breakdown

| Prop | Type |  What it does |
|--|--|--|
| `src` | string (required) | the source image (to be loaded) |
| `placeholder` | string | the placeholder image src
| `alt` | string | your image alt attribute
| `onIntersect` | function | called when an observed element enters  the viewport
| `onLoadStart` | function | called when a user "intended" to view an image when the source image is requested
| `onLoad` | function | called when the image has finished loading, decoded and inserted into the DOM
|`classNames` | object | an object containing the following keys corresponding to a className which applies to an image's state great for use with css-in-js libraries or if you're using css modules. See next section.
| `containerStyle` / `imageStyle` | object | Should you choose to declare inline styles for each state, then you can pass an object with corresponding keys. See next section.

**Note**: `onIntersect`, `onLoadStart` and `onLoad` callbacks are exposed some variables see [Callbacks]() section.

## Styling

`ReactVision3000` component renders the following DOM structure:

```html
  <figure [class] [style]>
    <img [class] [style] data-src="" src="" alt="" />
  </figure>
```

There are two ways you may style the container element and the image: either by passing in a className or passing in inline styles, one for each "state".

---
### Classnames

Should you choose to style the component via className, then you simple pass in an object within the `classNames` prop.

```js
  <Vision3KComponent
    src="/highres.jpg"
    placeholder="/lowres.jpg"
    classNames={{
      containerBase: 'container',
      containerLoading: 'container--loading',
      containerLoaded: 'container--loaded',
      imageBase: 'container__image',
      imageLoading: 'container__image--loading',
      imageLoaded: 'container__image--loaded',
    }}
    onIntersect={foo}
    onLoadStart={bar}
    onLoad={baz} />
```

If you're using a `css-in-js` lib such as emotion or glamour, then you would pass in a variable or the `css` method itself that returns a generated classname.

```js
  <Vision3KComponent
    src="/highres.jpg"
    placeholder="/lowres.jpg"
    classNames={{
      containerBase: styles.container,
      containerLoading: styles.containerLoading,
      containerLoaded: css`border: 1px solid red`,
      imageBase: styles.image,
      imageLoading: styles.imageLoading,
      imageLoaded: styles.imageLoaded,
    }}
    onIntersect={foo}
    onLoadStart={bar}
    onLoad={baz} />

// your styles object used above
const styles = {
  container: css`
    // your styles here
  `,
  // so on and so forth
}
```
---
### Inline styles

If this is your flavour then you can also do so:

Note: we use a separate container/image style prop so we don't end up in a mess of nested objects. The style you pass in for each state is (as it is inline style) an object.

```js
  <Vision3KComponent
    src="/highres.jpg"
    placeholder="/lowres.jpg"
    containerStyle={{
      base: {
        backgroundColor: 'blue',
      },
      loading: {},
      loaded: {},
    }}
    imageStyle={{
      base: {},
      loading: {},
      loaded: {},
    }}
    onIntersect={foo}
    onLoadStart={bar}
    onLoad={baz} />
```

That's pretty much all there is to it! Head on over to the [demo](https://ezekielaquino.github.io/ReactVision3000/) to see it in action. Try clicking around the navigation, scrolling fast, or using the scrollbar to scrub!

### Callbacks

#### `onIntersect`
called when an element enters the viewport. This is just the standard behaviour of intersectionObserver, this will fire regardless of intent. The method provides you back with the following:

| variable | what |
|--|--|
| `inView` | an Array of indices referring to which elements are in view. Useful for toggling classes. e.g. `className={inView.includes[index] && 'viewing'}` |
| `viewed` | an Array of elements indices which have already been loaded. |


```js
  onIntersect = (inView, viewed) => {
    this.setState({ inView });
  }

  // render()
  <Vision3KImage
    onIntersect={this.onIntersect} />
```
---
#### `onLoadStart` / `onLoad`
called when the user stops at a section and starts loading `Vision3000` elements which are in view and when the element in view has finished loading the source image.

```js
  onLoadStart = (elem, img, viewed) => {
    console.log(elem, img, viewed);
  }

  onLoad = (elem, img, viewed) => {
    console.log(elem, img, viewed);
  }
```

| variable | what |
|--|--|
| `elem` | [DOMNode] a reference to the container element of the `<img>`|
| `img` | [DOMNode] a reference to the `<img` element itself |
| `viewed` | an Array of elements indices which have already been loaded. |


## P.S.

ReactVision3000 is available as a standalone vanilla module (`Vision3000`) which is a dependency of this component.  You can also read more about it by clicking [here](https://github.com/ezekielaquino/Vision3000).


## P.P.S

Do you have any comments/suggestions? Would you like to improve `REACTVISION3000`? Please feel free to post issues, or open pull requests. I would love that. <3