import React, { useState, useEffect, useImperativeHandle, ForwardRefRenderFunction, forwardRef, Ref, MouseEvent } from 'react';
// import { produce } from 'immer'; 
import { cloneDeep, sortBy } from 'lodash';

import { cubeWrapWidth, customLayoutWidth, isIntersection } from './helper';
import defaultImage from './defaultImage.png';

interface CustomLayoutProps {
  list: any[];
  model: string;
  row: number;
  col: number;
  onCurIndex: (index: number) => void;
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
// CustomLayout.defaultProps = {
//   list: [],
//   model: 'default',
//   row: 3,
//   col: 3,
//   onCurIndex: () => {},
//   selectedNodeId: 0
// };

const CustomLayout: ForwardRefRenderFunction<CustomDivRef, CustomLayoutProps> = forwardRef<HTMLDivElement, CustomLayoutProps>(
  (props: CustomLayoutProps, ref: Ref<HTMLDivElement>) => {
    const { list, model, row, col, onCurIndex, selectedNodeId } = props;
    const [startKey, setStartKey] = useState<number>(0);
    const [curIndex, setCurIndex] = useState<number>(-1);
    const [edit, setEdit] = useState<boolean>(false);
    const [ys, setYs] = useState<number[]>([]);
    const [xs, setXs] = useState<number[]>([]);
    const [editList, setEditList] = useState<any[]>([]);
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
      updateCurIndex(0);
    }, [selectedNodeId]);

    useEffect(() => {
      setEditList(list);
    }, [list]);

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
      setEditList(updatedValue);
      // const { selectedNode, setSelectedNode, type, name } = props;
      // const newItem = produce(selectedNode, (draft) => {
      //   draft[type][name].list = updatedValue;
      // });
      // setSelectedNode(newItem);
    };

    const reset = () => {
      setStartKey(0);
      updateCurIndex(-1);
      setEdit(false);
      setEditList([]);
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
          top: start.y,
          left: start.x,
          bottom: end.y + 1,
          right: end.x + 1,
          height: end.y - start.y + 1,
          width: end.x - start.x + 1,
          image: {
            imgUrl: defaultImage,
            intrinsicWidth: 556,
            intrinsicHeight: 199
          },
          // image: "",
          targetUrl: ''
        };

        const updatedValue = [...editList, temp];
        updateList(updatedValue);
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
      // const end = splitKey(Number(e.target.dataset.key));
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
      let result = false;

      cloneDeep(editList).forEach((item) => {
        --item.bottom;
        --item.right;
        // 判断 x 是否有交集
        if (isIntersection(sortBy([start.x, end.x]), [item.left, item.right])) {
          if (start.y < item.top && end.y >= item.top) {
            result = true;
          }
          if (start.y > item.bottom && end.y <= item.bottom) {
            result = true;
          }
        }
        // 判断 y 是否有交集
        if (isIntersection(sortBy([start.y, end.y]), [item.top, item.bottom])) {
          if (start.x < item.left && end.x >= item.left) {
            result = true;
          }
          if (start.x > item.right && end.x <= item.right) {
            result = true;
          }
        }
      });

      return result;
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
      let result = {};
      Object.keys(style).forEach((key) => {
        result[key] = style[key] * getWidth();

        if (["top", "left"].includes(key)) {
          --result[key];
        }
        if (["width", "height"].includes(key)) {
          ++result[key];
        }
        result[key] += "px";
      });

      return result;
    };

    const deleteEditWrap = (index: number) => {
      const updatedValue = [...editList];
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
        {editList.map((item, index) => {
          const isActive = curIndex === index;
          const style = getStyle(item);
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
              <div className='edit-warp-text'>
                <div>{`${parseInt(item.width * getBaseW())}x${parseInt(item.height * getBaseW())}`}</div>
                {item.width > 1 && <div>或同等比例</div>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default CustomLayout;