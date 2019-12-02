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
};

const PlayerList = function(props){
    if(props.players.length === 0){
        return (
            <div className="playerList">
                <h3 className="emptyPlayerList">No Players In Game</h3>
            </div>
        );
    }

    const playerNodes = props.players.map(function(player){
        return (
            <div key={player._id} className="player">
                <h3 className="playerName"> Name: {player.name} </h3>
                <h3 className="playerCharacterName"> Character: {player.characterName} </h3>
                <h3 className="playerCharacterLevel"> Level: {player.characterLevel} </h3>
            </div>
        );
    });

    return (
        <div className="playerList">
            {playerNodes}
        </div>
    );
};

const addPlayersToGame = () => {
    // Have joining players make a POST request to add them to the game

    sendAjax('GET', '/getGames', null, (data) => {
        ReactDOM.render(
            <PlayerList games={data.games} />, document.querySelector("#games")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <GameForm csrf={csrf} />, document.querySelector("#makeGame")
    );

    ReactDOM.render(
        <GameForm csrf={csrf} />, document.querySelector("#makeGame")
    );

    ReactDOM.render(
        <GameList games={[]} />, document.querySelector("#games")
    );

    loadGamesFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});*/
"use strict";

var handleCharacter = function handleCharacter(e) {
    e.preventDefault();

    $("#characterMessage").animate({ width: 'hide' }, 350);

    if ($("#characterName").val() == '' || $("#characterAge").val() == '' || $("#characterAge".val() == '')) {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function () {
        loadCharactersFromServer();
    });

    return false;
};

var handleGame = function handleGame(e) {
    e.preventDefault();

    //$("#characterMessage").animate({width:'hide'},350);

    /*if($("#characterName").val() == '' || $("#characterAge").val() == '' || $("#characterAge".val() == '')){
        handleError("RAWR! All fields are required");
        return false;
    }
      sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function(){
        loadCharactersFromServer();
    });*/

    return false;
};

var CharacterForm = function CharacterForm(props) {
    return React.createElement(
        "form",
        { id: "characterForm",
            onSubmit: handleCharacter,
            name: "characterForm",
            action: "/player",
            method: "POST",
            className: "characterForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "characterName", type: "text", name: "name", placeholder: "Character Name" }),
        React.createElement(
            "label",
            { htmlFor: "age" },
            "Age: "
        ),
        React.createElement("input", { id: "characterAge", type: "text", name: "age", placeholder: "Character Age" }),
        React.createElement(
            "label",
            { htmlFor: "Height" },
            "Height: "
        ),
        React.createElement("input", { id: "characterHeight", type: "text", name: "height", placeholder: "Character Height" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeCharacterSubmit", type: "submit", value: "Make Character" })
    );
};

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

var CharacterList = function CharacterList(props) {
    if (props.characters.length === 0) {
        return React.createElement(
            "div",
            { className: "character" },
            React.createElement(
                "h3",
                { className: "emptyCharacter" },
                "No Characters yet"
            )
        );
    }

    var characterNodes = props.characters.map(function (character) {
        return React.createElement(
            "div",
            { key: character._id, className: "character" },
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
                { className: "characterMaxHealth" },
                " MaxHealth: ",
                character.maxHealth,
                " "
            )
        );
    });

    return React.createElement(
        "div",
        { className: "character" },
        characterNodes
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
        ReactDOM.render(React.createElement(CharacterList, { characters: data.characters }), document.querySelector("#characters"));
    });
};

var setup = function setup(csrf) {
    // Make different UI for player and GM
    // Maybe use session.account.accountType if that's available

    ReactDOM.render(React.createElement(CharacterForm, { csrf: csrf }), document.querySelector("#makeCharacter"));

    ReactDOM.render(React.createElement(GameForm, { csrf: csrf }), document.querySelector("#makeGame"));

    ReactDOM.render(React.createElement(CharacterList, { characters: [] }), document.querySelector("#characters"));

    ReactDOM.render(React.createElement(CreateCharacterButton, { csrf: csrf }), document.querySelector("#characters"));

    loadCharactersFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
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
