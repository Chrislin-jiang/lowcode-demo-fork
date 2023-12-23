import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Radio, Tooltip, Button } from 'antd';

import './index.scss';

interface OptionItem {
  value: string;
  icon?: string;
  style?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  imgUrl?: string;
  imageStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  label: string;
  description?: string;
  afterChange?: (params: any) => void;
  tips?: string; // 添加tips属性
  placement?: string; // 添加placement属性,
  disabled?: boolean; // 添加 disabled 属性
}

interface RadioSetterProps {
  selectedNode: any;
  // 当前值
  value: string;
  // 默认值
  defaultValue: string;
  // setter 唯一输出
  onChange: (val: string) => void;
  // AltStringSetter 特殊配置
  options?: {
    radioStyle?: React.CSSProperties;
    type?: string;
    content?: OptionItem[];
    disabled?: boolean;
    showStyle?: string;
  };
}

// const validPlacements: TooltipPlacement[] = ['topLeft', 'top', 'topRight', 'leftTop', 'left', 'leftBottom', 'rightTop', 'right', 'rightBottom', 'bottomLeft', 'bottom', 'bottomRight'];

const RadioSetter: React.FC<RadioSetterProps> = (props) => {
  const { options = {}, onChange, value, defaultValue } = props;
  const { radioStyle, type: optionType, content = [], disabled, showStyle = '' } = options;

  useEffect(() => {
    if (value === undefined && defaultValue) {
      onChange(defaultValue);
    }
  }, []);

  // const onChange = (value: string) => {
  //   onPropsChange(value);
  // };

  const renderRadioImageSetter = () => {
    let activeIndex: number = -1;
    return (
      <div className="radio-image-warpper">
        <div className="radio-image-top">
          {content.map((item, index) => {
            const isActive = item.value === value;
            if (isActive) {
              activeIndex = index;
            }
            const radioImageCls = classNames({
              'radio-image-common': true,
              'radio-image-active': isActive,
              'radio-image-inactive': !isActive,
              // todo
              'radio-image-enus': false,
              [showStyle]: !!showStyle,
            });
            return (
              <div
                key={index}
                className={radioImageCls}
                onClick={() => onChange(item.value)}
                style={item.style}
              >
                {item.icon ? (
                  <i className={`gscm-designer-font icon-${item.icon}`} style={item.iconStyle} />
                ) : (
                  <img src={item.imgUrl} style={item.imageStyle} />
                )}
                <div className="radio-image-label" style={item.labelStyle}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
        {content[activeIndex]?.description && (
          <div className="radio-image-description">{content[activeIndex]?.description}</div>
        )}
      </div>
    );
  };

  const renderRadioButtonSetter = () => {
    return (
      <div className="radio-setter-button-tips-wrapper">
        {content.map((item, index) => {
          const isActive = item.value === value;
          return (
            <Tooltip
              key={index}
              overlayClassName="gscm-designer-radio-setter-tooltip"
              title={item.tips}
              // placement={item.placement || 'bottom'}
              placement={(item.placement as TooltipPlacement) || 'bottom'}
            >
              <Button
                className={`${isActive ? 'radio-setter-button-active' : ''}`}
                onClick={() => onChange(item.value)}
                style={radioStyle}
              >
                {item.label}
              </Button>
            </Tooltip>
          );
        })}
      </div>
    );
  };

  const renderDefaultRadioSetter = () => {
    return (
      <Radio.Group
        value={value}
        defaultValue={''}
        disabled={!!disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        {content.map((item, index) => (
          <Radio
            key={index}
            value={item.value}
            // color={item.color}
            style={radioStyle}
            disabled={!!item.disabled}
          >
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    );
  };

  switch (optionType) {
    case 'image':
      return renderRadioImageSetter();
    case 'button':
      return renderRadioButtonSetter();
    default:
      return renderDefaultRadioSetter();
  }
};

export default React.memo(RadioSetter);
