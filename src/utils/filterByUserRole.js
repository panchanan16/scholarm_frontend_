export function filterbyUserRole(data, role, userId, round) {
    if (role === 'editor') {   
        const userInfo = data?.length && data.filter((userData) => userData.editor_id == userId && userData.round == round)
        return userInfo?.length ? userInfo[0] : null
    } else if (role === 'reviewer') {
        const userInfo = data.filter((userData) => userData.reviewer_id == userId && userData.round == round)
        return userInfo?.length ? userInfo[0] : null
    } else {
        return null;
    }
}