import { renderComments } from './modules/render.js'
import { initFormListener } from './modules/initListeners.js'
import { updateComments } from './modules/commentsData.js'
import { importComments } from './modules/api.js'

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

// async function importRenderComments() {
//     let newComments = await importComments()
//     updateComments(newComments)
//     renderComments()
// }
// importRenderComments()

importComments().then((result) => {
    updateComments(result.comments)
    renderComments()
})
initFormListener()
console.log('It works!')
