import React from 'react';
import styled, { css } from 'react-emotion';
import AnchorLink from 'react-anchor-link-smooth-scroll';


class ImageIndicator extends React.Component {
  state = {
    cells: 0,
    width: window.innerWidth - 60,
  }

  componentDidMount() {
    const setCells = () => {
      const gutter = window.innerWidth > 720 ? 60 : 30;
      const cols = Math.floor((window.innerWidth - gutter) / 60);
      this.setState({ cells: cols * 3, width: cols * 60 });
    };

    setCells();

    window.addEventListener('resize', setCells);
  }

  render() {
    const { cells, width } = this.state;
    const { inView, viewed, length } = this.props;

    return (
      <Wrap>
        <Inner width={width}>
          <Header>
            <h1>Vision3OOO</h1>
            <p>LazyLoading for the New Millenium</p>
          </Header>

          { [...Array(cells).keys()].map(item => {
            const viewing = inView.includes(item);
            const loaded = viewed.includes(item);

            return (
              <AnchorLink
                className={unitStyle}
                href={`#image-${item}`}
                key={item}>
                <Dot visible={viewing} viewed={loaded} />

                { item < length &&
                  <Label>
                    IMG { item <= 8 && '0'}{item + 1}
                  </Label>
                }
              </AnchorLink>
            )
          }) }

          <Legend>
            <span>In-vision</span>
            <span>Loaded</span>
          </Legend>
        </Inner>
      </Wrap>
    )
  }
}

const Wrap = styled('div')`
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 30px;
  left: 0;
  z-index: 9999;
`;

const Header = styled('header')`
  color: #fff;
  position: absolute;
  top: 0;
  padding-bottom: 5px;
  transform: translateY(-100%);

  h1 {
    font-size: 9px;
    text-transform: uppercase;
    margin: 0;
    display: inline-block;
  }

  p {
    display: inline-block;
    padding-left: 8px;
    margin: 0;
  }
`;

const Inner = styled('div')`
  width: ${props => props.width}px;
  position: relative;
  font-size: 9px;
  font-family: 'Arial';

  &:after {
    content: '';
    clear: both;
  }
`;

const Dot = styled('span')`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.visible ? '#fff' : 'none'};
  position: absolute;
  left: calc(50% - 10px);
  top: calc(50% - 17px);
  transition: background-color 0.2s;

  &:before {
    content: '';
    position: absolute;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    top: -3px;
    left: -3px;
    border-radius: 50%;
    border: 1px solid white;
    transition: opacity 0.5s;
    opacity: ${props => props.viewed ? 1 : 0};
  }
`;

const Label = styled('span')`
  letter-spacing: 1px;
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 0;
  padding: 5px;
  box-sizing: border-box;
`;

const Legend = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  padding-bottom: 5px;
  font-size: 9px;
  transform: translateY(-100%);
  color: #fff;
  text-transform: uppercase;
  font-family: 'Arial';
  display: flex;
  align-items: center;

  span {
    display: inline-flex;
    align-items: center;
  }

  span + span {
    margin-left: 10px;
  }

  span:first-child:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 3px;
    background-color: #fff;
    display: block;
  }

  span:last-child:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 3px;
    border: 1px solid #fff;
    box-sizing: border-box;
    display: block;
  }
`;

const unitStyle = css`
  width: 60px;
  height: 60px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  box-sizing: border-box;
  float: left;
  position: relative;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);

  &:before {
    content: '';
    width: calc(100% + 1px);
    height: calc(100% + 1px);
    position: absolute;
    right: -1px;
    bottom: -1px;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    pointer-events: none;
  }

  &:hover span:nth-child(1) {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;


export default ImageIndicator;