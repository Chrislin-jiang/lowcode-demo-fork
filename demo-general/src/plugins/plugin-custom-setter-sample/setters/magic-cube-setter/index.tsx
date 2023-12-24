import React, { useState, useRef, useEffect } from 'react';
import { produce } from 'immer';
import { Select } from '@alifd/next';

import CustomLayout from './CustomLayout';
import { cubeRowsList, initialModels, modelOptions } from './helper';
// import EventManager from '../../sdk/EventManager';
// import useLatest from '../../hooks/useLatest';

import './index.scss';

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
  defaultValue?: CubeValue;
  value: CubeValue,
  // setter 唯一输出
  onChange: (val: string) => void;
}

const MagicCubeSetter: React.FC<MagicCubeSetterProps> = (props) => {
  // const { selectedNode, setSelectedNode, type, name, defaultValue } = props;
  const { value, defaultValue, onChange } = props;
  const [cubeValue, setCubeValue] = useState<CubeValue>({});
  const [activeItem, setActiveItem] = useState(0);
  // const cubeValueRef = useLatest(cubeValue);
  // const activeItemRef = useLatest(activeItem);
  // const selectedNodeRef = useLatest(selectedNode);
  const layoutRef = useRef<any>(null);

  // useEffect(() => {
  //   if (selectedNode && selectedNode[type]) {
  //     setCubeValue(selectedNode[type][name] ?? defaultValue ?? {});
  //   }
  // }, [selectedNode]);

  useEffect(() => {
    if (value === undefined && defaultValue) {
      onChange(defaultValue);
    }
  }, []);

  useEffect(() => {
    const changeImageInfo = (fileJson: any) => {
      // TODO fileKey 等等的处理
      const value = fileJson.filePath;
      changeListItem('image', value);
    };

    const changeTargetUrl = (res: any) => {
      changeListItem('targetUrl', res);
    };
    // EventManager.on('fileUploadCallback', changeImageInfo);
    // EventManager.on('jumpPageCallback', changeTargetUrl);
    // return () => {
    //   EventManager.off('fileUploadCallback', changeImageInfo);
    //   EventManager.off('jumpPageCallback', changeTargetUrl);
    // };
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
      setCubeValue(newValue);
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
    setCubeValue(newValue);
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

    // const activeImageUrl = cubeValueRef.current.list?.[item]?.['image'];
    // EventManager.emit('changeCurrentImage', activeImageUrl);
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
