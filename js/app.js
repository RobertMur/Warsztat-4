$(document).ready(function() {
	
	var rootDiv = $("#root");
	refreshBooks(rootDiv);
	handleForm();

	rootDiv.on('click' , '.book', function() {
		console.log($(this).data("id"));
		var bookDiv = $(this);
		var detailDiv = bookDiv.find('div');
		var bookId = $(this).data("id");
// tutaj mam samego JASON: http://localhost:8282/books/3
		$.ajax({
			url: "http://localhost:8282/books/" + bookId,
			type: "GET"
		}).done(function(bookDetails) {
			detailDiv.show();
			detailDiv.text("Autor: " + bookDetails.author + ", id " +
			bookDetails.id + ", isbn " + bookDetails.isbn + ", publisher "
			+ bookDetails.publisher + ", type " + bookDetails.type);
		});
	})

});


function  handleForm() {
	var form = $('.new-book');
	var submitButton = form.find('#add-button');
	submitButton.on('click' , function (event) {
		event.preventDefault();

		var newBook = {}; // to jest pusty obiekt JavaScript - jego obraazem jest pusty JASON

		newBook.author = $('#author').val();
		newBook.isbn = $('#isbn').val();
		newBook.publisher = $('#publisher').val();
		newBook.title = $('#title').val();
		newBook.type = $('#type').val();

		$.ajax({
			url: "http://localhost:8282/books",
			type: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type' : 'application/json'
			},
			data: JSON.stringify(newBook)
		}).done(function(){
			refreshBooks($('#root'));
		})

	})
}




function refreshBooks(rootElement) {
	rootElement.html("");

	$.ajax({
		url: "http://localhost:8282/books",
		type: "GET"
	}).done(function(data) {
		console.log(data)
// tutaj mam tablice z JASONami: http://localhost:8282/books 
		for (var i = 0; i < data.length; i++) {
			var bookElement = 
							$("<div class='book' data-id='" 
								+ data[i].id + "'>" 
								+ data[i].title + "<div style = 'display : none; background-color:grey;'>"
								+ "</div>"
								+ "</div>");
			rootElement.append(bookElement);
		}
	})
}

