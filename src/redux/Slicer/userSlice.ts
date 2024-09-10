// redux/Slicer/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  sortField: string; // e.g., "age"
  sortOrder: "asc" | "desc";
  searchTerm: string;
}

const initialState: UserState = {
  sortField: "age", // Default field for sorting
  sortOrder: "asc", // Default order
  searchTerm: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSortField: (state, action: PayloadAction<string>) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSortField, setSortOrder, setSearchTerm } = userSlice.actions;
export default userSlice.reducer;
