import { sortBy } from 'lodash';

import defaultImage from './defaultImage.png';

export const cubeRowsList: number[] = [4, 5, 6, 7];

export const cubeWrapWidth: number = 220;

export const customLayoutWidth: number = 750;

export interface Model {
  x: number;
  y: number;
  width: number;
  height: number;
  image: string;
}

export interface InitialModels {
  [key: string]: Model[];
}

export const initialModels: InitialModels = {
  magicCube1: [
    {
      x: 0,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    },
    {
      x: 1,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    }
  ],
  magicCube2: [
    {
      x: 0,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    },
    {
      x: 1,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    },
    {
      x: 2,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    }
  ],
  magicCube3: [
    {
      x: 0,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    },
    {
      x: 1,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    },
    {
      x: 2,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    },
    {
      x: 3,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    }
  ],
  magicCube4: [
    {
      x: 0,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    },
    {
      x: 1,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    },
    {
      x: 0,
      y: 1,
      height: 1,
      width: 1,
      image: defaultImage
    },
    {
      x: 1,
      y: 1,
      height: 1,
      width: 1,
      image: defaultImage
    }
  ],
  magicCube5: [
    {
      x: 0,
      y: 0,
      height: 2,
      width: 1,
      image: defaultImage
    },
    {
      x: 1,
      y: 0,
      height: 1,
      width: 1,
      image: defaultImage
    },
    {
      x: 1,
      y: 1,
      height: 1,
      width: 1,
      image: defaultImage
    }
  ],
  magicCube6: [
    {
      x: 0,
      y: 0,
      height: 1,
      width: 2,
      image: defaultImage
    },
    {
      x: 0,
      y: 1,
      height: 1,
      width: 1,
      image: defaultImage
    },
    {
      x: 1,
      y: 1,
      height: 1,
      width: 1,
      image: defaultImage
    }
  ],
  magicCube7: [
    {
      x: 0,
      y: 0,
      height: 4,
      width: 2,
      image: defaultImage
    },
    {
      x: 2,
      y: 0,
      height: 2,
      width: 2,
      image: defaultImage
    },
    {
      x: 2,
      y: 2,
      height: 2,
      width: 1,
      image: defaultImage
    },
    {
      x: 3,
      y: 2,
      height: 2,
      width: 1,
      image: defaultImage
    }
  ]
};

export interface ModelOption {
  label: string;
  value: string;
  row: number;
  col: number;
}

export const modelOptions: ModelOption[] = [
  {
    label: "一行两个",
    value: "magicCube1",
    row: 1,
    col: 2
  },
  {
    label: "一行三个",
    value: "magicCube2",
    row: 1,
    col: 3
  },
  {
    label: "一行四个",
    value: "magicCube3",
    row: 1,
    col: 4
  },
  {
    label: "两左两右",
    value: "magicCube4",
    row: 2,
    col: 2
  },
  {
    label: "一左两右",
    value: "magicCube5",
    row: 2,
    col: 2
  },
  {
    label: "一上二下",
    value: "magicCube6",
    row: 2,
    col: 2
  },
  {
    label: "一左三右",
    value: "magicCube7",
    row: 4,
    col: 4
  },
  {
    label: "自定义",
    value: "custom",
    row: 5,
    col: 5
  }
];

const rectangleFormat = (rec, temp) => {
  const xs = sortBy([rec[0], rec[2]]);
  const ys = sortBy([rec[1], rec[3]]);
  if (temp) {
    return [xs[0], ys[0], xs[1] + 1, ys[1] + 1];
  } else {
    return [xs[0], ys[0], xs[1], ys[1]];
  }
};

export const isRectangleOverlap = function (rec1, rec2) {
  const rectangle1 = rectangleFormat(rec1, true);
  const rectangle2 = rectangleFormat(rec2, false);
  return rectangle2[0] < rectangle1[2] && rectangle2[1] < rectangle1[3] && rectangle2[2] > rectangle1[0] && rectangle2[3] > rectangle1[1];
};
