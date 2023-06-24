import axios from 'axios';
import { base_url } from './../../utils/base_url';
import { config } from "../../utils/axiosconfig";


const getBlogs = async() => {
    const response = await axios.get(`${base_url}blog/`);
    return response.data;
}; 

const createBlog = async(blog) => {
    const response = await axios.post(`${base_url}blog/`, blog, config);
    return response.data;
};

const updateCoupon = async(coupon) => {
    const response = await axios.put(`${base_url}coupon/${coupon.id}`, {
        name: coupon.couponData.name,
        expiry: coupon.couponData.expiry,
        discount: coupon.couponData.discount,
    }, config);
    return response.data;
};

const getCoupon = async(id) => {
    const response = await axios.get(`${base_url}coupon/${id}`, config);
    return response.data;
};

const deleteCoupon = async(id) => {
    const response = await axios.delete(`${base_url}coupon/${id}`, config);
    return response.data;
};

const blogService = {
    getBlogs,
    createBlog
};

export default blogService;