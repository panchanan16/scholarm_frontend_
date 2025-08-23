export const roleBasedStatus = {
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
                completed: "true",
                disposal: "false"
            },
            status: "New Assignment"
        },
        {
            id: 3,
            urlParam: {
                editorStatus: "accepted",
                completed: "true",
                disposal: "false"
            },
            status: "Submission With Required Review Completed"
        },
        {
            id: 4,
            urlParam: {
                editorStatus: "accepted",
                completed: "true",
                disposal: "false"
            },
            status: "Submission Need Additional Review"
        },
        {
            id: 5,
            urlParam: {
                editorStatus: "accepted",
                completed: "true",
                disposal: "false"
            },
            status: "Submission With One or More Review"
        },
        {
            id: 6,
            urlParam: {
                editorStatus: "accepted",
                completed: "true",
                disposal: "false"
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
                status: "newsubmission",
            },
            status: "New Submission"
        },
        {
            id: 2,
            urlParam: {
                status: "editorinvited",
            },
            status: "Editor Invited"
        },
        {
            id: 4,
            urlParam: {
                status: "needtoassigneditor",
            },
            status: "Need to Assign Editor"
        },
        {
            id: 5,
            urlParam: {
                status: "needtoassignreviewer",
            },
            status: "Need to Assign Reviewer"
        },
        {
            id: 6,
            urlParam: {
                status: "reviewerinvited",
            },
            status: "Reviewer Invited"
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

        // normal status
        {
            id: 7,
            urlParam: {
                status: "submissionneedadditionalreviewers",
            },
            status: "Submission Require Additional Reviewer"
        },
        {
            id: 8,
            urlParam: {
                status: "underreview",
            },
            status: "Under Review"
        },
        {
            id: 9,
            urlParam: {
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
        }, {
            id: 20,
            urlParam: {
                type: "revision",
                status: "reviewerinvited",
            },
            status: "Reviewer Invited"
        },
        {
            id: 15,
            urlParam: {
                type: "revision",
                status: "underreview",
            },
            status: "Under Review"
        },
        {
            id: 16,
            urlParam: {
                type: "revision",
                status: "submissionwithrequiredreviewerscompleted",
            },
            status: "Required Review Completed"
        },
        {
            id: 17,
            urlParam: {
                type: "revision",
                status: "incomplete",
            },
            status: "Incomplete Submission"
        },
        {
            id: 18,
            urlParam: {
                status: "revisiondue",
            },
            status: "Revision Due"
        },
        {
            id: 19,
            urlParam: {
                status: "senttoauthor",
            },
            status: "Sent Back to Author"
        },
    ]
}


export function setStatusForDashboard(searchParams, role) {
    const statusmap = role ? roleBasedStatus[role] : []
    for (const mapping of statusmap) {
        console.log(mapping)
        const { urlParam, status } = mapping;
        const allMatch = Object.entries(urlParam).every(
            ([key, value]) => { return searchParams.get(key) === value } //console.log(key, value); 
        );
        if (allMatch) return status;
    }
    return null; //no match found
}
