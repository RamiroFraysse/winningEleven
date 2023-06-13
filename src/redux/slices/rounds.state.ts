import {type IRound} from "../../models";
import {createSlice} from "@reduxjs/toolkit";

export const RoundsEmptyState: IRound[] = [];

export const roundsSlices = createSlice({
    name: "rounds",
    initialState: RoundsEmptyState,
    reducers: {
        // lo q retornamos en cada una de las acciones es lo q va a ocupar el lugar en el state.
        // algo muy importante en la programacion reactiva es el concepto de inmutabilidad, es decir
        // las cosas se reemplazan, no se modifican
        createRounds: (state, action) => {
            return action.payload;
        },
        updateRound: (state, action) => {
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            const {roundIndex,seedIndex,teamIndex,team} = action.payload
            const nextRound =roundIndex + 1;
            const nextSeedIndex = Math.floor(seedIndex / 2);
            const nextTeamIndex = seedIndex % 2;
            // const rounds = [...state];
            const rounds = JSON.parse(JSON.stringify(state));
            rounds[roundIndex].seeds[seedIndex].teams[teamIndex]=team;
            rounds[nextRound].seeds[nextSeedIndex].teams[nextTeamIndex] = team;
            return rounds;

            // return formattedData;
        },
        resetRounds: () => {
            return RoundsEmptyState;
        },
    },
});

export const {createRounds, updateRound, resetRounds} = roundsSlices.actions;

export default roundsSlices.reducer;
