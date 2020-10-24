import React from 'react';

const Section = ({ children, headingtext, headinglevel = 2 }) => {
  const H = `h${headinglevel}`;
  return (
    <section>
      <H>{headingtext}</H>
      {children}
    </section>
  );
};

export default Section;
