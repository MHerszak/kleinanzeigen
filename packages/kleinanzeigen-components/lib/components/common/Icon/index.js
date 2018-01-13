import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { icons } from './icons';

/**
 * @summary Take an icon name (such as "open") and return the HTML code to display the icon
 * @param {string} iconName - the name of the icon
 * @param {string} [iconClass] - an optional class to assign to the icon
 */
export default class Icon extends PureComponent {

  static propTypes = {
    iconClass: PropTypes.string,
    name: PropTypes.string.isRequired,
  };

  static defaultProps = {
    iconClass: '',
  };

  static displayName = 'Icon';

  render() {
    const { iconClass, ...rest } = this.props;
    const { name } = this.props;
    const iconCode = icons[name] ? icons[name] : name;
    const iClass = (typeof iconClass === 'string') ? ` ${iconClass}` : '';
    const c = `icon fa fa-fw fa-${iconCode} icon-${name} ${iClass}`;
    return <i className={c} {...rest} aria-hidden="true"></i>;
  }
}
