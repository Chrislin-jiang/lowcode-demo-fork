
import { IPublicTypeComponentMetadata, IPublicTypeSnippet } from '@alilc/lowcode-types';

const ImageAdvertMeta: IPublicTypeComponentMetadata = {
  "componentName": "ImageAdvert",
  "title": "ImageAdvert",
  "docUrl": "",
  "screenshot": "",
  "devMode": "proCode",
  "npm": {
    "package": "@lowcode-lin/business-components",
    "version": "0.1.5",
    "exportName": "ImageAdvert",
    "main": "src\\index.tsx",
    "destructuring": true,
    "subName": ""
  },
  "configure": {
    "props": [
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
                      "en-US": "advertList",
                      "zh-CN": "图片列表"
                    }
                  },
                  "name": "advertList",
                  "setter": {
                    "componentName": "ArraySetter",
                    "props": {
                      "itemSetter": {
                        "componentName": "ObjectSetter",
                        "props": {
                          "config": {
                            "items": [
                              {
                                "title": {
                                  "label": {
                                    "type": "i18n",
                                    "en-US": "imageInfo",
                                    "zh-CN": "上传图片"
                                  }
                                },
                                "name": "imageInfo",
                                "setter": {
                                  "componentName": "UploadSetter",
                                  "isRequired": true,
                                  "initialValue": ""
                                }
                              },
                              // {
                              //   "title": {
                              //     "label": {
                              //       "type": "i18n",
                              //       "en-US": "intrinsicWidth",
                              //       "zh-CN": "原始宽度"
                              //     }
                              //   },
                              //   "name": "intrinsicWidth",
                              //   "setter": {
                              //     "componentName": "NumberSetter",
                              //     "isRequired": true,
                              //     "initialValue": 0
                              //   }
                              // },
                              // {
                              //   "title": {
                              //     "label": {
                              //       "type": "i18n",
                              //       "en-US": "intrinsicHeight",
                              //       "zh-CN": "原始高度"
                              //     }
                              //   },
                              //   "name": "intrinsicHeight",
                              //   "setter": {
                              //     "componentName": "NumberSetter",
                              //     "isRequired": true,
                              //     "initialValue": 0
                              //   }
                              // }
                            ],
                            "extraSetter": {
                              "componentName": "MixedSetter",
                              "isRequired": false,
                              "props": {}
                            }
                          }
                        }
                      }
                    },
                    "initialValue": []
                  }
                },
                {
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "advertTime",
                      "zh-CN": "滚动时长"
                    }
                  },
                  "name": "advertTime",
                  "setter": {
                    "componentName": "RadioGroupSetter",
                    // "isRequired": false,
                    "initialValue": 3,
                    "props": {
                      options: [
                        {
                          label: '慢速',
                          value: 4,
                          tips: '时长4s'
                        },
                        {
                          label: '常规',
                          value: 3,
                          tips: '时长3s'
                        },
                        {
                          label: '快速',
                          value: 1.5,
                          tips: '时长1.5s'
                        }
                      ]
                    }
                  }
                },
                {
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "chooseTemplate",
                      "zh-CN": "选择模板"
                    }
                  },
                  "name": "chooseTemplate",
                  "setter": {
                    "componentName": "RadioGroupSetter",
                    // "isRequired": false,
                    "initialValue": 2,
                    "props": {
                      options: [
                        { label: '图片', value: 1 },
                        { label: '轮播海报', value: 2 }
                        // { label: '横向滑动',  value: 3 }
                      ]
                    }
                  }
                },
                {
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "borderRadius",
                      "zh-CN": "图片圆角"
                    }
                  },
                  "name": "borderRadius",
                  "setter": {
                    "componentName": "NumberSetter",
                    "isRequired": false,
                    "initialValue": 0
                  }
                },
                {
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "imageMargin",
                      "zh-CN": "图片边距"
                    }
                  },
                  "name": "imageMargin",
                  "setter": {
                    "componentName": "NumberSetter",
                    "isRequired": false,
                    "initialValue": 0
                  }
                },
                {
                  "condition": (target) => {
                    if (target.getParent().getPropValue("chooseTemplate") === 1) {
                      return true;
                    } else {
                      return false;
                    }
                  },
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "lineNum",
                      "zh-CN": "单行数量"
                    }
                  },
                  "name": "lineNum",
                  "setter": {
                    "componentName": "RadioGroupSetter",
                    // "isRequired": false,
                    "initialValue": 2,
                    "props": {
                      options: [
                        { label: '1', value: 1 },
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                        { label: '4', value: 4 },
                        { label: '5', value: 5 },
                        { label: '6', value: 6 }
                      ]
                    }
                  }
                },
                {
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "overlapHeight",
                      "zh-CN": "重叠高度"
                    }
                  },
                  "name": "overlapHeight",
                  "setter": {
                    "componentName": "NumberSetter",
                    "isRequired": false,
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
      },
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
      //     "isRequired": false,
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
      //     "isRequired": false,
      //     "initialValue": false
      //   },
      //   "defaultCollapsed": true
      //   // "display": "block"
      // }
    ],
    "supports": {
      "style": true
    },
    "component": {}
  }
};
const snippets: IPublicTypeSnippet[] = [
  {
    "title": "ImageAdvert",
    "screenshot": "",
    "schema": {
      "componentName": "ImageAdvert",
      "props": {}
    }
  }
];

export default {
  ...ImageAdvertMeta,
  snippets
};
