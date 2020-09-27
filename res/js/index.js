import {getPosts} from './postApi.js'

window.addEventListener('load', () => {
    console.log('Loading posts from API...')
    loadPosts().then(() => console.log('Posts loaded'))
});

async function loadPosts() {
    const main = document.querySelector('main');
    const re = /(?:\.([^.]+))?$/;

    getPosts().then(posts => {
        let localId = 0;
        const profileImg = function () {
            let img = document.createElement('img');
            img.src = 'res/media/profile.png'
            img.className = 'img-profile'
            return img
        }

        const likeButton = function () {
            let likeDiv = document.createElement('div');
            likeDiv.className = 'like'

            let buttonDiv = document.createElement('div')
            buttonDiv.className = 'like-button'

            let button = document.createElement('input');
            button.type = 'button';
            button.id = `like-button-${localId}`
            button.onclick = function () {
                let id = this.id.split('-')[2]
                let el = document.getElementById(`like-counter-${id}`)
                if (this.id.split('-')[1] === 'disabled') {
                    el.innerHTML = (parseInt(el.innerHTML) - 1).toString()

                    this.parentNode.animate([{backgroundColor: '#1b9fd8'}, {backgroundColor: '#ff3434'}, {backgroundColor: '#e4eff8'}], 300)
                    this.parentNode.style.backgroundColor = '#e4eff8'

                    this.animate([{filter: 'none'}, {filter: 'invert()'}], 200)
                    this.style.filter = 'invert()'

                    el.animate([
                        {color: '#ff3434', fontSize: '16px', fontWeight: '700'},
                        {color: '#ff3434', fontSize: '20px'},
                        {color: '#000', fontSize: '14px', fontWeight: '400'},
                    ], 300)
                    el.style.fontSize = '14px'
                    el.style.color = '#000'
                    el.style.fontWeight = '400'

                    this.blur()

                    this.id = `like-button-${id}`
                } else {
                    el.innerHTML = (parseInt(el.innerHTML) + 1).toString()

                    this.parentNode.animate([{backgroundColor: '#e4eff8'}, {backgroundColor: 'dodgerblue'}], 200)
                    this.parentNode.style.backgroundColor = 'dodgerblue'

                    this.animate([{filter: 'invert()'}, {filter: 'none'}], 200)
                    this.style.filter = 'none'

                    el.animate([
                        {color: '#000', fontSize: '14px'},
                        {color: 'dodgerblue', fontSize: '20px', fontWeight: '700'},
                        {color: 'dodgerblue', fontSize: '16px', fontWeight: '700'},
                    ], 200)
                    el.style.fontSize = '16px'
                    el.style.color = 'dodgerblue'
                    el.style.fontWeight = '700'

                    this.blur()

                    this.id = `like-disabled-${id}`
                }
            }
            buttonDiv.appendChild(button);

            likeDiv.appendChild(buttonDiv)

            let likeCounter = document.createElement('div')
            likeCounter.className = 'like-counter'
            likeCounter.id = `like-counter-${localId++}`
            likeCounter.append(Math.floor(Math.random() * Math.floor(20000)).toString())
            likeDiv.appendChild(likeCounter)

            return likeDiv
        }
        //This loop creates the content
        for (let post of posts) {
            let postElement = document.createElement('div');
            postElement.className = 'post';

            let topBar = document.createElement('div')
            topBar.className = 'post-top';
            topBar.appendChild(profileImg())
            let d = post.timestamp
            const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d);
            const mo = new Intl.DateTimeFormat('en', {month: 'short'}).format(d);
            const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d);
            let timeText = document.createElement('div')
            timeText.append(`${mo}, ${da}, ${ye} ${d.getHours()}:${d.getMinutes().toString().length === 1 ? `0${d.getMinutes()}` : d.getMinutes()}`)
            topBar.appendChild(timeText)
            postElement.appendChild(topBar)

            if (post.media) {
                let execElement = re.exec(post.media)[1];
                if (execElement === 'mp4') {
                    let media = document.createElement('video')

                    let vidSrc = document.createElement("source");
                    vidSrc.type = 'video/mp4';
                    vidSrc.src = post.media

                    media.appendChild(vidSrc);
                    media.append('Your browser does not support HTML video.')
                    media.controls = true

                    media.className = 'media'
                    postElement.appendChild(media)
                } else if (execElement === 'png' || execElement === 'jpg' || execElement === 'jpeg' || execElement === 'gif') {
                    let media = document.createElement('img');

                    media.src = post.media

                    media.className = 'media'
                    postElement.appendChild(media)
                }
            }

            let text = document.createElement('p')
            text.append(post.text)
            postElement.appendChild(text)

            postElement.appendChild(likeButton())

            main.appendChild(postElement)
        }
    })
}
