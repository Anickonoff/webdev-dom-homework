export let commentList = []

export const updateComments = (newComments) => {
    commentList = newComments
}

export async function importComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/anton-nikonov/comments', {
        method: 'GET',
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            return commentList
        })
}

// export const importComments = new Promise(() => {
//     fetch('https://wedev-api.sky.pro/api/v1/anton-nikonov/comments', {
//         method: 'GET',
//     })
//         .then((response) => {
//             return response.json()
//         })
//         .then((data) => {
//             updateComments(data.comments)
//             console.log(commentList)
//         })
// })
