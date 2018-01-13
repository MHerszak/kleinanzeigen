import React, { Component } from 'react';

import PropTypes from 'prop-types';

import PlacesAutocomplete from 'react-places-autocomplete';

import FRC from 'formsy-react-components';

import { Components, registerComponent } from 'meteor/vulcan:core';

const Input = FRC.Input;

const processAddressString = (place) =>
  place.filter((obj) => !obj.types.includes('administrative_area_level_2'));

class PlaceControl extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: props.value,
      placeName: props.value,
      placeId: props.document.placeId
    };

    // this.onChange = (address) => this.setState({ address });
    // this.onSelect = (address, placeId) => this.setState({ address, placeId });
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.placesService = new window.google.maps.places.PlacesService(document.createElement('div'))
    }
  }

  onChange = (address) => this.setState({ address });

  onSelect = (address, placeId) => this.setState({ address, placeId });

  onBlur() {
    const { placeId } = this.state;

    if (!this.placesService) return;

    if (!placeId) return;

    this.placesService.getDetails({ placeId }, (result) => {
      const addressArray = processAddressString(result.address_components);
      console.log('result => ', result);
      // addressArray.forEach(obj => {
      //
      // });
      this.setState({ placeName: result.name });

      this.context.addToAutofilledValues({
        city: result.name,
        placeName: result.name,
        placeId: placeId,
      });
    });
  }

  render() {
    const myStyles = {
      autocompleteContainer: {
        paddingBottom: '20px',
        backgroundSize: 'auto 12px',
        backgroundPosition: 'bottom left 10px',
        backgroundRepeat: 'no-repeat',
        backgroundImage: "url('https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3_hdpi.png')",
      },
    };
    const inputProps = {
      value: this.state.address, 
      onChange: this.onChange,
      onBlur: this.onBlur
    };
    return (
      <div className="form-group row">
        <label className="control-label col-sm-3">{this.props.label}</label>
        <div className="col-sm-9">
          <PlacesAutocomplete
            inputProps={inputProps}
            styles={myStyles}
            onSelect={this.onSelect}
            googleLogo={false}
          />
          <Input name={this.props.name} type="hidden" readOnly value={this.state.placeName} />
        </div>
      </div>
    );
  }
}

PlaceControl.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string
};

PlaceControl.contextTypes = {
  addToAutofilledValues: PropTypes.func,
};

registerComponent('PlaceControl', PlaceControl);

export default PlaceControl;