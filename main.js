const data = ['#fff', '#000', 'red'];

// FOR COLOR FLIPPER

const colorFlip = () => {
    const colors = ['047200', 'f2f5f8', '333']
    let bgColor = document.querySelector('.bg-color')
    let colorValue = document.querySelector('.value')
    let colorBtn = document.querySelector('.btn')
    if (colorBtn !== null) {
        colorBtn.addEventListener('click', () => {
            let flipRandomValue = Math.floor(Math.random() * colors.length)
            bgColor.style.backgroundColor = `#${colors[flipRandomValue]}`
            colorValue.innerHTML = `#${colors[flipRandomValue]}`

        })

        colorValue.addEventListener('click', async () => {
            let copy = colorValue.innerHTML
            console.log(copy)
            navigator.clipboard.writeText(copy)
            alert(`copied the following text ${copy}`)
        })
    }

}

colorFlip()

let back = document.querySelector('.back');
back.addEventListener('click', function () {
    history.back()
})

// FOR COUNTER

const counter = () => {
    let counterBtns = document.querySelectorAll('button')
    let counterValue = document.querySelector('.counter-value')

    counterBtns.forEach((counterBtn) => {
        counterBtn.addEventListener('click', () => {
            switch (counterBtn.textContent) {
                case 'Decrement': decrement()
                    break;
                case 'Increment': increment()
                    break;
                default: return
            }
        })

        const decrement = () => {
            if (counterValue.textContent <= 0) {
                counterValue.textContent = 0
                alert(`can't go below 0`)
            } else {
                counterValue.textContent--
            }
        }

        const increment = () => {
            counterValue.textContent++
        }
    })

}

counter();

// REVIEW 

let reviews = [
    {
        id: 1,
        name: 'susan smith',
        job: 'web developer',
        img: 'https://images2.imgbox.com/e0/57/qI5bbwvg_o.jpeg',
        text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
        id: 2,
        name: 'anna johnson',
        job: 'web designer',
        img: 'https://images2.imgbox.com/2e/6e/JAMvTZ56_o.jpeg',
        text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
    },
    {
        id: 3,
        name: 'peter jones',
        job: 'intern',
        img: 'https://images2.imgbox.com/56/88/oJvFN3l5_o.jpeg',
        text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
    },
    {
        id: 4,
        name: 'bill anderson',
        job: 'the boss',
        img: 'https://images2.imgbox.com/8b/1c/vwWNTsCd_o.jpeg',
        text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    },
];

const reviewFunc = () => {

    let info = document.querySelector('.info')
    let authorJob = document.querySelector('.job')
    let author = document.querySelector('.author')
    let personImg = document.querySelector('.person-img')
    let randomBtn = document.querySelector('.random-btn')
    let btns = document.querySelectorAll('.review-btn')
    let reviewIndex = 0
    function showPerson() {
        const { name, job, img, text } = reviews[reviewIndex]
        info.innerHTML = text
        authorJob.innerHTML = job
        personImg.src = img
        author.innerHTML = name
    }
    const randomFunc = () => {
        reviewIndex = Math.floor(Math.random() * reviews.length)
        showPerson(reviewIndex)
    }
    randomBtn.addEventListener('click', randomFunc)

    btns.forEach((reviewBtn) => {
        reviewBtn.addEventListener('click', function () {
            if (reviewBtn.classList.contains('prev-btn')) {
                reviewIndex--
                if (reviewIndex < 0) {
                    reviewIndex = reviews.length - 1
                }
                showPerson(reviewIndex)
            } else if (reviewBtn.classList.contains('next-btn')) {
                reviewIndex++
                if (reviewIndex >= reviews.length) {
                    reviewIndex = 0
                } else {
                }
                showPerson(reviewIndex)
            }
        })
    })
}

reviewFunc()

// FOR FAQ

const faqFunc = () => {
    const questions = document.querySelectorAll('.question');
    questions.forEach((article) => {
        let title = article.querySelector('.question-title');
        title.addEventListener('click', function () {
            questions.forEach((item) => {
                let text = item.querySelector('.question-text')
                let minus = item.querySelector('.minus-icon')
                let plus = item.querySelector('.plus-icon')
                if (item !== article) {
                    text.style.display = 'none'
                    plus.style.display = 'block'
                    minus.style.display = 'none'
                } else {
                    plus.style.display = 'none'
                    minus.style.display = 'block'
                    text.style.display = 'block'

                }
            })
        })
    })
}

faqFunc()

// video 

