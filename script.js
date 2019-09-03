$(document).ready(() => {
    getAllBooks();
    getSearchResults();
    handleNavBar();
    // handleLanguageNav();
    changeActiveClass();
    changeActiveClassLang();
});

//Display books on the page as cards
function displayAllBooksToTheList(books){
    let bookList = $("#book-list");
    bookList.html("");
    bookList.hide();
    if(books === undefined || books.length === 0){
        $('#form-alert').show();
        $('#form-alert').removeClass('alert-warning');
        $('#form-alert').addClass('alert-danger');
        $('#form-alert').text('No books available for your search!');
        $('#spinner').hide();
        return;
    } else {
        $('#form-alert').removeClass('alert-danger');
        $('#form-alert').hide();
    }
    books.forEach((book) => {
        let cardItem = $("<div>");    //card for each book
        cardItem.addClass("col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 mb-4");
        let listItem = $("<div>");   //$("<div></div>")  inner book item
        listItem.addClass("card border-0 shadow");
        let bookImage = $("<img>");
        try {
        bookImage.attr('src', book.volumeInfo.imageLinks.thumbnail);
        } catch(error) {
            // console.log(error);
            try {
                bookImage.attr('src', book.volumeInfo.imageLinks.smallThumbnail);
            } catch (err) {
                // console.log(err);
                bookImage.attr('src', "book-placeholder.png");
            }
        }
        bookImage.addClass("book-img card-img-top");
        listItem.append(bookImage);

        let cardBody = $("<div>");
        cardBody.addClass("card-body");
        listItem.append(cardBody);

        let title = $("<h5>");
        title.text(book.volumeInfo.title);
        title.addClass("book-title card-title mb-0");
        cardBody.append(title);
 
        let details = $("<ul>");
        details.addClass("list-group list-group-flush");
        let publisher = $("<li>");
        publisher.addClass("list-group-item");
        let pages = $("<li>");
        pages.addClass("list-group-item");
       
        let lang = $("<li>");
        lang.addClass("list-group-item");
        
        publisher.text("Publisher: " + book.volumeInfo.publisher);
        if(book.volumeInfo.publisher === undefined){
            publisher.text("Publisher: Unknown");
        }
        
        pages.text("Pages: " + book.volumeInfo.pageCount);
        if(book.volumeInfo.pageCount === undefined){
            pages.css('display', 'none');
        }

        let fullLang = book.volumeInfo.language;

        switch(fullLang){
            case "en":
                fullLang = "English";
                break;
            case "nl":
                fullLang = "Dutch";
                break;
            case "bg":
                fullLang = "Bulgarian";
                break;
            case "pl":
                    fullLang = "Polish";
                    break;
            default:
                fullLang = "Other";
        }
        lang.text("Language: " + fullLang);

        details.append(publisher);
        details.append(pages);
        details.append(lang);
        details.hide();
        title.on('click', () => {
            details.toggle();
        })
        listItem.append(details);
        cardItem.append(listItem);
        bookList.append(cardItem);
    });
    $('#spinner').hide();
    bookList.show();
}

//Get books from API
function getAllBooks(category = "JavaScript"){
    $('#spinner').show();
   $.ajax(settings("https://www.googleapis.com/books/v1/volumes?q=" + category)).done(response => {
    //    console.log(response);
       displayAllBooksToTheList(response.items);
   });
}

//Search field
function getSearchResults() {
    $('#btn-search').on('submit', (event) => {
        event.preventDefault();
        let searchQuery = $('#site-search').val();
        if(searchQuery === undefined || searchQuery === ""){
            $('#form-alert').show();
            $('#form-alert').removeClass('alert-danger');
            $('#form-alert').addClass('alert-warning');
            $('#form-alert').text('Please enter something!');
            return "";
        } else {
            $('#form-alert').removeClass('alert-warning');
            $('#form-alert').hide();
        }
        $('#title').text(searchQuery);
        $('#site-search').val("");
        getAllBooks(searchQuery);
    })
}

// Category navigation
function handleNavBar(){
    $('.category-link').each((index, element) => {
        let category = $(element).text();
        // console.log(element);
        $(element).on('click', (event) => {
            event.preventDefault();
            getAllBooks(category);
            $('#title').text(category);
        })
    })
}

// Change active class
function changeActiveClass() {
    $('.category-link').click(function(){
        $('.category-link').removeClass("active");
        $(this).addClass("active");
    })
}

function changeActiveClassLang() {
    $('.lang-link').click(function(){
        $('.lang-link').removeClass("active");
        $(this).addClass("active");
    })
}

    // //Language navigation
    // function handleLanguageNav(){
    //     $('.lang-link').each((index, element) => {
    //         let lang = $(element).text();
    //         $(element).on('click', (event) => {
    //             event.preventDefault();
    //             switch(lang){
    //                 case "English":
    //                     lang = "en";
    //                     break;
    //                 case "Dutch":
    //                     lang = "nl";
    //                     break;
    //                 case "Bulgarian":
    //                     lang = "bg";
    //                     break;
    //                 case "Polish":
    //                     lang = "pl";
    //                     break;
    //             }
    //             getAllBooks(category, lang);
    //         })
    //     })
    // }

// //Filter books by language with langRestrict from API
// function getAllBooks(category = "Javascript", lang = ""){
//     $('#spinner').show();
//     if(lang === undefined || lang === ""){
//         $.ajax(settings("https://www.googleapis.com/books/v1/volumes?q=" + category)).done(response => {
//             displayAllBooksToTheList(response.items);
//         })
//     } else {
//         $.ajax(settings("https://www.googleapis.com/books/v1/volumes?q=" + category + "&langRestrict=" + lang)).done(response => {
//             displayAllBooksToTheList(response.items);
//         })
//     }
// }