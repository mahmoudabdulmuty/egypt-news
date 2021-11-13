const apiLink = 'https://newsapi.org/v2/top-headlines?country=eg';
const apiKey = '&apiKey=3bd4753c68144c04b3eb73e44b7da657';
const articleEl = document.createElement('article');

function createArticle(category) {
	articleEl.textContent = '';
	const xhr = new XMLHttpRequest();
	xhr.open('GET', apiLink + category + apiKey);
	xhr.onload = function () {
		const articles = JSON.parse(this.response).articles;
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
}

document.addEventListener('DOMContentLoaded', function () {
	createArticle('');
});

document.querySelector('.header-title').addEventListener('click', function () {
	createArticle('');
});

document.querySelector('.business').addEventListener('click', function () {
	createArticle('&category=business');
});

document.querySelector('.entertainment').addEventListener('click', function () {
	createArticle('&category=entertainment');
});

document.querySelector('.health').addEventListener('click', function () {
	createArticle('&category=health');
});

document.querySelector('.science').addEventListener('click', function () {
	createArticle('&category=science');
});

document.querySelector('.sports').addEventListener('click', function () {
	createArticle('&category=sports');
});

document.querySelector('.technology').addEventListener('click', function () {
	createArticle('&category=technology');
});
