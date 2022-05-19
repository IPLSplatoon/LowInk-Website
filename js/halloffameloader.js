fetch("https://iplabs.ink/LowInk-Website/halloffame.json")
    .then(response => {
        return response.json()
    })
    .then((json) => {

        const body = document.getElementById("body");

        for (var i = 0; i < json.hallOfFame.length; i++){
            const rootElement = document.createElement("div");
            rootElement.setAttribute("class","section-box");
            rootElement.setAttribute("style", `animation-delay: ${Math.min(i * .1, 1) + .2}s;`);

            if (json.hallOfFame[i].id != undefined){
                rootElement.setAttribute("onclick", `getStandings("${json.hallOfFame[i].id}")`);
            } else {
                rootElement.style.cursor = "not-allowed";
                rootElement.onclick = function() {
                    alert("Detailed results are not available for this event.")
                };
            }

            body.appendChild(rootElement);
        
            const nameElement = document.createElement("div");
            nameElement.setAttribute("class", "section-box-title");
            nameElement.innerHTML = json.hallOfFame[i].name;
            rootElement.appendChild(nameElement);
        
            const teamsElement = document.createElement("div");
            const teamCount = json.hallOfFame[i].teams;
            teamsElement.innerHTML = teamCount + " total teams.";
            rootElement.appendChild(teamsElement);
        
            const contentElement = document.createElement("div");
            contentElement.setAttribute("class","section-box-content");
            rootElement.appendChild(contentElement);
            
            const firstElement = document.createElement("div");
            firstElement.setAttribute("class","hof-alpha1st");
            const firstNum = document.createElement("place");
            firstNum.innerHTML = "1st";
            firstElement.appendChild(firstNum)
            const firstName = document.createElement("p");
            firstName.innerHTML = json.hallOfFame[i].first;
            firstElement.appendChild(firstName);
            contentElement.appendChild(firstElement);
        
            const secondElement = document.createElement("div");
            secondElement.setAttribute("class","hof-alpha2nd");
            const secondNum = document.createElement("place");
            secondNum.innerHTML = "2nd";
            secondElement.appendChild(secondNum)
            const secondName = document.createElement("p");
            secondName.innerHTML = json.hallOfFame[i].second;
            secondElement.appendChild(secondName);
            contentElement.appendChild(secondElement);
        
            const thirdElement = document.createElement("div");
            thirdElement.setAttribute("class","hof-alpha3rd");
            const thirdNum = document.createElement("place");
            thirdNum.innerHTML = "3rd";
            thirdElement.appendChild(thirdNum)
            const thirdName = document.createElement("p");
            thirdName.innerHTML = json.hallOfFame[i].third;
            thirdElement.appendChild(thirdName);
            contentElement.appendChild(thirdElement);
        
            if (typeof json.hallOfFame[i].beta != "undefined") {
                const betaElement = document.createElement("div");
                betaElement.setAttribute("class","hof-beta");
                const betaNum = document.createElement("place");
                betaNum.innerHTML = "Beta";
                betaElement.appendChild(betaNum)
                const betaName = document.createElement("p");
                betaName.innerHTML = json.hallOfFame[i].beta;
                betaElement.appendChild(betaName);
                contentElement.appendChild(betaElement);
            }
        
            if (typeof json.hallOfFame[i].gamma != "undefined") {
                const gammaElement = document.createElement("div");
                gammaElement.setAttribute("class","hof-gamma");
                const gammaNum = document.createElement("place");
                gammaNum.innerHTML = "Gamma";
                gammaElement.appendChild(gammaNum)
                const gammaName = document.createElement("p");
                gammaName.innerHTML = json.hallOfFame[i].gamma;
                gammaElement.appendChild(gammaName);
                contentElement.appendChild(gammaElement);
            }
            
        }

        document.getElementById("status").style.display = "none";
        
    })
    .catch(function(error){
        console.log(error);
        document.getElementById("status").innerHTML = "There was an error loading the hall of fame.";
    });


