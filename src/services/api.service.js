class ApiService {
    constructor(baseUrl){
        this.url = baseUrl
    }
    async createPost(post){
        try {
            const request = new Request (this.url+'/post.json',{
                method: 'post',
                body: JSON.stringify(post)
            })
            return useRequest(request)
        } 
        catch(e) {
            console.error(e)
        }
    }

    async fetchPosts(post){
        try {
            const request = new Request (this.url+'/post.json',{
                method: 'get',
            })
            return useRequest(request)
        } 
        catch(e) {
            console.error(e)
        }
    }

    async fetchPostsById(id){
        try {
            const request = new Request (this.url+`/post/${id}.json`,{
                method: 'get',
            })
            return useRequest(request)
        } 
        catch(e) {
            console.error(e)
        }
    }

}

async function useRequest(request){
    const response = await fetch(request)
    return await response.json()
}

export const apiService = new ApiService("https://js-form-4c6ea-default-rtdb.europe-west1.firebasedatabase.app")