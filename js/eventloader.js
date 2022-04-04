//info https://api.battlefy.com/tournaments/
//teams https://api.battlefy.com/tournaments//teams

const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get('id');

if (param == null){
    window.location.href = "index.html";
}

const tourneyEndPoint = "https://api.battlefy.com/tournaments/" + param;

fetch(tourneyEndPoint)
    .then((tourneyResponse) => {
        return tourneyResponse.json();
    })
    .then((tourneyData) => {
        if (!tourneyData.name.includes("Low Ink")){
            window.location.href = "index.html";
        }


        document.getElementById("tourney-title").innerText = tourneyData.name;
        document.getElementById("tourney-schedule").innerHTML = tourneyData.schedule;

        const dayOneDate = new Date(tourneyData.startTime);
        const dayTwoDate = new Date(dayOneDate);
        const dateOptionsOne = {month: 'long', day: 'numeric'};
        const dateOptionsTwo = {month: 'long', day: 'numeric', year: 'numeric'};
        dayTwoDate.setHours(dayOneDate.getHours() + 24);
        document.getElementById("tourney-date").innerText = 
            new Intl.DateTimeFormat('en', dateOptionsOne).format(dayOneDate) + " - " +
            new Intl.DateTimeFormat('en', dateOptionsTwo).format(dayTwoDate);

        document.getElementById("register-button").setAttribute("href", 
            "https://battlefy.com/inkling-performance-labs/" + tourneyData.slug + "/" + tourneyData._id + "/");
    })
    .catch(function(){
        window.location.href = "index.html";
    });


const teamsEndpoint = "https://api.battlefy.com/tournaments/" + param + "/teams";

fetch(teamsEndpoint)
    .then((teamsResponse) => {
        return teamsResponse.json();
    })
    .then((teamsData) => {

        const body = document.getElementById("teams-body");

        document.getElementById("teams-count").innerText = teamsData.length + " teams";

        for (var i = 0; i < teamsData.length; i++){

            const modalButtonRoot = document.createElement("div");
            modalButtonRoot.setAttribute("class", "team-modal-button");
            
            const modalButtonImg = document.createElement("img");
            modalButtonImg.setAttribute("onerror", "this.onerror=null; this.src='assets/logo.png';");
            modalButtonImg.setAttribute("src", teamsData[i].persistentTeam.logoUrl);
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
            body.appendChild(modalRoot);


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
        window.location.href = "index.html";
    });