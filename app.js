const apiLink = 'https://newsapi.org/v2/top-headlines?country=eg';
const apiKey = '&apiKey=3bd4753c68144c04b3eb73e44b7da657';

document.addEventListener('DOMContentLoaded', function () {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', apiLink + apiKey);

	xhr.onload = function () {
		const articles = JSON.parse(this.response).articles;
		const articleEl = document.createElement('article');
		articleEl.textContent = '';
		if (this.status === 200) {
			articles.forEach((article) => {
				const { title, description, url, urlToImage } = article;
				articleEl.innerHTML += `				  
        <article class="article">
        <div class="article-img">
          <img src="${urlToImage || ''}"/>
        </div>
        <div class="article-heading">
          <h2 class="article-title">${title}</h2>
          <p class="article-description">${description || ''}</p>
          <a class="article-link" target="_blank" href="${url}">مشاهدة المزيد</a>
        </div>
      </article>`;
			});
		}
		document.querySelector('.main').append(articleEl);
	};

	xhr.send();
});
