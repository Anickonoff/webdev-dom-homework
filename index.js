import { renderComments } from './modules/render.js'
import { initFormListener } from './modules/initListeners.js'
import { updateComments } from './modules/commentsData.js'
import { importComments } from './modules/api.js'

importComments()
    .then((result) => {
        updateComments(result.comments)
        document.querySelector('.container-commentmessage').style.display =
            'none'
        renderComments()
        window.scrollTo(0, 0)
    })
    .catch((error) => {
        document.querySelector('.container-commentmessage').textContent =
            error.message
    })
initFormListener()
console.log('It works!')
