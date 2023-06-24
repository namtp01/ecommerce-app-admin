import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAProductCategory, getCategories, resetState } from './../features/pcategory/pcategorySlice';
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
        sorter: (a,b) => a.name.length - b.name.length
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const CategoryList = () =>
{
    const [open, setOpen] = useState(false);
    const [pCatId, setpCatId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setpCatId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    useEffect(() =>
    {
        dispatch(resetState());
        dispatch(getCategories());
    }, [dispatch]);
    const pCatStat = useSelector((state) => state.pCategory.pCategories);
    const data1 = [];
    for (let i = 0; i < pCatStat.length; i++) {
        data1.push({
            key: i + 1,
            name: pCatStat[i].title,
            action: (
                <>
                    <Link to={`/admin/category/${pCatStat[i]._id}`} className='fs-3'>
                        <BiEdit />
                    </Link>
                    <button className='fs-3 ms-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(pCatStat[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            )
        });
    };

    const deleteCategory = (e) => {
        dispatch(deleteAProductCategory(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getCategories());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Product Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal title="Are you sure you want to delete this product category?"
                hideModal={hideModal} 
                performAction={() => {deleteCategory(pCatId)}}
                open={open}
            />
        </div>
    );
};

export default CategoryList;
