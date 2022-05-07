/* Ce que j'aimerais afficher :
    - les positions des launchpads et landpads sur une carte
    - le nombre et le type de fusées (rockets) envoyées chaque année
    - filtrer les fusées par launchpads et landpads
    - la distance à laquelle se trouve le roadster par rapport à la Terre et sa date de lancement
    - le nom et le port dans lequel se trouve chaque bâteau
*/

const latestLaunch = document.querySelector("#latest-launch");

fetch("https://api.spacexdata.com/v4/launches/latest")
    .then(latest => latest.json())
    .then(latest2 => {
        latestLaunch.textContent = `Dernier envoi : ${latest2.name}, le ${latest2.date_utc}`;
    })

