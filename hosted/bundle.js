"use strict";

var handleCreateCharacter = function handleCreateCharacter(e) {
    e.preventDefault();

    $("#characterMessage").animate({ width: 'hide' }, 350);

    if ($("#characterName").val() == '' || $("#characterLevel").val() <= '0' || $("#class") == 'pickClass' || $("#race") == 'pickRace' || $("#maxHealth").val() <= '0') {
        handleError("RAWR! All fields are required");
        return false;
    }

    console.log("Pre-Post");

    sendAjax('POST', $("#createCharacterForm").attr("action"), $("#createCharacterForm").serialize(), function () {
        console.log("Before token");
        getToken(setup);
    });

    // Maybe should be in the callback but I have to find out what's wrong with its CSRF first
    //getToken(setup);

    return false;
};

var CreateCharacterForm = function CreateCharacterForm(props) {
    return React.createElement(
        "div",
        { id: "container" },
        React.createElement(
            "form",
            { id: "createCharacterForm",
                onSubmit: handleCreateCharacter,
                name: "characterForm",
                action: "/makeCharacter",
                method: "POST",
                className: "characterForm"
            },
            React.createElement(
                "label",
                { htmlFor: "characterName" },
                "Name: "
            ),
            React.createElement("input", { id: "characterName", type: "text", name: "name", placeholder: "Character Name" }),
            React.createElement(
                "label",
                { htmlFor: "characterLevel" },
                "Level: "
            ),
            React.createElement("input", { id: "characterLevel", type: "number", name: "level", placeholder: "Character Level", defaultValue: "0" }),
            React.createElement(
                "label",
                { htmlFor: "class" },
                "Class: "
            ),
            React.createElement(
                "select",
                { id: "class", name: "class", placeholder: "Class" },
                React.createElement(
                    "option",
                    { value: "pickClass" },
                    "Pick Your Class"
                ),
                React.createElement(
                    "option",
                    { value: "fighter" },
                    "Fighter"
                ),
                React.createElement(
                    "option",
                    { value: "rogue" },
                    "Rogue"
                ),
                React.createElement(
                    "option",
                    { value: "barbarian" },
                    "Barbarian"
                ),
                React.createElement(
                    "option",
                    { value: "bard" },
                    "Bard"
                ),
                React.createElement(
                    "option",
                    { value: "cleric" },
                    "Cleric"
                ),
                React.createElement(
                    "option",
                    { value: "druid" },
                    "Druid"
                ),
                React.createElement(
                    "option",
                    { value: "monk" },
                    "Monk"
                ),
                React.createElement(
                    "option",
                    { value: "paladin" },
                    "Paladin"
                ),
                React.createElement(
                    "option",
                    { value: "ranger" },
                    "Ranger"
                ),
                React.createElement(
                    "option",
                    { value: "sorcerer" },
                    "Sorcerer"
                ),
                React.createElement(
                    "option",
                    { value: "warlock" },
                    "Warlock"
                ),
                React.createElement(
                    "option",
                    { value: "wizard" },
                    "Wizard"
                ),
                React.createElement(
                    "option",
                    { value: "gunslinger" },
                    "Gunslinger"
                ),
                React.createElement(
                    "option",
                    { value: "soldier" },
                    "Soldier"
                ),
                React.createElement(
                    "option",
                    { value: "biologist" },
                    "Biologist"
                )
            ),
            React.createElement(
                "label",
                { htmlFor: "race" },
                "Race: "
            ),
            React.createElement(
                "select",
                { id: "race", name: "race", placeholder: "Race" },
                React.createElement(
                    "option",
                    { value: "pickRace" },
                    "Pick Your Race"
                ),
                React.createElement(
                    "option",
                    { value: "dragonborn" },
                    "Dragonborn"
                ),
                React.createElement(
                    "option",
                    { value: "dwarf" },
                    "Dwarf"
                ),
                React.createElement(
                    "option",
                    { value: "elf" },
                    "Elf"
                ),
                React.createElement(
                    "option",
                    { value: "gnome" },
                    "Gnome"
                ),
                React.createElement(
                    "option",
                    { value: "halfElf" },
                    "Half-Elf"
                ),
                React.createElement(
                    "option",
                    { value: "halfling" },
                    "Halfling"
                ),
                React.createElement(
                    "option",
                    { value: "halfOrc" },
                    "Half-Orc"
                ),
                React.createElement(
                    "option",
                    { value: "human" },
                    "Human"
                ),
                React.createElement(
                    "option",
                    { value: "tiefling" },
                    "Tiefling"
                )
            ),
            React.createElement(
                "label",
                { htmlFor: "maxHealth" },
                "Max Health: "
            ),
            React.createElement("input", { id: "maxHealth", type: "number", name: "maxHealth", placeholder: "Max Health", defaultValue: "0" }),
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement("input", { className: "makeCharacterSubmit", type: "submit", value: "Make Character" })
        )
    );
};

