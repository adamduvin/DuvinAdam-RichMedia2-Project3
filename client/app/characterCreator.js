const handleCreateCharacter = (e) => {
    e.preventDefault();

    $("#characterMessage").animate({width:'hide'},350);

    if($("#characterName").val() == '' || $("#characterLevel").val() <= '0' || $("#class") == 'pickClass' || $("#race") == 'pickRace' || $("#maxHealth").val() <= '0'){
        handleError("RAWR! All fields are required");
        return false;
    }

    console.log("Pre-Post");

    sendAjax('POST', $("#createCharacterForm").attr("action"), $("#createCharacterForm").serialize(), function(){
        console.log("Before token");
        getToken(setup);
    });

    // Maybe should be in the callback but I have to find out what's wrong with its CSRF first
    //getToken(setup);

    return false;
};

const CreateCharacterForm = (props) => {
    return (
        <div id="container">
            <form id="createCharacterForm"
            onSubmit={handleCreateCharacter}
            name="characterForm"
            action="/makeCharacter"
            method="POST"
            className="characterForm"
            >   
                <label htmlFor="characterName">Name: </label>
                <input id="characterName" type="text" name="name" placeholder="Character Name"/>
                <label htmlFor="characterLevel">Level: </label>
                <input id="characterLevel" type="number" name="level" placeholder="Character Level" defaultValue="0"/>
                <label htmlFor="class">Class: </label>
                <select id="class" name="class" placeholder="Class">
                    <option value="pickClass">Pick Your Class</option>
                    <option value="fighter">Fighter</option>
                    <option value="rogue">Rogue</option>
                    <option value="barbarian">Barbarian</option>
                    <option value="bard">Bard</option>
                    <option value="cleric">Cleric</option>
                    <option value="druid">Druid</option>
                    <option value="monk">Monk</option>
                    <option value="paladin">Paladin</option>
                    <option value="ranger">Ranger</option>
                    <option value="sorcerer">Sorcerer</option>
                    <option value="warlock">Warlock</option>
                    <option value="wizard">Wizard</option>
                    <option value="gunslinger">Gunslinger</option>
                    <option value="soldier">Soldier</option>
                    <option value="biologist">Biologist</option>
                </select>
                <label htmlFor="race">Race: </label>
                <select id="race" name="race" placeholder="Race">
                    <option value="pickRace">Pick Your Race</option>
                    <option value="dragonborn">Dragonborn</option>
                    <option value="dwarf">Dwarf</option>
                    <option value="elf">Elf</option>
                    <option value="gnome">Gnome</option>
                    <option value="halfElf">Half-Elf</option>
                    <option value="halfling">Halfling</option>
                    <option value="halfOrc">Half-Orc</option>
                    <option value="human">Human</option>
                    <option value="tiefling">Tiefling</option>
                </select>
                <label htmlFor="maxHealth">Max Health: </label>
                <input id="maxHealth" type="number" name="maxHealth" placeholder="Max Health" defaultValue="0"/>
                <input type="hidden" name="_csrf" value={props.csrf} />
                <input className="makeCharacterSubmit" type="submit" value="Make Character" />
            </form>
        </div>
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

const characterCreatorSetup = function(csrf) {

    ReactDOM.render(
        <CreateCharacterForm characters={[]} csrf={csrf} />, document.querySelector("#characters")
    );

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