
const tournamentEndpoint = 'https://search.battlefy.com/tournament/organization/5c6dbd2da605be0329ecf36a/upcoming?page=1&size=9';

fetch(tournamentEndpoint)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        if (data.total == 0){
            window.location.href = "index.html";
        }

        var tournament;
        for(var i = 0; i < data.tournaments.length; i++){
            if (data.tournaments[i].name.includes("Low Ink")){
                tournament = data.tournaments[i];
            }
        }

        if (tournament == null) {
            window.location.href = "index.html";
        }

        const metaTitle = document.getElementById("meta-title");
        const metaDescription = document.getElementById("meta-description");
        const metaUrl = document.getElementById("meta-url");
        const url = "https://battlefy.com/inkling-performance-labs/" + tournament.slug + "/" + tournament._id + "/"

        metaTitle.setAttribute("content", tournament.name);
        metaDescription.setAttribute("content", "Sign up for " + tournament.name + " on Battlefy.");
        metaUrl.setAttribute("content", url);

        window.location.href = url;
    });