/*const CreateCharacterButton = (props) => {
    return (
        <form id="characterCreatorForm"
        onSubmit={handleCharacter}
        name="characterCreatorForm"
        action="/characterCreator"
        method="GET"
        className="characterCreatorForm"
        >
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="characterCreatorSubmit" type="submit" value="Create Character" />
        </form>
    );
};

const loadCharactersFromServer = () => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <CharacterList characters={data.characters} />, document.querySelector("#charactersList")
        );
    });
};*/

var characterCreatorSetup = function characterCreatorSetup(csrf) {

    ReactDOM.render(React.createElement(CreateCharacterForm, { characters: [], csrf: csrf }), document.querySelector("#characters"));

    /*sendAjax('GET', '/getAccountType', null, (data) => {
        /*if(data.accountType == 'player'){
            console.log('Test');
            console.log('Account Type: ' + data.accountType);
            //ReactDOM.render seems to overwrite the previous calls
            const containerDiv = document.getElementById("characters");
            const charactersList = document.createElement("div");
            //const id = document.createAttribute("div");
            //id.value = "charactersList";
            containerDiv.append(charactersList);
            charactersList.setAttribute("id", "charactersList");
            ReactDOM.render(
                <CharacterList characters={[]} />, document.querySelector("#charactersList")
            );
            
            const characterCreateButton = document.createElement("div");
            containerDiv.append(characterCreateButton);
            characterCreateButton.setAttribute("id", "characterCreateButton");
            ReactDOM.render(
                <CreateCharacterButton csrf={csrf} />, document.querySelector("#characterCreateButton")
            );
            loadCharactersFromServer();
        }
    });*/
};

/*const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        //console.log(result);
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});*/
"use strict";

var handleGame = function handleGame(e) {
    e.preventDefault();

    /*$("#gameMessage").animate({width:'hide'},350);
      if($("#gameName").val() == '' || $("#gameAge").val() == ''){
        handleError("RAWR! All fields are required");
        return false;
    }
      sendAjax('POST', $("#gameForm").attr("action"), $("#gameForm").serialize(), function(){
        loadGamesFromServer();
    });*/

    return false;
};

/*const GameForm = (props) => {
    return (
        <form id="gameForm"
        onSubmit={handleGame}
        name="gameForm"
        action="/maker"
        method="POST"
        className="gameForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="gameName" type="text" name="name" placeholder="Game Name"/>
            <label htmlFor="age">Age: </label>
            <input id="gameAge" type="text" name="age" placeholder="Game Age"/>
            <label htmlFor="Height">Height: </label>
            <input id="gameHeight" type="text" name="height" placeholder="Game Height"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeGameSubmit" type="submit" value="Make Game" />
        </form>
    );
};

const GameForm = (props) => {
    return (
        <form id="gameForm"
        onSubmit={handleGame}
        name="gameForm"
        action="/game"
        method="POST"
        className="gameForm"
        >
            <label htmlFor="gameName">Game Name: </label>
            <input id="gameName" type="text" name="gameName" placeholder="Game Name"/>
            <label htmlFor="gamePassword">Game Password: </label>
            <input id="gamePassword" type="text" name="gamePassword" placeholder="Game Password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeGameSubmit" type="submit" value="Make Game" />
        </form>
    );
};*/

