import React from 'react';

// Components
import Header from '../../components/Header';
import ResponsiveDrawer from '../../components/SidebarMenu';

// Style
import './style.scss';

const HomeLayout = ({ contentClassName = '', ...props }) => {

  return (
    <section className="dashboard-wrapper">
      <div className="main-dashboard-section">
        <ResponsiveDrawer
          className="menu-item"
        />
        <div className="main-content-section">
          <Header className={props.className} />
          <div className={`content-section ${contentClassName}`}>
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLayout;