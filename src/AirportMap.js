import React, {Component} from 'react';
import DeckGL, {IconLayer, GeoJsonLayer} from 'deck.gl';
import imageJPG from './data/images.jpg';
import mapData from './data/map.js';

export default class AirportMap extends Component {
  constructor(props) {
    super(props);
  	this.vId = 0;
    this.state = {
      viewport: {
        latitude: 54.3792,
        longitude: 18.468,
        zoom: 16,
        bearing: 24,
        pitch: 20
      },
      width: 500,
      height: 500,
	  };
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _resize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    const {viewport, width, height} = this.state;
    let allLayers = [];

    const geoLayer = new GeoJsonLayer({
      id: 'geojson-map',
      data: mapData,
      opacity: 1,
      stroked: false,
      filled: true,
      extruded: false,
      pickable: false,
      fp64: true,
      getElevation: f => 0,
      getFillColor: f => [0, 0, 0],
      getLineColor: f => [0, 0, 0],
    });


    const robotLayer = new IconLayer({
        id: 'icon-layer',
        data: [{position: [ 18.471562507878815, 54.380394488786585 ], icon: 'marker'}],
        iconAtlas: imageJPG,
        iconMapping:  {
          marker: {x: 0, y: 0, width: 259, height: 194, mask: false}
        },
        sizeScale: 1,
        getSize: 400,
        opacity: 1,
        fp64: true
    });

    allLayers.push(geoLayer);
    allLayers.push(robotLayer);

    return (<div>
        <DeckGL
          {...viewport}
          width={width}
          height={height}
          layers={allLayers}
          controller={true}
          onViewStateChange={({viewState}) => {
            this.setState({viewport: viewState})
          }}
        />
      </div>
    );
  }
}
