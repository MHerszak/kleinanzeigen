import { getSetting, Head } from 'meteor/vulcan:lib';

const googlemaps = getSetting('googlemaps');

if (googlemaps && googlemaps.apiKey) {

  Head.script.push({
    type: 'text/javascript',
    src: `https://maps.googleapis.com/maps/api/js?key=${googlemaps.apiKey}&libraries=places`,
    contents: '',
  });

}