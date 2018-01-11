
//Initial array of feelings



//Function for displaying buttons
function renderButtons(){
	//Deletes feelings before adding new feelings- otherwise I'd have repeat buttons
	$("#buttons-view").empty();

	//Loops through the array of feelings
	for (var i = 0; i < feelings.length; i++) {
		//dynamically creates buttons for each feeling in the array
		var button = $("<button>");
		button.addClass("feelings");
		button.attr("data-feeling", feelings[i]);
		button.text(feelings[i]);
		$("#buttons-view").append(button);

	}
}

 
//Function for when add feelings button is clicked
$("#add-feelings").click( function(event){
	event.preventDefault();

	//grabs input from textbox
	var feeling = $("#feelings-input").val().trim();

	//feeling from textbox is added to the array
	feelings.push(feeling);

	//call renderButtons which handles processing of the feeling array
	renderButtons();

	//clear the form
	$("#feelings-input").val("");


});

// var feelings = ["Excited", "Sad", "Confused", "Angry", "Impatient", "Hungry"];

// //Function for displaying gifs
// $("#buttons-view").on("click", function displayGifs(){
// 	var term = $(this).attr("data-name");
// 	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=U87WNSwB2BRO8nOJBfxhr7gPPAVryXD4&q=" + term + 
// 	"&limit=10&offset=0&rating=G&lang=en";

// 	$.ajax({
// 		url: queryURL,
// 		method: "GET"
// 	}).done(function(response){
// 		console.log(response);
// 		// console.log("hello");
	
// 	// var results = response.data;

// 		for(var i = 0; i < response.length; i++){ 

// 		var gifDiv = $("<div class='item'>");
// 		// var rating = results.rating;
// 		var p = $("<p>").text("Rating: " + response.rating[i]);
// 		var gifImage = $("<img>");

// 		console.log(response[i].data.images);
// 		gifImage.attr("src", response[i].data.images.fixed_height_small.url);

// 		gifDiv.append(p);
// 		gifDiv.append(gifImage);


// 		$("#gifs-appear-here").prepend(gifDiv);
// 		// $("#gifs-appear-here").empty();

// 		}	
// 	});
// });
var feelings = ["Excited", "Sad", "Confused", "Angry", "Impatient", "Hungry", "Surprised", "Happy"];

//Function for displaying gifs
function displayGifs(){
	var term = $(this).attr("data-feeling");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=U87WNSwB2BRO8nOJBfxhr7gPPAVryXD4&q=" + term + 
	"&limit=10&offset=0&rating=G&lang=en";

	$("#gifs-appear-here").empty();

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		// console.log("hello");
		var response = response.data
		console.log(response)

	for(var i = 0; i < response.length; i++){
		// console.log("hello")

	var gifDiv = $("<div class='item'>");
	var rating = response[i].rating;
	var p = $("<p>").text("Rating: " + rating);
	var gifImage = $("<img>");

	gifImage.attr("data-state", "still")
	gifImage.attr("data-animate", response[i].images.fixed_height_small.url)
	gifImage.attr("data-still", response[i].images.fixed_height_small_still.url)

	// console.log(response[i].images);
	gifImage.attr("src", response[i].images.fixed_height_small_still.url);

	gifDiv.append(p);
	gifDiv.append(gifImage);


	
	$("#gifs-appear-here").append(gifDiv);	
	}
	});
}

$(document).on("click", ".feelings", displayGifs)

$(document).on("click", "img", function(){
	// console.log("image is clicked")
	var state = $(this).attr("data-state");

	if (state == 'still'){
		var animatedURL = $(this).attr("data-animate")
		$(this).attr("src", animatedURL)
		$(this).attr("data-state", "animate")
	} else if (state == "animate"){
		var stillURL = $(this).attr("data-still")
		$(this).attr("src", stillURL)
		$(this).attr("data-state", "still");
	}
})

//Calling the displayGifs function
// displayGifs();

// Calling the renderButtons function to display the intial buttons
renderButtons();