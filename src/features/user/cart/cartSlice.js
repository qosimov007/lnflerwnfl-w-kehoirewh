import { createSlice } from "@reduxjs/toolkit";


const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return {
        items: [],
        totalItems: 0,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      items: [],
      totalItems: 0,
    };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
   
  }
};

const initialState = loadState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, { payload }) {
      const newItem = payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalItems += newItem.quantity || 1;
      if (!existingItem) {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      } else {
        existingItem.quantity += newItem.quantity || 1;
      }
      saveState(state); 
    },
    decreaseEl(state, { payload }) {
      const id = payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalItems--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
        saveState(state);
      }
    },
    increaseEl(state, { payload }) {
      const id = payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalItems++;
        existingItem.quantity++;
        saveState(state);
      }
    },
    deleteItemFromCart(state, { payload }) {
      const id = payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalItems -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
        saveState(state); // Save state after modification
      }
    },
  },
});

export const { addItemToCart, decreaseEl, increaseEl, deleteItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