var PlayerList = function PlayerList(props) {
    if (props.players.length === 0) {
        return React.createElement(
            "div",
            { className: "playerList" },
            React.createElement(
                "h3",
                { className: "emptyPlayerList" },
                "No Players In Game"
            )
        );
    }

    var playerNodes = props.players.map(function (player) {
        return React.createElement(
            "div",
            { key: player._id, className: "player" },
            React.createElement(
                "h3",
                { className: "playerName" },
                " Name: ",
                player.name,
                " "
            ),
            React.createElement(
                "h3",
                { className: "playerCharacterName" },
                " Character: ",
                player.characterName,
                " "
            ),
            React.createElement(
                "h3",
                { className: "playerCharacterLevel" },
                " Level: ",
                player.characterLevel,
                " "
            )
        );
    });

    return React.createElement(
        "div",
        { className: "playerList" },
        playerNodes
    );
};

/*
const addPlayersToGame = () => {
    // Have joining players make a POST request to add them to the game

    sendAjax('GET', '/getGames', null, (data) => {
        ReactDOM.render(
            <PlayerList games={data.games} />, document.querySelector("#games")
        );
    });
};
*/

/*const getPlayers = function(props){

}*/

var setupGame = function setupGame(csrf) {
    ReactDOM.render(React.createElement(GameForm, { csrf: csrf }), document.querySelector("#makeGame"));

    ReactDOM.render(React.createElement(GameForm, { csrf: csrf }), document.querySelector("#makeGame"));

    ReactDOM.render(React.createElement(GameList, { games: [] }), document.querySelector("#games"));

    loadGamesFromServer();
};

/*const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});*/
"use strict";

var handleCharacterCreator = function handleCharacterCreator(e) {
    e.preventDefault();

    getToken(characterCreatorSetup);

    /*$("#characterMessage").animate({width:'hide'},350);
      if($("#characterName").val() == '' || $("#characterAge").val() == '' || $("#characterAge".val() == '')){
        handleError("RAWR! All fields are required");
        return false;
    }
      sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function(){
        loadCharactersFromServer();
    });*/

    return false;
};

var handleCreateGame = function handleCreateGame(e) {
    e.preventDefault();

    $("#characterMessage").animate({ width: 'hide' }, 350);

    if ($("#gameName").val() == '') {
        handleError("Name required");
        return false;
    }

    sendAjax('POST', $("#gameCreatorForm").attr("action"), $("#gameCreatorForm").serialize(), function () {
        loadGamesFromServer();
    });

    return false;
};

var startGame = function startGame(e) {
    e.preventDefault();
    return false;
};

/*
const setCurrentCharacter = (e) => {
    e.preventDefault();

    sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function(){
        loadCharactersFromServer();
    });

    return false;
};
*/

/*const CharacterForm = (props) => {
    return (
        <form id="characterForm"
        onSubmit={handleCharacter}
        name="characterForm"
        action="/player"
        method="POST"
        className="characterForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="characterName" type="text" name="name" placeholder="Character Name"/>
            <label htmlFor="age">Age: </label>
            <input id="characterAge" type="text" name="age" placeholder="Character Age"/>
            <label htmlFor="Height">Height: </label>
            <input id="characterHeight" type="text" name="height" placeholder="Character Height"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeCharacterSubmit" type="submit" value="Make Character" />
        </form>
    );
};*/

