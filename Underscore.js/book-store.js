(function() {
	'use strict';
	var books = [{
		"book": "The Grapes of Wrath",
		"author": "John Steinbeck",
		"price": "34,24",
		"language": "French"
	}, {
		"book": "The Great Gatsby",
		"author": "F. Scott Fitzgerald",
		"price": "49,26",
		"language": "English"
	},{
		"book": "The Great Gatsby v2",
		"author": "F. Scott Fitzgerald",
		"price": "39,26",
		"language": "English"
	}, {
		"book": "Nineteen Eighty-Four",
		"author": "George Orwell",
		"price": "15,39",
		"language": "English"
	}, {
		"book": "Ulysses",
		"author": "James Joyce",
		"price": "23,26",
		"language": "German"
	}, {
		"book": "Lolita",
		"author": "Vladimir Nabokov",
		"price": "14,19",
		"language": "German"
	}, {
		"book": "Catch-22",
		"author": "Joseph Heller",
		"price": "47,89",
		"language": "German"
	}, {
		"book": "The Catcher in the Rye",
		"author": "J. D. Salinger",
		"price": "25,16",
		"language": "English"
	}, {
		"book": "Beloved",
		"author": "Toni Morrison",
		"price": "48,61",
		"language": "French"
	}, {
		"book": "Of Mice and Men",
		"author": "John Steinbeck",
		"price": "29,81",
		"language": "Bulgarian"
	}, {
		"book": "Animal Farm",
		"author": "George Orwell",
		"price": "38,42",
		"language": "English"
	}, {
		"book": "Finnegans Wake",
		"author": "James Joyce",
		"price": "29,59",
		"language": "English"
	}, {
		"book": "The Grapes of Wrath",
		"author": "John Steinbeck",
		"price": "42,94",
		"language": "English"
	}]

	// 	Group all books by language and sort them by author (if two books have the same author, sort by price)
	var groupedByLanguageSortedByAuthor = _.chain(books)
		.sortBy('price')
		.sortBy('author')
		.groupBy('language')
		.value();

	console.log('\n----- Group all books by language and sort them by author -----');
	_.each(groupedByLanguageSortedByAuthor, function(book) {
		console.log(book[0].language)
		_.each(book, function (groupedBook) {
			console.log('book: ' + groupedBook.book +
				', author: ' + groupedBook.author +
				', price: ' + groupedBook.price);
		});
	})
	// Get the average book price for each author
	var groupedAuthors = _.groupBy(books, 'author');

	console.log('\n----- Get the average book price for each author -----');
	_.each(groupedAuthors, function(book) {
		var sum = 0;
		var counter = 0;
		_.each(book, function () {
			sum += parseFloat(book[counter].price.replace(',', '.'));
			counter ++;
		});
		var average = sum/counter;
		console.log(book[0].author + ' has ' + counter + ' books, with average price of ' +  average.toFixed(2) + '.');
	})
	
	// Get all books in English or German, with price below 30.00, and group them by author
	var filteredBooks = _.chain(books)
	.filter(function (book) {
		return (book.language === 'English' || book.language === 'German') && parseFloat(book.price.replace(',', '.')) < 30
	})
	.sortBy('author')
	.value();

	console.log('\n----- All books in English or German, with price below 30.00, and grouped by author -----')
	_.each(filteredBooks, function (book) {
		console.log(book.book + ', author: ' + book.author +
			', language: ' + book.language +
			', price: ' + book.price)
	})
}())