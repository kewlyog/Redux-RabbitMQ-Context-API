import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const res = await axios.get("http://localhost:5004/api/tasks");
    return res.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
    const res = await axios.post("http://localhost:5004/api/tasks", task);
    return res.data;
})

const taskSlice = createSlice({
    name: "tasks",
    initialState: { list: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.list.push(action.payload);
            });
    },
});

export default taskSlice.reducer;