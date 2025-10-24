export async function importComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/anton-nikonov/comments', {
        method: 'GET',
    }).then((response) => {
        return response.json()
    })
}

export async function exportComments(data) {
    return fetch('https://wedev-api.sky.pro/api/v1/anton-nikonov/comments', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}
