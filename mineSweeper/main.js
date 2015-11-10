$(document).ready(function(){
	var gameOptions = {
		squaresWide: 10,
		squaresHigh: 10,
		numberMines: 15,
	};

	//This sets up the board according to the specs
	$("#mainContent").append('<table>').attr('id', 'table');
	for (i = 0; i < gameOptions.squaresHigh; i++){
		$("#table").append('<tr>');
		//Add a tr for of the squaresHigh
		for (j = 0; j < gameOptions.squaresWide; j++){
			$("#table tr:last-child").append('<td>');
			var elem = $("#table tr td:last-child");	
			$(elem).css('background-image', 'url(pics/sprites.png)');
			$(elem).css('background-position', '-108px 0px')
		}
	}

	//All the deadly mines
	minePositions = [];
	gameBoard = [];

	//generate mines according to specs
	function generate(){
		function checkSurroundingCells(){
			var count = 0;
			//For now, top three, bottom three, left and right
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
					count++;
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
			console.log(gameBoard)
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
					getPos();
				};
			}
			getPos();
		}
		populateArray();
		checkSurroundingCells();	//This function hasn't really worked.
	}
	generate();

	function checkConditions(elem){
		function showSquares(clickX, clickY){
			var trElement = $('tr').eq(clickY);
			var tdElement = $(trElement).children().eq(clickX);
			var xSprite = '-252';
			var ySprite = '0';

		//	console.log(gameBoard[clickX][clickY])
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
				xSprite = '-216';
				ySprite = '40';
			} else if(gameBoard[clickX][clickY] == '7'){
				xSprite = '-252';
				ySprite = '40';
			} else if(gameBoard[clickX][clickY] == '8'){
				xSprite = '-286';
				ySprite = '40';
			}
			 else if(gameBoard[clickX][clickY] == 'mine'){
				xSprite = '-180';
				ySprite = '0';
			}
			$(tdElement).css('background-image', 'url(pics/sprites.png)');
			$(tdElement).css('background-position', xSprite +'px ' + ySprite + 'px');
//			$(tdElement).html(gameBoard[clickX][clickY])
		}
		function showBoard(){
			for (g = 0; g < gameBoard.length; g++){
				for (h = 0; h < gameBoard[g].length; h++){
					showSquares(g,h);
//					console.log(g,h);
				}
			}

		}
		var clickX = $(elem).index(); //Getting the xPos
		var clickY = $(elem).parent().index()-1; //Getting the yPos
		for (m = 0; m < minePositions.length; m++){
			if (clickX == minePositions[m][0] && clickY == minePositions[m][1]){
				//console.log('hitOne, you lose');
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
})