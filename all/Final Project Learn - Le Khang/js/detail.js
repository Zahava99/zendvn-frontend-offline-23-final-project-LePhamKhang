console.log(123)
//articles/3312
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));
//Get Detail
const elArticlesThumb = document.getElementById('ArticlesThumb')
const elArticleTitle = document.getElementById('ArticleTitle')
const elArticlePublishDate=document.getElementById('ArticlePublishDate')
const elArticleContent=document.getElementById('ArticleContent')
const elArticleAuthor=document.getElementById('ArticleAuthor')
const elArticleCategoryName=document.getElementById('ArticleCategoryName')
const elArticleCategoryNameTab=document.getElementById('ArticleCategoryNameTab')
API.get(`/articles/${id}`).then((response) => {
    console.log('adf',response)
    const article = response.data.data
    elArticleCategoryNameTab.innerText = article.category.name
    elArticleCategoryName.innerText = article.category.name
    elArticlesThumb.src= article.thumb
    elArticleTitle.innerText = article.title
    elArticlePublishDate.innerText = article.publish_date
    elArticleContent.innerHTML = article.content
    elArticleAuthor.innerText = article.author
    elArticlesThumb.src= article.thumb
})