var GameForm = function GameForm(props) {
    return React.createElement(
        "form",
        { id: "gameForm",
            onSubmit: handleGame,
            name: "gameForm",
            action: "/game",
            method: "POST",
            className: "gameForm"
        },
        React.createElement(
            "label",
            { htmlFor: "gameName" },
            "Game Name: "
        ),
        React.createElement("input", { id: "gameName", type: "text", name: "gameName", placeholder: "Game Name" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeGameSubmit", type: "submit", value: "Make Game" })
    );
};

var CharacterWindow = function CharacterWindow(props) {
    console.log(props.characters.length);
    if (props.characters.length === 0) {
        return React.createElement(
            "div",
            { id: "container" },
            React.createElement(
                "div",
                { className: "character" },
                React.createElement(
                    "h3",
                    { className: "emptyCharacter" },
                    "No Characters yet"
                )
            ),
            React.createElement(
                "form",
                { id: "characterCreatorForm",
                    onSubmit: handleCharacterCreator,
                    name: "characterCreatorForm",
                    action: "/characterCreator",
                    method: "GET",
                    className: "characterCreatorForm"
                },
                React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
                React.createElement("input", { className: "characterCreatorSubmit", type: "submit", value: "Create Character" })
            )
        );
    }

    var characterNodes = props.characters.map(function (character) {
        return React.createElement(
            "div",
            { id: character._id, key: character._id, className: "character" },
            React.createElement(
                "h3",
                { className: "characterName" },
                " Name: ",
                character.name,
                " "
            ),
            React.createElement(
                "h3",
                { className: "characterLevel" },
                " Level: ",
                character.level,
                " "
            ),
            React.createElement(
                "h3",
                { className: "characterClass" },
                " Class: ",
                character.class,
                " "
            ),
            React.createElement(
                "h3",
                { className: "characterRace" },
                " Race: ",
                character.race,
                " "
            ),
            React.createElement(
                "h3",
                { className: "characterMaxHealth" },
                " MaxHealth: ",
                character.maxHealth,
                " "
            )
        );
    });

    /*<form id="setCharacterForm"
        onChecked={setCurrentCharacter}
        name="setCharacterForm"
        action="/setCurrentCharacter"
        method="POST"
        className="setCharacterForm">
            <label htmlFor="isCurrent">Current Character</label>
            <input id="isCurrent" type="checkbox" name="isCurrent" placeholder="Is Current Character"/>
    </form>*/

    return React.createElement(
        "div",
        { id: "container" },
        React.createElement(
            "div",
            { className: "character" },
            React.createElement("div", null),
            characterNodes
        ),
        React.createElement(
            "form",
            { id: "characterCreatorForm",
                onSubmit: handleCharacterCreator,
                name: "characterCreatorForm",
                action: "/characterCreator",
                method: "GET",
                className: "characterCreatorForm"
            },
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement("input", { className: "characterCreatorSubmit", type: "submit", value: "Create Character" })
        )
    );
};

var GameWindow = function GameWindow(props) {
    if (props.games.length === 0) {
        return React.createElement(
            "div",
            { id: "container" },
            React.createElement(
                "div",
                { className: "game" },
                React.createElement(
                    "h3",
                    { className: "emptyGame" },
                    "No Games yet"
                )
            ),
            React.createElement(
                "form",
                { id: "gameCreatorForm",
                    onSubmit: handleCreateGame,
                    name: "gameCreatorForm",
                    action: "/makeGame",
                    method: "GET",
                    className: "gameCreatorForm"
                },
                React.createElement(
                    "label",
                    { htmlFor: "gameName" },
                    "Name: "
                ),
                React.createElement("input", { id: "gameName", type: "text", name: "name", placeholder: "Game Name" }),
                React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
                React.createElement("input", { className: "gameCreatorSubmit", type: "submit", value: "Create Game" })
            )
        );
    }

    var gameNodes = props.games.map(function (game) {
        return React.createElement(
            "div",
            { id: game._id, key: game._id, className: "game" },
            React.createElement(
                "h3",
                { className: "gameName" },
                " Name: ",
                game.name,
                " "
            ),
            React.createElement(
                "form",
                { id: "startGameForm",
                    onChecked: startGame,
                    name: "startGameForm",
                    action: "/startGame",
                    method: "POST",
                    className: "startGameForm" },
                React.createElement(
                    "label",
                    { htmlFor: "startGame" },
                    "Start Game"
                ),
                React.createElement("input", { className: "startGameButton", type: "submit", value: "Start Game" })
            )
        );
    });

    /*<form id="setCharacterForm"
        onChecked={setCurrentCharacter}
        name="setCharacterForm"
        action="/setCurrentCharacter"
        method="POST"
        className="setCharacterForm">
            <label htmlFor="isCurrent">Current Character</label>
            <input id="isCurrent" type="checkbox" name="isCurrent" placeholder="Is Current Character"/>
    </form>*/

    return React.createElement(
        "div",
        { id: "container" },
        React.createElement(
            "div",
            { className: "character" },
            gameNodes
        ),
        React.createElement(
            "form",
            { id: "gameCreatorForm",
                onSubmit: handleCreateGame,
                name: "gameCreatorForm",
                action: "/makeGame",
                method: "GET",
                className: "gameCreatorForm"
            },
            React.createElement(
                "label",
                { htmlFor: "gameName" },
                "Name: "
            ),
            React.createElement("input", { id: "gameName", type: "text", name: "name", placeholder: "Game Name" }),
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement("input", { className: "characterCreatorSubmit", type: "submit", value: "Create Character" })
        )
    );
};

var GameList = function GameList(props) {
    if (props.characters.length === 0) {
        return React.createElement(
            "div",
            { className: "game" },
            React.createElement(
                "h3",
                { className: "emptyGame" },
                "No Games Running"
            )
        );
    }

    var gameNodes = props.games.map(function (game) {
        return React.createElement(
            "div",
            { key: game._id, className: "game" },
            React.createElement(
                "h3",
                { className: "gameName" },
                " ",
                game.name,
                " "
            ),
            React.createElement(
                "h3",
                { className: "gameMaster" },
                " GM: ",
                game.gm,
                " "
            )
        );
    });

    return React.createElement(
        "div",
        { className: "game" },
        gameNodes
    );
};

var CreateCharacterButton = function CreateCharacterButton(props) {
    return React.createElement(
        "form",
        { id: "characterCreatorForm",
            onSubmit: handleCharacter,
            name: "characterCreatorForm",
            action: "/characterCreator",
            method: "GET",
            className: "characterCreatorForm"
        },
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "characterCreatorSubmit", type: "submit", value: "Create Character" })
    );
};

