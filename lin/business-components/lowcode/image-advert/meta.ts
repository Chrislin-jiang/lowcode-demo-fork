
import { IPublicTypeComponentMetadata, IPublicTypeSnippet } from '@alilc/lowcode-types';

const ImageAdvertMeta: IPublicTypeComponentMetadata = {
  "componentName": "ImageAdvert",
  "title": "ImageAdvert",
  "docUrl": "",
  "screenshot": "",
  "devMode": "proCode",
  "npm": {
    "package": "@lowcode-lin/business-components",
    "version": "0.1.4",
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
                      "zh-CN": "advertList"
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
                                    "en-US": "imageUrl",
                                    "zh-CN": "imageUrl"
                                  }
                                },
                                "name": "imageUrl",
                                "setter": {
                                  "componentName": "StringSetter",
                                  "isRequired": true,
                                  "initialValue": ""
                                }
                              },
                              {
                                "title": {
                                  "label": {
                                    "type": "i18n",
                                    "en-US": "intrinsicHeight",
                                    "zh-CN": "intrinsicHeight"
                                  }
                                },
                                "name": "intrinsicHeight",
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
                                    "en-US": "intrinsicWidth",
                                    "zh-CN": "intrinsicWidth"
                                  }
                                },
                                "name": "intrinsicWidth",
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
                      "zh-CN": "advertTime"
                    }
                  },
                  "name": "advertTime",
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
                      "en-US": "chooseTemplate",
                      "zh-CN": "chooseTemplate"
                    }
                  },
                  "name": "chooseTemplate",
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
                      "en-US": "borderRadius",
                      "zh-CN": "borderRadius"
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
                      "zh-CN": "imageMargin"
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
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "lineNum",
                      "zh-CN": "lineNum"
                    }
                  },
                  "name": "lineNum",
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
                      "en-US": "overlapHeight",
                      "zh-CN": "overlapHeight"
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
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "isDesigner",
            "zh-CN": "isDesigner"
          }
        },
        "name": "isDesigner",
        "setter": {
          "componentName": "BoolSetter",
          "isRequired": false,
          "initialValue": false
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "isPreview",
            "zh-CN": "isPreview"
          }
        },
        "name": "isPreview",
        "setter": {
          "componentName": "BoolSetter",
          "isRequired": false,
          "initialValue": false
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
