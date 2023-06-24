import React, { useEffect } from 'react'
import CustomInput from './../components/CustomInput';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { createNewBlogCat, updateABlogCat } from '../features/bcategory/bcategorySlice';
import { resetState, getABlogCat } from './../features/bcategory/bcategorySlice';
import { useNavigate, useLocation } from 'react-router-dom';

let schema = yup.object().shape({
    title: yup.string().required('Blog Category is required'),
});

const AddBlogCat = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getBlogCatId = location.pathname.split("/")[3];


    const newBlogCategory = useSelector((state) => state.bCategory);
    const { isSuccess, isError, isLoading, createBlogCategory, updatedBlogCategory, blogCatName } = newBlogCategory;

    useEffect(() => {
        if (getBlogCatId !== undefined) {
            dispatch(getABlogCat(getBlogCatId));
        } else {
            dispatch(resetState());
        }
    }, [getBlogCatId, dispatch]);

    useEffect(() =>
    {
        if (isSuccess && createBlogCategory) {
            toast.success("Blog Category Added Successfully!");
        }
        if (isSuccess && updatedBlogCategory) {
            toast.success("Blog Category Updated Successfully!");
            navigate("/admin/blog-category-list");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, createBlogCategory, updatedBlogCategory, navigate]);


    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            title: blogCatName || "",
        },
        validationSchema: schema,
        onSubmit: (values) =>
        {
            if (getBlogCatId !== undefined) {
                const data = { id: getBlogCatId, blogCatData: values };
                dispatch(updateABlogCat(data));
                dispatch(resetState());
            } else {
                dispatch(createNewBlogCat(values));
                formik.resetForm();
                setTimeout(() =>
                {
                    dispatch(resetState());
                }, 300);
            }
        }
    });

    return (
        <div>
            <h3 className="mb-4 title">{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='text' label='Enter Blog Category' 
                        id="blogcat"
                        name="title"
                        onCh={formik.handleChange('title')}
                        onBl={formik.handleBlur('title')}
                        val={formik.values.title}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                        {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
                    </button>
                 </form>
            </div>
        </div>
    )
}

export default AddBlogCat;
