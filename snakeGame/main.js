$(document).ready(function(){
    var gameSettings = {
        boardWidth: 300,
        squareNumber: 20,
        sizeOfSquares: 15,
        speed: 250,
        snakeColor: '#F80',
        targetColor: '#0033CC'
    };

    function draw_board(){
        for (i=0; i< gameSettings.squareNumber; i++){
            for (j=0; j< gameSettings.squareNumber; j++){
                var identifier = i.toString() + 'n' + j.toString();
                $('#gameGrid').append('<div>');
                $('#gameGrid div:last-child').attr('id', identifier)
                    .css('width', gameSettings.sizeOfSquares)
                    .css('height', gameSettings.sizeOfSquares)
                    .css('top', gameSettings.sizeOfSquares * i)
                    .css('left', gameSettings.sizeOfSquares * j);
            }
        }
    }
    draw_board()
    
    var gameInterval; //To be used at the end
    
    $('#gameSpeed').on('change', function(){
        gameSettings.speed = $(this).val();
        clearInterval(gameInterval);
        $('#gameGrid div').remove();
        draw_board();
    });

    $('#gridNumber').on('change', function(){
        gameSettings.squareNumber = $(this).val();
        clearInterval(gameInterval);
        $('#gameGrid div').remove();
        draw_board();    
    });

    $('#gameGrid').css('width', gameSettings.boardWidth).css('height', gameSettings.boardWidth);

    function start_game(){
        var firstSnake = true;
        var firstTarg = true;
        function rand_loc(){
            var location = [Math.floor(Math.random()*gameSettings.squareNumber), Math.floor(Math.random()*gameSettings.squareNumber)];
            //console.log(location)
            if (firstSnake == true){
                firstSnake = false;
                return location;
            } else if (firstTarg == true){
                firstTarg = false;
                return location;
            } else {
                for (n=0;n<snake.loc.length;n++){
                    //console.log('N ', n)
                    //console.log('snake ', snake.loc.length)
                    if (location[0] == snake.loc[n][0] && location[1] == snake.loc[n][1]){
                        console.log('Match')
                        rand_loc();
                    } 
                }
                for (p=0;p<snake.targ.length;p++){
                    if (location[0] == snake.targ[p][0] && location[1] == snake.targ[p][1]){
                        rand_loc();
                    } 
                }
                return location
            }
        }

        var snake = {
            loc: [rand_loc()], //First eement counts down rows (vertically), second horizontally (columns)
            direction: 'left',
            points: 0,
            targ: [rand_loc()]
        };
        
        if (snake.loc[0][1] < gameSettings.squareNumber/2){
            snake.direction = 'right';
        }

        $(document).keydown(function(key){
            if (key.keyCode == 37){
                snake.direction = 'left';
            } else if (key.keyCode == 38){
                snake.direction = 'up';
            } else if (key.keyCode == 39){
                snake.direction = 'right';
            } else if (key.keyCode == 40){ 
                snake.direction = 'down';
            }                   
        });

        function game_end(){
            clearInterval(gameInterval);
        }

        function check_snake_alive(nextSquare){
            if (nextSquare[0] < 0 || nextSquare[0] > gameSettings.squareNumber - 1 || nextSquare[1] < 0 || nextSquare[1] > gameSettings.squareNumber - 1){
                //Hit wall
                return false;
            } else {
                for (h=0; h < snake.loc.length; h++){
                    if (nextSquare[0] == snake.loc[h][0] && nextSquare[1] == snake.loc[h][1]){
                        //Bit yourself
                        return false;
                    }
                }
                return true;
            }
        }

        function check_point(nextSquare){
            for (l=0; l < snake.targ.length; l++){
                if (nextSquare[0] == snake.targ[l][0] && nextSquare[1] == snake.targ[l][1]){
                    //console.log('got point');
                    snake.points = snake.points + gameSettings.squareNumber;
                    return true;
                }
            }
            return false;
        }

        function move_snake(callback){
            var nextSquare;
            if(snake.direction == 'left'){
                nextSquare = [snake.loc[snake.loc.length-1][0],snake.loc[snake.loc.length-1][1] - 1];
            } else if(snake.direction == 'right'){
                nextSquare = [snake.loc[snake.loc.length-1][0],snake.loc[snake.loc.length-1][1] + 1];
            } else if(snake.direction == 'up'){
                nextSquare = [snake.loc[snake.loc.length-1][0] - 1,snake.loc[snake.loc.length-1][1]];
            } else if(snake.direction == 'down'){
                nextSquare = [snake.loc[snake.loc.length-1][0] + 1,snake.loc[snake.loc.length-1][1]];
            }
            if(check_snake_alive(nextSquare)){
                if(check_point(nextSquare)){
                    snake.targ.pop();
                    snake.loc.push(nextSquare);
                    //console.log(snake.loc);
                    snake.targ.push(rand_loc());
                } else {
                    for (m=0;m<snake.loc.length;m++){
                        snake.loc[m] = snake.loc[m+1];
                    }
                    snake.loc[snake.loc.length-1] = nextSquare;    
                }
            } else {
                game_end();
                return;
            }
            callback();
        }

        function render_game_board(){
            snake.points = snake.points - 1;
            $('#gameGrid div').css('background-color', '#EFEFEF'); 
            $('#pointsDisplay').text('Points = ' + snake.points.toString());
            for (k=0;k<snake.loc.length;k++){
                var snakeSquare = snake.loc[k][0].toString() + 'n' + snake.loc[k][1].toString();
                $('#gameGrid #' + snakeSquare).css('background-color', gameSettings.snakeColor);  
            }
            var targetSquare = snake.targ[0][0].toString() + 'n' + snake.targ[0][1].toString();
            $('#gameGrid #' + targetSquare).css('background-color', gameSettings.targetColor);        
        }

        render_game_board();
        gameInterval = setInterval(function(){
            move_snake(function(){
                render_game_board();
            });
        }, gameSettings.speed);
    }
    $('#startButton').on('click',function(){
        clearInterval(gameInterval);
        start_game();
    });
});