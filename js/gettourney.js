const tournamentEndpoint = 'https://search.battlefy.com/tournament/organization/5c6dbd2da605be0329ecf36a/upcoming?page=1&size=9';

fetch(tournamentEndpoint)
    .then((response) => {
        return response.json()
    })
    .then((data) => {

        if (data.total == 0){
            return;
        }

        var tournament;
        for(var i = 0; i < data.tournaments.length; i++){
            if (data.tournaments[i].name.includes("Low Ink")){
                tournament = data.tournaments[i];
            }
        }

        if (tournament == null){
            return;
        }

        const regBox = document.getElementById("reg-box");

        const regBoxTitle = document.getElementById("reg-box-title");
        regBoxTitle.innerText = tournament.name;

        const regBoxInfo = document.getElementById("reg-box-info");

        const dayOneDate = new Date(tournament.startTime);
        const dayTwoDate = new Date(dayOneDate);
        const dateOptionsOne = {month: 'long', day: 'numeric'};
        const dateOptionsTwo = {month: 'long', day: 'numeric', year: 'numeric'};
        dayTwoDate.setHours(dayOneDate.getHours() + 24);
        const datesString = 
            new Intl.DateTimeFormat('en', dateOptionsOne).format(dayOneDate) + " - " +
            new Intl.DateTimeFormat('en', dateOptionsTwo).format(dayTwoDate);

        regBoxInfo.innerText =
            tournament.teamsCount + (tournament.teamsCount == 1 ? " team" : " teams") + " registered.\n" +
            datesString + ".";

        const regBoxLink = document.getElementById("reg-box-link");
        regBoxLink.setAttribute("href", "event.html?id=" + tournament._id);
        
        regBox.style.display = "block";

    });