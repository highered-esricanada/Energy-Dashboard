let vectorTileMap = {style: {
  "version": 8,
  "sprite": "https://cdn.arcgis.com/sharing/rest/content/items/291da5eab3a0412593b66d384379f89f/resources/styles/../sprites/sprite",
  "glyphs": "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/resources/fonts/{fontstack}/{range}.pbf",
  "sources": {
    "esri": {
      "type": "vector",
      "url": "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer",
      "tiles": [
        "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf"
      ]
    }
  },
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#cfd3d4"
      },
      "layout": {}
    },
    {
      "id": "Land",
      "type": "fill",
      "source": "esri",
      "source-layer": "Land",
      "filter": [
        "in",
        "_symbol",
        0,
        1
      ],
      "minzoom": 0,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [
            [
              0,
              "#f4f4f4"
            ],
            [
              7,
              "#efefef"
            ]
          ]
        }
      }
    },
    {
      "id": "Urban area",
      "type": "fill",
      "source": "esri",
      "source-layer": "Urban area",
      "minzoom": 5,
      "maxzoom": 15,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [
            [
              5,
              "#e5e8e7"
            ],
            [
              10,
              "#ECEDEC"
            ]
          ]
        }
      }
    },
    {
      "id": "Openspace or forest",
      "type": "fill",
      "source": "esri",
      "source-layer": "Openspace or forest",
      "minzoom": 12,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [
            [
              6,
              "#ECEEEA"
            ],
            [
              11,
              "#e4e8e4"
            ]
          ]
        },
        "fill-outline-color": "#E7EAE6"
      }
    },
    {
      "id": "Admin0 forest or park",
      "type": "fill",
      "source": "esri",
      "source-layer": "Admin0 forest or park",
      "minzoom": 7,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [
            [
              6,
              "#ECEEEA"
            ],
            [
              11,
              "#e4e8e4"
            ]
          ]
        },
        "fill-outline-color": "#E7EAE6"
      }
    },
    {
      "id": "Admin1 forest or park",
      "type": "fill",
      "source": "esri",
      "source-layer": "Admin1 forest or park",
      "minzoom": 8,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [
            [
              6,
              "#ECEEEA"
            ],
            [
              11,
              "#e4e8e4"
            ]
          ]
        },
        "fill-outline-color": "#E7EAE6"
      }
    },
    {
      "id": "Zoo",
      "type": "fill",
      "source": "esri",
      "source-layer": "Zoo",
      "minzoom": 12,
      "layout": {},
      "paint": {
        "fill-color": "#e4e8e4"
      }
    },
    {
      "id": "Airport/Airport property",
      "type": "fill",
      "source": "esri",
      "source-layer": "Airport",
      "filter": [
        "==",
        "_symbol",
        1
      ],
      "minzoom": 9,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [
            [
              11,
              "#edede9"
            ],
            [
              15,
              "#efefef"
            ]
          ]
        }
      }
    },
    {
      "id": "Airport/Airport runway",
      "type": "fill",
      "source": "esri",
      "source-layer": "Airport",
      "filter": [
        "==",
        "_symbol",
        0
      ],
      "minzoom": 11,
      "layout": {},
      "paint": {
        "fill-color": "#e1e2dd"
      }
    },
    {
      "id": "Pedestrian",
      "type": "fill",
      "source": "esri",
      "source-layer": "Pedestrian",
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#f2f2f1"
      }
    },
    {
      "id": "Park or farming",
      "type": "fill",
      "source": "esri",
      "source-layer": "Park or farming",
      "minzoom": 12,
      "layout": {},
      "paint": {
        "fill-color": "#e4e8e4"
      }
    },
    {
      "id": "Beach",
      "type": "fill",
      "source": "esri",
      "source-layer": "Beach",
      "minzoom": 13,
      "layout": {},
      "paint": {
        "fill-pattern": "Special area of interest/Sand"
      }
    },
    {
      "id": "Special area of interest/Garden path",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        12
      ],
      "minzoom": 14,
      "layout": {
        "visibility": "none"
      },
      "paint": {
        "fill-color": "#f7f7f7",
        "fill-outline-color": "#EBE8E8"
      }
    },
    {
      "id": "Special area of interest/Parking",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        15
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#f2f2f1"
      }
    },
    {
      "id": "Special area of interest/Green openspace",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        11
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#e5eae5"
      }
    },
    {
      "id": "Special area of interest/Grass",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        8
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#e6eae6"
      }
    },
    {
      "id": "Special area of interest/Baseball field or other grounds",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        1
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#E2E5E2"
      }
    },
    {
      "id": "Special area of interest/Groundcover",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        13
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-pattern": "Special area of interest/Groundcover",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "Special area of interest/Field or court exterior",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        5
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#ECEEEC"
      }
    },
    {
      "id": "Special area of interest/Football field or court",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        4
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#E2E5E2",
        "fill-outline-color": "#efefef"
      }
    },
    {
      "id": "Special area of interest/Hardcourt",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        10
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#d3d3d3",
        "fill-outline-color": "#efefef"
      }
    },
    {
      "id": "Special area of interest/Mulch or dirt",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        14
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#eaeaea"
      }
    },
    {
      "id": "Special area of interest/Athletic track",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        0
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#e2e2e2",
        "fill-outline-color": "#f2f2f2"
      }
    },
    {
      "id": "Special area of interest/Sand",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        6
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-pattern": "Special area of interest/Sand"
      }
    },
    {
      "id": "Special area of interest/Rock or gravel",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        16
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-pattern": "Special area of interest/Rock or gravel"
      }
    },
    {
      "id": "Special area of interest/Water",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        7
      ],
      "minzoom": 15,
      "layout": {},
      "paint": {
        "fill-color": "#cfd3d4"
      }
    },
    {
      "id": "Water line small scale",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line small scale",
      "minzoom": 1,
      "maxzoom": 5,
      "layout": {
        "line-join": "round",
        "visibility": "none"
      },
      "paint": {
        "line-color": "#d6dadb",
        "line-width": 0.5
      }
    },
    {
      "id": "Water line medium scale",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line medium scale",
      "minzoom": 6,
      "maxzoom": 7,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#d6dadb",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              5,
              0.5
            ],
            [
              7,
              0.7
            ]
          ]
        }
      }
    },
    {
      "id": "Water line large scale",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line large scale",
      "minzoom": 7,
      "maxzoom": 11,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#cfd3d4",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              7,
              0.7
            ],
            [
              11,
              0.8
            ]
          ]
        }
      }
    },
    {
      "id": "Water line/Waterfall",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "filter": [
        "==",
        "_symbol",
        5
      ],
      "minzoom": 11,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#cfd3d4",
        "line-width": 0.8,
        "line-dasharray": [
          5,
          5
        ]
      }
    },
    {
      "id": "Water line/Dam or weir",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "filter": [
        "==",
        "_symbol",
        2
      ],
      "minzoom": 11,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#c3c3c3",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              0.7
            ],
            [
              14,
              0.7
            ],
            [
              17,
              2
            ]
          ]
        }
      }
    },
    {
      "id": "Water line/Levee/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "filter": [
        "==",
        "_symbol",
        3
      ],
      "minzoom": 11,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#cfd3d4",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              0.7
            ],
            [
              14,
              0.7
            ],
            [
              17,
              2
            ]
          ]
        }
      }
    },
    {
      "id": "Water line/Levee/0",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water line",
      "filter": [
        "==",
        "_symbol",
        3
      ],
      "minzoom": 13,
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "icon-image": "Water line/Levee/0",
        "symbol-spacing": 15,
        "icon-rotation-alignment": "map",
        "icon-allow-overlap": true,
        "icon-padding": 1
      },
      "paint": {}
    },
    {
      "id": "Water line/Canal or ditch",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "filter": [
        "==",
        "_symbol",
        1
      ],
      "minzoom": 11,
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#cfd3d4",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              0.8
            ],
            [
              14,
              0.8
            ],
            [
              17,
              2
            ]
          ]
        }
      }
    },
    {
      "id": "Water line/Stream or river intermittent",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "filter": [
        "==",
        "_symbol",
        4
      ],
      "minzoom": 11,
      "layout": {},
      "paint": {
        "line-color": "#cfd3d4",
        "line-dasharray": [
          7,
          3
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              0.8
            ],
            [
              14,
              0.8
            ],
            [
              17,
              2
            ]
          ]
        }
      }
    },
    {
      "id": "Water line/Stream or river",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "filter": [
        "==",
        "_symbol",
        0
      ],
      "minzoom": 11,
      "layout": {
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#cfd3d4",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              0.8
            ],
            [
              14,
              0.8
            ],
            [
              17,
              2
            ]
          ]
        }
      }
    },
    {
      "id": "Marine area/bathymetry depth 1",
      "type": "fill",
      "source": "esri",
      "source-layer": "Marine area",
      "minzoom": 4,
      "layout": {},
      "paint": {
        "fill-color": "#cfd3d4"
      }
    },
    {
      "id": "Water area small scale",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area small scale",
      "minzoom": 1,
      "maxzoom": 5,
      "layout": {},
      "paint": {
        "fill-color": "#cfd3d4"
      }
    },
    {
      "id": "Water area medium scale/Lake intermittent",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area medium scale",
      "filter": [
        "==",
        "_symbol",
        1
      ],
      "minzoom": 5,
      "maxzoom": 7,
      "layout": {},
      "paint": {
        "fill-pattern": "Water area/Lake or river intermittent"
      }
    },
    {
      "id": "Water area medium scale/Lake or river",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area medium scale",
      "filter": [
        "==",
        "_symbol",
        0
      ],
      "minzoom": 5,
      "maxzoom": 7,
      "layout": {},
      "paint": {
        "fill-color": "#cfd3d4"
      }
    },
    {
      "id": "Water area large scale/Lake intermittent",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area large scale",
      "filter": [
        "==",
        "_symbol",
        1
      ],
      "minzoom": 7,
      "maxzoom": 11,
      "layout": {},
      "paint": {
        "fill-pattern": "Water area/Lake or river intermittent"
      }
    },
    {
      "id": "Water area large scale/Lake or river",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area large scale",
      "filter": [
        "==",
        "_symbol",
        0
      ],
      "minzoom": 7,
      "maxzoom": 11,
      "layout": {},
      "paint": {
        "fill-color": "#cfd3d4"
      }
    },
    {
      "id": "Water area/Lake, river or bay",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "filter": [
        "==",
        "_symbol",
        7
      ],
      "minzoom": 11,
      "layout": {},
      "paint": {
        "fill-color": "#cfd3d4"
      }
    },
    {
      "id": "Water area/Lake or river intermittent",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "filter": [
        "==",
        "_symbol",
        6
      ],
      "minzoom": 11,
      "layout": {},
      "paint": {
        "fill-pattern": "Water area/Lake or river intermittent"
      }
    },
    {
      "id": "Water area/Inundated area",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "filter": [
        "==",
        "_symbol",
        4
      ],
      "minzoom": 11,
      "layout": {},
      "paint": {
        "fill-pattern": "Water area/Inundated area"
      }
    },
    {
      "id": "Water area/Swamp or marsh",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "filter": [
        "==",
        "_symbol",
        3
      ],
      "minzoom": 11,
      "layout": {},
      "paint": {
        "fill-pattern": "Water area/Swamp or marsh"
      }
    },
    {
      "id": "Water area/Playa",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "filter": [
        "==",
        "_symbol",
        1
      ],
      "minzoom": 11,
      "layout": {},
      "paint": {
        "fill-pattern": "Water area/Playa"
      }
    },
    {
      "id": "Water area/Dam or weir",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "filter": [
        "==",
        "_symbol",
        5
      ],
      "minzoom": 11,
      "layout": {},
      "paint": {
        "fill-color": "#DFE1E2",
        "fill-outline-color": "#efefef"
      }
    },
    {
      "id": "Special area of interest/Bike, walk or pedestrian",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        2
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#f2f2f1"
      }
    },
    {
      "id": "Railroad/2",
      "type": "line",
      "source": "esri",
      "source-layer": "Railroad",
      "minzoom": 12,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#EFEFEF",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12,
              1.5
            ],
            [
              14,
              2.5
            ],
            [
              17,
              3
            ]
          ]
        }
      }
    },
    {
      "id": "Railroad/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Railroad",
      "minzoom": 12,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dcddda",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12,
              0.5
            ],
            [
              14,
              1
            ],
            [
              17,
              1.5
            ]
          ]
        }
      }
    },
    {
      "id": "Ferry/Rail ferry/2",
      "type": "line",
      "source": "esri",
      "source-layer": "Ferry",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          1
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 12,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#EFEFEF",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12,
              1.5
            ],
            [
              14,
              2.5
            ],
            [
              17,
              3
            ]
          ]
        }
      }
    },
    {
      "id": "Ferry/Rail ferry/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Ferry",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          1
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 12,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dcddda",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              12,
              0.5
            ],
            [
              14,
              1
            ],
            [
              17,
              1.5
            ]
          ]
        }
      }
    },
    {
      "id": "Special area of interest line/Dock or pier",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "filter": [
        "==",
        "_symbol",
        0
      ],
      "minzoom": 15,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#efefef",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              15,
              0.7
            ],
            [
              17,
              1.2
            ]
          ]
        }
      }
    },
    {
      "id": "Special area of interest line/Sports field",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "filter": [
        "==",
        "_symbol",
        6
      ],
      "minzoom": 15,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#efefef",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              15,
              0.7
            ],
            [
              17,
              1.2
            ]
          ]
        }
      }
    },
    {
      "id": "Building/Shadow",
      "type": "fill",
      "source": "esri",
      "source-layer": "Building",
      "minzoom": 16,
      "layout": {
        "visibility": "none"
      },
      "paint": {
        "fill-opacity": 1,
        "fill-color": "#ececeb",
        "fill-antialias": true,
        "fill-translate": {
          "stops": [
            [
              15,
              [
                0,
                0
              ]
            ],
            [
              18,
              [
                2,
                2
              ]
            ]
          ]
        },
        "fill-translate-anchor": "viewport"
      }
    },
    {
      "id": "Building",
      "type": "fill",
      "source": "esri",
      "source-layer": "Building",
      "minzoom": 15,
      "layout": {
        "visibility": "none"
      },
      "paint": {
        "fill-opacity": 0,
        "fill-color": "#ececeb",
        "fill-outline-color": "#ececeb",
        "fill-antialias": true,
        "fill-translate": [
          0,
          0
        ],
        "fill-translate-anchor": "map"
      }
    },
    {
      "id": "Special area of interest line/Parking lot",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "filter": [
        "==",
        "_symbol",
        5
      ],
      "minzoom": 15,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              15,
              0.7
            ],
            [
              17,
              1.2
            ]
          ]
        }
      }
    },
    {
      "id": "Trail or path/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Trail or path",
      "minzoom": 15,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              14,
              1.5
            ],
            [
              16,
              3.3
            ],
            [
              18,
              4
            ]
          ]
        }
      }
    },
    {
      "id": "Road/4WD/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          10
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 13,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-dasharray": [
          2,
          1
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              1.5
            ],
            [
              14,
              3.3
            ],
            [
              18,
              8.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Service/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          8
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 13,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              1.5
            ],
            [
              14,
              3.3
            ],
            [
              18,
              8.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Local/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          7
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 12,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              11,
              1.5
            ],
            [
              14,
              4
            ],
            [
              16,
              6
            ],
            [
              18,
              17.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Pedestrian/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          9
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 15,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              14,
              1.5
            ],
            [
              16,
              3.3
            ],
            [
              18,
              4
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Minor, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          6
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 11,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              1
            ],
            [
              14,
              4
            ],
            [
              16,
              9.6
            ],
            [
              18,
              17.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Minor/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          5
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 11,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              2.6
            ],
            [
              14,
              5.6
            ],
            [
              16,
              9.6
            ],
            [
              18,
              17.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Major, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          4
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 9,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              9,
              1.5
            ],
            [
              14,
              7.3
            ],
            [
              16,
              10.3
            ],
            [
              18,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Major/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          3
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 9,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-width": {
          "base": 1,
          "stops": [
            [
              9,
              1.5
            ],
            [
              14,
              7.3
            ],
            [
              16,
              10.3
            ],
            [
              18,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Freeway Motorway, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          2
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 7,
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-width": {
          "base": 1,
          "stops": [
            [
              9,
              0.3
            ],
            [
              14,
              8.3
            ],
            [
              16,
              12.3
            ],
            [
              18,
              26
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Highway/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          1
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 8,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              8,
              0.3
            ],
            [
              14,
              8.3
            ],
            [
              16,
              12.3
            ],
            [
              18,
              26
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Freeway Motorway/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          0
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 7,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              5,
              0.3
            ],
            [
              14,
              8.3
            ],
            [
              16,
              12.3
            ],
            [
              18,
              26
            ]
          ]
        }
      }
    },
    {
      "id": "Trail or path/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Trail or path",
      "minzoom": 15,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-dasharray": [
          3,
          1.5
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              14,
              1.3
            ],
            [
              16,
              2
            ],
            [
              18,
              2.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Pedestrian/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          9
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 15,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-dasharray": [
          3,
          1.5
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              14,
              1.3
            ],
            [
              16,
              2
            ],
            [
              18,
              2.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/4WD/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          10
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 13,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              0.75
            ],
            [
              14,
              1.3
            ],
            [
              18,
              6.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Service/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          8
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 13,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              0.75
            ],
            [
              14,
              1.3
            ],
            [
              18,
              6.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Local/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          7
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 12,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": {
          "stops": [
            [
              12,
              "#FAFAFA"
            ],
            [
              13,
              "#ffffff"
            ]
          ]
        },
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              11,
              1.1
            ],
            [
              14,
              2
            ],
            [
              16,
              4
            ],
            [
              18,
              15.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Minor, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          6
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 11,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              0.75
            ],
            [
              14,
              2
            ],
            [
              16,
              7.65
            ],
            [
              18,
              15.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Minor/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          5
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 11,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              1.3
            ],
            [
              14,
              3.65
            ],
            [
              16,
              7.65
            ],
            [
              18,
              15.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Major, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          4
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 9,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#ffffff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              9,
              0.75
            ],
            [
              14,
              5.3
            ],
            [
              16,
              8.3
            ],
            [
              18,
              16
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Major/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          3
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 9,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              9,
              0.75
            ],
            [
              14,
              5.3
            ],
            [
              16,
              8.3
            ],
            [
              18,
              16
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Freeway Motorway, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          2
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 7,
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#ffffff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              9,
              0.3
            ],
            [
              14,
              6.3
            ],
            [
              16,
              10.3
            ],
            [
              18,
              24
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Highway/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          1
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 8,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#ffffff",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              8,
              0.3
            ],
            [
              14,
              6.3
            ],
            [
              16,
              10.3
            ],
            [
              18,
              24
            ]
          ]
        }
      }
    },
    {
      "id": "Road/Freeway Motorway/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          0
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 6,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": {
          "stops": [
            [
              6,
              "#FAFAFA"
            ],
            [
              7,
              "#ffffff"
            ]
          ]
        },
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              5,
              0.3
            ],
            [
              14,
              6.3
            ],
            [
              16,
              10.3
            ],
            [
              18,
              24
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/4WD/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          10
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 13,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-opacity": 0.5,
        "line-dasharray": [
          2,
          1
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              1.5
            ],
            [
              14,
              3.3
            ],
            [
              18,
              8.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Service/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          8
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 13,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              1.5
            ],
            [
              14,
              3.3
            ],
            [
              18,
              8.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Local/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          7
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 12,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              11,
              1.5
            ],
            [
              14,
              4
            ],
            [
              16,
              6
            ],
            [
              18,
              17.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Pedestrian/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          9
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 15,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              14,
              1.5
            ],
            [
              16,
              3.3
            ],
            [
              18,
              4
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Minor, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          6
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 11,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              1
            ],
            [
              14,
              4
            ],
            [
              16,
              9.65
            ],
            [
              18,
              17.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Minor/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          5
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 11,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              2.6
            ],
            [
              14,
              5.65
            ],
            [
              16,
              9.65
            ],
            [
              18,
              17.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Major, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          4
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 9,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              9,
              1.5
            ],
            [
              14,
              7.3
            ],
            [
              16,
              10.3
            ],
            [
              18,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Major/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          3
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 9,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1,
          "stops": [
            [
              9,
              1.5
            ],
            [
              14,
              7.3
            ],
            [
              16,
              10.3
            ],
            [
              18,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Freeway Motorway, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          2
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 7,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              9,
              0.3
            ],
            [
              14,
              8.3
            ],
            [
              16,
              14.3
            ],
            [
              18,
              28
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Highway/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          1
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 8,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              8,
              0.3
            ],
            [
              14,
              8.3
            ],
            [
              16,
              14.3
            ],
            [
              18,
              28
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Freeway Motorway/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          0
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 7,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#E3E5E2",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              5,
              0.3
            ],
            [
              14,
              8.3
            ],
            [
              16,
              14.3
            ],
            [
              18,
              28
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Pedestrian/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          9
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 15,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-opacity": 0.5,
        "line-dasharray": [
          3,
          1.5
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              14,
              1.3
            ],
            [
              16,
              2
            ],
            [
              18,
              2.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/4WD/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          10
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 13,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              0.75
            ],
            [
              14,
              1.3
            ],
            [
              18,
              6.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Service/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          8
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 13,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              0.75
            ],
            [
              14,
              1.3
            ],
            [
              18,
              6.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Local/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          7
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 12,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": {
          "stops": [
            [
              12,
              "#FAFAFA"
            ],
            [
              13,
              "#ffffff"
            ]
          ]
        },
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              11,
              1.1
            ],
            [
              14,
              2
            ],
            [
              16,
              4
            ],
            [
              18,
              15.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Minor, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          6
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 11,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              0.75
            ],
            [
              14,
              2
            ],
            [
              16,
              7.65
            ],
            [
              18,
              15.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Minor/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          5
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 11,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#FFFFFF",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              11,
              1.3
            ],
            [
              14,
              3.65
            ],
            [
              16,
              7.65
            ],
            [
              18,
              15.3
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Major, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          4
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 9,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#ffffff",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              9,
              0.75
            ],
            [
              14,
              5.3
            ],
            [
              16,
              8.3
            ],
            [
              18,
              16
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Major/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          3
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 9,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#ffffff",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              9,
              0.75
            ],
            [
              14,
              5.3
            ],
            [
              16,
              8.3
            ],
            [
              18,
              16
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Freeway Motorway, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          2
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 7,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#ffffff",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              9,
              0.3
            ],
            [
              14,
              6.3
            ],
            [
              16,
              12.3
            ],
            [
              18,
              26
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Highway/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          1
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 8,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#ffffff",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              8,
              0.3
            ],
            [
              14,
              6.3
            ],
            [
              16,
              12.3
            ],
            [
              18,
              26
            ]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Freeway Motorway/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          0
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 6,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": {
          "stops": [
            [
              6,
              "#FAFAFA"
            ],
            [
              7,
              "#ffffff"
            ]
          ]
        },
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              5,
              0.3
            ],
            [
              14,
              6.3
            ],
            [
              16,
              12.3
            ],
            [
              18,
              26
            ]
          ]
        }
      }
    },
    {
      "id": "Special area of interest/Gutter",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        9
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#f2f2f1",
        "fill-outline-color": "#efefef"
      }
    },
    {
      "id": "Special area of interest/Curb",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "filter": [
        "==",
        "_symbol",
        3
      ],
      "minzoom": 14,
      "layout": {},
      "paint": {
        "fill-color": "#f2f2f1",
        "fill-outline-color": "#ebebeb"
      }
    },
    {
      "id": "Boundary line/Disputed admin2/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          8
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 9,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dddedb",
        "line-opacity": 0.95,
        "line-width": {
          "base": 1,
          "stops": [
            [
              4,
              0.65
            ],
            [
              14,
              7
            ],
            [
              17,
              7
            ]
          ]
        }
      }
    },
    {
      "id": "Boundary line/Disputed admin2/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          8
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 9,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": {
          "stops": [
            [
              1,
              "#FAFAFA"
            ],
            [
              3,
              "#ffffff"
            ]
          ]
        },
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              1,
              0.65
            ],
            [
              14,
              1.3
            ],
            [
              17,
              2.65
            ]
          ]
        },
        "line-dasharray": [
          7,
          5
        ]
      }
    },
    {
      "id": "Boundary line/Disputed admin1/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 4,
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          7
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dddedb",
        "line-opacity": 0.95,
        "line-width": {
          "base": 1,
          "stops": [
            [
              4,
              0.65
            ],
            [
              14,
              7
            ]
          ]
        }
      }
    },
    {
      "id": "Boundary line/Disputed admin0/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          6
        ],
        [
          "!in",
          "Viz",
          3
        ],
        [
          "!in",
          "DisputeID",
          8,
          16,
          90,
          96,
          0
        ]
      ],
      "minzoom": 1,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dddedb",
        "line-opacity": 0.95,
        "line-width": {
          "base": 1,
          "stops": [
            [
              1,
              0.65
            ],
            [
              14,
              9.3
            ]
          ]
        }
      }
    },
    {
      "id": "Boundary line/Disputed admin1/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 4,
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          7
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": {
          "stops": [
            [
              1,
              "#FAFAFA"
            ],
            [
              3,
              "#ffffff"
            ]
          ]
        },
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              1,
              0.65
            ],
            [
              14,
              1.3
            ],
            [
              17,
              2.65
            ]
          ]
        },
        "line-dasharray": [
          7,
          5
        ]
      }
    },
    {
      "id": "Boundary line/Disputed admin0/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          6
        ],
        [
          "!in",
          "Viz",
          3
        ],
        [
          "!in",
          "DisputeID",
          8,
          16,
          90,
          96,
          0
        ]
      ],
      "minzoom": 1,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": {
          "stops": [
            [
              1,
              "#FAFAFA"
            ],
            [
              3,
              "#ffffff"
            ]
          ]
        },
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              1,
              0.65
            ],
            [
              14,
              1.3
            ],
            [
              17,
              2.65
            ]
          ]
        },
        "line-dasharray": [
          7,
          5
        ]
      }
    },
    {
      "id": "Boundary line/Admin2/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          2
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 10,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dfe0dd",
        "line-opacity": 0.6,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              8,
              1.3
            ],
            [
              14,
              2.65
            ]
          ]
        }
      }
    },
    {
      "id": "Boundary line/Admin1/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          1
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 4,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dfe0dd",
        "line-width": {
          "base": 1,
          "stops": [
            [
              4,
              0.65
            ],
            [
              14,
              7
            ]
          ]
        }
      }
    },
    {
      "id": "Boundary line/Admin0/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          0
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 1,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dddedb",
        "line-width": {
          "base": 1,
          "stops": [
            [
              1,
              0.65
            ],
            [
              14,
              9.3
            ]
          ]
        }
      }
    },
    {
      "id": "Boundary line/Admin5",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          5
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 16,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#b9b9b9",
        "line-dasharray": [
          5,
          3
        ]
      }
    },
    {
      "id": "Boundary line/Admin4",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          4
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 16,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#b9b9b9",
        "line-dasharray": [
          5,
          3
        ]
      }
    },
    {
      "id": "Boundary line/Admin3",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          3
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 16,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#b9b9b9",
        "line-dasharray": [
          5,
          3
        ]
      }
    },
    {
      "id": "Boundary line/Admin2/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          2
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 9,
      "layout": {
        "line-join": "round"
      },
      "paint": {
        "line-color": "#b9b9b9",
        "line-dasharray": [
          6,
          4
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              8,
              0.5
            ],
            [
              14,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "Boundary line/Admin1/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          1
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 7,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": {
          "stops": [
            [
              7,
              "#c8c8c8"
            ],
            [
              12,
              "#b9b9b9"
            ]
          ]
        },
        "line-dasharray": [
          7,
          5.3
        ],
        "line-width": {
          "base": 1,
          "stops": [
            [
              7,
              0.3
            ],
            [
              14,
              1.3
            ]
          ]
        }
      }
    },
    {
      "id": "Boundary line/Admin0/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "filter": [
        "all",
        [
          "==",
          "_symbol",
          0
        ],
        [
          "!in",
          "Viz",
          3
        ]
      ],
      "minzoom": 5,
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": {
          "stops": [
            [
              5,
              "#cccccc"
            ],
            [
              7,
              "#9C9C9C"
            ]
          ]
        },
        "line-dasharray": [
          7,
          5.3
        ],
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              5,
              0.7
            ],
            [
              14,
              1.3
            ]
          ]
        }
      }
    }
  ],
  "metadata": {
    "arcgisStyleUrl": "https://www.arcgis.com/sharing/rest/content/items/291da5eab3a0412593b66d384379f89f/resources/styles/root.json",
    "arcgisOriginalItemTitle": "Light Gray Canvas Base",
    "arcgisQuickEditor": {
      "building": "#ececeb",
      "labelTextColor": "#ffffff",
      "labelHaloColor": "#000000",
      "baseColor": "#ececeb",
      "labelContrast": 4.5,
      "labelColorMode": "LABELS_MAP_COLORS",
      "colorMode": "CUSTOM",
      "colors": {
        "water": "#d2d6d6",
        "land": "#ececeb",
        "nature": "#e8ebe7",
        "building": "#ececeb",
        "road": "#f0f1f0",
        "boundaries": "#d7d7d6"
      }
    },
    "arcgisQuickEditorWarning": true
  }
}
}