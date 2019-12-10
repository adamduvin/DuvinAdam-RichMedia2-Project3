const handleCharacterCreator = (e) => {
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

const handleCreateGame = (e) => {
    e.preventDefault();

    $("#characterMessage").animate({width:'hide'},350);

    if($("#gameName").val() == ''){
        handleError("Name required");
        return false;
    }

    sendAjax('POST', $("#gameCreatorForm").attr("action"), $("#gameCreatorForm").serialize(), function(){
        loadGamesFromServer();
    });

    return false;
};

const startGame = (e) => {
    e.preventDefault();
    return false;
}

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
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeGameSubmit" type="submit" value="Make Game" />
        </form>
    );
};

const CharacterWindow = function(props){
    console.log(props.characters.length);
    if(props.characters.length === 0){
        return (
            <div id="container">
                <div className="character">
                    <h3 className="emptyCharacter">No Characters yet</h3>
                </div>
                <form id="characterCreatorForm"
                    onSubmit={handleCharacterCreator}
                    name="characterCreatorForm"
                    action="/characterCreator"
                    method="GET"
                    className="characterCreatorForm"
                    >
                        <input type="hidden" name="_csrf" value={props.csrf} />
                        <input className="characterCreatorSubmit" type="submit" value="Create Character" />
                </form>
            </div>
            
        );
    }

    const characterNodes = props.characters.map(function(character){
        return (
            <div id={character._id} key={character._id} className="character">
                <h3 className="characterName"> Name: {character.name} </h3>
                <h3 className="characterLevel"> Level: {character.level} </h3>
                <h3 className="characterClass"> Class: {character.class} </h3>
                <h3 className="characterRace"> Race: {character.race} </h3>
                <h3 className="characterMaxHealth"> MaxHealth: {character.maxHealth} </h3>
            </div>
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




    return (
        <div id="container">
            <div className="character">
                <div></div>
                 {characterNodes}
            </div>
            <form id="characterCreatorForm"
                onSubmit={handleCharacterCreator}
                name="characterCreatorForm"
                action="/characterCreator"
                method="GET"
                className="characterCreatorForm"
                >
                    <input type="hidden" name="_csrf" value={props.csrf} />
                    <input className="characterCreatorSubmit" type="submit" value="Create Character" />
            </form>
        </div>
    );
};

const GameWindow = function(props){
    if(props.games.length === 0){
        return (
            <div id="container">
                <div className="game">
                    <h3 className="emptyGame">No Games yet</h3>
                </div>
                <form id="gameCreatorForm"
                    onSubmit={handleCreateGame}
                    name="gameCreatorForm"
                    action="/makeGame"
                    method="GET"
                    className="gameCreatorForm"
                    >
                        <label htmlFor="gameName">Name: </label>
                        <input id="gameName" type="text" name="name" placeholder="Game Name"/>
                        <input type="hidden" name="_csrf" value={props.csrf} />
                        <input className="gameCreatorSubmit" type="submit" value="Create Game" />
                </form>
            </div>
            
        );
    }

    const gameNodes = props.games.map(function(game){
        return (
            <div id={game._id} key={game._id} className="game">
                <h3 className="gameName"> Name: {game.name} </h3>
                <form id="startGameForm"
                onChecked={startGame}
                name="startGameForm"
                action="/startGame"
                method="POST"
                className="startGameForm">
                    <label htmlFor="startGame">Start Game</label>
                    <input className="startGameButton" type="submit" value="Start Game"/>
                </form>
            </div>
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




    return (
        <div id="container">
            <div className="character">
                 {gameNodes}
            </div>
            <form id="gameCreatorForm"
                onSubmit={handleCreateGame}
                name="gameCreatorForm"
                action="/makeGame"
                method="GET"
                className="gameCreatorForm"
                >
                    <label htmlFor="gameName">Name: </label>
                    <input id="gameName" type="text" name="name" placeholder="Game Name"/>
                    <input type="hidden" name="_csrf" value={props.csrf} />
                    <input className="characterCreatorSubmit" type="submit" value="Create Character" />
            </form>
        </div>
    );
};

const GameList = function(props){
    if(props.characters.length === 0){
        return (
            <div className="game">
                <h3 className="emptyGame">No Games Running</h3>
            </div>
        );
    }

    const gameNodes = props.games.map(function(game){
        return (
            <div key={game._id} className="game">
                <h3 className="gameName"> {game.name} </h3>
                <h3 className="gameMaster"> GM: {game.gm} </h3>
            </div>
        );
    });

    return (
        <div className="game">
            {gameNodes}
        </div>
    );
};

const CreateCharacterButton = (props) => {
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
            <CharacterWindow characters={data.characters} />, document.querySelector("#characters")
        );
    });
};

const loadGamesFromServer = () => {
    console.log("Load Games");
    sendAjax('GET', '/getGames', null, (data) => {
        ReactDOM.render(
            <GameWindow games={data.games} />, document.querySelector("#games")
        );
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

const setup = function(csrf) {
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

    sendAjax('GET', '/getAccountType', null, (data) => {
        if(data.accountType == 'player'){
            ReactDOM.render(
                <CharacterWindow characters={[]} />, document.querySelector("#characters")
            );

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
        }

        else{
            ReactDOM.render(
                <GameWindow games={[]} csrf={csrf} />, document.querySelector("#games")
            );

            loadGamesFromServer();
        }
    });
};

const getToken = (callback) => {
    sendAjax('GET', '/getToken', null, (result) => {
        //console.log(result);
        callback(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken(setup);
});