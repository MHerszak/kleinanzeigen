/*

About page.

*/

import React from 'react';
import { Components, registerComponent } from 'meteor/vulcan:core';

const About = () => (
  <section className="content">
    <div className="container">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-sm-12 col-md-12">
            <Components.Page
              name="about"
              title="About"
              packageName="kleinanzeigen"
              path="lib/assets/markdown/about.md"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

registerComponent('About', About);

// export default About
