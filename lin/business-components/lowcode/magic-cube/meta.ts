
import { IPublicTypeComponentMetadata, IPublicTypeSnippet } from '@alilc/lowcode-types';

const defaultImage = 'https://img01.yzcdn.cn/upload_files/2023/11/07/f6f40a12d0e407df7206162fee241f08.png';

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

const MagicCubeMeta: IPublicTypeComponentMetadata = {
  "componentName": "MagicCube",
  "title": "MagicCube",
  "docUrl": "",
  "screenshot": "",
  "devMode": "proCode",
  "npm": {
    "package": "@lowcode-lin/business-components",
    "version": "0.1.6",
    "exportName": "MagicCube",
    "main": "src\\index.tsx",
    "destructuring": true,
    "subName": ""
  },
  "configure": {
    "props": [
      // {
      //   "title": {
      //     "label": {
      //       "type": "i18n",
      //       "en-US": "isDesigner",
      //       "zh-CN": "isDesigner"
      //     }
      //   },
      //   "name": "isDesigner",
      //   "setter": {
      //     "componentName": "BoolSetter",
      //     "isRequired": true,
      //     "initialValue": false
      //   }
      // },
      // {
      //   "title": {
      //     "label": {
      //       "type": "i18n",
      //       "en-US": "isPreview",
      //       "zh-CN": "isPreview"
      //     }
      //   },
      //   "name": "isPreview",
      //   "setter": {
      //     "componentName": "BoolSetter",
      //     "isRequired": true,
      //     "initialValue": false
      //   }
      // },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "attr",
            "zh-CN": "attr"
          }
        },
        "name": "attr",
        "setter": {
          "componentName": "ObjectSetter",
          "props": {
            "config": {
              "items": [
                {
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "cube",
                      "zh-CN": "魔方布局"
                    }
                  },
                  "name": "cube",
                  "setter": {
                    "componentName": "MagicCubeSetter",
                    // todo
                    "isDynamic": false,
                    "initialValue": {
                      "model": "magicCube1",
                      "row": 1,
                      "col": 2,
                      "list": [
                        {
                          "top": 0,
                          "left": 0,
                          "bottom": 1,
                          "right": 1,
                          "height": 1,
                          "width": 1,
                          "image": defaultImageInfo,
                          "targetUrl": {}
                        },
                        {
                          "top": 0,
                          "left": 1,
                          "bottom": 1,
                          "right": 2,
                          "height": 1,
                          "width": 1,
                          "image": defaultImageInfo,
                          "targetUrl": {}
                        }
                      ]
                    },
                    // "props": {
                    //   "config": {
                    //     "items": [
                    //       {
                    //         "title": {
                    //           "label": {
                    //             "type": "i18n",
                    //             "en-US": "row",
                    //             "zh-CN": "row"
                    //           }
                    //         },
                    //         "name": "row",
                    //         "setter": {
                    //           "componentName": "NumberSetter",
                    //           "isRequired": true,
                    //           "initialValue": 0
                    //         }
                    //       },
                    //       {
                    //         "title": {
                    //           "label": {
                    //             "type": "i18n",
                    //             "en-US": "col",
                    //             "zh-CN": "col"
                    //           }
                    //         },
                    //         "name": "col",
                    //         "setter": {
                    //           "componentName": "NumberSetter",
                    //           "isRequired": true,
                    //           "initialValue": 0
                    //         }
                    //       },
                    //       {
                    //         "title": {
                    //           "label": {
                    //             "type": "i18n",
                    //             "en-US": "list",
                    //             "zh-CN": "list"
                    //           }
                    //         },
                    //         "name": "list",
                    //         "setter": {
                    //           "componentName": "ArraySetter",
                    //           "props": {
                    //             "itemSetter": {
                    //               "componentName": "ObjectSetter",
                    //               "props": {
                    //                 "config": {
                    //                   "items": [
                    //                     {
                    //                       "title": {
                    //                         "label": {
                    //                           "type": "i18n",
                    //                           "en-US": "top",
                    //                           "zh-CN": "top"
                    //                         }
                    //                       },
                    //                       "name": "top",
                    //                       "setter": {
                    //                         "componentName": "NumberSetter",
                    //                         "isRequired": true,
                    //                         "initialValue": 0
                    //                       }
                    //                     },
                    //                     {
                    //                       "title": {
                    //                         "label": {
                    //                           "type": "i18n",
                    //                           "en-US": "left",
                    //                           "zh-CN": "left"
                    //                         }
                    //                       },
                    //                       "name": "left",
                    //                       "setter": {
                    //                         "componentName": "NumberSetter",
                    //                         "isRequired": true,
                    //                         "initialValue": 0
                    //                       }
                    //                     },
                    //                     {
                    //                       "title": {
                    //                         "label": {
                    //                           "type": "i18n",
                    //                           "en-US": "width",
                    //                           "zh-CN": "width"
                    //                         }
                    //                       },
                    //                       "name": "width",
                    //                       "setter": {
                    //                         "componentName": "NumberSetter",
                    //                         "isRequired": true,
                    //                         "initialValue": 0
                    //                       }
                    //                     },
                    //                     {
                    //                       "title": {
                    //                         "label": {
                    //                           "type": "i18n",
                    //                           "en-US": "height",
                    //                           "zh-CN": "height"
                    //                         }
                    //                       },
                    //                       "name": "height",
                    //                       "setter": {
                    //                         "componentName": "NumberSetter",
                    //                         "isRequired": true,
                    //                         "initialValue": 0
                    //                       }
                    //                     },
                    //                     {
                    //                       "title": {
                    //                         "label": {
                    //                           "type": "i18n",
                    //                           "en-US": "image",
                    //                           "zh-CN": "image"
                    //                         }
                    //                       },
                    //                       "name": "image",
                    //                       "setter": {
                    //                         "componentName": "StringSetter",
                    //                         "isRequired": true,
                    //                         "initialValue": ""
                    //                       }
                    //                     },
                    //                     {
                    //                       "title": {
                    //                         "label": {
                    //                           "type": "i18n",
                    //                           "en-US": "targetUrl",
                    //                           "zh-CN": "targetUrl"
                    //                         }
                    //                       },
                    //                       "name": "targetUrl",
                    //                       "setter": {
                    //                         "componentName": "StringSetter",
                    //                         "isRequired": false,
                    //                         "initialValue": ""
                    //                       }
                    //                     }
                    //                   ],
                    //                   "extraSetter": {
                    //                     "componentName": "MixedSetter",
                    //                     "isRequired": false,
                    //                     "props": {}
                    //                   }
                    //                 }
                    //               }
                    //             }
                    //           },
                    //           "isRequired": true,
                    //           "initialValue": []
                    //         }
                    //       }
                    //     ],
                    //     "extraSetter": {
                    //       "componentName": "MixedSetter",
                    //       "isRequired": false,
                    //       "props": {}
                    //     }
                    //   }
                    // }
                  }
                },
                {
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "imageInfo",
                      "zh-CN": "图片"
                    }
                  },
                  "name": "imageInfo",
                  "setter": {
                    "componentName": "UploadSetter",
                    "isRequired": true,
                    "initialValue": defaultImageInfo
                  }
                },
                {
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "targetUrl",
                      "zh-CN": "跳转链接"
                    }
                  },
                  "name": "targetUrl",
                  "setter": {
                    "componentName": "StringSetter",
                    "isRequired": true,
                    "initialValue": ''
                  }
                },
                {
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "imgMargin",
                      "zh-CN": "图片间隙"
                    }
                  },
                  "name": "imgMargin",
                  "setter": {
                    "componentName": "NumberSetter",
                    "isRequired": true,
                    "initialValue": 0
                  }
                },
                {
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "imgRadius",
                      "zh-CN": "页面间距"
                    }
                  },
                  "name": "imgRadius",
                  "setter": {
                    "componentName": "NumberSetter",
                    "isRequired": true,
                    "initialValue": 0
                  }
                }
              ],
              "extraSetter": {
                "componentName": "MixedSetter",
                "isRequired": false,
                "props": {}
              }
            }
          },
          "isRequired": true
        }
      }
    ],
    "supports": {
      "style": true
    },
    "component": {}
  }
};
const snippets: IPublicTypeSnippet[] = [
  {
    "title": "MagicCube",
    "screenshot": "",
    "schema": {
      "componentName": "MagicCube",
      "props": {}
    }
  }
];

export default {
  ...MagicCubeMeta,
  snippets
};
