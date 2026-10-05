import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import './style.scss'

import {
  searchResidentsRequest,
  searchResidentsFailure,
  searchDesignersRequest,
  searchDesignersFailure,
  getBookingsbyStatusRequest,
  getBookingsbyStatusFailure,
  searchServicesRequest,
  searchServicesFailure,
} from './redux/action'

import {
  activeStatusAction
} from '../../pages/ManageBookings/redux/action'

import { Spinner } from 'reactstrap';

// Routing
import { connect } from 'react-redux';
import { history } from '../../reduxStore/store';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchField = ({ onChange, value, ...props }) => {
  const {
    searchResidentsRequest,
    searchDesignersRequest,
    searchServicesRequest,
    residentsRequesting,
    designersRequesting,
    activeStatus,
    getBookingsbyStatusRequest,
    bookingsByStatusRequesting,
    searchServicesRequesting,
  } = props

  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    if (history.location.pathname === "/admin/home-manage-residents" || history.location.pathname === "/admin/home-manage-residents/") {
      const timer = setTimeout(() => {
        searchResidentsRequest(searchValue);
      }, 500);
      return () => clearTimeout(timer);
    } else if (history.location.pathname === "/admin/home-designers-list" || history.location.pathname === "/admin/home-designers-list/") {
      const timer = setTimeout(() => {
        searchDesignersRequest(searchValue);
      }, 500);
      return () => clearTimeout(timer);
    } else if (history.location.pathname === "/admin/home-manage-bookings" || history.location.pathname === "/admin/home-manage-bookings/") {
      const timer = setTimeout(() => {
        const data = {
          "status": activeStatus,
          "search_value": searchValue,
        }
        getBookingsbyStatusRequest(data);
      }, 500);
      return () => clearTimeout(timer);
    } else if (history.location.pathname === "/admin/home-manage-services" || history.location.pathname === "/admin/home-manage-services/") {
      const timer = setTimeout(() => {
        searchServicesRequest(searchValue);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchValue, activeStatus]);

  return (
    <>
      <Search className="search-field" onChange={onChange} >
        <InputBase className="input-base" value={value} placeholder="Search" onChange={(val) => setSearchValue(val.target.value)} />
        {residentsRequesting && searchValue?.length > 0 ||
          designersRequesting && searchValue?.length > 0 ||
          bookingsByStatusRequesting && searchValue?.length > 0 ||
          searchServicesRequesting && searchValue?.length > 0 ?
          <div className="search-spinner-style">
            {console.log("searchValue", searchValue)}
            <Spinner size={'sm'} />
          </div> :
          <SearchIcon className="search-icon" />
        }
      </Search>
    </>
  );
};

const mapStateToProps = (state) => ({
  // console: console.log(state),
  // Residents States -------------start-------------
  residentsFilteredData: state.search.residentsFilteredData,
  error: state.search.error,
  residentsRequesting: state.search.residentsRequesting,
  // Residents States -------------end-------------

  // Designers States -------------start-------------
  designersFilteredData: state.search.designersFilteredData,
  designersError: state.search.error,
  designersRequesting: state.search.designersRequesting,
  // Designers States -------------end-------------
  // Bookings States -------------start-------------
  activeStatus: state.bookings.activeStatus,
  bookingsByStatusRequesting: state.search.bookingsByStatusRequesting,
  // Bookings States -------------end-------------
  // Bookings States -------------start-------------
  searchServicesRequesting: state.search.searchServicesRequesting,
  // Bookings States -------------end-------------
});

const mapDispatchToProps = (dispatch) => ({
  searchResidentsRequest: (data) => dispatch(searchResidentsRequest(data)),
  searchResidentsFailure: (data) => dispatch(searchResidentsFailure(data)),
  searchDesignersRequest: (data) => dispatch(searchDesignersRequest(data)),
  searchDesignersFailure: (data) => dispatch(searchDesignersFailure(data)),
  activeStatusAction: (data) => dispatch(activeStatusAction(data)),
  getBookingsbyStatusRequest: (data) => dispatch(getBookingsbyStatusRequest(data)),
  getBookingsbyStatusFailure: (data) => dispatch(getBookingsbyStatusFailure(data)),
  searchServicesRequest: (data) => dispatch(searchServicesRequest(data)),
  searchServicesFailure: (data) => dispatch(searchServicesFailure(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
