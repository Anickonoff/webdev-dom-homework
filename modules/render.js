import { addBtnEvent, addCommentEvent } from './initListeners.js'
import { commentList } from './commentsData.js'
import { tagFilter } from './textConverters.js'

export const renderComments = () => {
    const comments = document.querySelector('.comments')
    comments.innerHTML = commentList
        .map(
            (comment, index) => `
        <li class="comment" data-id="${index}">
          <div class="comment-header">
            <div>${tagFilter(comment.name)}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${tagFilter(comment.text)}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likesCounter}</span>
              <button class="like-button ${comment.liked ? '-active-like' : ''}" data-id="${index}"></button>
            </div>
          </div>
        </li>
      `,
        )
        .join('')
    addBtnEvent()
    addCommentEvent()
}
