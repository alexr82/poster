import { Component } from "../core/component";
import {apiService} from "../services/api.service"
import { renderPosts } from "../templates/post.template";

export class FavoriteComponent extends Component{
    constructor(id,loader){
        super(id)
        this.loader = loader
    }

    init(){
        this.$el.addEventListener('click', linkClickHeandler.bind(this))
    }

    onShow(){
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        const html = renderList(favorites)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide(){
        this.$el.innerHTML = ''
    }
}

async function linkClickHeandler(event){
    event.preventDefault()
    if(event.target.classList.contains('js-link')){
        this.$el.innerHTML = ''
        this.loader.show()
        const postId = event.target.textContent
        const post = await apiService.fetchPostsById(postId)
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', renderPosts(post, {withButton:false}))
    }
}

function renderList(list=[]){

    if(list.length){
        return `
        <ul>
            ${list.map(i => `<li><a href="#" class="js-link">${i}</a></li>`).join(' ')}
        </ul>
        `
    } 
    
    return `<p class="center">There is no added element</p>`
    
}
