const tournamentEndpoint = 'https://search.battlefy.com/tournament/organization/5c6dbd2da605be0329ecf36a/upcoming?page=1&size=9';
const buffer = document.getElementById("buffer");

fetch(tournamentEndpoint)
.then((response) => {
    return response.json();
})
.then((searchResponse) => {

    if (searchResponse.total == 0){
        throw 'no tournaments found';
    }

    var tournament;
    for(var i = 0; i < searchResponse.tournaments.length; i++){
        if (searchResponse.tournaments[i].name.includes("Low Ink")){
            tournament = searchResponse.tournaments[i];
        }
    }

    if (tournament == null){
        throw 'tournament was null';
    }


    const id = tournament._id;

    try{
        fetchTourney(id);
        fetchTeams(id);
        document.getElementById("load").style.display = "block";
    } catch (e) {
        console.error(e);
        document.getElementById("no-load").style.display = "block";
    }
    buffer.style.display = "none";
})
.catch(function(e){
    console.error(e);
    document.getElementById("no-load").style.display = "block";
    buffer.style.display = "none";
});


const tourneyEndPoint = "https://api.battlefy.com/tournaments/";

function fetchTourney(id){
    const endPoint = tourneyEndPoint + id;

    fetch(endPoint)
    .then((tourneyResponse) => {
        return tourneyResponse.json();
    })
    .then((tourneyData) => {

        document.getElementById("page-title").innerText = tourneyData.name;
        document.getElementById("schedule-content").innerHTML = tourneyData.schedule;
        document.getElementById("rules-content").innerHTML = tourneyData.rules.complete;
        

        const dayOneDate = new Date(tourneyData.startTime);
        const dayTwoDate = new Date(dayOneDate);
        const dateOptionsOne = {month: 'long', day: 'numeric'};
        const dateOptionsTwo = {month: 'long', day: 'numeric', year: 'numeric'};
        dayTwoDate.setHours(dayOneDate.getHours() + 24);
        document.getElementById("dates").innerText = 
            new Intl.DateTimeFormat('en', dateOptionsOne).format(dayOneDate) + " - " +
            new Intl.DateTimeFormat('en', dateOptionsTwo).format(dayTwoDate);

        document.getElementById("register-button").setAttribute("onclick", 
            "window.open('https://battlefy.com/inkling-performance-labs/" + tourneyData.slug + "/" + tourneyData._id + "/info?infoTab=schedule', '_blank');");
    })
    .catch(function(){
        throw 'request failed';
    });
}

function fetchTeams(id){
    const teamsEndpoint = `${tourneyEndPoint}${id}/teams`;

    fetch(teamsEndpoint)
    .then((teamsResponse) => {
        return teamsResponse.json();
    })
    .then((teamsData) => {

        const body = document.getElementById("teams-box");
        const modalBody = document.getElementById("real-body");

        document.getElementById("teams-count").innerText = `${teamsData.length} teams`;

        for (var i = 0; i < teamsData.length; i++){

            const modalButtonRoot = document.createElement("div");
            modalButtonRoot.setAttribute("class", "team-modal-button");
            
            const modalButtonImg = document.createElement("img");
            modalButtonImg.setAttribute("onerror", "this.onerror=null; this.src='assets/logo.png';");
            modalButtonImg.setAttribute("src", teamsData[i].persistentTeam.logoUrl);
            modalButtonImg.setAttribute("loading", "lazy");
            modalButtonRoot.appendChild(modalButtonImg);

            const modalButtonName = document.createElement("p");
            modalButtonName.innerText = teamsData[i].name;
            modalButtonRoot.appendChild(modalButtonName);

            body.appendChild(modalButtonRoot);

            const modalRoot = document.createElement("div");
            modalRoot.setAttribute("class", "team-modal");

            const modalContent = document.createElement("div");
            modalContent.setAttribute("class", "team-modal-content");

            const modalClose = document.createElement("div");
            modalClose.setAttribute("class", "team-modal-close");
            modalClose.innerText = "×";
            modalRoot.appendChild(modalClose);

            const modalImage = document.createElement("img");
            modalImage.setAttribute("onerror", "this.onerror=null; this.style.display = 'none';");
            modalImage.setAttribute("src", teamsData[i].persistentTeam.logoUrl);
            modalContent.appendChild(modalImage);

            const modalTeamName = document.createElement("h2");
            modalTeamName.innerText = teamsData[i].name;
            modalContent.appendChild(modalTeamName);

            const modalText = document.createElement("p");
            var modalTextInner = "";
            for (var j = 0; j < teamsData[i].players.length; j++){
                modalTextInner += teamsData[i].players[j].inGameName;
                if (j != teamsData[i].players.length-1){
                    modalTextInner += "\n";
                }
            }
            modalText.innerText = modalTextInner;
            modalContent.appendChild(modalText);

            modalRoot.appendChild(modalContent);
            modalBody.appendChild(modalRoot);


            modalButtonRoot.onclick = function() {
                modalRoot.style.display = "flex";
            }
            
            window.addEventListener("click", function(event){
                if (event.target == modalRoot){
                    modalRoot.style.display = "none";
                }
            });
            modalClose.addEventListener("click", function(){
                modalRoot.style.display = "none";
            })

        }

    })
    .catch(function(){
        throw 'request failed';
    });
}



//make tabs worky work
const tabs = document.getElementById("tabs-wrapper").children;

for (var i = 0; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(){
        for (var i = 0; i < tabs.length; i++){
            tabs[i].classList.remove("active");
        }
        this.classList.add("active");

        const contentGroup = document.getElementById("content-group");
        for (var i = 0; i < contentGroup.children.length; i++){
            contentGroup.children[i].style.display = "none";
        }

        const tabContent = document.getElementById(this.innerText.toLowerCase() + "-content");
        tabContent.style.display = "block";
    });
}