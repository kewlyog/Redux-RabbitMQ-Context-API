import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const res = await axios.get("http://localhost:5004/api/tasks");
    return res.data;
});

const taskSlice = createSlice({
    name: "tasks",
    initialState: { list: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(addTasks.fulfilled, (state, action) => {
                state.list.push(action.payload);
            });
    },
});

export default taskSlice.reducer;