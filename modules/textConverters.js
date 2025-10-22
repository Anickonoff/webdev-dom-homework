export const tagFilter = (string) => {
    return string.replaceAll('<', '&lt').replaceAll('>', '&gt')
}

export const dateConverter = (date) => {
    const currentDate = new Date(Date.parse(date))
    const textDate =
        currentDate.getDate().toString().padStart(2, '0') +
        '.' +
        (currentDate.getMonth() + 1).toString().padStart(2, '0') +
        '.' +
        (currentDate.getFullYear() % 100).toString().padStart(2, '0') +
        ' ' +
        currentDate.getHours() +
        ':' +
        currentDate.getMinutes().toString().padStart(2, '0')
    return textDate
}
