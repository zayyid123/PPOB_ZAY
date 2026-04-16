import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Banner } from '@/types/banner';
import { apiGetBanners } from '@/api/banner';
import type { RootState } from '@/store';

interface BannerState {
  banners: Banner[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  banners: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch banners
export const fetchBanners = createAsyncThunk(
  'banner/fetchBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiGetBanners();
      return response.data.data || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Gagal memuat banner');
    }
  },
);

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectBanners = (state: RootState) => state.banner.banners;
export const selectBannersLoading = (state: RootState) => state.banner.isLoading;

export default bannerSlice.reducer;
