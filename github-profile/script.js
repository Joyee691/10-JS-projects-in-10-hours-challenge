const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');



async function getUser(user) {
	const res = await fetch(APIURL + user);
	const resData = await res.json();

	createUserCard(resData);
  getRepos(user);
}

async function getRepos(user) {
	const res = await fetch(APIURL + user + '/repos');
	const resData = await res.json();

	addReposToCard(resData);
}

function createUserCard(data) {
  console.log('avatar_url', data.avatar_url);
  
	const cardEl = `
    <div class='card'>
      <div>
        <img src='${data.avatar_url}' alt='${data.name}' class='avatar' />
      </div>
      <div class='user-info'>
        <h2>${data.name}</h2>
        <p>${data.bio}</p>

        <ul class='info'>
          <li>${data.followers}<strong>Followers</strong></li>
          <li>${data.following}<strong>Following</strong></li>
          <li>${data.public_repos}<strong>Repos</strong></li>
        </ul>

        <div id='repos'></div>
      </div>
    </div>
  `;

	main.innerHTML = cardEl;
}

function addReposToCard(repos) {
	const reposEl = document.getElementById('repos');

	repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0,10)
    .forEach(repo => {
      const repoEl = document.createElement('a');
      repoEl.classList.add('repo');

      repoEl.href = repo.html_url;
      repoEl.target = '_blank';
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });;
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const user = search.value;

	// console.log('user', user);

	if (user) {
		getUser(user);

		search.value = '';
	}
});
