import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getColors, deleteAColor, resetState } from './../features/color/colorSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from './../components/CustomModal';

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const ColorList = () =>
{
    const [open, setOpen] = useState(false);
    const [colorId, setcolorId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setcolorId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    useEffect(() =>
    {
        dispatch(resetState());
        dispatch(getColors());
    }, [dispatch]);
    const colorState = useSelector((state) => state.color.colors);
    const data1 = [];
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i + 1,
            name: colorState[i].title,
            action: (
                <>
                    <Link to={`/admin/color/${colorState[i]._id}`} className='fs-3'>
                        <BiEdit />
                    </Link>
                    <button className='fs-3 ms-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(colorState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            )
        });
    };

    const deleteColor = (e) => {
        dispatch(deleteAColor(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getColors());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Colors List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal title="Are you sure you want to delete this brand?"
                hideModal={hideModal} 
                performAction={() => {deleteColor(colorId)}}
                open={open}
            />
        </div>
    );
};

export default ColorList;
