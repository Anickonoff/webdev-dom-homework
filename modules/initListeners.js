import { commentList } from './commentsData.js'
import { renderComments } from './render.js'

export const addBtnEvent = () => {
    for (const likeBtn of document.querySelectorAll('.like-button')) {
        likeBtn.addEventListener('click', (event) => {
            event.stopPropagation()
            const likesCounter = commentList[likeBtn.dataset.id].likesCounter
            const isLiked = commentList[likeBtn.dataset.id].liked
            commentList[likeBtn.dataset.id].likesCounter = isLiked
                ? likesCounter - 1
                : likesCounter + 1
            commentList[likeBtn.dataset.id].liked = !isLiked
            renderComments()
        })
    }
}

export const addCommentEvent = () => {
    for (const comment of document.querySelectorAll('.comment')) {
        comment.addEventListener('click', () => {
            const textField = document.querySelector('.add-form-text')
            textField.value =
                '>>>' +
                commentList[comment.dataset.id].name +
                ' написал(а): ' +
                commentList[comment.dataset.id].text +
                '<<<\n'
        })
    }
}

export const inifFormListener = () => {
    const addButton = document.querySelector('.add-form-button')
    const userText = document.querySelector('.add-form-text')
    const userName = document.querySelector('.add-form-name')
    userText.addEventListener('blur', () => {
        if (!userText.value) {
            userText.style.backgroundColor = 'red'
        } else {
            userText.style.backgroundColor = ''
        }
    })
    userName.addEventListener('blur', () => {
        if (!userName.value) {
            userName.style.backgroundColor = 'red'
        } else {
            userName.style.backgroundColor = ''
        }
    })
    addButton.addEventListener('click', () => {
        if (!userName.value) {
            userName.style.backgroundColor = 'red'
            return
        } else if (!userText.value) {
            userText.style.backgroundColor = 'red'
            return
        }
        const currentDate = new Date()
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
        commentList.push({
            name: userName.value,
            date: textDate,
            text: userText.value,
            likesCounter: 0,
            liked: false,
        })
        userName.value = ''
        userText.value = ''
        renderComments()
    })
}
