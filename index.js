async function createArticle(
	category = '',
	apiLink = 'https://newsapi.org/v2/top-headlines?country=eg'
) {
	const apiKey = '&apiKey=3bd4753c68144c04b3eb73e44b7da657';
	document.querySelector('.main').textContent = '';

	const response = await fetch(apiLink + category + apiKey);
	const responseText = await response.json();

	const articles = responseText.articles;
	if (articles.length === 0)
		document.querySelector('.main').innerHTML = 'No data Found';
	else {
		articles.forEach((article) => {
			const { title, description, url, urlToImage } = article;
			document.querySelector('.main').innerHTML += `
	      <article class="article">
	      <div class="article-img">
	        <img src="${
						!urlToImage ||
						urlToImage.includes('muhtwaplus') ||
						urlToImage.includes('aljazeera.net')
							? './img/No-Image-Available.jpg'
							: urlToImage
					}"/>
	      </div>
	      <div class="article-heading">
	        <h2 class="article-title">${title}</h2>
	        <p class="article-description">${description ?? ''}</p>
	      </div>
	      <a class="article-link" target="_blank" href="${url}">قراءة المزيد</a>
	    </article>`;
		});
	}
}

document.addEventListener('DOMContentLoaded', function () {
	createArticle();
	setTimeout(() => {
		document.querySelector('.spinner-wrapper').classList.add('hide-spinner');
	}, 450);
});

document
	.querySelector('.header-title-link')
	.addEventListener('click', function () {
		createArticle();
	});

document.querySelector('.business').addEventListener('click', function () {
	createArticle((category = '&category=business'));
});

document.querySelector('.entertainment').addEventListener('click', function () {
	createArticle((category = '&category=entertainment'));
});

document.querySelector('.health').addEventListener('click', function () {
	createArticle((category = '&category=health'));
});

document.querySelector('.science').addEventListener('click', function () {
	createArticle((category = '&category=science'));
});

document.querySelector('.sports').addEventListener('click', function () {
	createArticle((category = '&category=sports'));
});

document.querySelector('.technology').addEventListener('click', function () {
	createArticle((category = '&category=technology'));
});

// Search Query Function
function searchQuery() {
	const query = document.querySelector('.search-input').value;
	createArticle(
		(category = query),
		(apiLink = 'https://newsapi.org/v2/everything?q=')
	);
	document.querySelector('.search-input').value = '';
}

document
	.querySelector('.search-input')
	.addEventListener('keypress', function (e) {
		if (
			e.key === 'Enter' &&
			document.querySelector('.search-input').value.length > 0
		)
			searchQuery();
	});
