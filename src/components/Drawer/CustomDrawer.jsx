import { Close } from '@material-ui/icons';
import React, { useState } from 'react';
import './CustomDrawer.scss';

const CustomDrawer = ({ children, btnText, label }) => {
  const [drawer, setDrawer] = useState(false);

  /* Close Drawer on click outside */
  const handleClickOutside = e => {
    const bgElement = document.querySelector('.c-drawer-bg');
    const element = document.querySelector('.c-drawer-container');
    if (bgElement === e.target && element !== e.target) {
      setDrawer(false);
    }
  };

  return (
    <>
      <button className="add-btn" onClick={() => setDrawer(true)}>
        {btnText}
      </button>
      {drawer && (
        <div className="c-drawer-bg" onClick={handleClickOutside}>
          <div className="c-drawer-container">
            <div className="c-drawer-head">
              <Close onClick={() => setDrawer(false)} /> {label}
            </div>
            <div className="c-drawer-children">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomDrawer;