const videoFunc = () => {
    let play = document.querySelector('.play');
    let pause = document.querySelector('.pause');
    let videoContainer = document.querySelector('.video-container');
    if (pause !== null && play !== null) {
        play.addEventListener('click', function () {
            videoContainer.play()
        })
        pause.addEventListener('click', function () {
            videoContainer.pause()
        })
    }
}

videoFunc()

// Navbar 

const navFunc = () => {
    let navbar = document.querySelector('.navbar');
    let toggle = document.querySelector('.toggle');
    let links = document.querySelector('.links');
    window.addEventListener('scroll', function () {
        if (navbar !== null) {
            let navHeight = navbar.getBoundingClientRect().height
            let bodyHeight = window.pageYOffset;
            if (bodyHeight > navHeight) {
                navbar.classList.add('fixed')
            } else {
                navbar.classList.remove('fixed')

            }
        }
    })

    if (toggle !== null) {
        toggle.addEventListener('click', function () {
            links.classList.toggle('show-toggle')
            links.querySelectorAll('a').forEach((item) => {
                item.addEventListener('click', function () {

                    links.classList.remove('show-toggle')
                })

            })
        })
    }
}

navFunc()

// TAB
const tabFunc = () => {
    let content = document.querySelectorAll('.content')
    let btns = document.querySelectorAll('.tab-btn')
    btns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            currTab = document.querySelectorAll('.active');
            currTab.forEach((tab) => {
                tab.classList.remove('active')
                e.target.classList.add('active')
            })
            let data = e.target.getAttribute('data-id');
            e.target.classList.add('active')
            content.forEach((item) => {
                if (item.id === data) {
                    item.classList.add('active')
                } else if (item.id !== data) {
                    item.classList.remove('active')
                    // e.target.classList.remove('active')
                } else {
                    return item
                }
            })
        })
    })
}

tabFunc()

// FOR COUNTDOWN

const loremFunc = () => {
    const text = [
        `Jelly sweet roll jelly beans biscuit pie macaroon chocolate donut. Carrot cake caramels pie sweet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies croissant macaroon dessert. Chocolate cake dragée pie.`,
        `Next level tbh everyday carry, blog copper mug forage kitsch roof party pickled hammock kale chips tofu. Etsy shoreditch 8-bit microdosing, XOXO viral butcher banh mi humblebrag listicle woke bicycle rights brunch before they sold out ramps. Twee shabby chic taiyaki flannel, enamel pin venmo vape four loko. Hexagon kale chips typewriter kitsch 8-bit organic plaid small batch keffiyeh ethical banh mi narwhal echo park cronut.`,
        `Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.`,
        `Cat gets stuck in tree firefighters try to get cat down firefighters get stuck in tree cat eats firefighters' slippers kitty power ignore the squirrels, you'll never catch them anyway for what a cat-ass-trophy! or purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table. Pretend you want to go out but then don't bite off human's toes, yet disappear for four days and return home with an expensive injury; bite the vet so catch eat throw up catch eat throw up bad birds. `,
        `This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel. That makes me feel angry! Anyhoo, your net-suits will allow you to experience Fry's worm infested bowels as if you were actually wriggling through them.
      I just told you! You've killed me! Fry! Quit doing the right thing, you jerk! Michelle, I don't regret this, but I both rue and lament it. Morbo can't understand his teleprompter because he forgot how you say that letter that's shaped like a man wearing a hat.`,
        `Airedale hard cheese mozzarella. Pecorino melted cheese port-salut emmental babybel cheese and wine melted cheese manchego. Everyone loves blue castello everyone loves fromage cheese slices airedale cheddar cream cheese. Bavarian bergkase who moved my cheese halloumi port-salut gouda jarlsberg ricotta rubber cheese. Stinking bishop smelly cheese brie.`,
        `Salvia glossier subway tile, leggings mustache YOLO semiotics chia. Pitchfork tbh af blog church-key meggings vaporware PBR&B master cleanse post-ironic man bun pabst mustache letterpress synth. Snackwave raw denim godard, 3 wolf moon shaman offal kitsch unicorn live-edge selvage schlitz fashion axe vaporware drinking vinegar prism. Shabby chic tacos artisan, chambray chicharrones cardigan leggings typewriter af pop-up williamsburg meditation PBR&B viral. You probably haven't heard of them DIY jean shorts subway tile fashion axe bushwick kitsch tumeric cloud bread vaporware freegan franzen pork belly chicharrones banh mi.`,
        `Man braid celiac synth freegan readymade, pitchfork fam salvia waistcoat lomo bitters gentrify four loko. Pitchfork semiotics post-ironic vegan. Tofu meditation microdosing hashtag semiotics venmo. Flexitarian vape tilde taiyaki. Prism poutine farm-to-table, messenger bag vegan taxidermy tattooed sartorial squid jean shorts fixie selvage trust fund vape.`,
        `Rutters Plate Fleet boom chandler Brethren of the Coast handsomely lookout marooned brigantine knave. Buccaneer gangway jack rum loot spyglass line Jack Tar fore gaff. Gaff topmast scuttle ballast swab draught measured fer yer chains dance the hempen jig Chain Shot yardarm.`,
    ];
    let loremBtn = document.querySelector('.lorem-form .btn');
    let article = document.querySelector('.lorem-text');
    let numInput = document.querySelector('.lorem-form input');
    if (loremBtn !== null) {
        loremBtn.addEventListener('click', function (e) {
            e.preventDefault()
            if (numInput.value === '') {
                let randomNumber = Math.floor(Math.random() * text.length)
                article.innerText = text[randomNumber]
            } else {
                temText = text.slice(0, numInput.value)
                article.innerHTML = temText.map((item) => {
                    return `<p>${item}</p>`
                }).join('')
            }
        })
    }
}

