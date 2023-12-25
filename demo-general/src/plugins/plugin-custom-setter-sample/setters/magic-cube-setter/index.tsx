import React, { useState, useRef, useEffect } from 'react';
import { produce } from 'immer';
import { Select } from '@alifd/next';
import { event } from '@alilc/lowcode-engine';
import { cloneDeep } from 'lodash';
import { useLatest } from 'ahooks';

import CustomLayout from './CustomLayout';
import { cubeRowsList, initialModels, modelOptions } from './helper';
// import EventManager from '../../sdk/EventManager';
// import useLatest from '../../hooks/useLatest';

import './index.scss';

const SETTER_NAME = 'custom-radio-setter';

interface CubeValue {
  list?: any[];
  row?: number;
  col?: number;
  model?: string;
}

interface MagicCubeSetterProps {
  // selectedNode: any;
  // setSelectedNode: (node: any) => void;
  type: string;
  name: string;
  initialValue?: CubeValue;
  defaultValue?: CubeValue;
  value: CubeValue,
  // setter 唯一输出
  onChange: (val: string) => void;
}

const MagicCubeSetter: React.FC<MagicCubeSetterProps> = (props) => {
  // const { selectedNode, setSelectedNode, type, name, defaultValue } = props;
  const { value: cubeValue, initialValue: defaultValue, onChange } = props;
  // const [cubeValue, setCubeValue] = useState<CubeValue>(value);
  const [activeItem, setActiveItem] = useState(0);
  const cubeValueRef = useLatest(cubeValue);
  const activeItemRef = useLatest(activeItem);
  // const selectedNodeRef = useLatest(selectedNode);
  const layoutRef = useRef<any>(null);

  // useEffect(() => {
  //   if (selectedNode && selectedNode[type]) {
  //     setCubeValue(selectedNode[type][name] ?? defaultValue ?? {});
  //   }
  // }, [selectedNode]);

  useEffect(() => {
    if (cubeValue === undefined && defaultValue) {
      onChange(defaultValue);
    }

    const bindEvent = (value: string) => {
      console.log("gjl-common:custom-radio-setter.bindEvent-on", value);
      let newList = cloneDeep(cubeValueRef.current);
      const currentIdx = activeItemRef.current;
      if (newList?.list[currentIdx]) {
        newList.list[currentIdx].image = value;
      }
      onChange(newList);
    };

    // 这里由于面板上会有多个 setter，这里我用 field.id 来标记 setter 名
    // const emitEventName = `${SETTER_NAME}-${props.field.id}`;
    const emitEventName = `${SETTER_NAME}`;
    // event.on(`${emitEventName}.bindEvent`, bindEvent);
    event.on(`common:custom-radio-setter.bindEvent`, bindEvent);

    return () => {
      // setter 是以实例为单位的，每个 setter 注销的时候需要把事件也注销掉，避免事件池过多
      event.off(`common:custom-radio-setter.bindEvent`, bindEvent);
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
      // const newItem = produce(selectedNode, (draft) => {
      //   draft[type][name] = newValue;
      // });
      // setCubeValue(newValue);
      onChange(newValue);
      // setSelectedNode(newItem);
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
    // setCubeValue(newValue);
    onChange(newValue);
    // const newItem = produce(selectedNode, (draft) => {
    //   draft[type][name] = newValue;
    // });
    // setSelectedNode(newItem);

    layoutRef.current?.reset();
  };

  const onCurIndex = (item: number) => {
    setActiveItem(item);
    // EventManager.emit('changeMagicCubeActive', item);

    // const selectValue = cubeValueRef.current.list?.[item]?.['targetUrl']?.selectValue;
    // EventManager.emit('changeSelectValue', selectValue);

    const activeImageInfo = cubeValueRef.current.list?.[item]?.['imageInfo'];
    // EventManager.emit('changeCurrentImage', activeImageUrl);
    event.emit('custom-radio-setter.changeSelectValue', activeImageInfo)
  };

  const changeListItem = (key: string, value: any) => {
    // const newValue = produce(cubeValueRef.current, (draft) => {
    //   draft['list'][activeItemRef.current][key] = value;
    // });
    // setCubeValue(newValue);
    // const newItem = produce(selectedNodeRef.current, (draft) => {
    //   draft[type][name]['list'][activeItemRef.current][key] = value;
    // });
    // setSelectedNode(newItem);
  };

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
        // selectedNodeId={selectedNode.id}
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
