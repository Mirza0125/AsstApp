import React from 'react';
import { history } from '../../reduxStore/store';

//style
import './style.scss';

//images
import addDesigner from '../../assets/images/addDesigner.svg';
import manageServices from '../../assets/images/manageServices.svg';
import calendar from '../../assets/images/calendar.svg';
import viewDesigner from '../../assets/images/viewDesigner.svg';
import manageBooking from '../../assets/images/manageBooking.svg';
import manageResident from '../../assets/images/manageResident.svg';

//components
import HomeLayout from '../../layout/HomeLayout';
// import AddDesignerModal from '../../components/Modals/AddDesignerModal'

const Dashboard = () => {
  const leftGridsData = [
    { text: 'Add a community designer', image: addDesigner, path: "/admin/home-add-designer" },
    { text: 'Manage Services', image: manageServices, path: "/admin/home-manage-services" },
    { text: 'Calendar', image: calendar, path: "/admin/home-calendar" },
  ];

  const rightGridsData = [
    { text: 'View community designers', image: viewDesigner, path: "/admin/home-designers-list" },
    { text: 'Manage Bookings', image: manageBooking, path: "/admin/home-manage-bookings" },
    { text: 'Manage Residents', image: manageResident, path: "/admin/home-manage-residents" },
  ];

  // const [showModal, setShowModal] = useState(true)

  return (
    <HomeLayout>
      <div className="home-dashboard-section">
        <div className="home-dashboard-card-wrapper">
          <div className="card-row">
            {/* <AddDesignerModal showModal={showModal} setShowModal={setShowModal} /> */}
            <div className="col-lg-6 left-grid-wrapper">
              {leftGridsData.map((data, index) => (
                <>
                  <div className="left-grid-section"
                    onClick={() => (history.push(data.path))}
                  >
                    <div className="grids-image-section">
                      <img
                        className="grids-image"
                        src={data.image}
                        alt="grids-images"
                      />
                    </div>
                    <div className="grids-text">
                      <span>{data.text}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="col-lg-6 right-grid-wrapper">
              {rightGridsData.map((data, index) => (
                <div className="right-grid-section"
                  onClick={() => (history.push(data.path))}
                >
                  <div className="grids-image-section">
                    <img
                      className="grids-image"
                      src={data.image}
                      alt="grids-images"
                    />
                  </div>
                  <div className="grids-text">
                    <span>{data.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Dashboard;
