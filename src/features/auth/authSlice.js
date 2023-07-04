import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const getUserFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null; 

const initialState = {
    user: getUserFromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) =>
{
    try {
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getMonthlyData = createAsyncThunk('orders/monthlydata', async (thunkAPI) =>
{
    try {
        return await authService.getMonthlyOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getYearlyData = createAsyncThunk('orders/yearlydata', async (thunkAPI) =>
{
    try {
        return await authService.getYearlyStats();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk('order/get-orders', async (thunkAPI) =>
{
    try {
        return await authService.getallOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error); 
    }
});

export const getOrderByUser = createAsyncThunk('order/get-order', async (id, thunkAPI) =>
{
    try {
        return await authService.getOrder(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateAOrder = createAsyncThunk('order/update-order', async (data, thunkAPI) =>
{
    try {
        return await authService.updateOrder(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder
            .addCase(login.pending, (state) =>
            {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) =>
            {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = 'success';
            })
            .addCase(login.rejected, (state, action) =>
            {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getOrders.pending, (state) =>
            {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) =>
            {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = 'success';
            })
            .addCase(getOrders.rejected, (state, action) =>
            {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getOrderByUser.pending, (state) =>
            {
                state.isLoading = true;
            })
            .addCase(getOrderByUser.fulfilled, (state, action) =>
            {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.singleorder = action.payload;
                state.message = 'success';
            })
            .addCase(getOrderByUser.rejected, (state, action) =>
            {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getMonthlyData.pending, (state) =>
            {
                state.isLoading = true;
            })
            .addCase(getMonthlyData.fulfilled, (state, action) =>
            {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.monthlyData = action.payload;
                state.message = 'success';
            })
            .addCase(getMonthlyData.rejected, (state, action) =>
            {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getYearlyData.pending, (state) =>
            {
                state.isLoading = true;
            })
            .addCase(getYearlyData.fulfilled, (state, action) =>
            {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.yearlyData = action.payload;
                state.message = 'success';
            })
            .addCase(getYearlyData.rejected, (state, action) =>
            {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateAOrder.pending, (state) =>
            {
                state.isLoading = true;
            })
            .addCase(updateAOrder.fulfilled, (state, action) =>
            {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updateOrder = action.payload;
                state.message = 'success';
            })
            .addCase(updateAOrder.rejected, (state, action) =>
            {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default authSlice.reducer;

