import React from 'react';
import PropTypes from 'prop-types';
import { initVision3000 } from 'vision3000';


const propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  classNames: PropTypes.object,
  containerStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  placeholder: PropTypes.string,
  onIntersect: PropTypes.func,
  onLoad: PropTypes.func,
  onLoadStart: PropTypes.func,
};

class VisionImage extends React.Component {
  constructor() {
    super();

    this.state = {
      documentLoaded: false,
      status: '',
    };

    this.onLoadStart = this.onLoadStart.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.documentLoaded !== this.state.documentLoaded || nextState.status !== this.state.status;
  }

  componentDidMount() {
    const { onIntersect } = this.props;

    window.addEventListener('load', () => {
      window.VISION3K.onIntersect = onIntersect;

      this.setState({ documentLoaded: true }, () => {
        window.VISION3K.observe(this.elem, {
          onLoadStart: (elem, img, viewed) => this.onLoadStart(elem, img, viewed),
          onLoad: (elem, img, viewed) => this.onLoad(elem, img, viewed),
        });
      });
    });
  }

  onLoadStart(elem, img, viewed) {
    if (this.state.status === 'loaded') return;
    this.setState({ status: 'loading' }, () => {
      if (this.props.onLoadStart) this.props.onLoadStart(elem, img, viewed);
    });
  }

  onLoad(elem, img, viewed) {
    if (this.state.status === 'loaded') return;
    this.setState({ status: 'loaded' }, () => {
      if (this.props.onLoad) this.props.onLoad(elem, img, viewed);
    });
  }

  render() {
    const { status } = this.state;
    const {
      alt = 'Image',
      classNames = {},
      containerStyle = {},
      imageStyle = {},
      src,
      placeholder,
    } = this.props;
    const baseStyle = {
      container: containerStyle.base,
      image: imageStyle.base,
    };
    const loadingStyle = {
      container: containerStyle.loading,
      image: imageStyle.loading,
    };
    const loadedStyle = {
      container: containerStyle.loaded,
      image: imageStyle.loaded,
    };
    const loadingClassNames = {
      container: classNames.containerLoading,
      image: classNames.imageLoading,
    };
    const loadedClassNames = {
      container: classNames.containerLoaded,
      image: classNames.imageLoaded,
    };
    const styles = status === 'loading' ? loadingStyle : loadedStyle;
    const classes = status === 'loading' ? loadingClassNames : loadedClassNames;

    return (
      <figure
        ref={elem => this.elem = elem}
        style={{
          ...baseStyle.container,
          ...styles.container,
        }}
        className={_concatClassNames([classNames.containerBase, status && classes.container])}>
        <img
          data-src={src}
          src={placeholder}
          style={{
            ...baseStyle.image,
            ...styles.image,
          }}
          alt={alt}
          className={_concatClassNames([classNames.imageBase, status && classes.image])} />
      </figure>
    )
  }
}

VisionImage.propTypes = propTypes;

const _concatClassNames = (arr) => {
  return arr.filter(Boolean).join(' ');
};


export { initVision3000 };
export default VisionImage;