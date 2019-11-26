const handleGame = (e) => {
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
}

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

    /*sendAjax('GET', '/getGames', null, (data) => {
        ReactDOM.render(
            <PlayerList games={data.games} />, document.querySelector("#games")
        );
    });*/
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
});