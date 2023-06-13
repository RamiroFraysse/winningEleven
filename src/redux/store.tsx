import {type IRound, type User} from "../models";
import {userReducer, roundsReducer} from "./slices";

import {configureStore} from "@reduxjs/toolkit";

export interface AppStore {
    // user: User;
    rounds: IRound[];
}

export default configureStore<AppStore>({
    reducer: {
        // user: userReducer,
        rounds: roundsReducer,
    },
});
