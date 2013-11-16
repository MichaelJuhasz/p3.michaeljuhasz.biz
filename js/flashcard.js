var cardCount = 0;

$(document).ready(function(){
	// Check to see if the user has any cards in localStorage.
	// If not, add some. 
	if (localStorage.length == 0){
		localStorage.setItem("Produce", "محصول");
		localStorage.setItem("Oil", "رروغن");
		localStorage.setItem("Herd", "گله");
		localStorage.setItem("Pitcher", "کوزه");
		localStorage.setItem("Ewe", "میش");
	}

	// getACard sets the first flashcard
	// using .html() to set the English
	// and the returned value to set the Farsi
	var verso_word = getACard(cardCount);

	// Ready the flippling 
	var flipped = false;

	// Flip!
	$("#flippy_card").click(function(){
		if (!flipped){
			$("#flippy_card").flippy({
				duration: '500',
				color_target: '#FCFAE6',
				verso: verso_word
				});
		}
	// Flip back!
		else {
			$("#flippy_card").flippyReverse();
		}
		flipped = !flipped;		 
	});

	// Adding a new card grabs values from form
	// does some animation and sticks the values
	// into localStorage
	$("#submit_button").click(function(){
		var eng_word = $("#english_word").val();
		var far_word = $("#farsi_word").val();

		$("#new_card").html(eng_word)
					  .fadeIn("slow")
					  .animate({
						  left:'500px',
						  bottom:'250px'
						}, 1000)
					  .fadeOut()
					  .animate({
					  	  left:'0px',	
					  	  bottom: '0px'
					  });
		localStorage.setItem(eng_word, far_word);
	});

	// Hitting the next button activates some fancy animation
	// and increments cardCount and then calls getACard with
	// the incremented value, to return the next card in the set
	$("#next").click(function(){
		if (cardCount < localStorage.length-1){
			$("#next_card").html($("#flippy_card").text())
						   .css("z-index", "2");
			verso_word = getACard(++cardCount);
			$("#next_card").animate({left: '300px'}, function(){
				$("#next_card").css("z-index","0")
							   .animate({left: '15'});
			});
		}
	});

	// Basically as above.  Animation is reversed (sort of)
	// cardCount is decremented and a card is gotten.
	// The principle difference is that I have to cheat and 
	// get the text for the "next_card" from localStorage,
	// since if I call the function before the card has been 
	// put back on top of the stack, the animation doesn't 
	// make sense.
	$("#last").click(function(){
		if(cardCount > 0){
			$("#next_card").html(localStorage.key(cardCount-1))
						   .animate({left: '-300px'}, function(){
								$("#next_card").css("z-index", "2") 
						   					   .animate({left: '15px'}, function(){
													verso_word = getACard(--cardCount);
													$("#next_card").css("z-index", "0");
						   });
				});
		}
	});
});	

function getACard(cardCount){
	// Grab key/value pair out of localStorage using the 
	// index passed in the function call.  Set html of 
	// "flippy_card" with one value and return the other.
	var english_word = localStorage.key(cardCount);
	var farsi_word = localStorage[english_word];
	$("#flippy_card").html(english_word);
	return farsi_word;
}

