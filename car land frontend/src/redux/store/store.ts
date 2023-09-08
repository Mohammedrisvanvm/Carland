import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"
import rootReducer from "./rootReducers";

const persistConfig = {
  key: "persist-key",
  storage,
  expires:7*24*60*60
};

const persistedReducer=persistReducer(persistConfig,rootReducer)

const store=configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:false
    })
})
const persistor=persistStore(store)
export {store,persistor}

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch