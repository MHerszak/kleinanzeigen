import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import Formsy from 'formsy-react';

import FRC from 'formsy-react-components';

import { Button } from 'reactstrap';

import Cookie from 'react-cookie';

import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

import Users from "meteor/vulcan:users";

import { withCurrentUser, registerComponent, Components, getRawComponent, withMutation, withMessages } from 'meteor/vulcan:core';

import SimpleSchema from 'simpl-schema';

const Input = FRC.Input;

const dataSchema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  }
});

const dataContext = dataSchema.namedContext("newsletterForm");

class SbNewsletter extends PureComponent {

  state = {
    showBanner: showBanner,
    loading: false,
    success: false
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.currentUser) {
      this.setState({ showBanner: showBanner(nextProps.currentUser )});
    }
  }

  successCallbackSubscription = (/* result*/) => {
    this.props.flash(this.context.intl.formatMessage({ id: 'newsletter.success_message' }), 'success' );
    this.dismissBanner();
  };

  subscribeEmail = async (data) => {
    try {
      const result = await this.props.addEmailNewsletter({ email: data.email });
      return this.successCallbackSubscription(result);
    } catch(error) {
      const graphQLError = error.graphQLErrors[0];
      console.error(graphQLError); // eslint-disable-line no-console
      const message = this.context.intl.formatMessage({
        id: `newsletter.error_${this.state.error.name}`
      }, { message: this.state.error.message });
      return this.props.flash(message, 'error');
    }
  };

  subscribeEmail = (data) => {

    if (!dataContext.validate(data)) {

      this.setState({ error: "Sorry, that doesn't look like a valid email." });

    } else {

      this.setState({ loading: true });

      this.props.addEmailNewsletter({ email: data.email }).then((result) => {
        this.setState({ loading: false, success: true });
      }).catch(error => {
        this.setState({ loading: false, error: error.message });
      });
    }
  };

  subscribeUser = () => {

    this.setState({ loading: true });

    this.props.addUserNewsletter({ userId: this.props.currentUser._id }).then((result) => {
      this.setState({ loading: false, success: true });
    }).catch(error => {
      this.setState({ loading: false, error: error.message });
    });
  };

  dismissBanner = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    this.setState({ showBanner: false });

    // set cookie to keep the banner dismissed persistently
    Cookie.save('showBanner', 'no');
  };

  renderForm = () => {
    return (
      <Formsy.Form className="newsletter-form" onSubmit={this.subscribeEmail}>
        <Input
          name="email"
          value=""
          placeholder="Your Email"
          type="text"
          layout="elementOnly"
        />
        <Button type="submit">Subscribe</Button>
      </Formsy.Form>
    )
  };

  renderButton = () => {
    return (
      <Button onClick={this.subscribeUser}>Subscribe</Button>
    )
  };

  renderError = () => {
    return (
      <div className="newsletter-message error">{this.state.error}</div>
    )
  };

  renderSuccess = () => {
    return (
      <div className="newsletter-success">
        <FormattedMessage id="newsletter.subscription.success" />
      </div>
    )
  };

  renderContent = () => {
    return (
      <div>
        <div className="newsletter-form-wrapper">
          <h4 className="newsletter-tagline">
            <FormattedMessage id="newsletter.subscribe"/>
          </h4>
          {this.props.currentUser ? this.renderButton() : this.renderForm()}
        </div>
        {this.state.error ? this.renderError() : null}
        {this.state.loading ? <div className="newsletter-loading"><Components.Loading/></div> : null}
      </div>
    )
  };

  render() {
    if (this.state.showBanner) {
      return (
        <div className="newsletter-wrapper">
          <div className="newsletter">
            {this.state.success ? this.renderSuccess() : this.renderContent()}
            <a onClick={this.dismissBanner} className="newsletter-close"><Components.Icon name="close"/></a>
          </div>
        </div>
      );
    }
    return null;
  }
}

SbNewsletter.contextTypes = {
  currentUser: PropTypes.object
};

const emailOptions = { name: 'addEmailNewsletter', args: {email: 'String'} };
const addOptions = { name: 'addUserNewsletter', args: {userId: 'String'} };

// const mutationOptions = {
//   name: 'addEmailNewsletter',
//   args: { email: 'String' }
// };

function showBanner (user) {
  return (
    // showBanner cookie either doesn't exist or is not set to "no"
    Cookie.load('showBanner') !== 'no'
    // and user is not subscribed to the newsletter already (setting either DNE or is not set to false)
    && !Users.getSetting(user, 'newsletter_subscribeToNewsletter', false)
  );
}

// registerComponent('Newsletter', SbNewsletter, withMutation(mutationOptions), withCurrentUser, withMessages);

registerComponent('Newsletter', SbNewsletter, withCurrentUser, withMutation(emailOptions), withMutation(addOptions));
