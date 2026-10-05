import React, { useEffect, useState } from 'react'
import HomeLayout from "../../layout/HomeLayout"
import ListTable from '../../components/Table'
import './style.scss'
import { Space } from 'antd';
// import profileImage from '../../assets/images/profileImage.jpg'
import dummyProfile from '../../assets/images/dummyProfile.png'
import { history } from '../../reduxStore/store';
import Button from '../../components/Button';
import {
    designersRequest,
    designersFailure,
    deleteDesignersRequest,
    deleteDesignersFailure,
} from './redux/action'

import { profileRequest, profileFailure } from '../Profile/redux/action';

// Routing
import { connect } from 'react-redux';

const ViewDesigner = (props) => {
    const [recordID, setRecordID] = useState()

    const {
        designersRequest,
        profileRequest,
        // error,
        requesting,
        deleteDesignersRequesting,
        deleteDesignersRequest
    } = props;

    const handleOnClick = (id) => {
        setRecordID(id)
        deleteDesignersRequest(id)
    }

    const { designers } = props

    useEffect(() => {
        designersRequest()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) =>
                <div className='profile-image-wrapper' onClick={() => { localStorage.setItem("profile_id", record.id); history.push('/admin/home-profile') }}>
                    {record.photo ? <img className='profile-image' src={record.photo} alt="profile-image" /> : <img src={dummyProfile} alt="designer-dummy-pic" className="designer-dummy-pic" />}
                    <a className='designer-profile-text common-text-overflow' title={text}>{text}</a>
                </div>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Action',
            key: 'action',
            render: (item, record) => (
                <Space size="middle">
                    <Button
                        onClick={() => handleOnClick(record.id)}
                        title={deleteDesignersRequesting && record.id === recordID ? "" : "Remove"}
                        className='action-btn'
                        showSpinner={recordID === record.id ? deleteDesignersRequesting : false} />
                </Space>
            ),
        },
    ];

    return (
        <HomeLayout>
            <div className='table-wrapper'>
                <span className='table-heading'>Community Designer List</span>
                <div className='table-section'>
                    <ListTable columns={columns} data={designers} scroll={{ x: 1000 }} loading={requesting} pagination={designers?.length > 10 ? true : false} />
                </div>
            </div>
        </HomeLayout>
    )
}

const mapStateToProps = (state) => ({
    designers: state.designers.designers,
    error: state.designers.error,
    requesting: state.designers.requesting,
    deleteDesignersRequesting: state.designers.deleteDesignersRequesting,
});

const mapDispatchToProps = (dispatch) => ({
    designersRequest: () => dispatch(designersRequest()),
    designersFailure: () => dispatch(designersFailure()),
    deleteDesignersRequest: (data) => dispatch(deleteDesignersRequest(data)),
    deleteDesignersFailure: (data) => dispatch(deleteDesignersFailure(data)),
    profileRequest: (data) => dispatch(profileRequest(data)),
    profileFailure: (data) => dispatch(profileFailure(data)),
});

// export default ManageServices;
export default connect(mapStateToProps, mapDispatchToProps)(ViewDesigner);
