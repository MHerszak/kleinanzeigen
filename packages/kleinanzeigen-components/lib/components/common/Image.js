import React from 'react';

import PropTypes from 'prop-types';

import { registerComponent } from 'meteor/vulcan:core';

// import { Components } from 'meteor/vulcan:core';

// This function takes a component...
// function imageProxy(WrappedComponent, selectData) {
//   // ...and returns another component...
//   return class ImageProxy extends Component {
//
//     state = {
//       use: true,
//     };
//
//     handleChange = () => {
//       this.setState({
//         data: selectData(DataSource, this.props)
//       });
//     };
//
//     render() {
//       // ... and renders the wrapped component with the fresh data!
//       // Notice that we pass through any additional props
//       return <WrappedComponent data={this.state.data} {...this.props} />;
//     }
//   };
// }

const Image = ({ src, component, onError, ...other }) => {
  if (component) {
    const ImageComponent = React.cloneElement(component, { src,  onError, ...other });
    return <ImageComponent />;
  }
  return (
    <img src={src} onError={(e) => onError(e)} {...other} />
  );
};

Image.propTypes = {
  src: PropTypes.string,
  fallbackSrc: PropTypes.string
};

registerComponent('Image', Image);
