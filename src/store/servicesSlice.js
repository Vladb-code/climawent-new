import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../sanityClient";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const data = await client.fetch(
      `*[_type in ["installation","serviceMaintenance"]]`,
    );
    return data;
  },
);

const servicesSlice = createSlice({
  name: "services",
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default servicesSlice.reducer;
