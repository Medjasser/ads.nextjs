import { getFromLocalStorage } from "@/lib/utils";
import { Vertical } from "@/models/vertical";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Essayez de récupérer l'état initial du localStorage
let initialState: Vertical = getFromLocalStorage(
  "vertical",
  new Vertical("0", "", "", "")
);

const VerticalSlice = createSlice({
  name: "vertical",
  initialState: initialState,
  reducers: {
    setSelectedVertical: (state, action: PayloadAction<Vertical>) => {
      state = action.payload;
      // Mettez à jour le localStorage chaque fois que l'état change
      localStorage.setItem("vertical", JSON.stringify(state));
    },
  },
});

export const { setSelectedVertical } = VerticalSlice.actions;
export default VerticalSlice.reducer;
