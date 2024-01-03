import React, { useState, useEffect, useImperativeHandle, ForwardRefRenderFunction, forwardRef, Ref, MouseEvent } from 'react';
// import { produce } from 'immer'; 
import { cloneDeep, sortBy } from 'lodash';

import { cubeWrapWidth, customLayoutWidth, isRectangleOverlap } from './helper';
import defaultImage from './defaultImage.png';

interface CustomLayoutProps {
  list: any[];
  model: string;
  row: number;
  col: number;
  onCurIndex: (index: number) => void;
  onCustomChange: (val: []) => void;
  selectedNodeId: number;
  ref?: React.Ref<HTMLDivElement>;
}

interface CustomDivRef extends HTMLDivElement {
  reset: () => void;
}

interface SplitKey {
  y: number;
  x: number;
}

const CustomLayout: ForwardRefRenderFunction<CustomDivRef, CustomLayoutProps> = forwardRef<HTMLDivElement, CustomLayoutProps>(
  (props: CustomLayoutProps, ref: Ref<HTMLDivElement>) => {
    const { list, model, row, col, onCurIndex, onCustomChange } = props;
    const [startKey, setStartKey] = useState<number>(0);
    const [curIndex, setCurIndex] = useState<number>(-1);
    const [edit, setEdit] = useState<boolean>(false);
    const [ys, setYs] = useState<number[]>([]);
    const [xs, setXs] = useState<number[]>([]);
    const [editKeys, setEditKeys] = useState<number[]>([]);

    const getBaseW = (): number => {
      return parseInt(customLayoutWidth / col);
    };

    useEffect(() => {
      setTimeout(() => {
        updateCurIndex(0);
      }, 500);
    }, []);


    useEffect(() => {
      setYs([...Array(row).keys()]);
      setXs([...Array(col).keys()]);
    }, [row, col]);

    // 将 reset 方法暴露给父组件
    useImperativeHandle(ref, () => ({
      reset
    }));

    const updateCurIndex = (index: number) => {
      setCurIndex(index);
      onCurIndex(index);
    };

    const updateList = (updatedValue: number[]) => {
      onCustomChange(updatedValue);
    };

    const reset = () => {
      setStartKey(0);
      updateCurIndex(-1);
      setEdit(false);
      // onCustomChange([]);
      setEditKeys([]);
    };

    const clickWrap = (e: MouseEvent<HTMLDivElement>) => {
      if (!edit) {
        // const key = Number(e.target.dataset.key);
        const key = Number((e.target as HTMLDivElement).dataset.key);
        setEditKeys([...editKeys, key]);
        setStartKey(key);
        setEdit(true);
      } else {
        let keys = cloneDeep(sortBy(editKeys));
        const start = splitKey(keys[0]);
        const end = splitKey(keys.pop());

        const temp = {
          x: start.x,
          y: start.y,
          height: end.y - start.y + 1,
          width: end.x - start.x + 1,
          image: defaultImage,
          targetUrl: ''
        };

        const updatedValue = [...list, temp];
        onCustomChange(updatedValue);
        updateCurIndex(updatedValue.length - 1);
        setEditKeys([]);
        setEdit(false);
      }
    };

    const move = (e: MouseEvent<HTMLDivElement>) => {
      if (!edit) {
        return;
      }

      const keys = [];
      const start = splitKey(startKey);
      const end = splitKey(Number((e.target as HTMLDivElement).dataset.key));
      const ys = sortBy([start.y, end.y]);
      const xs = sortBy([start.x, end.x]);

      if (antiCollision(start, end)) {
        return;
      }

      for (let i = ys[0]; i <= ys[1]; i++) {
        for (let j = xs[0]; j <= xs[1]; j++) {
          keys.push(mergeKey(i, j));
        }
      }

      setEditKeys(keys);
    };

    const antiCollision = (start: { x: number, y: number }, end: { x: number, y: number }) => {
      const rec1 = [start.x, start.y, end.x, end.y];
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const rec2 = [item.x, item.y, item.x + item.width, item.y + item.height];
        const isRectangleOverlapRes = isRectangleOverlap(rec1, rec2);
        console.log("gjl-isRectangleOverlapRes", isRectangleOverlapRes);
        // if (isRectangleOverlap(rec1, rec2)) {
        if (isRectangleOverlapRes) {
          return true;
        }
      }
      return false;
    };

    const mergeKey = (y: number, x: number) => {
      return Number(x + (y * 10));
    };

    const splitKey = (key: number) => {
      if (key >= 10) {
        return { y: parseInt((key % 100) / 10), x: key % 10 };
      } else {
        return { y: 0, x: Number(key) };
      }
    };

    const getWidth = () => {
      return parseInt(cubeWrapWidth / col);
    };

    const getStyle = (style) => {
      const { x, y, width, height } = style;
      const result = {
        left: `${x * getWidth() - 1}px`,
        top: `${y * getWidth() - 1}px`,
        width: `${width * getWidth() + 1}px`,
        height: `${height * getWidth() + 1}px`,
      };
      return result;
    };

    const deleteEditWrap = (index: number) => {
      const updatedValue = [...list];
      updatedValue.splice(index, 1);
      updateList(updatedValue);
      updateCurIndex(updatedValue.length - 1);
    };


    return (
      <div className="custom-layout" style={{ width: `${cubeWrapWidth}px` }}>
        {ys.map((y) => (
          <ul key={y} className="custom-layout-ul">
            {xs.map((x) => {
              const key = mergeKey(y, x);
              const dataKey = key.toString();
              const dataY = y.toString();
              const dataX = x.toString();
              const isActive = editKeys.includes(key);

              const width = getWidth();

              return (
                <li
                  key={key}
                  data-key={dataKey}
                  data-y={dataY}
                  data-x={dataX}
                  style={{
                    width,
                    height: width,
                    textAlign: 'center'
                  }}
                  className={`wrap-item flex-center ${isActive ? 'move-wrap' : ''}`}
                  onClick={clickWrap}
                  onMouseOver={move}
                >
                  <i style={{ lineHeight: `${width}px` }} className={`gscm-designer-font icon-jia1`} />
                </li>
              );
            })}
          </ul>
        ))}

        {/* 编辑容器块 */}
        {list.map((item, index) => {
          const isActive = curIndex === index;
          const style = getStyle(item);
          const isImageEmpty = item.image === defaultImage || !item.image;
          const backgroundImage = isImageEmpty ? 'none' : `url(${item.image})`;
          return (
            <div
              key={index}
              className={`edit-wrap flex-column flex-center ${isActive ? 'edit-wrap-active' : ''}`}
              style={style}
              onClick={() => updateCurIndex(index)}
            >
              {model === 'custom' && (
                <div className="edit-wrap-close" onClick={() => deleteEditWrap(index)}>
                  <i className="gscm-designer-font icon-guanbi"></i>
                </div>
              )}
              <div className='edit-warp-text' style={{ backgroundImage }}>
                {isImageEmpty && <div>{`${parseInt(item.width * getBaseW())}x${parseInt(item.height * getBaseW())}`}</div>}
                {/* {item.width > 1 && <div>或同等比例</div>} */}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default CustomLayout;