/*

How To page.

*/

import React from 'react';

import { Components, registerComponent } from 'meteor/vulcan:core';

const HowTo = () => (
  <section className="content">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-sm-12 col-md-12">
          <Components.Page
            name="guidelines"
            title="Guidelines"
            packageName="kleinanzeigen"
            path="lib/assets/markdown/guidelines.md"
          />
        </div>
      </div>
    </div>
  </section>
);

registerComponent('HowTo', HowTo);

// export default HowTo;