var loadCharactersFromServer = function loadCharactersFromServer() {
    sendAjax('GET', '/getCharacters', null, function (data) {
        ReactDOM.render(React.createElement(CharacterWindow, { characters: data.characters }), document.querySelector("#characters"));
    });
};

var loadGamesFromServer = function loadGamesFromServer() {
    console.log("Load Games");
    sendAjax('GET', '/getGames', null, function (data) {
        ReactDOM.render(React.createElement(GameWindow, { games: data.games }), document.querySelector("#games"));
    });
};

/*const getAccountType = () => {
    let accountType;
    accountType = sendAjax('GET', '/getAccountType', null, (data) => {
        //console.log('Account Type: ' + data.accountType);
        return data.accountType;
        //console.log('Account Type: ' + accountType);
    });
    //console.log('Account Type: ' + accountType);
    //return accountType;
};*/

var setup = function setup(csrf) {
    // Make different UI for player and GM
    // Maybe use session.account.accountType if that's available

    /*ReactDOM.render(
        <CharacterForm csrf={csrf} />, document.querySelector("#makeCharacter")
    );
      ReactDOM.render(
        <GameForm csrf={csrf} />, document.querySelector("#makeGame")
    );*/

    //const accountType = getAccountType();

    //console.log('Account Type: ' + accountType);

    sendAjax('GET', '/getAccountType', null, function (data) {
        if (data.accountType == 'player') {
            ReactDOM.render(React.createElement(CharacterWindow, { characters: [] }), document.querySelector("#characters"));

            loadCharactersFromServer();

            // Doesn't work
            //session.account.currentCharacter = {};


            /*
            //console.log('Test');
            //console.log('Account Type: ' + data.accountType);
            //ReactDOM.render seems to overwrite the previous calls
            const containerDiv = document.getElementById("characters");
            const charactersList = document.createElement("div");
            //const id = document.createAttribute("div");
            //id.value = "charactersList";
            containerDiv.append(charactersList);
            charactersList.setAttribute("id", "charactersList");
            ReactDOM.render(
                <CharacterWindow characters={[]} />, document.querySelector("#charactersList")
            );
            
            const characterCreateButton = document.createElement("div");
            containerDiv.append(characterCreateButton);
            characterCreateButton.setAttribute("id", "characterCreateButton");
            ReactDOM.render(
                <CreateCharacterButton csrf={csrf} />, document.querySelector("#characterCreateButton")
            );*/
        } else {
            ReactDOM.render(React.createElement(GameWindow, { games: [], csrf: csrf }), document.querySelector("#games"));

            loadGamesFromServer();
        }
    });
};

var getToken = function getToken(callback) {
    sendAjax('GET', '/getToken', null, function (result) {
        //console.log(result);
        callback(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken(setup);
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
