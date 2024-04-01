import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import AuthReducer from "./AuthData/Auth";
import { LibraryApi } from "./API/libraryApi";

export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    [LibraryApi.reducerPath]: LibraryApi.reducer,
  },

  middleware: (getDefaultMiddware) =>
    getDefaultMiddware().concat(LibraryApi.middleware),
  
});

setupListeners(store.dispatch);
