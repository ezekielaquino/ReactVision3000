import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import VisionImage from 'vision3000-react';
import ImageIndicator from './ImageIndicator';


const IMAGES = 70;

class App extends Component {
  state = {
    viewed: [],
    inView: [],
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.inView.length !== this.state.inView.length;
  }

  onIntersect = (inView, viewed) => {
    this.setState({ inView });
  }

  onLoad = (elem, img, viewed) => {
    this.setState({
      loadState: 'loaded',
      viewed,
    }, this.forceUpdate);
  }

  _sortJoin = arr => arr.sort((a, b) => a - b).join(', ');

  render() {
    const { inView , viewed } = this.state;

    return (
      <main>
        <ImageIndicator length={IMAGES} inView={inView} viewed={viewed} />

        <Github href="https://github.com/ezekielaquino/ReactVision3000">View on Github</Github>

        <Flex>
          { [...Array(IMAGES).keys()].map((src, index) => (
            <Wrap
              key={index}
              id={`image-${index}`}
              tile={index > 2 && index < 7}
              half={index > 11 && index < 14}>
              <VisionImage
                placeholder={require(`./assets/images/sqip/${index + 1}.svg`)}
                src={require(`./assets/images/highres/${index + 1}.jpg`)}
                classNames={{
                  containerBase: styles.container,
                  imageBase: styles.image,
                }}
                onIntersect={this.onIntersect}
                onLoad={this.onLoad} />
            </Wrap>
          ))}
        </Flex>
      </main>
    );
  }
}



const Flex = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30px;
`;

const Github = styled('a')`
  font-family: 'Arial', sans-serif;
  border: 1px solid #fff;
  border-radius: 2px;
  color: #fff;
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 8px 10px;
  position: fixed;
  right: 15px;
  text-decoration: none;
  text-transform: uppercase;
  top: 15px;

  &:hover:after {
    content: ' – NOW!';
  }
`;

const Wrap = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: scroll-position;

  ${props => props.tile && `
    width: 50%;
    height: 50vh;
  `}

  ${props => props.half && `
    width: calc(50% - 30px);
    height: 100vh;
    flex-direction: column;
    align-items: center;

    figure {
      width: 100%;
      height: auto;

      img {
        width: 100%;
        height: auto;
      }
    }
  `}
`;

const styles = {
  container: css`
    box-sizing: border-box;
    position: relative;
    margin: 0;
    overflow: hidden;
    background-color: #121212;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    will-change: contents;

    @media (min-width: 1024px) {
      width: auto;
      height: calc(100% - 60px);
    }

    @media (max-width: 1024px) {
      width: calc(100% - 60px);
      height: auto;
    }
  `,
  image: css`
    display: block;
    height: 100%;

    @media (orientation: landscape) {
      height: 100%;
    }

    @media (orientation: portrait) {
      width: 100%;
    }
  `,
  viewed: css`
    color: green;
  `,
}

export default App;
