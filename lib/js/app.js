// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// Ok, confession time. I don't really know what I'm doing here. Let's start with our outcomes.

// First, let's pre-pend the intire document with an anchor to mark it as top
var documentTop = document.createElement("a");
// $(documentTop).addClass("hide");
documentTop.setAttribute('id', 'top');
documentTop.setAttribute('name', 'top');
documentTop.innerHTML = "";
// console.log(documentTop);

// The provided markup doesn't really give me enough distinction between chapter divs, and the one
// one wrapping the document. Let's add an id to the main wrapper.
$( ".section:first" ).addClass( "wrapper" );

$( ".wrapper" ).wrap( "<section id='chapter'></div>" );

// Here comes the fun part. Create a function that finds all the instances of
// h1.title (and h2.title?) - ie. Chapter sections
// I'm unsure of the .title class being there, they're all the same and kind of redundant
// considering h* is considered a title/heading.

var chapterIndex = function() {

  // Create the section block
  var indexMarkup = document.createElement( "section" );
  indexMarkup.setAttribute( "id", "index" );

  // Drop in a nice title
  var myIndexTitle = document.createElement( "h1" );
  $(myIndexTitle).addClass("title");
  myIndexTitle.innerHTML = "Table of contents";
  indexMarkup.appendChild(myIndexTitle);

  // Let's collect an Array of titles and links to construct or index list
  var chapterLinkList = [];

  // Prepend every chapter section with a unique name and id
  // Add each chapter name and ID to an array of subsections
  // Some googling gave me this nice snippet.
  $( "h1.title" ).each( function( index ) {
    var chapterNumber = index + 1;
    var chapterName = chapterNumber + '. ' + $( this ).text();
    
    $(this).prepend(chapterNumber + ". ");

    // Create the anchor element
    var anchor = document.createElement( "a" );

    // So let's use a function to prepend each of these with a unique name/ID
    var anchorName = $(this).text().toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
    // Let's prevent duplicates by adding the index.
    anchorName = "0" + index + "-" + anchorName;

    // Add the id and name attributes
    anchor.setAttribute("id", anchorName);
    anchor.setAttribute("name", anchorName);
    anchor.innerHTML = "";
    // console.log(anchor);

    var anchorLink = '<a href="#' + anchorName + '" title="Jump to ' + chapterName + '">' + chapterName + '</a>';

    chapterLinkList[index] = anchorLink;


    // @TODO: Figure out how to place this before the h1 tag, and not inside
    $(this).parent().prepend(anchor);

    // While we're here, we should add "back to index" links here somewhere
    var backToTop = document.createElement( "a" );
    $(backToTop).addClass("button tiny round");
    backToTop.setAttribute("href", "#top");
    backToTop.setAttribute("title", "Back to start");
    backToTop.innerHTML = "Back to index";
    $(this).parent().append(backToTop);
  });

  // console.log(chapterLinkList);

  var ul = document.createElement( 'ul' );
  $(ul).addClass("side-nav tiny");

  indexMarkup.appendChild(ul);

  // Loop through our collected items
  for ( var i=0; i < chapterLinkList.length; i++ ) {
      var li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML = li.innerHTML + chapterLinkList[i];

  }
  // console.log(indexMarkup);

  return indexMarkup;
}

// Render the created index
$("#chapter").prepend(chapterIndex);
$("body").prepend(documentTop);

