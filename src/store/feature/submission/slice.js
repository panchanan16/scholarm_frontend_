import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    savedSteps: [{ intro: true }, {articleDetails: false}, { authors: true }, { articles: true }, { refference: true }, {reviewers: false}],
    expandedSections: new Set(["getting-started"]),
    hightLightedItem: ""
}


export const submissionSlice = createSlice({
    name: 'submissionSlice',
    initialState: initialState,
    reducers: {
        updateSteps: (state, action) => {
            state.savedSteps = state.savedSteps.filter((obj) => {
                const key = Object.keys(obj)[0];
                return key !== Object.keys(action.payload)[0];
            })
            state.savedSteps.push(action.payload)
        },
        modifyExpand: (state, action) => {
            state.expandedSections = action.payload
        },

        modifyHighlight: (state, action) => {
            state.hightLightedItem = action.payload
        }

    },
})

export const { updateSteps, modifyExpand, modifyHighlight } = submissionSlice.actions
export default submissionSlice.reducer