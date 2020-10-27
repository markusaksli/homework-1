$(document).ready(function () {
    let localId = 0;
    let onclick = function () {
        let id = this.id.split('-')[2]
        let counter = document.getElementById(`like-counter-${id}`)
        if (this.id.split('-')[1] === 'disabled') {
            this.parentNode.animate([{backgroundColor: '#1b9fd8'}, {backgroundColor: '#ff3434'}, {backgroundColor: '#e4eff8'}], 300)
            this.parentNode.style.backgroundColor = '#e4eff8'

            this.animate([{filter: 'none'}, {filter: 'invert()'}], 200)
            this.style.filter = 'invert()'

            counter.animate([
                {color: '#ff3434', fontSize: '16px', fontWeight: '700'},
                {color: '#ff3434', fontSize: '20px'},
                {color: '#000', fontSize: '14px', fontWeight: '400'},
            ], 300)
            counter.style.fontSize = '14px'
            counter.style.color = '#000'
            counter.style.fontWeight = '400'

            this.blur()

            this.id = `like-button-${id}`
        } else {
            this.parentNode.animate([{backgroundColor: '#e4eff8'}, {backgroundColor: 'dodgerblue'}], 200)
            this.parentNode.style.backgroundColor = 'dodgerblue'

            this.animate([{filter: 'invert()'}, {filter: 'none'}], 200)
            this.style.filter = 'none'

            counter.animate([
                {color: '#000', fontSize: '14px'},
                {color: 'dodgerblue', fontSize: '20px', fontWeight: '700'},
                {color: 'dodgerblue', fontSize: '16px', fontWeight: '700'},
            ], 200)
            counter.style.fontSize = '16px'
            counter.style.color = 'dodgerblue'
            counter.style.fontWeight = '700'

            this.blur()

            this.id = `like-disabled-${id}`
        }
    }
    $.get('https://private-anon-01a41ea7a6-wad20postit.apiary-mock.com/posts', function (response) {
        for (let post of response) {
            let media = '';
            if (post.media != null) {
                if (post.media.type === 'image') {
                    media = `
                        <div class="media">
                            <img src="${post.media.url}" alt="Post image">
                        </div>`
                } else if (post.media.type === 'video') {
                    media = `
                        <video class="media" controls>
                            <source src="${post.media.url}">
                            Your browser does not support HTML video.
                        </video>`
                }
            }
            let text = '';
            if (post.text != null) {
                if (post.text.replace(/\s/g, '').length) {
                    text = `<p>${post.text}</p>`
                }
            }
            $('main').append(`
            <div class="post">
                <div class="post-top">
                    <img class="img-profile" src="${post.author.avatar}" alt="Post author"><div class="profile-name">${post.author.firstname} ${post.author.lastname}</div><div>${post.createTime}</div>
                </div>
                ${media}
                ${text}
                <div class="like">        
                    <div class="like-button">
                        <input type="button" class="like-button-input" id="like-button-${localId}">
                    </div>
                    <div class="like-counter" id="like-counter-${localId++}">${post.likes}</div>
                </div>
            </div>`);
        }
        $('.like-button-input').click(onclick);
    });
});