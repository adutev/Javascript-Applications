(function () {
	$('document').ready(function function_name (argument) {
		$('#get-countries').click(function () {
			updateList();
		})

		$('#add-country').click(function () {
			var countryToAdd = $('#create-country').val();
			addCountry(countryToAdd);
		})

		
		function updateList () {
			$.ajax({
				url: 'https://parse.com/1/classes/Country',
				method: 'GET',
				headers: {'X-Parse-Application-Id':'hgu05eCqPZInzjRd4W23m6weq7tKTPlbD9NoZYYZ',
							'X-Parse-REST-API-Key':'2nbmLv6PPsBJ3nE01k4S1yhFDgiqyEQ5zL7TTYMv'
						}
			})
			.success(function(data) {
				listCountries(data);
			})
			.fail(function() {
				console.log("error");
			})			
		}

		function listCountries (data) {
			$('.list-item').remove();
			for (var c in data.results) {
				var country = data.results[c];
				$('#countries-list').append('<li class="list-item" id="' + country.objectId + '">' + country.name);
			};
		}

		function addCountry (country) {
			$.ajax({
				method: 'POST',
				headers: {'X-Parse-Application-Id':'hgu05eCqPZInzjRd4W23m6weq7tKTPlbD9NoZYYZ',
							'X-Parse-REST-API-Key':'2nbmLv6PPsBJ3nE01k4S1yhFDgiqyEQ5zL7TTYMv'
						},
				url: 'https://parse.com/1/classes/Country',
  				data: '{"name":"' + country + '"}',
  				contentType: "application/json"
			})
			.success(function() {
				updateList();
			})
			.fail(function() {
				console.log("error");
			})			
		}
	})
})()
