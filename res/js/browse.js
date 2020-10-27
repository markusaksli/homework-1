$(document).ready(function () {
    $.get('https://private-anon-55b9e17f14-wad20postit.apiary-mock.com/profiles', function (response) {

        for (let post of response) {

            let div = $('<div class="profile-container">')
            let img = $('<img class="profile-avatar">').attr('src', post.avatar)
            let fullname = $('<p>').text(`${post.firstname} ${post.lastname}`)


            let button = $('<button class="follow-button follow">').text("Follow")
            div.append(img)
            div.append(fullname)
            div.append(button)
            $('main').append(div);
        }
        $('.follow').click(function () {
            let $this = $(this);
            if ($this.hasClass('follow')) {
                $this.removeClass("follow").addClass("followed")
                $this.text('Followed');
            } else {
                $this.removeClass("followed").addClass("follow")
                $this.text('Follow');
            }
        });
    })
});
