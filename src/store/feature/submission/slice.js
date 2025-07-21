import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    savedSteps: new Set(["title"]),
    expandedSections: new Set(["content"])
}


export const submissionSlice = createSlice({
    name: 'submissionSlice',
    initialState: initialState,
    reducers: {
        addData: (state, action) => {
            state.savedSteps = new Set([...state.savedSteps, action.payload])
        },
        modifyExpand: (state, action)=> {
            state.expandedSections = action.payload
        }

    },
})

export const { addData, modifyExpand } = submissionSlice.actions
export default submissionSlice.reducer