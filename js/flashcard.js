var cardCount = 0;
// Ready the flippling 
var flipped = false;

$(document).ready(function(){

	localStorage.clear();
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
		// localStorage.setItem("Early riser","سحر خیز");
		// localStorage.setItem("Day break","سحر");
		// localStorage.setItem("Palace", "کاخ");
		// localStorage.setItem("To spill/pour","ریختن");
		// localStorage.setItem("To hit","خوردن");
		// localStorage.setItem("Firmly, fast", "محکم");
		// localStorage.setItem("Like this","اینطور");
		// localStorage.setItem("Walking stick","عصا");
		// localStorage.setItem("To recruit, to employ","استخدام کردن");
		// localStorage.setItem("Serving woman","خدمتکار زن");
		// localStorage.setItem("Service","خدمت");
		// localStorage.setItem("Spouse","همسر");
		// localStorage.setItem("Marriage","ازدواج");
		// localStorage.setItem("Suitor","خواستگار");
		// localStorage.setItem("Wealthy","ثروتمند");
		// localStorage.setItem("Wealth","ثروت");
		// localStorage.setItem("To spread, to flatten","پهن کردن");
		// localStorage.setItem("Price","قیمت");
		// localStorage.setItem("Precious","قیمتی");
		// localStorage.setItem("Carpet","فرش ,قالی");
		// localStorage.setItem("To build","ساختن");
		// localStorage.setItem("To plant/grow","کاشتن");
		// localStorage.setItem("Abundant","فراوان");
		// localStorage.setItem("Vast","وسیع");
		// localStorage.setItem("To give birth to","به دنیا اوردن ,زائید");
		// localStorage.setItem("Female","ماده");
		// localStorage.setItem("Male","نر");
		// localStorage.setItem("Unit 1","");
		// localStorage.setItem("Husband","شوهر");
		// localStorage.setItem("Have a good time","خوش گذشتن");
		// localStorage.setItem("To expect","انتظار داشتن");
		// localStorage.setItem("Expectation","انتظار");
		// localStorage.setItem("Beautiful","زیبا");
		// localStorage.setItem("I liked it","از ان خوشم امد");
		// localStorage.setItem("To smell","بو دادن");
		// localStorage.setItem("Dirty","کثیف");
		// localStorage.setItem("Ground/land/earth","زمین");
		// localStorage.setItem("Gas station","پمپ بنزین");
		// localStorage.setItem("Gasoline","بنزین");
		// localStorage.setItem("Fuel","سوخت");
		// localStorage.setItem("To stay","توقف کردن");
		// localStorage.setItem("Clean","تمیز");
		// localStorage.setItem("Glass","لیوان");
		// localStorage.setItem("Among, between","بین ,میان");
		// localStorage.setItem("To listen","گوش دادن");
		// localStorage.setItem("To be careful","دقت کردن");
		// localStorage.setItem("Accuracy","دقت");
		// localStorage.setItem("Quiet","ساکت");
		// localStorage.setItem("Music","موسیقی");
		// localStorage.setItem("Radio","رادیو");
		// localStorage.setItem("To offer","تعارف کردن");
		// localStorage.setItem("Offer/compliment","تعارف");
		// localStorage.setItem("To divide","تقسیم کردن");
		// localStorage.setItem("Box","جعبه");
		// localStorage.setItem("To watch","تماشا کردن");
		// localStorage.setItem("View","منظره");
		// localStorage.setItem("To talk","صحبت کردن");
		// localStorage.setItem("Conversation","صحبت");
		// localStorage.setItem("Magazine","مجله");
		// localStorage.setItem("Newspaper","روزنامه");
		// localStorage.setItem("Some groups","بعض ها");
		// localStorage.setItem("Some of","بعض ان");
		// localStorage.setItem("To move, set off","حرکت کردن");
		// localStorage.setItem("Movement, motion","حرکت");
		// localStorage.setItem("Round trip ticket","بلیط دو سره");
		// localStorage.setItem("Passenger service","مسافربری");
		// localStorage.setItem("Attractive, interesting","جالب");
		// localStorage.setItem("Monument","اثار تاریخی");
		// localStorage.setItem("Phenomena","اثار");
		// localStorage.setItem("Archaeology","باستان شناسی");
		// localStorage.setItem("To survey","بازدید کردن");
		// localStorage.setItem("Return, visit","بازدید");
		// localStorage.setItem("To make an appointment","قرار گذاشتن");
		// localStorage.setItem("Arrangement","قرار");
		// localStorage.setItem("Birthday, birth","تولد");
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
	if (cardCount < localStorage.length-1){
		if(!flipped){
			$("#next_card").html($(".front").text())
					   .css("z-index", "100");
		} else {
			$("#next_card").html($(".back").text())
					   .css("z-index", "100");
		}
		
		getACard(++cardCount);
		$("#next_card").animate({left: '300px'}, function(){
			$("#next_card").css("z-index","-1")
						   .animate({left: '15'});
		});
	}
}

function previous(){
// Basically as above.  Animation is reversed (sort of)
// cardCount is decremented and a card is gotten.
// The principle difference is that I have to cheat and 
// get the text for the "next_card" from localStorage,
// since if I call the function before the card has been 
// put back on top of the stack, the animation doesn't 
// make sense.
	if(cardCount > 0){
		if(!flipped){
			$("#next_card").html(localStorage.key(cardCount-1));	
		} else {
			$("#next_card").html(localStorage[localStorage.key(cardCount-1)]);
		}
		
		$("#next_card").animate({left: '-300px'},
			 function(){
				$("#next_card").css("z-index", "100") 
					   		   .animate({left: '15px'},
					function(){
						getACard(--cardCount);
						$("#next_card").css("z-index", "-1");
					   });
			});
	}
}




