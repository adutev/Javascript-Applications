// Using jQuery write a script for adding elements before/after other elements.


(function () {
	$(document).ready(function() {
		$( "#paintButton" ).click(paintBackground);
		printAvailableClasses();
	});

	function paintBackground() {
		var className = $("#className").val();
		var color = $("#colorPicker").val()
		if(className !==''){
			$("." + className).css( "background-color", color );			
		} else {
			alert("Please enter a class name");
		}
	}

	function printAvailableClasses () {
		var classes = [];
		var result = "";
		$('ul li').each(function() {
		    var className = $(this).attr('class');
		    if(classes.indexOf(className) <= -1 && className){
		    	classes.push(className);
		    	result += " " + className + ",";
		    }
		});
		result = result.substring(0, result.length - 1)
		$('p').append(result).css("font-weight","bold");
	}
}());