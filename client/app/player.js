const handleCharacter = (e) => {
    e.preventDefault();

    $("#characterMessage").animate({width:'hide'},350);

    if($("#characterName").val() == '' || $("#characterAge").val() == '' || $("#characterAge".val() == '')){
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function(){
        loadCharactersFromServer();
    });

    return false;
};

const handleGame = (e) => {
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

const CharacterForm = (props) => {
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
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeGameSubmit" type="submit" value="Make Game" />
        </form>
    );
};

const CharacterList = function(props){
    if(props.characters.length === 0){
        return (
            <div className="character">
                <h3 className="emptyCharacter">No Characters yet</h3>
            </div>
        );
    }

    const characterNodes = props.characters.map(function(character){
        return (
            <div key={character._id} className="character">
                <h3 className="characterName"> Name: {character.name} </h3>
                <h3 className="characterLevel"> Level: {character.level} </h3>
                <h3 className="characterMaxHealth"> MaxHealth: {character.maxHealth} </h3>
            </div>
        );
    });

    return (
        <div className="character">
            {characterNodes}
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
            <CharacterList characters={data.characters} />, document.querySelector("#characters")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <CharacterForm csrf={csrf} />, document.querySelector("#makeCharacter")
    );

    ReactDOM.render(
        <GameForm csrf={csrf} />, document.querySelector("#makeGame")
    );

    ReactDOM.render(
        <CharacterList characters={[]} />, document.querySelector("#characters")
    );

    ReactDOM.render(
        <CreateCharacterButton csrf={csrf} />, document.querySelector("#characters")
    );

    loadCharactersFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});