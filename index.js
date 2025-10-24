import { renderComments } from './modules/render.js'
import { initFormListener } from './modules/initListeners.js'
import { updateComments } from './modules/commentsData.js'
import { importComments } from './modules/api.js'

importComments().then((result) => {
    updateComments(result.comments)
    document.querySelector('.container-commentmessage').style.display = 'none'
    renderComments()
})
initFormListener()
console.log('It works!')
