import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Service } from '@/types/services';

interface ServicesState {
  services: Service[];
}

const initialState: ServicesState = {
  services: [],
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
  },
});

export const { setServices } = servicesSlice.actions;
export default servicesSlice.reducer;
