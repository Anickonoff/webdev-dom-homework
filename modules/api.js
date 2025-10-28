const URL = 'https://wedev-api.sky.pro/api/v2/anton-nikonov'
const authHost = 'https://wedev-api.sky.pro/api/user'
let token = ''

export const updateToken = (newToken) => {
    token = newToken
}

export async function importComments() {
    return fetch(`${URL}/comments`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status == 500) {
            throw new Error('Сервер сломался, попробуй позже')
        }
        return response.json()
    })
}

export async function exportComments(data) {
    return fetch(`${URL}/comments`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
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
            } else if (response.status == 401) {
                throw new Error('Ошибка авторизации')
            } else if (response.status == 201) {
                return response.json()
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

export const sendAuth = (data) => {
    return fetch(`${authHost}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.status == 400) {
                throw new Error('Не верный логин или пароль')
            } else if (response.status == 201) {
                return response.json()
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

export const sendReg = (data) => {
    return fetch(`${authHost}`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.status == 400) {
                throw new Error('Пользователь с таким логином уже существует')
            } else if (response.status == 201) {
                return response.json()
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
