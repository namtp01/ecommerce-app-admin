import React, { useEffect } from 'react';
import CustomInput from './../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { createCoupon, updateACoupon, resetState, getACoupon } from '../features/coupon/couponSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object().shape({
    name: yup.string().required('Coupon is required'),
    expiry: yup.date().required('Expiry date is required'),
    discount: yup.number().required('Discount Percentage is required'),
});

const AddCoupon = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getCouponId = location.pathname.split("/")[3];
    const newCoupon = useSelector((state) => state.coupon);

    const { isSuccess, isError, isLoading, createdCoupon, couponName, couponExpiry, couponDiscount, updatedCoupon } = newCoupon;

    const changeDateFormet = (date) =>
    {
        const newDate = new Date(date).toLocaleDateString();
        const [month, day, year] = newDate.split("-");
        return [year, month, day].join("-");
    };
    useEffect(() =>
    {
        if (getCouponId !== undefined) {
            dispatch(getACoupon(getCouponId));
        } else {
            dispatch(resetState());
        }
    }, [getCouponId, dispatch]);

    useEffect(() =>
    {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Added Successfully!");
        }
        if (isSuccess && updatedCoupon ) {
            toast.success("Coupon Updated Successfully!");
            navigate("/admin/coupon-list");
        }
        if (isError && couponName && couponDiscount && couponExpiry) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, createdCoupon, couponName, couponDiscount, updatedCoupon, couponExpiry, navigate]);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: couponName || "",
            expiry: changeDateFormet(couponExpiry) || "",
            discount: couponDiscount || ""
        },
        validationSchema: schema,
        onSubmit: (values) =>
        {
            if (getCouponId !== undefined) {
                const data = { id: getCouponId, couponData: values }
                dispatch(updateACoupon(data));
                dispatch(resetState());
            } else {
                dispatch(createCoupon(values));
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
            <h3 className="mb-4 title">{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type='text' label='Enter Coupon'
                        id="name"
                        name="name"
                        onCh={formik.handleChange('name')}
                        onBl={formik.handleBlur('name')}
                        val={formik.values.name}
                    />
                    <div className="error">
                        {formik.touched.name && formik.errors.name}
                    </div>
                    <CustomInput type='date' label='Enter Expiry Date'
                        id="date"
                        name="expiry"
                        onCh={formik.handleChange('expiry')}
                        onBl={formik.handleBlur('expiry')}
                        val={formik.values.expiry}
                    />
                    <div className="error">
                        {formik.touched.expiry && formik.errors.expiry}
                    </div>
                    <CustomInput type='number' label='Enter Discount Percentage'
                        id="discount"
                        name="discount"
                        onCh={formik.handleChange('discount')}
                        onBl={formik.handleBlur('discount')}
                        val={formik.values.discount}
                    />
                    <div className="error">
                        {formik.touched.discount && formik.errors.discount}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCoupon;
