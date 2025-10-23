import { exportComments, importComments } from './api.js'
import { commentList, updateComments } from './commentsData.js'
import { renderComments } from './render.js'

export const addBtnEvent = () => {
    function delay(interval = 300) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, interval)
        })
    }
    for (const likeBtn of document.querySelectorAll('.like-button')) {
        likeBtn.addEventListener('click', (event) => {
            event.stopPropagation()
            likeBtn.classList.add('-loading-like')
            likeBtn.disabled = true
            const idLiked = commentList.findIndex(
                (comment) => comment.id === Number(likeBtn.dataset.id),
            )

            delay(2000).then(() => {
                const likes = commentList[idLiked].likes
                const isLiked = commentList[idLiked].isLiked
                commentList[idLiked].likes = isLiked ? likes - 1 : likes + 1
                commentList[idLiked].isLiked = !isLiked
                likeBtn.classList.remove('-loading-like')
                likeBtn.disabled = false
                renderComments()
            })
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
        document.querySelector('.container-formmessage').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'
        exportComments({ text: userText.value, name: userName.value })
            .then(() => importComments())
            .then((result) => {
                updateComments(result.comments)
                renderComments()
                document.querySelector('.container-formmessage').style.display =
                    'none'
                document.querySelector('.add-form').style.display = ''
                userName.value = ''
                userText.value = ''
            })
    })
}
