import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Service } from '@/types/services';
import { apiGetServices } from '@/api/services';
import type { RootState } from '@/store';

interface ServicesState {
  services: Service[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetServices();
      return response.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch services');
    }
  },
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setServices } = servicesSlice.actions;

// Selector to get services state
export const selectServices = (state: RootState) => state.services.services;
export const selectServicesLoading = (state: RootState) => state.services.isLoading;

export default servicesSlice.reducer;
