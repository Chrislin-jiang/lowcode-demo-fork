
import { IPublicTypeComponentMetadata, IPublicTypeSnippet } from '@alilc/lowcode-types';

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
                      "zh-CN": "cube"
                    }
                  },
                  "name": "cube",
                  "setter": {
                    "componentName": "ObjectSetter",
                    "props": {
                      "config": {
                        "items": [
                          {
                            "title": {
                              "label": {
                                "type": "i18n",
                                "en-US": "row",
                                "zh-CN": "row"
                              }
                            },
                            "name": "row",
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
                                "en-US": "col",
                                "zh-CN": "col"
                              }
                            },
                            "name": "col",
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
                                "en-US": "list",
                                "zh-CN": "list"
                              }
                            },
                            "name": "list",
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
                                              "en-US": "top",
                                              "zh-CN": "top"
                                            }
                                          },
                                          "name": "top",
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
                                              "en-US": "left",
                                              "zh-CN": "left"
                                            }
                                          },
                                          "name": "left",
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
                                              "en-US": "width",
                                              "zh-CN": "width"
                                            }
                                          },
                                          "name": "width",
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
                                              "en-US": "height",
                                              "zh-CN": "height"
                                            }
                                          },
                                          "name": "height",
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
                                              "en-US": "image",
                                              "zh-CN": "image"
                                            }
                                          },
                                          "name": "image",
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
                                              "en-US": "targetUrl",
                                              "zh-CN": "targetUrl"
                                            }
                                          },
                                          "name": "targetUrl",
                                          "setter": {
                                            "componentName": "StringSetter",
                                            "isRequired": false,
                                            "initialValue": ""
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
                              "isRequired": true,
                              "initialValue": []
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
                {
                  "title": {
                    "label": {
                      "type": "i18n",
                      "en-US": "imgMargin",
                      "zh-CN": "imgMargin"
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
                      "zh-CN": "imgRadius"
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
