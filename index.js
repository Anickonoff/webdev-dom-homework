import { renderComments } from './modules/render.js'
import { initFormListener } from './modules/initListeners.js'
import { importComments } from './modules/commentsData.js'

// fetch('https://wedev-api.sky.pro/api/v1/anton-nikonov/comments', {
//     method: 'GET',
// })
//     .then((response) => {
//         return response.json()
//     })
//     .then((data) => {
//         updateComments(data.comments)
//         renderComments()
//     })

async function importRenderComments() {
    await importComments()
    renderComments()
}
importRenderComments()

initFormListener()
console.log('It works!')
