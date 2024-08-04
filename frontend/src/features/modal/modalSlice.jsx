import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: undefined,
  data: null,
  message: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { data, type } = action.payload;
      state.type = type;
      if (state.type) {
        state.isOpen = true;
      }
      if (data) {
        state.data = data;
      }
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = undefined;
      state.data = null;
    },
    openConfirmationModal: (state, action) => {
      state.isOpen = true;
      state.type = "confirmation";
      state.message = action.payload.message;
    },
  },
});

export const { openModal, closeModal, openConfirmationModal } =
  modalSlice.actions;
export default modalSlice.reducer;
