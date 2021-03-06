
    // latest launch : name and date

const latestLaunch = document.querySelector("#latest-launch-datas");

fetch("https://api.spacexdata.com/v4/launches/latest")
    .then(response => response.json())
    .then(response => {
        latestLaunch.innerHTML = 
            `<p><b>Nom</b> : ${response.name}</p>
            <p><b>Date</b> : ${response.date_utc}</p>
            <p>Pour voir la vidéo du lancement, cliquez <a class="media-link" target="_blank" title="Lien vers Youtube" href="${response.links.webcast}">ici</a>
             ou utilisez le lien suivant :</p>
             <p class="media-link"><a class="media-link" target="_blank" title="Lien vers Youtube" href="${response.links.webcast}">${response.links.webcast}</a></p>`;
    })


    // leaflet step 3

let map = L.map('map').setView([51.505, -0.09], 13);


    // leaflet step 4 (doesn't work, replaced with an example from stackoverflow)

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


    // custom icon for launchpads markers

let rocketIcon = L.icon({
    iconUrl: 'img/rocket_icon.png',
    iconSize: [20, 50]
});


    // launchpads placed on the map + pop-ups

fetch("https://api.spacexdata.com/v4/launchpads/query", {method: "POST"})
    .then(response => response.json())
    .then(response => {
        response.docs.forEach(doc => {
            let marker = L.marker([doc.latitude, doc.longitude], {icon: rocketIcon}).addTo(map);        
            marker.bindPopup(`<b>Launchpad name : ${doc.name}</b><br/>Lat : ${doc.latitude}<br/>Long : ${doc.longitude}`);
        });
    let firstLaunchpad = response.docs[0];
    map.setView([firstLaunchpad.latitude, firstLaunchpad.longitude], 12);
    })

    
    // landpads placed on the map + pop-ups

fetch("https://api.spacexdata.com/v4/landpads/query", {method: "POST"})
    .then(response => response.json())
    .then(response => {
        response.docs.forEach(doc => {
            let marker = L.marker([doc.latitude, doc.longitude]).addTo(map);
            marker.bindPopup(`<b>Landpad name : ${doc.name}</b><br/>Lat : ${doc.latitude}<br/>Long : ${doc.longitude}`);
        })
    })
            
