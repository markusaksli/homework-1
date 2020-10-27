// Show avatar dropdown menu with loaded data

$(document).ready(function () {
    let trigger = $(".img-profile")[0];
    let dropdown = $(".dropdown");
    $.get('https://private-anon-a3e92b771c-wad20postit.apiary-mock.com/users/1', function (response) {
        $('#avatar-img').attr('src', response.avatar);
        $('#name').html(response.firstname + ' ' + response.lastname);
        $('#email').html(response.email);

        $(".img-profile").click(function () {
            dropdown.slideToggle();
        });

        $(document).on("click", function (event) {
            if (dropdown !== event.target && !dropdown.has(event.target).length && trigger !== event.target && dropdown.is(":visible")) {
                dropdown.slideToggle();
            }
        });
    });
});