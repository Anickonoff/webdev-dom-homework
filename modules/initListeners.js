import { exportComments, importComments } from './api.js'
import { commentList, updateComments } from './commentsData.js'
import { renderComments } from './render.js'

export const addBtnEvent = () => {
    for (const likeBtn of document.querySelectorAll('.like-button')) {
        likeBtn.addEventListener('click', (event) => {
            event.stopPropagation()
            const idLiked = commentList.findIndex(
                (comment) => comment.id === Number(likeBtn.dataset.id),
            )
            const likes = commentList[idLiked].likes
            const isLiked = commentList[idLiked].isLiked
            commentList[idLiked].likes = isLiked ? likes - 1 : likes + 1
            commentList[idLiked].isLiked = !isLiked
            renderComments()
        })
    }
}

export const addCommentEvent = () => {
    for (const commentBlock of document.querySelectorAll('.comment')) {
        commentBlock.addEventListener('click', () => {
            const textField = document.querySelector('.add-form-text')
            const idComment = commentList.findIndex(
                (comment) => comment.id === Number(commentBlock.dataset.id),
            )
            textField.value =
                '>>>' +
                commentList[idComment].author.name +
                ' написал(а): ' +
                commentList[idComment].text +
                '<<<\n'
        })
    }
}

export const initFormListener = () => {
    const addButton = document.querySelector('.add-form-button')
    const userText = document.querySelector('.add-form-text')
    const userName = document.querySelector('.add-form-name')
    userText.addEventListener('blur', () => {
        if (!userText.value.trim()) {
            userText.style.backgroundColor = 'red'
        } else {
            userText.style.backgroundColor = ''
        }
    })
    userName.addEventListener('blur', () => {
        if (!userName.value.trim()) {
            userName.style.backgroundColor = 'red'
        } else {
            userName.style.backgroundColor = ''
        }
    })
    addButton.addEventListener('click', () => {
        if (!userName.value.trim()) {
            userName.style.backgroundColor = 'red'
            return
        } else if (!userText.value.trim()) {
            userText.style.backgroundColor = 'red'
            return
        }
        exportComments({ text: userText.value, name: userName.value })
            .then(() => importComments())
            .then((result) => {
                updateComments(result.comments)
                renderComments()
            })

        userName.value = ''
        userText.value = ''
    })
}
