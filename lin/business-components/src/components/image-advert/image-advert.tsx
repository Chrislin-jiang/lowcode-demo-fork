import * as React from 'react';
import { useState, useRef, useEffect, createElement } from 'react';
import { Swiper } from 'antd-mobile';

import defaultImage from './defaultImage.png';

import './index.scss';

export interface ImageAdvertProps {
  attr: {
    advertList?: Array<{
      imageUrl: string;
      intrinsicHeight: number;
      intrinsicWidth: number;
    }>;
    advertTime?: number;
    chooseTemplate?: number;
    borderRadius?: number;
    imageMargin?: number;
    lineNum?: number;
    overlapHeight?: number;
  };
  isDesigner?: boolean;
  isPreview?: boolean;
}

type CommonType = {
  borderRadius: string;
  '--advert-overlap-height': string;
  marginBottom: string; // 添加 marginBottom 属性
};

const ImageAdvert: React.FC<ImageAdvertProps> = (props) => {
  const {
    attr: {
      advertList = [],
      advertTime = 3,
      chooseTemplate = 2,
      borderRadius,
      imageMargin = 0,
      lineNum = 1,
      overlapHeight,
    },
    isDesigner,
    isPreview,
  } = props;
  // const [firstImageHeight, setFirstImageHeight] = useState('auto');
  const [firstImageHeight, setFirstImageHeight] = useState<'auto' | number>('auto');
  const advertRef = useRef<HTMLDivElement>(null);
  const compWidth = isDesigner ? 375 : window.innerWidth;

  const swiperOptions = {
    autoplay: isDesigner ? true : advertTime < 999,
    loop: true,
    autoplayInterval: advertTime * 1000,
  };

  useEffect(() => {
    if (advertList && advertList[0]) {
      const height = compWidth * (advertList[0].intrinsicHeight / advertList[0].intrinsicWidth);
      setFirstImageHeight(height);
    }
  }, [advertList, compWidth]);

  const getContainerStyle = (type: string) => {
    const common: CommonType = {
      borderRadius: !borderRadius && borderRadius !== 0 ? 'var(--theme-normal-border-radius)' : '',
      '--advert-overlap-height': '11px',
      marginBottom: '0px', // 添加对 marginBottom 属性的初始化
    };

    if (overlapHeight !== undefined) {
      common['--advert-overlap-height'] = overlapHeight + 11 + 'px';
      if (isDesigner && !isPreview) {
        // const node = advertRef.current?.parentNode;
        const node = advertRef.current?.parentNode as HTMLElement; // 使用类型断言将 parentNode 断言为 HTMLElement
        if (node) {
          node.style.marginBottom =
            overlapHeight === 0
              ? `var(--theme-components-margin)`
              : `calc(-${overlapHeight}px - var(--theme-components-margin))`;
        }
      } else {
        common.marginBottom = `-${overlapHeight}px`;
      }
    }
    if (type === 'empty') {
      return common;
    }
    switch (chooseTemplate) {
      case 1:
        return common;
      case 2:
        return { ...common, height: `${firstImageHeight}px` };
      default:
        return common;
    }
  };

  const renderImageTemplate = () => {
    const len = advertList.length;
    return (
      <div className="pb-image-advert-normal">
        {advertList.map((item, index) => {
          return (
            <div
              className={`pb-image-advert-${lineNum}`}
              key={index}
              style={{ marginRight: index !== len - 1 ? imageMargin : 0 }}
            >
              <img src={item.imageUrl} alt={item.imageUrl} />
            </div>
          );
        })}
      </div>
    );
  };

  const renderSwiperTemplate = () => {
    return (
      <Swiper {...swiperOptions}>
        {advertList.map((item, index) => {
          return (
            <Swiper.Item className="advert_url_cls" key={index} style={{ textAlign: 'center' }}>
              <img
                src={item.imageUrl}
                alt={item.imageUrl}
                style={{
                  width: `100%`,
                  height: 'auto',
                }}
              />
            </Swiper.Item>
          );
        })}
      </Swiper>
    );
  };

  const renderTemplate = () => {
    switch (chooseTemplate) {
      case 1:
        return renderImageTemplate();
      case 2:
        return renderSwiperTemplate();
      default:
        return renderSwiperTemplate();
    }
  };

  const isImageEmpty = advertList?.every((ele) => !ele.imageUrl && !ele.fileKey);
  if (isImageEmpty) {
    return (
      <div className="pb-image-advert-empty" style={getContainerStyle('empty')}>
        <img src={defaultImage} />
      </div>
    );
  }

  return (
    <div
      ref={advertRef}
      className="pb-image-advert gscm-image-advert"
      style={getContainerStyle('')}
    >
      {advertList?.length > 0 ? renderTemplate() : null}
    </div>
  );
};

export default React.memo(ImageAdvert);
