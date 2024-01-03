import React, { useState, useRef, useEffect } from 'react';
import { Select } from '@alifd/next';
import { event } from '@alilc/lowcode-engine';
import { cloneDeep } from 'lodash';
import { useLatest } from 'ahooks';

import CustomLayout from './CustomLayout';
import { cubeRowsList, initialModels, modelOptions } from './helper';

import './index.scss';

interface CubeValue {
  list?: any[];
  row?: number;
  col?: number;
  model?: string;
}

interface MagicCubeSetterProps {
  type: string;
  name: string;
  initialValue?: CubeValue;
  defaultValue?: CubeValue;
  value: CubeValue,
  onChange: (val: object) => void;
}

const MagicCubeSetter: React.FC<MagicCubeSetterProps> = (props) => {
  const { value: cubeValue, initialValue: defaultValue, onChange } = props;
  const [activeItem, setActiveItem] = useState(0);
  const cubeValueRef = useLatest(cubeValue);
  const activeItemRef = useLatest(activeItem);
  const layoutRef = useRef<any>(null);

  useEffect(() => {
    if (cubeValue === undefined && defaultValue) {
      onChange(defaultValue);
    }

    const bindEvent = (value: string) => {
      console.log("common:magic-cube-setter.bindEvent-on", value);
      let newValue = cloneDeep(cubeValueRef.current);
      const currentIdx = activeItemRef.current;
      if (newValue?.list?.[currentIdx]) {
        newValue.list[currentIdx].image = value;
      }
      onChange(newValue);
    };

    event.on(`common:magic-cube-setter.bindEvent`, bindEvent);

    return () => {
      // setter 是以实例为单位的，每个 setter 注销的时候需要把事件也注销掉，避免事件池过多
      event.off(`common:magic-cube-setter.bindEvent`, bindEvent);
    }
  }, []);

  const changeModel = (model: string) => {
    if (model) {
      let target = modelOptions.find((m) => m.value === model);
      // 重置模板
      layoutRef.current?.reset();

      let newValue: CubeValue = {
        list: [],
        row: target?.row || 1,
        col: target?.col || 1,
        model,
      };
      // 设置模板对应初始数据
      if (model === 'custom') {
        newValue.list = [];
      } else {
        newValue.list = JSON.parse(JSON.stringify(initialModels[model]));
      }
      onChange(newValue);
    }
  };

  const handleChangeRow = (val: string) => {
    const value = parseInt(val || '5');
    const newValue: CubeValue = {
      model: 'custom',
      list: [],
      row: value,
      col: value,
    };
    onChange(newValue);
    layoutRef.current?.reset();
  };

  const onCurIndex = (item: number) => {
    setActiveItem(item);

    const activeImageUrl = cubeValueRef.current.list?.[item]?.['image'];
    event.emit('magic-cube-setter.changeSelectValue', activeImageUrl)
  };

  const onCustomChange = (newList: []) => {
    const { model, row, col } = cubeValueRef.current;
    const newValue: CubeValue = {
      model,
      row,
      col,
      list: newList
    };
    onChange(newValue);
  }

  return (
    <div className="magic-cube-setter">
      {cubeValue.model === 'custom' && (
        <div className="common">
          <label>魔方密度</label>
          <Select value={cubeValue.row} onChange={handleChangeRow}>
            {cubeRowsList.map((key) => (
              <Select.Option key={key} value={key}>
                {key}×{key}
              </Select.Option>
            ))}
          </Select>
        </div>
      )}

      {/* <div>魔方布局</div> */}
      <div className="custom-design-tips">
        {cubeValue.model === 'custom' ? '移动鼠标选定布局区域大小' : '选定布局区域，在下方添加图片'}
      </div>
      <CustomLayout
        ref={layoutRef}
        row={cubeValue.row || 1}
        col={cubeValue.col || 2}
        model={cubeValue.model || 'magicCube1'}
        list={cubeValue.list || []}
        onCurIndex={onCurIndex}
        onCustomChange={onCustomChange}
        {...props}
      />

      <div className="common">
        <label>模板选择</label>
        <Select value={cubeValue.model} onChange={(val) => changeModel(val)}>
          {modelOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default MagicCubeSetter;