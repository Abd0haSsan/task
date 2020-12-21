fetch('http://newsapi.org/v2/top-headlines?country=eg&category=technology&apiKey=da2b607bceaa4522b682f340b6609065',{}).then(res=>{
    // console.log(res)
    return res.json()
})
.then(data =>{
    // console.log(data)
    x = data
    data.articles.forEach(element => {
        // console.log(element)
        showNews(element)
    });
})
// .catch(console.log('error'))

let showNews = function(e){

    const article = newEle('article','',['card','row','p-3','col-md-3', 'col-12', 'my-4',])
    const author = newEle('h4', e.author,[])
    const description = newEle('p', e.description,['card-text'])
    const title = newEle('p', e.title,['card-title'])
    const url = newEle('a',e.source.name,['btn','btn-info','card-link'])
    url.href = e.url
    const publishedAt = newEle('p',e.publishedAt,['card-footer'])
    const content = newEle('p',e.content,['card-text'])
    const pic = newEle('img','',['card-img-top'])
    pic.setAttribute('src',e.urlToImage)

    article.appendChild(title)
    article.appendChild(pic)
    article.appendChild(description)
    article.appendChild(author)
    article.appendChild(content)
    article.appendChild(url)
    article.appendChild(publishedAt)


    // console.log(article)
    document.querySelector('#news div').appendChild(article)
}

const newEle = function(eleType, eleContent,eleClasses){
    ele = document.createElement(eleType)
    ele.textContent = eleContent
    eleClasses.forEach(c=> ele.classList.add(c))
    return ele
}