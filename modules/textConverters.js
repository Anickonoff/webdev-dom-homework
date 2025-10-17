export const tagFilter = (string) => {
    return string.replaceAll('<', '&lt').replaceAll('>', '&gt')
}
