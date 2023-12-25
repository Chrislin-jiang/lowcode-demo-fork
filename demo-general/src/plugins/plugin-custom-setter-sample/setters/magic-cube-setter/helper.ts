import defaultImage from './defaultImage.png';

export const cubeRowsList: number[] = [4, 5, 6, 7];

export const cubeWrapWidth: number = 220;

export const customLayoutWidth: number = 750;

interface ImageInfo {
  imgUrl: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
}

const defaultImageInfo = {
  imgUrl: defaultImage,
  intrinsicWidth: 556,
  intrinsicHeight: 199
};

export interface Model {
  top: number;
  left: number;
  bottom: number;
  right: number;
  height: number;
  width: number;
  image: ImageInfo;
}

export interface InitialModels {
  [key: string]: Model[];
}

export const initialModels: InitialModels = {
  magicCube1: [
    {
      top: 0,
      left: 0,
      bottom: 1,
      right: 1,
      height: 1,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 0,
      left: 1,
      bottom: 1,
      right: 2,
      height: 1,
      width: 1,
      image: defaultImageInfo
    }
  ],
  magicCube2: [
    {
      top: 0,
      left: 0,
      bottom: 1,
      right: 1,
      height: 1,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 0,
      left: 1,
      bottom: 1,
      right: 2,
      height: 1,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 0,
      left: 2,
      bottom: 1,
      right: 3,
      height: 1,
      width: 1,
      image: defaultImageInfo
    }
  ],
  magicCube3: [
    {
      top: 0,
      left: 0,
      bottom: 1,
      right: 1,
      height: 1,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 0,
      left: 1,
      bottom: 1,
      right: 2,
      height: 1,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 0,
      left: 2,
      bottom: 1,
      right: 3,
      height: 1,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 0,
      left: 3,
      bottom: 1,
      right: 4,
      height: 1,
      width: 1,
      image: defaultImageInfo
    }
  ],
  magicCube4: [
    {
      top: 0,
      left: 0,
      bottom: 1,
      right: 1,
      height: 1,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 0,
      left: 1,
      bottom: 1,
      right: 2,
      height: 1,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 1,
      left: 0,
      bottom: 2,
      right: 1,
      height: 1,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 1,
      left: 1,
      bottom: 2,
      right: 2,
      height: 1,
      width: 1,
      image: defaultImageInfo
    }
  ],
  magicCube5: [
    {
      top: 0,
      left: 0,
      bottom: 2,
      right: 1,
      height: 2,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 0,
      left: 1,
      bottom: 1,
      right: 2,
      height: 1,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 1,
      left: 1,
      bottom: 2,
      right: 2,
      height: 1,
      width: 1,
      image: defaultImageInfo
    }
  ],
  magicCube6: [
    {
      top: 0,
      left: 0,
      bottom: 1,
      right: 2,
      height: 1,
      width: 2,
      image: defaultImageInfo
    },
    {
      top: 1,
      left: 0,
      bottom: 2,
      right: 1,
      height: 1,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 1,
      left: 1,
      bottom: 2,
      right: 2,
      height: 1,
      width: 1,
      image: defaultImageInfo
    }
  ],
  magicCube7: [
    {
      top: 0,
      left: 0,
      bottom: 4,
      right: 2,
      height: 4,
      width: 2,
      image: defaultImageInfo
    },
    {
      top: 0,
      left: 2,
      bottom: 2,
      right: 4,
      height: 2,
      width: 2,
      image: defaultImageInfo
    },
    {
      top: 2,
      left: 2,
      bottom: 4,
      right: 3,
      height: 2,
      width: 1,
      image: defaultImageInfo
    },
    {
      top: 2,
      left: 3,
      bottom: 4,
      right: 4,
      height: 2,
      width: 1,
      image: defaultImageInfo
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

export function isIntersection(arrA: number[], arrB: number[]): boolean {
  const max = [arrA[0], arrB[0]];
  const min = [arrA[1], arrB[1]];

  if (Math.max(...max) <= Math.min(...min)) {
    return true;
  }

  return false;
}
