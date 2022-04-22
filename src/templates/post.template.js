export function renderPosts(post, options){
    const button = (JSON.parse(localStorage.getItem('favorites')) || []).includes
    (post.id)
    ? `<button data-id="${post.id}" class="butto-round button-small button-danger">Remove</button>`
    : `<button data-id="${post.id}" class="butto-round button-small button-primary">Save</button>`

    return `    <div class="panel">
    <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
            <li class="tag tag-blue tag-rounded">${post.type}</li>
        </ul>
        </div>
        <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
        </div>
        <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${options.withButton ? button : ''}
        </div>
  </div>`
}
