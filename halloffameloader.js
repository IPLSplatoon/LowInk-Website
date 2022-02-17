const json = require('./halloffame.json');

const body = document.getElementById("body");

for (var i = 0; i < json.halloffame.length; i++){
    const rootElement = document.createElement("div");
    rootElement.setAttribute("class","section-box");
    body.appendChild(rootElement);

    const nameElement = document.createElement("div");
    nameElement.setAttribute("class", "section-box-title");
    nameElement.innerHTML = "hi!!!!!";
    rootElement.appendChild(nameElement);

    const teamsElement = document.createElement("div");
    teamsElement.innerHTML = "hi!!";
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
    firstName.innerHTML = "Team name";
    firstElement.appendChild(firstName);
    contentElement.appendChild(firstElement);

    const secondElement = document.createElement("div");
    secondElement.setAttribute("class","hof-alpha2nd");
    const secondNum = document.createElement("place");
    secondNum.innerHTML = "2nd";
    secondElement.appendChild(secondNum)
    const secondName = document.createElement("p");
    secondName.innerHTML = "Team name";
    secondElement.appendChild(secondName);
    contentElement.appendChild(secondElement);

    const thirdElement = document.createElement("div");
    thirdElement.setAttribute("class","hof-alpha3rd");
    const thirdNum = document.createElement("place");
    thirdNum.innerHTML = "3rd";
    thirdElement.appendChild(thirdNum)
    const thirdName = document.createElement("p");
    thirdName.innerHTML = "Team name";
    thirdElement.appendChild(thirdName);
    contentElement.appendChild(thirdElement);

    const betaElement = document.createElement("div");
    betaElement.setAttribute("class","hof-beta");
    const betaNum = document.createElement("place");
    betaNum.innerHTML = "Beta";
    betaElement.appendChild(betaNum)
    const betaName = document.createElement("p");
    betaName.innerHTML = "Team name";
    betaElement.appendChild(betaName);
    contentElement.appendChild(betaElement);

    const gammaElement = document.createElement("div");
    gammaElement.setAttribute("class","hof-gamma");
    const gammaNum = document.createElement("place");
    gammaNum.innerHTML = "Gamma";
    gammaElement.appendChild(gammaNum)
    const gammaName = document.createElement("p");
    gammaName.innerHTML = "Team name";
    gammaElement.appendChild(gammaName);
    contentElement.appendChild(gammaElement);
    
}