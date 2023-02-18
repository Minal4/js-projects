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
        if (e.key === 'Enter') {
            fetchApi(e.target.value);
        }
    })

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        fetchApi(searchInput.value);

    })
}

dictionarySearch();