import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./reducers";


const persistConfig = {
  key: "root",
  storage,
  expires: 7 * 24 * 60 * 60,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

const persistor = persistStore(Store);
export { Store, persistor };
export type Rootstate = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;
