export const roleBasedStatus = {
    reviewer: [
        {
            id: 1,
            urlParam: {
                reviewerStatus: "invited",
            },
            status: "New Assignments"
        },
        {
            id: 2,
            urlParam: {
                reviewerStatus: "accepted",
                completed: "false"
            },
            status: "Pending Assignment"
        },
        {
            id: 3,
            urlParam: {
                reviewerStatus: "accepted",
                completed: "true"
            },
            status: "Completed Assignment"
        },
    ],
    editor: [
        {
            id: 1,
            urlParam: {
                status: "editorinvited",
            },
            status: "New Invitaion"
        },

        {
            id: 2,
            urlParam: {
                editorStatus: "accepted",
                completed: "false",
                disposal: "false"
            },
            status: "New Assignment"
        },
        {
            id: 3,
            urlParam: {
                status: "submissionwithrequiredreviewerscompleted",
            },
            status: "Submission With Required Review Completed"
        },
        {
            id: 4,
            urlParam: {
                status: "submissionneedadditionalreviewers",
            },
            status: "Submission Need Additional Review"
        },
        {
            id: 5,
            urlParam: {
                editorStatus: "accepted",
                completed: "true",
                disposal: "t"
            },
            status: "Submission With One or More Review"
        },
        {
            id: 6,
            urlParam: {
                status: "reviewerinvited",
            },
            status: "Review Not Respond"
        },
        {
            id: 7,
            urlParam: {
                status: "underreview",
                editorStatus: "accepted",
            },
            status: "Under Review"
        },

        {
            id: 8,
            urlParam: {
                editorStatus: "accepted",
                completed: "true",
                disposal: "false"
            },
            status: "My Assignment With Decision"
        },
        {
            id: 9,
            urlParam: {
                completed: "true",
                disposal: "true"
            },
            status: "My Assignment With Disposal"
        },
    ],
    admin: [
        {
            id: 1,
            urlParam: {
                type: "regular",
                status: "newsubmission",
            },
            status: "New Submission"
        },
        {
            id: 2,
            urlParam: {
                type: "regular",
                status: "editorinvited",
            },
            status: "Editor Invited"
        },
        {
            id: 4,
            urlParam: {
                type: "regular",
                status: "needtoassigneditor",
            },
            status: "Need to Assign Editor"
        },
        {
            id: 5,
            urlParam: {
                type: "regular",
                status: "needtoassignreviewer",
            },
            status: "Need to Assign Reviewer"
        },
        {
            id: 6,
            urlParam: {
                type: "regular",
                status: "reviewerinvited",
            },
            status: "Reviewer Invited"
        },
        // normal status
        {
            id: 7,
            urlParam: {
                type: "regular",
                status: "submissionneedadditionalreviewers",
            },
            status: "Submission Require Additional Reviewer"
        },
        {
            id: 8,
            urlParam: {
                type: "regular",
                status: "underreview",
            },
            status: "Under Review"
        },
        {
            id: 9,
            urlParam: {
                type: "regular",
                status: "submissionwithrequiredreviewerscompleted",
            },
            status: "Required Review Completed"
        },
        {
            id: 10,
            urlParam: {
                type: "revison",
                status: "newsubmission",
            },
            status: "New Revision"
        },
        {
            id: 11,
            urlParam: {
                type: "revison",
                status: "editorinvited",
            },
            status: "Editor Invited"
        },

        {
            id: 12,
            urlParam: {
                type: "revison",
                status: "needtoassigneditor",
            },
            status: "Need to Assign Editor"
        },
        {
            id: 13,
            urlParam: {
                type: "revison",
                status: "needtoassignreviewer",
            },
            status: "Need to Assign Reviewer"
        },
        // revsion status
        {
            id: 14,
            urlParam: {
                type: "revision",
                status: "submissionneedadditionalreviewers",
            },
            status: "Submission Need Additional Reviewer"
        },
        {
            id: 15,
            urlParam: {
                type: "revision",
                status: "reviewerinvited",
            },
            status: "Reviewer Invited"
        },
        {
            id: 16,
            urlParam: {
                type: "revision",
                status: "underreview",
            },
            status: "Under Review"
        },
        {
            id: 17,
            urlParam: {
                type: "revision",
                status: "submissionwithrequiredreviewerscompleted",
            },
            status: "Required Review Completed"
        },
        {
            id: 18,
            urlParam: {
                type: "revision",
                status: "incomplete",
            },
            status: "Incomplete Submission"
        },
        {
            id: 19,
            urlParam: {
                status: "revisiondue",
            },
            status: "Revision Due"
        },
        {
            id: 20,
            urlParam: {
                status: "senttoauthor",
            },
            status: "Sent Back to Author"
        },
        {
            id: 21,
            urlParam: {
                status: "accepted",
            },
            status: "Accepted"
        },
        {
            id: 22,
            urlParam: {
                status: "rejected",
            },
            status: "Rejected"
        },
        {
            id: 23,
            urlParam: {
                status: "incomplete",
            },
            status: "Incompleted"
        },
    ]
}


export function setStatusForDashboard(searchParams, role) {
    const statusmap = role ? roleBasedStatus[role] : []
    for (const mapping of statusmap) {
        // console.log(mapping)
        const { urlParam, status } = mapping;
        // console.log(Object.entries(urlParam))
        const allMatch = Object.entries(urlParam).every(
            ([key, value]) => { return searchParams.get(key) === value }
        );
        if (allMatch) return status;
    }
    return null; //no match found
}
