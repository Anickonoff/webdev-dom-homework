export async function importComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/anton-nikonov/comments', {
        method: 'GET',
    }).then((response) => {
        if (response.status == 500) {
            throw new Error('Сервер сломался, попробуй позже')
        }
        return response.json()
    })
}

export async function exportComments(data) {
    return fetch('https://wedev-api.sky.pro/api/v1/anton-nikonov/comments', {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.status == 500) {
                // throw new Error('Сервер сломался, попробуй позже')
                // console.log('отправляю данные повторно')
                return exportComments(data)
            } else if (response.status == 400) {
                throw new Error(
                    'Имя и комментарий должны быть не короче 3 символов',
                )
            } else if (response.status == 201) {
                return
            } else {
                throw new Error(response)
            }
        })
        .catch((error) => {
            if (error.message.includes('Failed to fetch')) {
                throw new Error(
                    'Кажется, у вас сломался интернет, попробуйте позже',
                )
            }
            throw error
        })
}
