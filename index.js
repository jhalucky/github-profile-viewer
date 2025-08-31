document.querySelector('#submit').addEventListener('click', getGithubInfo);
username.addEventListener('keypress',function(e) {
    if(e.key === 'Enter'){
        getGithubInfo();
    }
})
async function getGithubInfo() {
    document.getElementById('spinner').style.display = 'block';
    document.querySelector('.profile-picture').innerHTML = '';
    const username = document.querySelector('#username').value;
    const resultdiv = document.querySelector('.profile-picture');

    if(!username) {
        resultdiv.innerHTML = 'Please enter a username';
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if(!response.ok) {
            throw new Error("User Not Found")
        }
        const data = await response.json();
        document.querySelector('#username').value='';
        document.querySelector('#username').placeholder = 'Search for other profile';

        resultdiv.innerHTML = `
        <div id='profile-block'>
         <img src="${data.avatar_url}" alt="Avatar" width="200px" id='img'/>
        <div id='profile-details'>
        <h2 id='name'>Name: ${data.name || "No name Provided"}</h2>
        <p id='uname'><strong>Username: </strong> ${data.login}</p>
        <p id='bio'><strong>Bio: </strong>${data.bio || 'No bio available'}</p>
        <p id='bio'><strong>Followers: </strong>${data.followers}</p>
        <p id='bio'><strong>Followings: </strong>${data.following}</p>
        <p id='bio'><strong>No.of Repositories: </strong>${data.public_repos}</p>
        </div>
        </div>
        <div id='cc'>
        <h3>Contribution Chart</h3>
        <img id='contributions' src='https://ghchart.rshah.org/${username}' alt='Github Contribution Chart'/>
        <button id='profile'><a href="${data.html_url}" target="_blank" id='link'>View full Profile</a></button>
        </div>
        `;
    
    } catch (error) {
        const resultdiv = document.querySelector('.profile-picture');
        resultdiv.innerHTML = error.message;
    }
    document.getElementById('spinner').style.display = 'none';
}