loremFunc()

// GROCERY

const groceryFunc = () => {
    let list = document.querySelector('.grocery-list')
    let submitBtn = document.querySelector('.submit-btn')
    let form = document.querySelector('.grocery-form')
    let groceryInput = document.getElementById('grocery')
    let datas = []
    let editFlag = false
    let editElement

    if (groceryInput !== null) {
        form.addEventListener('submit', function (e) {
            e.preventDefault()
            let value = groceryInput.value;
            if (value !== '' && !editFlag) {
                const id = new Date().getTime().toString();
                let newItem = document.createElement('div');
                let attr = document.createAttribute("data-id");
                attr.value = id;
                newItem.setAttributeNode(attr);
                newItem.classList.add('new-item', 'flex', 'justify-between')

                newItem.innerHTML = `
            <p class="title">${groceryInput.value}</p>
            <div class="btn-container">
                <!-- edit btn -->
                <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`
                list.appendChild(newItem)
                // datas.push(
                //     newItem
                // )
                // datas.map((data) => {
                //     return list.appendChild(data)
                // })
                groceryInput.value = ''
                addToLocalStorage(id, value);
                editToLocalStorage(id, value);

                const deleteBtn = newItem.querySelector(".delete-btn");
                deleteBtn.addEventListener("click", function (e) {
                    list.removeChild(newItem)
                });
                const editBtn = newItem.querySelector(".edit-btn");
                editBtn.addEventListener("click", function (e) {
                    editElement = e.currentTarget.parentElement.previousElementSibling;
                    groceryInput.focus()
                    groceryInput.value = editElement.innerText
                    submitBtn.innerText = 'Edit'
                    editFlag = true
                });
            } else if (value !== '' && editFlag) {
                editElement.innerHTML = value
                submitBtn.innerHTML = 'submit'
            }
        })

        // add to local storage
        function addToLocalStorage(id, value) {
            const grocery = { id, value };
            let items = getLocalStorage();
            items.push(grocery);
            localStorage.setItem("list", JSON.stringify(items));
        }
        // edit to local storage
        function editToLocalStorage(id, value) {
            let data = getLocalStorage()
            data.map((item, index) => {
                if (id === item.id) {
                    item.value = value
                }
                return item
            })
            submitBtn.innerHTML = 'submit'
            localStorage.setItem("list", JSON.stringify(data));
        }

        function getLocalStorage() {
            return localStorage.getItem("list")
                ? JSON.parse(localStorage.getItem("list"))
                : [];
        }

    }
}

groceryFunc();

// Slider

const sliderFunc = () => {
    let container = document.querySelector('.slider-container');
    let sliders = document.querySelectorAll('.slide')
    let prevBtn = document.querySelector('.prevBtn')
    let nextBtn = document.querySelector('.nextBtn')
    let index = 0;

    if (container !== null) {
        sliders.forEach(function (slide, i) {
            slide.style.left = `${i * 100}%`;
        });
        prevBtn.addEventListener('click', () => {
            if (index <= 0) {
                index = sliders.length - 1
            } else {
                index--
            }
            console.log(index)
            carousel()
        })
        nextBtn.addEventListener('click', () => {
            if (index >= sliders.length - 1) {
                index = 0
            } else {
                index++
            }
            carousel()
            console.log(index)
        })

        function carousel() {
            sliders.forEach((slide, i) => {

                slide.style.transform = `translateX(-${index * 100}%)`;

            })
        }
    }
}

sliderFunc()