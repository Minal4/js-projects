// FOR FEEDBACK UI

function feedback() {

    let ratingContainer = document.querySelector('.ratings-container');
    let ratings = ratingContainer.querySelectorAll('.rating');
    let ratingBtn = document.querySelector('.btn')
    let content = ''
    ratings.forEach((rating) => {
        rating.addEventListener('click', (e) => {
            // console.log(e)
            let parentElement = e.target.parentElement;
            removeActive(e)
            parentElement.classList.add('active')

            let ratingText = rating.innerText

            content = ratingText
        })
    })
    console.log(content)
    ratingBtn.addEventListener('click', () => {
        if (content !== '') {
            ratingContainer.innerHTML = `
            <div>Thank you
            <div>Feedback: ${content}         
            </div>
            Thank your for your valuable time.
            `
        }
    })

    const removeActive = (target) => {
        ratings.forEach((rating) => {
            rating.classList.remove('active')
        })
    }

}
feedback()

// END FEEDBACK UI

// SEARCH DICTIONARY

function dictionarySearch() {
    let searchInput = document.querySelector('.search-input')
    let searchBtn = document.querySelector('.search-btn')
    let searchContent = document.querySelector('.content')
    let searchMeaning = document.querySelector('.meaning')
    let searchShow = document.querySelector('.show')
    let searchSyn = document.querySelector('.syn')
    let api = 'https://api.dictionaryapi.dev/api/v2/entries/en'
    let collector = []
    const callApi = async (word) => {
        try {
            searchShow.innerHTML = `loading the meaning of ${searchInput.value}`
            let data = await fetch(`${api}/${word}`)
            let res = await data.json()
            console.log(res)
            searchMeaning.innerHTML = res[0].meanings[0].definitions[0].definition
            searchSyn.innerHTML = res[0].meanings[0].synonyms
            searchContent.style.display = 'block';
            searchShow.innerHTML = ``
        } catch (error) {
            console.log(error)
        }
    }

    searchBtn.addEventListener('click', () => {
        let searchValue = searchInput.value
        callApi(searchValue)
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
    let addBtn = document.querySelector('.add-btn');
    let noteLists = document.querySelector('.note-lists');
    const addList = (editableText = '') => {
        if (noteLists !== null) {
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
                <textarea class="pt-10 px-4 text-area" style="height: 250px; width:100%" placeholder='Enter text...'>${editableText}</textarea>
                </div>
                `
            noteLists.appendChild(list);
            let del = list.querySelector('.delete')
            del.addEventListener('click', () => {
                list.remove()
                saveNote()
            })
            saveNote()
        }
    }

    const saveNote = () => {
        const listData = []
        let textArea = noteLists.querySelectorAll('.text-area');
        textArea.forEach(text => {
            listData.push(text.value)
        })
        localStorage.setItem('lists', JSON.stringify(listData))
    }


    document.addEventListener('DOMContentLoaded', () => {
        let retriveData = JSON.parse(localStorage.getItem('lists'))
        console.log(retriveData)
        retriveData.forEach((item) => {
            addList(item)
        })
    })
    addBtn.addEventListener('click', addList);
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