import * as React from 'react';
import { useState, useRef, useEffect, createElement } from 'react';
import './index.scss';

export interface MagicCubeProps {
  isDesigner: boolean;
  isPreview: boolean;
  attr: {
    cube?: {
      row: number;
      col: number;
      list: {
        top: number;
        left: number;
        width: number;
        height: number;
        image: string;
        targetUrl?: string;
      }[];
    };
    imgMargin: number;
    imgRadius: number;
  };
}

const MagicCube: React.FC<MagicCubeProps> = ({ isDesigner, isPreview, attr }) => {
  const { cube = {}, imgMargin, imgRadius } = attr;
  console.log("gjl-cube", cube);

  // TODO: --theme-page-padding: 16px;
  const pagePadding = 0;

  const getContainerWidth = (): number => {
    return isDesigner && !isPreview ? 375 : globalThis.innerWidth;
  };

  const getItemWidth = (): number => {
    const width = getContainerWidth() - pagePadding * 2;
    return width / cube?.col;
  };

  const getItemHeight = (): number => {
    return getContainerWidth() / cube?.col;
  };

  const getWrapHeight = (): number => {
    return cube?.row * getItemHeight();
  };

  const getWrapStyle = (): React.CSSProperties => {
    let result: React.CSSProperties = {};

    if (cube?.list.length > 0) {
      result.height = getWrapHeight() + 'px';
    } else {
      result.backgroundSize = '100% 100%';
      result.height = '190px';
    }

    return result;
  };

  const getMainStyle = (styles: { [key: string]: number }): React.CSSProperties => {
    let result: React.CSSProperties = {};
    Object.keys(styles).map((key) => {
      switch (key) {
        case 'x':
          result['left'] = styles[key] * getItemWidth();
          break;
        case 'y':
          result['top'] = styles[key] * getItemHeight();
          break;
        case 'width':
          result[key] = styles[key] * getItemWidth();
          break;
        case 'height':
          result[key] = styles[key] * getItemHeight();
          break;
      }
    });
    result.padding = imgMargin / 2;
    return result;
  };

  const getItemStyle = (img: string): React.CSSProperties => {
    return {
      backgroundImage: `url(${img})`,
      borderRadius: imgRadius + 'px',
    };
  };

  // const handleClick = (url: string) => {
  //   utils.pageSkip(url, 3);
  // };

  return (
    <div className="magic-cube" style={getWrapStyle()}>
      <div className="cube-wrap">
        {cube?.list.map((item, index) => (
          <div
            key={index}
            className="absolute cube-item"
            style={getMainStyle(item)}
          // onClick={() => handleClick(item.targetUrl)}
          >
            <div className="cube-item-wrap" style={getItemStyle(item.image)}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MagicCube);
