import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteABlogCat, resetState } from './../features/bcategory/bcategorySlice';
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

const BlogCatList = () =>
{
    const [open, setOpen] = useState(false);
    const [blogCatId, setblogCatId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setblogCatId(e);
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
    const bCatStat = useSelector((state) => state.bCategory.bCategories);
    const data1 = [];
    for (let i = 0; i < bCatStat.length; i++) {
        data1.push({
            key: i + 1,
            name: bCatStat[i].title,
            action: (
                <>
                    <Link to={`/admin/blog-category/${bCatStat[i]._id}`} className='fs-3'>
                        <BiEdit />
                    </Link>
                    <button className='fs-3 ms-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(bCatStat[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            )
        });
    };

    const deleteBlogCat = (e) => {
        dispatch(deleteABlogCat(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getCategories());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Blog Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal title="Are you sure you want to delete this blog category?"
                hideModal={hideModal} 
                performAction={() => {deleteBlogCat(blogCatId)}}
                open={open}
            />
        </div>
    );
};

export default BlogCatList;
