import React, { useEffect } from 'react';
import CustomInput from './../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createBrand, getABrand, resetState, updateABrand } from '../features/brand/brandSlice';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object().shape({
    title: yup.string().required('Brand is required'),
});

const AddBrand = () =>
{
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getBrandId = location.pathname.split('/')[3];

    const newBrand = useSelector((state) => state.brand);
    const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand;

    useEffect(() =>
    {
        if (getBrandId !== undefined) {
            dispatch(getABrand(getBrandId));
        } else {
            dispatch(resetState());
        }
    }, [getBrandId, dispatch]);

    useEffect(() =>
    {
        if (isSuccess && createdBrand) {
            toast.success("Brand Added Successfully!");
        }
        if (isSuccess && updatedBrand) {
            toast.success("Brand Updated Successfully!");
            navigate('/admin/list-brand');
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, createdBrand, updatedBrand, navigate]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brandName || "",
        },
        validationSchema: schema,
        onSubmit: (values) =>
        {
            if (getBrandId !== undefined) {
                const data = { id: getBrandId, brandData: values }
                dispatch(updateABrand(data));
                dispatch(resetState());
            } else {
                dispatch(createBrand(values));
                formik.resetForm();
                setTimeout(() =>
                {
                    dispatch(resetState());
                }, 1000);
            }
        }
    });

    return (
        <div>
            <h3 className="mb-4 title">{getBrandId !== undefined ? "Edit" : "Add"} Brand</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='text' label='Enter Brand'
                        id="brand"
                        name="title"
                        onCh={formik.handleChange('title')}
                        onBl={formik.handleBlur('title')}
                        val={formik.values.title}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                        {getBrandId !== undefined ? "Edit" : "Add"} Brand
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddBrand;
