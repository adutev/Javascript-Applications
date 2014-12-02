$(function() {
	var headers = {
		'X-Parse-Application-Id': 'hgu05eCqPZInzjRd4W23m6weq7tKTPlbD9NoZYYZ',
		'X-Parse-Application-Id': 'hgu05eCqPZInzjRd4W23m6weq7tKTPlbD9NoZYYZ'
	},

	listCountries();

	function listCountries () {
		$.ajax({
			url: 'https://parse.com/1/classes/Country',
			method: 'GET',
			headers: {'X-Parse-Application-Id':'hgu05eCqPZInzjRd4W23m6weq7tKTPlbD9NoZYYZ',
						'X-Parse-REST-API-Key':'2nbmLv6PPsBJ3nE01k4S1yhFDgiqyEQ5zL7TTYMv'
					}
		})
		.success(function(data) {
			for(var c in data.results) {
				var country = data.results[c];
				$('select').append('<option id="' + country.objectId + '" value="' + country.name +'">' + country.name )
			}			
		})
		.fail(function() {
			console.log("error");
		})			
	}

	function getSelectedCountry () {
		return $('select').children(':selected').attr('id');
	}

	$('#add-country-button').on('click', function() {
		var countryName = $('#create-country').val();
		$.ajax({
			url: 'https://parse.com/1/classes/Country/',
			method: 'POST',
			headers: {'X-Parse-Application-Id':'hgu05eCqPZInzjRd4W23m6weq7tKTPlbD9NoZYYZ',
						'X-Parse-REST-API-Key':'2nbmLv6PPsBJ3nE01k4S1yhFDgiqyEQ5zL7TTYMv'
					},
			data: JSON.stringify({'name': countryName})
		})
		.success(function(data) {
			$('select').children().remove();
			listCountries();
		})
		.fail(function() {
			console.log("error");
		})
			
	});

	$('#delete-country-button').on('click', function() {
		var countryId = getSelectedCountry();
		$.ajax({
			url: 'https://parse.com/1/classes/Country/' + countryId,
			method: 'DELETE',
			headers: {'X-Parse-Application-Id':'hgu05eCqPZInzjRd4W23m6weq7tKTPlbD9NoZYYZ',
						'X-Parse-REST-API-Key':'2nbmLv6PPsBJ3nE01k4S1yhFDgiqyEQ5zL7TTYMv'
					}
		})
		.success(function(data) {
			$('select').children().remove();
			listCountries();
		})
		.fail(function() {
			console.log("error");
		})
			
	});

	$('#edit-country-button').on('click', function() {
		// $.ajax({
		// 	url: 'https://parse.com/1/classes/Country/' + countryId,
		// 	method: 'DELETE',
		// 	headers: {'X-Parse-Application-Id':'hgu05eCqPZInzjRd4W23m6weq7tKTPlbD9NoZYYZ',
		// 				'X-Parse-REST-API-Key':'2nbmLv6PPsBJ3nE01k4S1yhFDgiqyEQ5zL7TTYMv'
		// 			}
		// })
		// .success(function(data) {
		// 	$('select').remove();
		// 	listCountries();
		// })
		// .fail(function() {
		// 	console.log("error");
		// })
			
	});
});
