var timeToChange = 5000;
var listOfPics = ['crayola.jpg','shark.jpg', 'eye.jpg','trippyStairs.jpg'];
var tallestPic = 0;
for (j = 0; j < listOfPics.length; j++){
	$('#buttonBox').append('<div>')
	$('#buttonBox div:last-child').addClass('button')
}
$('#imageGoesHere').attr('src', 'images/' + listOfPics[0]);
$('#buttonBox div:nth-child(' + 1 + ')').css('background-color','#3A3A3A')

function _init_(i){
	function getImageSizes(){
		var height = $('#imageGoesHere').height();
		return ($('#mainContent').height() - height)/2
	}

	function changeContent(i){
		$('#buttonBox').children().css('background-color','#fff')
		next = i + 1;
		$('#buttonBox div:nth-child(' + next + ')').css('background-color','#3A3A3A')
		$('#imageGoesHere').attr('src', 'images/' + listOfPics[i]);
		$('#imageGoesHere').css('padding-top', Math.floor(getImageSizes()))
	}

	var interval = setInterval(function(){
		i ++ ;
		if (i >= listOfPics.length){
			i = 0;
		};
		changeContent(i);
	}, timeToChange)

	$('.button').on('click', function(){
		clearInterval(interval)
		i = $(this).index()
		changeContent(i)
		_init_(i)
	})

	$(window).resize(function() {
		$('#imageGoesHere').css('padding-top', Math.floor(getImageSizes()))
		//_init(i)
	})
}

$(window).ready(function() {
	_init_(0)
})