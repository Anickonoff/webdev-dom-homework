import {
    renderCommentForm,
    renderComments,
    renderInviteForm,
} from './modules/render.js'
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
if (
    localStorage.getItem('token') == null ||
    localStorage.getItem('name') == null
) {
    renderInviteForm()
} else {
    renderCommentForm(localStorage.getItem('name'))
}
console.log('It works!')
