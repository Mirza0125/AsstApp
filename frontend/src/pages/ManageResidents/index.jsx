import React, { useEffect, useState } from 'react'
import HomeLayout from '../../layout/HomeLayout';
import ListTable from '../../components/Table'
import './style.scss'
import { Space, Tag } from 'antd';
import dummyProfile from '../../assets/images/dummyProfile.png'
import Button from '../../components/Button';

import {
    residentsRequest,
    residentsFailure,
    deleteResidentsRequest,
    deleteResidentsFailure,
} from './redux/action'

// Routing
import { connect } from 'react-redux';

const ManageResidents = (props) => {
    const [recordID, setRecordID] = useState()

    const {
        residentsRequest,
        requesting,
        deleteResidentsRequest,
        deleteResidentRequesting,
    } = props;

    const { residents } = props

    useEffect(() => {
        residentsRequest()
    }, [])

    const handleOnClick = (id) => {
        setRecordID(id)
        deleteResidentsRequest(id)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, image) =>
                <div>
                    {image.image ? <img className='profile-image' src={image.image} alt="profile-image" /> : <img src={dummyProfile} alt="dummy-profile" className="resident-dummy-pic" />}
                    <span className='common-text-overflow name' title={text}>{text}</span>
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
            title: 'Subscription',
            dataIndex: 'subscription',
            render: (subs) => subs.map(subscriptions => subscriptions.subscription_name).join(", "),
            key: 'subscription',
        },
        {
            title: 'Services',
            dataIndex: 'services',
            key: 'services',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        onClick={() => handleOnClick(record.id)}
                        title={deleteResidentRequesting && record.id === recordID ? "" : "Remove"}
                        className='action-btn'
                        showSpinner={record.id === recordID ? deleteResidentRequesting : false} />
                </Space>
            ),
        },
    ];


    return (
        <HomeLayout>
            <div className='residents-table-wrapper'>
                <span className='residents-table-heading'>Residents List</span>
                <div className='residents-table-section'>
                    <ListTable columns={columns} data={residents} scroll={{ x: 1000 }} loading={requesting} pagination={residents?.length > 10 ? true : false} />
                </div>
            </div>

        </HomeLayout>
    )
}

const mapStateToProps = (state) => ({
    residents: state.residents.residents,
    error: state.residents.error,
    requesting: state.residents.requesting,
    deleteResidentRequesting: state.residents.deleteResidentRequesting,
});

const mapDispatchToProps = (dispatch) => ({
    residentsRequest: () => dispatch(residentsRequest()),
    residentsFailure: () => dispatch(residentsFailure()),
    deleteResidentsRequest: (data) => dispatch(deleteResidentsRequest(data)),
    deleteResidentsFailure: (data) => dispatch(deleteResidentsFailure(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageResidents);
