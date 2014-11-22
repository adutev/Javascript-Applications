$(document).ready(function() {
	var input = [
		{
			'manufacturer':'BMW',
			'model':'E92 320i',
			'year':2011,
			'price':50000,
			'class':'Family'
		},
		{
			'manufacturer':'Porsche',
			'model':'Panamera',
			'year':2012,
			'price':100000,
			'class':'Sport'
		},
		{
			'manufacturer':'Peugeot',
			'model':'305',
			'year':1978,
			'price':1000,
			'class':'Family'
		}
	];
	$(function () {
		$.each(input, function(index , entry) {
			if(index === 0) {
				$.each(entry, function(key, value) {
					$('thead tr').append( 
						"<td>" + capitaliseFirstLetter(key) + "</td>");
					});
			}
			$('tbody').append("<tr>" + 
				"<td>" + entry.manufacturer + "</td>" +
				"<td>" + entry.model + "</td>" +
				"<td>" + entry.year + "</td>" +
				"<td>" + entry.price + "</td>" +
				"<td>" + entry.class + "</td></tr>");
		});
	})

	function capitaliseFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
});