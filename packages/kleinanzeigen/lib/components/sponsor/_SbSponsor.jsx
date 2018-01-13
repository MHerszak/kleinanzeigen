import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { registerComponent, Components } from 'meteor/vulcan:core';

const SbSponsor = (props, context) => (
  <section className="content">
    {/*<div className="container">
      <div className="row">
        <Components.Breadcrumbs title={context.intl.formatMessage({ id: 'sponsor.page.title' })} />
      </div>
    </div>*/}
    <div className="container">
      <div className="row">
        <div className="page sponsor-page">
          <div className="col-12">
            <h2 className="page-title"><FormattedMessage id="sponsor.page.title" /></h2>
            <div className="page-contents">

              <Components.Markdown packageName="kleinanzeigen" path="lib/assets/markdown/sponsor1.md"/>

              <div className="sponsor-link-container">
                <Link className="sponsor-link btn btn-primary" to="/sponsor/new">Submit new link</Link>
              </div>

              {/*<Components.Markdown packageName="kleinanzeigen" path="lib/assets/markdown/sponsor2.md"/>*/}

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

SbSponsor.contextTypes = {
  intl: intlShape
};

registerComponent('Sponsor', SbSponsor);
