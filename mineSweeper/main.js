$(document).ready(function(){
	var gameOptions = {
		squaresWide: 10,
		squaresHigh: 10,
		numberMines: 20,
	};

	//Loaded originally, and on button click
	function gamePlay(){
		minePositions = [];
		gameBoard = [];

		//This code block sets up the board according to the specs
		$('table').remove();
		$("#tableHere").append('<table>');
		for (i = 0; i < gameOptions.squaresHigh; i++){
			$("table").append('<tr>');
			//Add a tr for of the squaresHigh
			for (j = 0; j < gameOptions.squaresWide; j++){
				$("table tr:last-child").append('<td>');
				var elem = $("table tr td:last-child");	
				$(elem).css('background-image', 'url(pics/sprites.png)');
				$(elem).css('background-position', '-108px 0px')
			}
		}
		$("#mainContent").css('width', $('table').width() + 'px')
		$("#mainContent").children().css('align', 'center')
		
		//generate mines according to specs
		function generate(){
			function checkSurroundingCells(){
				//TO DO - Use this function below for the white squares also, increase its scope so it's accessible to other functions
				function checkImmediateSurroundingCells(u,v){
					var minesNextTo = 0;
					var uLowLimit = -1;
					var uUpLimit = 1;
					var vLowLimit = -1;
					var vUpLimit = 1;
				
					if (u == 0){
						uLowLimit = 0;
					} else if (u == gameOptions.squaresHigh -1){
						uUpLimit = 0;
					} 

					if (v == 0){			
						vLowLimit = 0;
					} else if (v == gameOptions.squaresWide -1){
						vUpLimit = 0;
					}

					for (b = uLowLimit; b <= uUpLimit; b++){
						for (c = vLowLimit; c <= vUpLimit; c++){
							if(gameBoard[u+b][v+c] == 'mine'){
								minesNextTo ++;
							}
						}
					}
					if(gameBoard[u][v] !== 'mine'){
						gameBoard[u][v] = minesNextTo;
					}
				}

				//For every element in the gameboard array, check its immediate surrounding cells
				for (u = 0; u < gameBoard.length; u++){
					//u is rows, v is columns
					for (v = 0; v < gameBoard[u].length; v++){
						checkImmediateSurroundingCells(u,v);
					}
				}
			}

			//This function populates the board with mines and safe places. Change safe to numbers! 
			function populateArray(){
				function compareSquareToMines(n,p){
					for (s = 0; s < minePositions.length; s++){
						if (n == minePositions[s][0] && p == minePositions[s][1]){
							return true;
						}
					}
				}

				for (n = 0; n < gameOptions.squaresHigh; n++){
					gameBoard.push([]);
					for (p = 0; p < gameOptions.squaresWide; p++){
						if (compareSquareToMines(n,p) == true){
							gameBoard[n].push('mine');
						} else {
							gameBoard[n].push('safe');
						}
					}
				}
				//console.log(gameBoard)
			}

			//Check if a mine exists in this square before updating the array.
			function checkInstance(xPos, yPos){
				for (l = 0; l < minePositions.length; l++){
					if (xPos == minePositions[l][0] && yPos == minePositions[l][1]){
						return true;
					}
				}
				return false;
			}

			//Generate coordinates for each mine
			for (k = 0; k < gameOptions.numberMines; k++){
				//Give each mine a x and y pos based on the number of squaresHigh and squaresWide
				function getPos(){
					var xPos = Math.floor(Math.random() * gameOptions.squaresWide);
					var yPos = Math.floor(Math.random() * gameOptions.squaresHigh);
					if (checkInstance(xPos, yPos) == false){
						var thisMinePos = [xPos, yPos];
						minePositions.push(thisMinePos);
					} else {
						//Call it again, since a mine exists in these coords
						getPos();
					};
				}
				getPos();
			}
			populateArray();
			checkSurroundingCells();
		}
		generate();

		function checkConditions(elem){
			function showSquares(clickX, clickY){
				var trElement = $('tr').eq(clickY);
				var tdElement = $(trElement).children().eq(clickX);
				var xSprite = '-252';
				var ySprite = '0';
				if(gameBoard[clickX][clickY] == '1'){
					xSprite = '0';
					ySprite = '40';
				} else if(gameBoard[clickX][clickY] == '2'){
					xSprite = '-36';
					ySprite = '40';
				} else if(gameBoard[clickX][clickY] == '3'){
					xSprite = '-72';
					ySprite = '40';
				} else if(gameBoard[clickX][clickY] == '4'){
					xSprite = '-108';
					ySprite = '40';
				} else if(gameBoard[clickX][clickY] == '4'){
					xSprite = '-144'; //How can these two be the same?
					ySprite = '40';
				} else if(gameBoard[clickX][clickY] == '5'){
					xSprite = '-144';
					ySprite = '40';
				} else if(gameBoard[clickX][clickY] == '6'){
					xSprite = '-180';
					ySprite = '40';
				} else if(gameBoard[clickX][clickY] == '7'){
					xSprite = '-216';
					ySprite = '40';
				} else if(gameBoard[clickX][clickY] == '8'){
					xSprite = '-252';
					ySprite = '40';
				} else if(gameBoard[clickX][clickY] == 'mine'){
					xSprite = '-180';
					ySprite = '0';
				}
				$(tdElement).css('background-image', 'url(pics/sprites.png)');
				$(tdElement).css('background-position', xSprite +'px ' + ySprite + 'px');
			}
			
			//This function is called when an end of game condition is met
			function showBoard(){
				for (g = 0; g < gameBoard.length; g++){
					for (h = 0; h < gameBoard[g].length; h++){
						//loop through the gameBoard array, show every square
						showSquares(g,h);
					}
				}

			}
			var clickX = $(elem).index(); //Getting the xPos
			var clickY = $(elem).parent().index(); //Getting the yPos
			for (m = 0; m < minePositions.length; m++){
				if (clickX == minePositions[m][0] && clickY == minePositions[m][1]){
					$(elem).css('background-image', 'url(pics/sprites.png)');
					$(elem).css('background-position', '-180px 0px') //36 and 40 are the sprite params
					showBoard();
					return
				}
			}
			showSquares(clickX, clickY);
		}

		$('td').mousedown(function(event){
			if (event.which == 1){
				checkConditions(this); //
			} else if (event.which == 3){
				$(this).css('background-image', 'url(pics/sprites.png)');
				$(this).css('background-position', '-144px 0px')
			}
		})

	}
	gamePlay();

	$('#button').on('click',function(){
		gamePlay();
	})
})