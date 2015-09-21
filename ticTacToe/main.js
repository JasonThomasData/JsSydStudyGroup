$(document).ready(function(){
    var player = 'naughts'; //The first player to play the game
    var gameStatus = [[]]; 
    var gameGoing = true;
    var gameNumber = 1;

    function check_game_conditions(player){
        function generate_array(){
            var i = 0;
            $('#gameBoard tr').each(function(){
                var j = 0;
                var rowStatus = [];
                $(this).find('td').each(function(){
                    rowStatus[j] = $(this).html();
                    j++;
                })
                gameStatus[i] = rowStatus;
                i++;
            })
        }
        function check_array(player){
            for (k=0;k<3;k++){
                if(gameStatus[k][0] == player && gameStatus[k][1] == player && gameStatus[k][2] == player){
                    return true;
                }
            }    
            for (l=0;l<3;l++){
                if(gameStatus[0][l] == player && gameStatus[1][l] == player && gameStatus[2][l] == player){
                    return true;
                }
            }
            if(gameStatus[0][0] == player && gameStatus[1][1] == player && gameStatus[2][2] == player){
                    return true;
            } else if (gameStatus[0][2] == player && gameStatus[1][1] == player && gameStatus[2][0] == player){
                    return true;
            }
        }
        function end_game(){
            gameGoing = false;
            $('#gameResult').append('<p>' + player + ' wins game ' + gameNumber + '</p>');
            gameNumber++
        }

        generate_array();
        if(check_array(player)){
            end_game();
        }
    }

    $('td').on('click', function(){
        if (gameGoing){    
            if ($(this).attr('value') == 'unchecked'){
                if (player == 'crosses'){
                    $(this).html('X');            
                    check_game_conditions('X');
                    player = 'naughts';
                } else {
                    $(this).html('0'); 
                    check_game_conditions('0');
                    player = 'crosses';
                }
                $(this).attr('value', 'checked');
            }    
        }
    })

    $('#startGame').on('click', function(){
        $('#gameBoard tr').each(function(){
            $(this).find('td').each(function(){
                $(this).html("");
                $(this).attr('value', 'unchecked');
            })
        })        
        gameGoing = true;
    })
})