import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const initialState = {
    savedSteps: [{ intro: true }, { authors: true }, { articles: true }, { refference: true }],
    expandedSections: new Set(["getting-started"])
}


export const submissionSlice = createSlice({
    name: 'submissionSlice',
    initialState: initialState,
    reducers: {
        updateSaveSteps: (state, action) => {
            state.savedSteps = state.savedSteps.filter((obj) => {
                const key = Object.keys(obj)[0];
                return key !== Object.keys(action.payload)[0];
            })
            state.savedSteps.push(action.payload)
        },
        modifyExpand: (state, action) => {
            state.expandedSections = new Set([action.payload])
        }

    },
})

export const { updateSaveSteps, modifyExpand } = submissionSlice.actions
export default submissionSlice.reducer