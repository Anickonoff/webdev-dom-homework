import {
    delComment,
    exportComments,
    importComments,
    likeComment,
    sendAuth,
    sendReg,
    updateToken,
} from './api.js'
import { commentList, updateComments } from './commentsData.js'
import {
    renderCommentForm,
    renderComments,
    renderInviteForm,
    renderLoginForm,
    renderRistrationForm,
} from './render.js'

export const addBtnEvent = () => {
    for (const likeBtn of document.querySelectorAll('.like-button')) {
        likeBtn.addEventListener('click', (event) => {
            event.stopPropagation()
            likeBtn.classList.add('-loading-like')
            likeBtn.disabled = true
            const idLiked = commentList.findIndex(
                (comment) => comment.id === likeBtn.dataset.id,
            )
            likeComment(likeBtn.dataset.id)
                .then((response) => {
                    commentList[idLiked].likes = response.result.likes
                    commentList[idLiked].isLiked = response.result.isLiked
                    renderComments()
                    addCommentEvent()
                })
                .catch((error) => {
                    alert(error.message)
                })
                .finally(() => {
                    likeBtn.disabled = false
                    likeBtn.classList.remove('-loading-like')
                })
        })
    }
}

export const initDelBtnListener = () => {
    for (const delBtn of document.querySelectorAll('.del-button')) {
        delBtn.addEventListener('click', (event) => {
            event.stopPropagation()
            delBtn.classList.add('-loading-like')
            delBtn.disabled = true
            delComment(delBtn.dataset.id)
                .then(() => importComments())
                .then((result) => {
                    updateComments(result.comments)
                    renderComments()
                    addCommentEvent()
                })
                .catch((error) => {
                    alert(error.message)
                })
                .finally(() => {
                    delBtn.disabled = false
                    delBtn.classList.remove('-loading-like')
                })
        })
    }
}

export const addCommentEvent = () => {
    for (const commentBlock of document.querySelectorAll('.comment')) {
        commentBlock.addEventListener('click', () => {
            const textField = document.querySelector('.add-form-text')
            const idComment = commentList.findIndex(
                (comment) => comment.id === commentBlock.dataset.id,
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
        exportComments({
            text: userText.value,
            name: userName.value,
            forceError: true,
        })
            .then(() => importComments())
            .then((result) => {
                updateComments(result.comments)
                renderComments()
                addCommentEvent()
                userText.value = ''
            })
            .catch((error) => {
                alert(error.message)
            })
            .finally(() => {
                document.querySelector('.container-formmessage').style.display =
                    'none'
                document.querySelector('.add-form').style.display = ''
            })
    })
}

export const initInvitationListener = () => {
    const regBtn = document.getElementById('regBtn')
    const loginBtn = document.getElementById('loginBtn')

    regBtn.addEventListener('click', () => {
        document.querySelector('.comments').style.display = 'none'
        renderRistrationForm()
        initFormCheckListener()
        initAuthListener('reg')
    })

    loginBtn.addEventListener('click', () => {
        document.querySelector('.comments').style.display = 'none'
        renderLoginForm()
        initFormCheckListener()
        initAuthListener('login')
    })
}

export const initFormCheckListener = () => {
    const fields = document.querySelectorAll('.add-form-name')
    fields.forEach((field) => {
        field.addEventListener('blur', () => {
            if (!field.value.trim()) {
                field.style.backgroundColor = 'red'
            } else {
                field.style.backgroundColor = ''
            }
        })
    })
}

export const initAuthListener = (formType = 'login') => {
    const sendBtn = document.querySelector('.add-form-button')
    sendBtn.addEventListener('click', () => {
        const login = document.getElementById('login')
        const name = formType === 'reg' ? document.getElementById('name') : null
        const password = document.getElementById('password')
        if (formType === 'reg' && !name.value.trim()) {
            name.style.backgroundColor = 'red'
            return
        } else if (!login.value.trim()) {
            login.style.backgroundColor = 'red'
            return
        } else if (!password.value.trim()) {
            password.style.backgroundColor = 'red'
            return
        }
        const requestData =
            formType === 'reg'
                ? {
                      login: login.value,
                      name: name.value,
                      password: password.value,
                  }
                : { login: login.value, password: password.value }
        const apiCall = formType === 'reg' ? sendReg : sendAuth
        apiCall(requestData)
            .then((response) => {
                updateToken(response.user.token)
                localStorage.setItem('token', response.user.token)
                localStorage.setItem('name', response.user.name)
            })
            .then(() => importComments())
            .then((result) => {
                updateComments(result.comments)
                renderComments()
                document.querySelector('.comments').style.display = ''
                renderCommentForm(localStorage.getItem('name'))
                initFormListener()
                addCommentEvent()
            })
            .catch((error) => {
                alert(error.message)
            })
    })
}

export const initLogoutBtnListener = () => {
    const logoutBtn = document.getElementById('logoutBtn')
    logoutBtn.addEventListener('click', () => {
        localStorage.clear()
        updateToken('')
        importComments().then((result) => {
            updateComments(result.comments)
            renderComments()
            renderInviteForm()
            initInvitationListener()
        })
    })
}
