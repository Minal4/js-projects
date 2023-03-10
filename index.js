// FOR FEEDBACK UI

function feedback() {

    const ratingsCont = document.querySelector('.ratings-container');
    const ratings = document.querySelectorAll('.rating');
    const feedBackBtn = document.querySelector('.btn');
    let content = ''
    let img = ''

    ratings.forEach((rating) => {
        rating.addEventListener('click', function (e) {
            img = e.target.parentNode.children[0].currentSrc || e.target.children[0].currentSrc;
            console.log(img)
            removeItem();
            content = e.target.innerText || e.target.parentNode.innerText;
            e.target.classList.add('active')
            e.target.parentNode.classList.add('active')
        })
    })

    feedBackBtn.addEventListener('click', function (e) {
        e.preventDefault()
        if (content !== '') {
            ratingsCont.innerHTML = `
    <div>Thank you
    <div>Feedback: ${content} 
    
    <img style="width: 30px; height: 30px; margin: 10px auto 0" src=${img}></img>
    </div>
    Thank your for your valuable time.
    `}
    })

    function removeItem(e) {
        ratings.forEach((rating) => {
            rating.classList.remove('active')
        })
    }
}
feedback()

// END FEEDBACK UI

// SEARCH DICTIONARY

function dictionarySearch() {
    const btn = document.querySelector('.search-btn')
    const searchInput = document.querySelector('.search-input')
    const meaning = document.querySelector('.meaning')
    const syn = document.querySelector('.syn')
    const showInfo = document.querySelector('.show')
    const content = document.querySelector('.inner-content')
    async function fetchApi(word) {
        try {
            showInfo.style.display = 'block';
            showInfo.innerText = `Searching the meaning of ${word}`
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
            let lists = await fetch(url)
            let data = await lists.json();
            console.log(data)

            if (data.title) {
                content.style.display = 'none'
                showInfo.innerText = data.title
            } else {
                content.style.display = 'block'
                meaning.innerHTML = `${data[0].meanings[0].definitions[0].definition}`
                syn.innerHTML = `${data[0].meanings[0].synonyms}`
                showInfo.style.display = 'none';
            }

        } catch (error) {
            console.log(error)
        }

    }

    searchInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter' && e.target.value !== '') {
            fetchApi(e.target.value);
            searchInput.value = ''
        }
    })

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (searchInput.value !== '') {
            fetchApi(searchInput.value);
            searchInput.value = ''
        }
    })
}

dictionarySearch();


// QUOTE GENERATOR

function quoteGen() {
    const data = quotes;
    const quoteBtn = document.querySelector('.quote-btn');
    const author = document.querySelector('.author');
    const quotePlace = document.querySelector('.quote-placement');
    quoteBtn.addEventListener('click', function () {
        randomQuote = Math.floor(Math.random() * data.length)
        quotePlace.innerText = data[randomQuote].quote
        author.innerText = `~ ${data[randomQuote].author} ~`
    });
}

quoteGen();

// NOTE APP

function noteApp() {
    const lists = document.querySelector('.note-lists');
    const btn = document.querySelector('.add-btn');


    // ADD NOTE
    const addNote = (text = "") => {
        const list = document.createElement('div');
        list.classList.add('list');
        list.innerHTML = `
        <div class="single-list relative ">
        <div class="editable-btns absolute right-0 top-0 flex gap-2">
        <button class="save w-auto bg-black text-white px-4 py-2"> save</button>
        <button class="delete w-auto bg-black text-white px-4 py-2">
        Delete
        </button>
        </div>
        <div class="index">
        </div>
        <textarea class="pt-10 px-4" style="height: 250px; width:100%" placeholder='Enter text...'>${text}</textarea>
        </div>
        `
        let del = list.querySelector('.delete');
        del.addEventListener('click', function () {
            list.remove()
            saveNote()
        })
        let save = list.querySelector('.save');
        save.addEventListener('click', saveNote)
        lists.appendChild(list);
        saveNote()
    }

    const saveNote = () => {
        const notes = lists.querySelectorAll('.list textarea')
        const data = [];
        notes.forEach((note) => {
            data.push(note.value);
        })

        if (data.length === 0) {
            localStorage.removeItem("notes")
        } else {
            localStorage.setItem("notes", JSON.stringify(data))
        }
    }

    (
        function () {
            const lsNotes = JSON.parse(localStorage.getItem("notes"));
            if (lsNotes === null) {
                addNote()
            } else {
                lsNotes.forEach(
                    (lsNote) => {
                        addNote(lsNote)
                    }
                )
            }

        }
    )()
    btn.addEventListener('click', addNote)

}

noteApp()

// GITHUB PROFILES

const profile = () => {
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-field');

    const APIURL = "https://api.github.com/users/";

    const fetchApi = async (name) => {
        const res = await fetch(`${APIURL}${name}`)
        const data = await res.json();
        const card =
            `
            <div class="card flex flex-col sm:flex-row gap-4 ">
                <div class="basis-full md:basis-1/4">
                    <img class="avatar" src=${data.avatar_url} alt="Florin Pop">
                </div>
                <div class="user-info basis-full md:basis-3/4">
                    <h2>${data.name}</h2>
                    <p>${data.bio}</p>
                    <ul class="info flex gap-4 mb-5">
                        <li class="flex gap-2">${data.followers} <strong>Followers</strong></li>
                        <li class="flex gap-2">${data.following} <strong>Following</strong></li>
                        <li class="flex gap-2">${data.public_repos} <strong>Repos</strong></li>
                    </ul>
                    <div id="repos">
            
                    </div>
                </div>
            </div>
        `
        searchBox.innerHTML = card
        repoApi(name)
    }

    const searchProfile = () => {
        fetchApi(searchInput.value);
    }

    searchInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter' && e.target.value !== '') {
            searchProfile()
        }
    })

    fetchApi('bhagirath-wscubetech');

    const repoApi = async (name) => {
        const repos = document.getElementById('repos');
        const repoLink = await fetch(`${APIURL}${name}/repos`);
        const data = await repoLink.json();
        data.forEach((item) => {
            const anchor = document.createElement('a');
            anchor.classList.add('anchor')
            anchor.href = item.html_url;
            anchor.target = "_blank";
            anchor.innerText = item.name
            repos.appendChild(anchor)
        })

    }
}


profile();