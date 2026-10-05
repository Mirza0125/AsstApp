import React, { useState } from 'react'
import HomeLayout from '../../layout/HomeLayout';
import ListTable from '../../components/Table'
import './style.scss'
import { Space } from 'antd';
import servicesArrow from '../../assets/images/servicesArrow.svg'
import Button from '../../components/Button';
import plusCreateService from '../../assets/images/plusCreateService.svg'
import { history } from '../../reduxStore/store';

// Routing
import { connect } from 'react-redux';

import {
    servicesRequest,
    servicesRequestFailure,
} from './redux/action';
import { useEffect } from 'react';

import { prevDataAction, setSuccessAction } from '../CreateService/redux/action'

const ManageServices = (props) => {
    const [tableData, setTableData] = useState([])

    const {
        servicesRequest,
        requesting,
        prevDataAction,
        setSuccessAction,
    } = props;

    const { services } = props

    useEffect(() => {
        if (services) {
            servicesData()
        }
    }, [services])

    const servicesData = () => {
        setTableData(services.map((data, index) => ({
            "id": data.id,
            "name": data.name,
            "price": data.price = `$${data.price}/h`,
        })))
    }

    useEffect(() => {
        servicesRequest()
        prevDataAction({ data: {}, isEdit: false })
        setSuccessAction({ success: false })
    }, [])

    const handleOnClick = (record) => {
        history.push("/admin/home-create-service")
        prevDataAction({ data: record, isEdit: true })
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, image) =>
                <a>{text}</a>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleOnClick(record)} title='Edit' className='action-btn' />
                </Space>
            ),
        },
    ];

    return (
        <HomeLayout>
            {/* <CreateServiceModal showModal={showModal} setShowModal={setShowModal} /> */}
            <div className='services-table-wrapper'>
                <div className='heading-wrapper flex-align-between'>
                    <div className="navigate-head flex-align-center">
                        <img onClick={() => history.goBack()} src={servicesArrow} alt='arrow' />
                        <p>Services</p>
                    </div>
                    <Button
                        title="Create Service"
                        src={plusCreateService}
                        showIcon={true}
                        className='services-add-btn'
                        onClick={() => history.push("/admin/home-create-service")}
                    />
                </div>
                <div className='services-table-section'>
                    <ListTable columns={columns} data={tableData} loading={requesting}
                        pagination={tableData?.length > 10} />
                </div>
            </div>

        </HomeLayout>
    )
}

const mapStateToProps = (state) => ({
    services: state.services.services,
    error: state.services.error,
    requesting: state.services.requesting,
});

const mapDispatchToProps = (dispatch) => ({
    servicesRequest: () => dispatch(servicesRequest()),
    servicesRequestFailure: () => dispatch(servicesRequestFailure()),
    prevDataAction: (data) => dispatch(prevDataAction(data)),
    setSuccessAction: (data) => dispatch(setSuccessAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageServices);
