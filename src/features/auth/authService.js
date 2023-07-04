import axios from 'axios';
import { base_url } from './../../utils/base_url';

const getTokenFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const config = {
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
        Accept: "application/json",
    }
};
const login = async(user) => {
    const response = await axios.post(`${base_url}user/admin-login`, user);
    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response.data;
}; 

const getallOrders = async() => {
    const response = await axios.get(`${base_url}user/getallorders`, config);
    return response.data;
}; 

// const getOrder = async(id) => {
//     const response = await axios.post(`${base_url}user/getorderbyuser/${id}`, "", config);
//     return response.data;
// }; 

const getOrder = async(id) => {
    const response = await axios.get(`${base_url}user/getaOrder/${id}`, config);
    return response.data;
}; 

const updateOrder = async(data) => {
    const response = await axios.put(`${base_url}user/updateOrder/${data.id}`, {status: data.status}, config);
    return response.data;
}; 

const getMonthlyOrders = async() => {
    const response = await axios.get(`${base_url}user/getMonthWiseOrderIncome`, config);
    return response.data;
}; 

const getYearlyStats = async() => {
    const response = await axios.get(`${base_url}user/getyearlyorders`, config);
    return response.data;
}; 


const authService = {
    login,
    getallOrders,
    getOrder,
    getMonthlyOrders,
    getYearlyStats,
    updateOrder
};

export default authService;