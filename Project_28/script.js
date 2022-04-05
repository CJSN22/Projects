const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
    } catch(err) {
        if(err.response.status == 404){
            createErrorCard('No Profile with this User Name')
        }
    } 
}


async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addRepostoCard(data)
    } catch(err) {
         createErrorCard('Problem Fetching Repo')
    } 
}

function createUserCard(user) {
    const cardHTML = `
    <main id="main">
      <div class="card">
        <div>
          <img class="avatar" alt="${user.name}" src="${user.avatar_url}">
        </div>
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>${user.bio}</p>

          <ul>
            <li>${user.followers}<strong>followers</strong></li>
            <li>${user.following}<strong>following</strong></li>
            <li>${user.public_repos}<strong>Repos</strong></li>
          </ul>

          <div id="repos">
            
          </div>
        </div>
      </div>
    </main>
    `
    main.innerHTML = cardHTML

}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

function addRepostoCard(repos) {
    const reposEl = document.getElementById('repos')

    repos.slice(0, 4).forEach(repo => {
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href = repo.html_url
        repoEl.target = '_blank'
        repoEl.innerText = repo.name

        reposEl.appendChild(repoEl)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if(user) {
        getUser(user)

        search.value = ''
    }
})