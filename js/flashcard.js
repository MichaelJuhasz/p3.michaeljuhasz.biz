var cardCount = 0;
// Ready the flippling 
var flipped = false;

$(document).ready(function(){

	// Check to see if the user has any cards in localStorage.
	// If not, add some. 
	if (localStorage.length == 0){
		localStorage.setItem("Produce", "محصول");
		localStorage.setItem("Oil", "روغن");
		localStorage.setItem("Herd", "گله");
		localStorage.setItem("Pitcher", "کوزه");
		localStorage.setItem("Ewe", "میش");
		localStorage.setItem("Order", "دستور");
		localStorage.setItem("Body", "تن");
	}

	getACard(cardCount);

	// Adding a new card grabs values from form
	// does some animation and sticks the values
	// into localStorage
	$("#submit_button").click(function(){
		
		var med_query = window.matchMedia("(min-width: 992px)");
		var eng_word = $("#english_word").val();
		var far_word = $("#farsi_word").val();
		if (eng_word != "" && farsi_word != ""){
			$("#error_text").css('visibility','hidden');
			if (med_query.matches){
				$("#new_card").html(eng_word)
							  .fadeIn("slow")
							  .animate({
								  left:'45%',
								  bottom:'250px'
								}, 1000)
							  .fadeOut()
							  .animate({
							  	  left:'0px',	
							  	  bottom: '0px'
							  });
				}
			localStorage.setItem(eng_word, far_word);
			$(":input").val("");
			}
		else $("#error_text").css('visibility','visible');
	});

    $(".hover").click(flip);

	$("#next").click(next);

	$("#last").click(previous);

	$("#delete").click(function(){
		localStorage.removeItem(localStorage.key(cardCount));
		getACard(cardCount);
	});

	$(window).keydown(function(e){
	var key = e.keyCode;
		switch (key)
		{
			case 39:
				next();
				break;
			case 37:
				previous();
				break;
			case 38: case 40:
				flip();
				break;
		}
	});
});	

function getACard(cardCount){
// Grab key/value pair out of localStorage using the 
// index passed in the function call.  Set html of 
// "flippy_card" with one value and return the other.
	var english_word = localStorage.key(cardCount);
	var farsi_word = localStorage[english_word];
	$(".front").html(english_word);
	$(".back").html(farsi_word);	
}

function flip(){
    if (!flipped){
		$(".hover").addClass("flip");
		flipped = !flipped;
	} else{
		$(".hover").removeClass("flip")
		flipped = !flipped;
	} 
}

function next(){
// Hitting the next button activates some fancy animation
// and increments cardCount and then calls getACard with
// the incremented value, to return the next card in the set
	if (cardCount >= localStorage.length-1) cardCount = 0;
	else cardCount++;
	if(!flipped){
		$("#next_card").html($(".front").text())
				   .css("z-index", "100");
	} else {
		$("#next_card").html($(".back").text())
				   .css("z-index", "100");
	}
	
	getACard(cardCount);
	$("#next_card").animate({left: '300px'}, function(){
		$("#next_card").css("z-index","-1")
					   .animate({left: '15'});
	});
}

function previous(){
// Basically as above.  Animation is reversed (sort of)
// cardCount is decremented and a card is gotten.
// The principle difference is that I have to cheat and 
// get the text for the "next_card" from localStorage,
// since if I call the function before the card has been 
// put back on top of the stack, the animation doesn't 
// make sense.
	if(cardCount <= 0) cardCount = localStorage.length - 1;
	else cardCount--;
	if(!flipped){
		$("#next_card").html(localStorage.key(cardCount));	
	} else {
		$("#next_card").html(localStorage[localStorage.key(cardCount)]);
	}
	
	$("#next_card").animate({left: '-300px'},
		 function(){
			$("#next_card").css("z-index", "100") 
				   		   .animate({left: '15px'},
				function(){
					getACard(cardCount);
					$("#next_card").css("z-index", "-1");
				   });
		});
}

function endOfStack(){
	if (cardCount > localStorage.length - 1) cardCount = 0;

}



