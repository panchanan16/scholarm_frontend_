export function filterbyUserRole(data, role, userId) {
    if (role === 'editor') {
        console.log(data)
        const userInfo = data?.length && data.filter((userData) => userData.editor_id == userId)
        return userInfo?.length ? userInfo[0] : null
    } else if (role === 'reviewer') {
        const userInfo = data.filter((userData) => userData.reviewer_id == userId)
        return userInfo?.length ? userInfo[0] : null
    } else {
        return null;
    }
}