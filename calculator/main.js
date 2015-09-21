var toEvaluate = []

function evaluate(eval) {
	var problemToSolve = eval.join('')
	console.log(problemToSolve)
	problemToSolve.replace('%','/100')
	toEvaluate = [];
	if (eval == undefined){
		$('#previousResult').text('0')
	} else {
		$('#previousResult').text(problemToSolve + ' = ' + math.eval(problemToSolve))		
	}
}

$('#buttons td').on('click', function(){
	var buttonValue = $(this).html();
	if(buttonValue == 'C'){
		toEvaluate = [];
	} else if (buttonValue == '<'){
		toEvaluate.pop();
	} else if (buttonValue == '='){
		if (toEvaluate[toEvaluate.length - 1] == '-' || toEvaluate[toEvaluate.length - 1] == '+' || toEvaluate[toEvaluate.length - 1] == '/' || toEvaluate[toEvaluate.length - 1] == 'x'){
			toEvaluate.pop();
		}
		evaluate(toEvaluate)
	} else {
		if(isNaN(buttonValue) != true || buttonValue == '.'){
			//This one is an int or a float
			if(toEvaluate.length > 0){
				//The list is not empty
				var lastElement = toEvaluate[toEvaluate.length - 1];
				if(isNaN(lastElement) != true){
					if((buttonValue == '.' && lastElement.indexOf('.') > -1) == false ){
						lastElement = lastElement.concat(buttonValue);
						toEvaluate[toEvaluate.length - 1] = lastElement;
					}
				} else {
					toEvaluate.push(buttonValue)
				}
			} else {
				//List is empty
				if (buttonValue !='.'){
					toEvaluate.push(buttonValue)
				}
			}
			console.log(toEvaluate)
		} else {
			//This one is an operator
			if (isNaN(toEvaluate[toEvaluate.length - 1]) || toEvaluate[toEvaluate.length - 1] == '.'){
				if (toEvaluate[toEvaluate.length - 1] == '%'){
					toEvaluate.push(buttonValue)
				} else {
					toEvaluate[toEvaluate.length - 1] = buttonValue	
				}
			} else {
 				toEvaluate.push(buttonValue)
			}
		}	
	}
	$('#displayResult').html(toEvaluate.join(''))
});