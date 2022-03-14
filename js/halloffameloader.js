fetch("https://iplabs.ink/LowInk-Website/halloffame.json")
    .then(response => {
        return response.json()
    })
    .then((json) => {

        const body = document.getElementById("body");

        for (var i = 0; i < json.hallOfFame.length; i++){
            const rootElement = document.createElement("div");
            rootElement.setAttribute("class","section-box");
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
    })
