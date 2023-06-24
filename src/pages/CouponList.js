import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getAllCoupon, deleteACoupon } from './../features/coupon/couponSlice';
import CustomModal from './../components/CustomModal';
import { resetState } from './../features/product/productSlice';

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
        sorter: (a,b) => a.name.length - b.name.length
    },
    {
        title: "Discount",
        dataIndex: "discount",
        sorter: (a,b) => a.discount - b.discount
    },
    {
        title: "Expiry",
        dataIndex: "expiry",
        sorter: (a,b) => a.name.length - b.name.length
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const CouponList = () =>
{
    const [open, setOpen] = useState(false);
    const [couponId, setcouponId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setcouponId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    useEffect(() =>
    {
        dispatch(resetState());
        dispatch(getAllCoupon());
    }, [dispatch]);
    const couponState = useSelector((state) => state.coupon.coupons);
    const data1 = [];
    for (let i = 0; i < couponState.length; i++) {
        data1.push({
            key: i + 1,
            name: couponState[i].name,
            discount: couponState[i].discount,
            expiry: new Date(couponState[i].expiry).toLocaleString(),
            action: (
                <>
                    <Link to={`/admin/coupon/${couponState[i]._id}`} className='fs-3'>
                        <BiEdit />
                    </Link>
                    <button className='fs-3 ms-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(couponState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            )
        });
    };

    const deleteCoupon = (e) => {
        dispatch(deleteACoupon(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getAllCoupon());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Coupons</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal title="Are you sure you want to delete this coupon?"
                hideModal={hideModal} 
                performAction={() => {deleteCoupon(couponId)}}
                open={open}
            />
        </div>
    );
};

export default CouponList;
