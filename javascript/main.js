// creating an object for the simplicity 

// 1 grab input from html page componet input

var inputValue = document.querySelector(".js-search");
//  console.log(inputValue.value);


inputValue.addEventListener('keyup', function(event) {

    console.log(event.keyCode)

    if (event.keyCode === 13) {

        console.log(inputValue.value);

        SoundCloudAPI.getTrack(inputValue.value);

    }

})

var searchIcon = document.querySelector(".icon");




var SoundCloudAPI = {};
//we can also define function inside an object also         

SoundCloudAPI.init = function() {

    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });

}

SoundCloudAPI.init();

// find all sounds of buskers licensed under 'creative commons share alike'
SoundCloudAPI.getTrack = function(inputValue) {

    SC.get('/tracks', {
        q: inputValue,
        license: 'cc-by-sa'
    }).then(function(tracks) {

        // console.log(tracks);
        var searchResult = document.querySelector('.js-search-results');
        searchResult.innerHTML = "";
        SoundCloudAPI.card(tracks, searchResult);

    });

}

// SoundCloudAPI.getTrack(inputValue.value);


SoundCloudAPI.card = function(tracks, searchResult) {

    // since we need this function to run for each track than we can use foreach

    tracks.forEach(function(track) {


        // console.log(track)

        // card div 

        var card = document.createElement('div');
        card.classList.add('card');

        // image
        var imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        var image_img = document.createElement('img');
        image_img.classList.add('image_img');
        image_img.src = track.artwork_url || 'http://lorempixel.com/200/200/abstract/';

        console.log("url is " + track.artwork_url);

        imageDiv.appendChild(image_img);

        // content
        var content = document.createElement('div');
        content.classList.add('content');

        var header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';

        content.appendChild(header);

        searchResult.appendChild(content);

        // button
        var button = document.createElement('div');
        button.setAttribute('data-id', track.id) /////THIS COMES DURING PLAY() !!
        button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

        var icon = document.createElement('i');
        icon.classList.add('add', 'icon');

        var buttonText = document.createElement('span');
        buttonText.innerHTML = 'Add to playlist';

        button.appendChild(icon);
        button.appendChild(buttonText);

        button.addEventListener('click', function() {

            SoundCloudAPI.embed(track.uri);
            //SoundCloudAPI.getWidget(track.uri);

        });

        // card
        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(button);

        searchResult.appendChild(card);


        // var jscard = document.querySelector(".js-search-results");
        // jscard.appendChild(card);


    });


}

// add to playlist
// grab sidebar div

var sideBar = document.querySelector('.js-playlist');

// embed object

SoundCloudAPI.embed = function(trackUrl) {

    var sideBar = document.querySelector('.js-playlist');

    SC.oEmbed(trackUrl, {
        auto_play: true
    }).then(function(embed) {
        // console.log('oEmbed response:', embed);
        // console.log(embed.html);
        // sideBar.innerHTML = embed.html;
        // create a box for the music player

        var box = document.createElement("div");
        // box.className.add("box");
        box.innerHTML = embed.html;

        // now insert box before the first element of the tree
        // syntax -> obj.insertBefore(objbox,refrence of first child);

        sideBar.insertBefore(box, sideBar.firstChild);
        localStorage.setItem("playlist", sideBar.innerHTML);
    });
}


// After reloading data is gone but we can store data into local storage of browser cache 

var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem('playlist');
// note inner html return what ever inside a sidebar 

