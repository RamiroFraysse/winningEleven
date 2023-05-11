import {type User} from "../models";
import {userReducer} from "./slices";
import {configureStore} from "@reduxjs/toolkit";

export interface AppStore {
    user: User;
}

export default configureStore<AppStore>({
    reducer: {
        user: userReducer,
    },
});
