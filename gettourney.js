const tournamentEndpoint = 'https://search.battlefy.com/tournament/organization/5c6dbd2da605be0329ecf36a/upcoming?page=1&size=9';

fetch(tournamentEndpoint)
    .then((response) => {
        return response.json()
    })
    .then((data) => {

        if (data.total == 0){
            return;
        }
       
        const regBox = document.getElementById("reg-box");
        const regLink = document.getElementById("reg-link")
        const title = document.getElementById("tourney-title");
        const date = document.getElementById("tourney-datetime");
        const regCount = document.getElementById("tourney-reg-count");
        const regStatus = document.getElementById("toruney-reg-status");

        var tournament;
        for(var i = 0; i < data.tournaments.length; i++){
            if (data.tournaments[i].name.includes("Low Ink")){
                tournament = data.tournaments[i];
            }
        }

        if (tournament == null){
            return;
        }

        title.innerHTML = tournament.name;

        const tourneyDatePrep = new Date(tournament.startTime); 
        const tourneyDate = new Date(tourneyDatePrep);
        tourneyDate.setMinutes(tourneyDatePrep.getMinutes() + 30);
        const dateOptions = {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true};
        const timezone = tourneyDate.toString().match(/\(([A-Za-z\s].*)\)/)[1];
        date.innerHTML = "📅 " + new Intl.DateTimeFormat('en', dateOptions).format(tourneyDate) + " " + timezone;

        const teamCount = tournament.teamsCount;
        regCount.innerHTML = "🎮 " + String(teamCount) + " team" + (teamCount == 1 ? "" : "s");

        regStatus.innerHTML = "📝 " + (tournament.status == "registration-open" ? "Registration open" : "Registration closed");

        regLink.setAttribute("href", 'https://battlefy.com/inkling-performance-labs/' + tournament.slug + '/' + tournament._id + '/info?infoTab=details');

        regBox.style.display = "inline";
    });