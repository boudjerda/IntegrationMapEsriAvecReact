import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { widgetsReducer } from "./reducers/widgets.reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const authConfig = {
  key: "root",
  storage,
};

const persisteReducer = persistReducer(authConfig, widgetsReducer);

const rootReducer = combineReducers({
    widgets: persisteReducer,
});

export const store = configureStore({ 
  reducer: rootReducer,
});

export const persistor = persistStore(store);