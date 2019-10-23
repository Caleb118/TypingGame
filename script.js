let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate', 'the bad cat went jump over the moon.', 'welcome to the end of the world.', 'We have to find the way out, together.', 'Another day another dollar if only I werent so poor.'];
let keylist = $('.key');
let currentLevel = 0;
let currentKey = 0;
let globalKey = 0;
let mistakes = 0;
let time = 0;
let words = countWords();
let keys = countKeys();

$(document).ready(() => {
    $("#keyboard-upper-container").hide();
    $('#target-letter').html(sentences[currentLevel][currentKey]);
    $('#sentence').html(sentences[currentLevel]);
    setInterval(() => {
        time++;
    }, 60000);
    
})

function countWords() {
    let words = 0;
    for (let i = 0; i < sentences.length; i++) {
        words = words + sentences[i].split(" ").length;
    }
    return words;
}

function countKeys() {
    let keys = 0;
    for (let i = 0; i < sentences.length; i++) {
        keys = keys + sentences[i].length;
    }
    return keys;
}

function reset() {
    currentKey = 0;
    $('#sentence').html(sentences[currentLevel]);
    $('#target-letter').html(sentences[currentLevel][currentKey]);
    doLog();
    $('#yellow-block').width('0px');
}

function doLog(param) {
    if (param == 'good') {
        $('#feedback').html("<img height=\"50px\" width=\"50px\" src=\"good.png\" />");
    } else if (param == 'bad') {
        $('#feedback').html("<img height=\"50px\" width=\"50px\" src=\"bad.png\" />");
        mistakes++;
    } else {
        $('#feedback').html("");
    }
}

$('body').bind('keydown',function(e){
    for (let i = 0; i < keylist.length; i++ ) {
        if (e.key == keylist[i].innerText || e.which == '32') {
            if (e.which == '32') {
                i = 94;
            }
            if (e.key == sentences[currentLevel][currentKey]) {
                currentKey++;
                globalKey++;
                if (globalKey == keys) {
                    let score = words / time - 2 * mistakes;
                    var r = confirm("Words Per Minute: "+ score + " . Play again?");
                    if (r == true) {
                        currentLevel = 0;
                        reset();
                    } 
                } else if (currentKey == sentences[currentLevel].length) {
                    currentLevel++;
                    reset();
                } else {
                    doLog('good');
                    $('#yellow-block').width(17+  $('#yellow-block').width()) 
                    $('#target-letter').html(sentences[currentLevel][currentKey]);
                }
            } else {
                doLog('bad');
            }
            $(keylist[i]).css("background-color", "yellow")
        } else if (e.which == '16') {
            $("#keyboard-lower-container").hide();
            $("#keyboard-upper-container").show();
        }
    
    }
}).bind('keyup',function(e){
    for (let i = 0; i < keylist.length; i++ ) {
        if (e.key == keylist[i].innerText || e.which == '32') {
            if (e.which == '32') {
                i = 94;
            }
            $(keylist[i]).css("background-color", "")
        } else if (e.which == '16') {
            $("#keyboard-lower-container").show();
            $("#keyboard-upper-container").hide();
        }
    }
});