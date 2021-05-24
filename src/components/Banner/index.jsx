import React from 'react';
import './index.scss';

const Banner = ({ title, img_src }) => {
  return (
    <section className="banner-section">
      <h2 className="title">{title}</h2>
      <img className="image" src={img_src} alt={title} />
    </section>
  );
};

export default Banner;
