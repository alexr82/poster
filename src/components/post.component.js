import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";
import { renderPosts } from "../templates/post.template";

export class PostComponent extends Component{
    constructor(id,loader){
        super(id)
        this.loader = loader
    }

    async onShow(){
        this.loader.show()
        const data = await apiService.fetchPosts()
        const posts = TransformService.fbObjectToArray(data)
        this.loader.hide()
        const html = posts.map(post => renderPosts(post, {withButton:true})).join(' ')
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide(){
        this.$el.innerHTML = ''
    }

    init(){
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }
}


function buttonHandler(event){
    const $el = event.target
    const id = $el.dataset.id

    if(id){
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        
        if(favorites.includes(id))
        {
            $el.textContent= 'Save'
            $el.classList.add('button-primary')
            $el.classList.remove('button-danger')
            favorites =  favorites.filter(fl => fl !== id)
        } 
        else {
            $el.textContent = 'Remove'
            $el.classList.remove('button-primary')
            $el.classList.add('button-danger')
            favorites.push(id)
        }

        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}