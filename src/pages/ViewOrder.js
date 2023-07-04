import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';
import { useLocation } from 'react-router-dom';
import { getOrderByUser } from './../features/auth/authSlice';

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Product Name",
        dataIndex: "name",
    },
    {
        title: "Brand",
        dataIndex: "brand",
    },
    {
        title: "Count",
        dataIndex: "count",
    },
    {
        title: "Color",
        dataIndex: "color",
    },
    {
        title: "Amount",
        dataIndex: "amount",
    },
    {
        title: "Date",
        dataIndex: "date",
    },
];

const ViewOrder = () =>
{
    const location = useLocation();
    const orderId = location.pathname.split('/')[3];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderByUser(orderId));
    },[dispatch, orderId]);

    useEffect(() =>
    {
        dispatch(getOrders());
    }, [dispatch]);
    const orderState = useSelector((state) => state?.auth?.singleorder?.orders);
    const data1 = [];
    for (let i = 0; i < orderState?.orderItems?.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState?.orderItems[i]?.product.title,
            brand: orderState?.orderItems[i]?.product.brand,
            count: orderState?.orderItems[i]?.quantity,
            amount: orderState?.orderItems[i]?.price,
            color: orderState?.orderItems[i]?.color.title,
            date: orderState?.orderItems[i]?.product.createdAt,
        });
    };
    return (
        <div>
            <h3 className="mb-4 title">View Order</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    );
};

export default ViewOrder;