//https://api.battlefy.com/stages/   /(standings)
function getStandings(id){    
    const body = document.getElementById("real-body");

    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("class", "hof-modal-bg");

    const modalClose = document.createElement("div");
    modalClose.setAttribute("class", "hof-modal-close");
    modalClose.innerText = "×";
    modalRoot.appendChild(modalClose);
    
    const modalContent = document.createElement("div");
    modalContent.setAttribute("class", "hof-modal-content");
    modalContent.style.display = "none";

    const loadingText = document.createElement("h1");
    loadingText.style = "margin: auto";
    loadingText.innerText = "Loading...";
    modalRoot.appendChild(loadingText);

    modalRoot.appendChild(modalContent);
    body.appendChild(modalRoot);

    window.addEventListener("click", function(event){
        if (event.target == modalRoot){
            modalRoot.remove();
        }
    });
    modalClose.addEventListener("click", function(){
        modalRoot.remove();
    })

    fetch("https://api.battlefy.com/tournaments/" + id)
        .then(tournamentResponse =>{
            return tournamentResponse.json();
        })
        .then((tournamentJson) => {

            for (var i = 0; i < tournamentJson.stageIDs.length; i++){

                const stageContainer = document.createElement("div");
                stageContainer.setAttribute("class", "hof-stage-container");

                const stagesUrl = `https://api.battlefy.com/stages/${tournamentJson.stageIDs[i]}/`;
                const standingsUrl = `https://api.battlefy.com/stages/${tournamentJson.stageIDs[i]}/latest-round-standings`;

                fetch(stagesUrl)
                    .then(stagesResponse =>{
                        return stagesResponse.json();
                    })
                    .then((stagesJson) => {
                        const stageTitle = document.createElement("h2");
                        stageTitle.id = stagesJson.name;
                        stageTitle.innerText = stagesJson.name;
                        stageContainer.appendChild(stageTitle);
                    })
                    .then( function() {

                        fetch(standingsUrl)
                            .then(standingsResponse =>{
                                return standingsResponse.json();
                            })
                            .then((standingsJson) => {
                                const standingsSorted = standingsJson.sort(function(a,b){
                                    return a.place - b.place;
                                });

                                var lighten = false;

                                for (var j = 0; j < standingsSorted.length; j++){
                                    const teamContainer = document.createElement("div");
                                    teamContainer.setAttribute("class", "hof-modal-team-container");

                                    if(lighten){
                                        teamContainer.style = "background-color: #FFFFFF10";
                                    }
                                    lighten = !lighten;

                                    const place = document.createElement("div");
                                    place.setAttribute("class", "hof-modal-team-place");
                                    if (standingsSorted[j].place != undefined){
                                        place.innerText = standingsSorted[j].place + getPlaceEnding(standingsSorted[j].place);
                                    }
                                    else {
                                        place.innerText = j+1 + getPlaceEnding(j+1);
                                    }
                                    teamContainer.appendChild(place);

                                    const teamName =  document.createElement("div");
                                    teamName.setAttribute("class", "hof-modal-team-name");
                                    if (standingsSorted[j].team.name.length > 43){
                                        teamName.innerText = standingsSorted[j].team.name.substring(0,40) + "…";
                                    } else {
                                        teamName.innerText = standingsSorted[j].team.name;
                                    }
                                    teamContainer.appendChild(teamName);

                                    const numWins = standingsSorted[j].wins;
                                    const numLosses = standingsSorted[j].losses;
                                    if (numWins != undefined && numLosses != undefined){
                                        const wins = document.createElement("div");
                                        wins.setAttribute("class", "hof-modal-team-result");
                                        wins.innerText = numWins + (numWins == 1 ? " win" : " wins");
                                        teamContainer.appendChild(wins);

                                        const losses = document.createElement("div");
                                        losses.setAttribute("class", "hof-modal-team-result");
                                        losses.innerText = numLosses + (numLosses == 1 ? " loss" : " losses");
                                        teamContainer.appendChild(losses);
                                    }   

                                    stageContainer.appendChild(teamContainer);
                                }

                                loadingText.remove();
                                modalContent.style.display = "block";

                            });
                    }
                );
                modalContent.appendChild(stageContainer);
            }
        });
}

function getPlaceEnding(num){
    switch(num){
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}