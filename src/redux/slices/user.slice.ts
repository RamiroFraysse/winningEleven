import {UserEmptyState} from "../../models";
import {createSlice} from "@reduxjs/toolkit";


/**
 * Un reducer toma las acciones y decide q es lo q quiere ese suscriptor.
 * De acuerdo al tipo q utilicemos es q accion se va a ejecutar.
 * Ahora con el slice y redux toolkit va a ser directamente un paylod. Si qremos crear un usuario,
 * el payload va a contener un usuario
 */

export const userSlices = createSlice({
    name: "user",
    initialState: UserEmptyState,
    reducers: {
        // lo q retornamos en cada una de las acciones es lo q va a ocupar el lugar en el state.
        // algo muy importante en la programacion reactiva es el concepto de inmutabilidad, es decir
        // las cosas se reemplazan, no se modifican
        createUser: (state, action) => {
            return action.payload;
        },
        modifyUser: (state, action) => {
            const formattedData = {...state, ...action.payload};

            return formattedData;
        },
        resetUser: () => {
            return UserEmptyState;
        },
    },
});

export const {createUser, modifyUser, resetUser} = userSlices.actions;

export default userSlices.reducer;
