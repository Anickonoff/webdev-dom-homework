import { addBtnEvent, addCommentEvent } from './initListeners.js'
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
          </div>
        </li>
      `,
        )
        .join('')
    addBtnEvent()
    addCommentEvent()
}
