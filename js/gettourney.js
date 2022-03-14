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

        const tourneyId = tournament._id;

        const lowInkEndpoint = "https://dtmwra1jsgyb0.cloudfront.net/tournaments/" + tourneyId;

        fetch(lowInkEndpoint)
            .then((response) => {
                return response.json
            })
            .then((tourneyData) => {

                

            });
    });