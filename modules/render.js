import {
    addBtnEvent,
    initDelBtnListener,
    initInvitationListener,
    initLogoutBtnListener,
} from './initListeners.js'
import { commentList } from './commentsData.js'
import { tagFilter, dateConverter } from './textConverters.js'

export const renderComments = () => {
    const comments = document.querySelector('.comments')
    comments.innerHTML = commentList
        .map(
            (comment) => `
        <li class="comment" data-id="${comment.id}">
          <div class="comment-header">
            <div>${tagFilter(comment.author.name)}</div>
            <div>${dateConverter(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${tagFilter(comment.text)}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-id="${comment.id}"></button>
            </div>
            <button class="del-button" data-id="${comment.id}"></button>
          </div>
        </li>
      `,
        )
        .join('')
    addBtnEvent()
    initDelBtnListener()
}

export const renderInviteForm = () => {
    const form = document.querySelector('.add-form')
    form.innerHTML = `
    <p class="add-form-header">
        Для публикации комментариев необходимо авторизоваться или
        зарегистрироваться
    </p>
    <div class="add-form-row">
        <button id="regBtn" class="add-form-button">
            Зарегистрироваться
        </button>
        <button id="loginBtn" class="add-form-button">
            Авторизоваться
        </button>
    </div>
  `
    initInvitationListener()
}

export const renderLoginForm = () => {
    const form = document.querySelector('.add-form')
    form.innerHTML = `
    <input
        type="text"
        id="login"
        class="add-form-name"
        placeholder="Введите ваш логин"
    />
    <input
        type="password"
        id="password"
        class="add-form-name"
        placeholder="Введите ваш пароль"
    />
    <div class="add-form-row">
        <button class="add-form-button">Авторизоваться</button>
    </div>
  `
}

export const renderRistrationForm = () => {
    const form = document.querySelector('.add-form')
    form.innerHTML = `
  <input
      type="text"
      id="name"
      class="add-form-name"
      placeholder="Введите ваше имя"
  />
  <input
      type="text"
      id="login"
      class="add-form-name"
      placeholder="Введите ваш логин"
  />
  <input
      type="password"
      id="password"
      class="add-form-name"
      placeholder="Введите ваш пароль"
  />
  <div class="add-form-row">
      <button class="add-form-button">Зарегистрироваться</button>
  </div>
  `
}

export const renderCommentForm = (userName) => {
    const form = document.querySelector('.add-form')
    form.innerHTML = `
    <input
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
        value="${userName}"
        readonly
    />
    <textarea
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
    ></textarea>
    <div class="add-form-row">
        <button class="add-form-button">Написать</button>
        <button class="add-form-button" id="logoutBtn">Выход</button>
    </div>`
    initLogoutBtnListener()
}
