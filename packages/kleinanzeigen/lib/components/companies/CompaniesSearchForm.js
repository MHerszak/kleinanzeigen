import React, { Component } from 'react';

import { Components, registerComponent, getSetting, Utils } from 'meteor/vulcan:core';

// import Formsy from 'formsy-react';

import { Form, Input } from 'formsy-react-components';

import { withRouter } from 'react-router'

// import DateTimePicker from 'react-datetime';

import Button from 'reactstrap/lib/Button';

import { FormattedMessage } from 'meteor/vulcan:i18n';

// import moment from 'moment';

// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
// const delay = (function(){
//   var timer = 0;
//   return function(callback, ms){
//     clearTimeout (timer);
//     timer = setTimeout(callback, ms);
//   };
// })();

class CompaniesSearchForm extends Component {
  constructor(props) {
    super(props);
    // this.updateFromDate = this.updateFromDate.bind(this);
    // this.updateToDate = this.updateToDate.bind(this);
    this.submitForm = this.submitForm.bind(this);

    const state = {};
    // if (props.location.query.from) {
    //   state.from = moment(props.location.query.from, 'YYYY-MM-DD');
    // }
    // if (props.location.query.to) {
    //   state.to = moment(props.location.query.to, 'YYYY-MM-DD');
    // }
    if (props.location.query.location) {
      state.location = decodeURIComponent(props.location.query.location);
    }
    this.state = state;
  }

  // updateFromDate(date) {
  //   this.setState({ from: date });
  // }
  //
  // updateToDate(date) {
  //   this.setState({ to: date });
  // }

  async submitForm({ location }) {

    let query = '';

    // if (this.state.from) {
    //   query += `from=${this.state.from.format('YYYY-MM-DD')}`;
    // }
    //
    // if (this.state.to) {
    //   query += `&to=${this.state.to.format('YYYY-MM-DD')}`;
    // }

    if (location) {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=
      ${encodeURIComponent(location)}&key=${getSetting('googlemaps').apiKey}`;

      const response = await fetch(geocodeUrl);
      const geoData = await response.json();
      console.log(geoData);
      const results = geoData.results[0];
      query += `&location=${encodeURIComponent(location)}&lng=${results.geometry.location.lng}&lat=${results.geometry.location.lat}&type=${results.types[0]}`
    }
    // delay(() => {
    //   this.props.router.push({ pathname: Utils.getRoutePath(`companies.list`), query: query });
    // }, 700 );
    this.props.router.push(`/companies?${query}`);
  }

  render() {

    return (
      <div className="search-form">
        <Form onSubmit={this.submitForm}  style={{ display: 'flex' }}>
          <Input
            layout="elementOnly"
            value={this.state.location}
            name="location"
            type="text"
            label="location"
          />

          {/*<div className="rooms-search-form-field">
            <label className="control-label"><FormattedMessage id="rooms.from"/></label>
            <DateTimePicker
              onChange={newDate => this.updateFromDate(newDate)}
              format={"x"}
              value={this.state.from}
              timeFormat={false}
            />
          </div>

          <div className="rooms-search-form-field">
            <label className="control-label"><FormattedMessage id="rooms.to"/></label>
            <DateTimePicker
              onChange={newDate => this.updateToDate(newDate)}
              format={"x"}
              value={this.state.to}
              timeFormat={false}
            />
          </div>*/}

          {/*<div className="rooms-search-form-field">

          </div>*/}

          <Button className="rooms-search-form-submit" type="submit" color="link">
            <FormattedMessage id="companies.search"/>
          </Button>
        </Form>
      </div>
    );
  }

}

registerComponent('CompaniesSearchForm', CompaniesSearchForm, withRouter);