
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var locationUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ streetStr + ',' + cityStr;
   
    $body.append('<img class="bgimg" src="' + locationUrl + '">');

   // load NYTimes data

 var nyTimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  nyTimesUrl += '?' + $.param({
  'api-key': "08b7ac160dda4cbbb91126ee6bbae817",
  'q': "keywords=" +cityStr,
   'sort': "newest"   
 });

// could have asle said
// var nyTimesUrl =  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&sort=newest&api-key=xxxxxxxxxxx";

/*$.ajax({
  url: nyTimesUrl,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});
*/

$.getJSON( nyTimesUrl, function(data) {
  console.log( "success" );
})
  .done(function(data) {
   // console.log( "second success" );
    $nytHeaderElem.text('New York Times Articles About ' + cityStr);

    var items = data.response.docs;
    for (var i=0;i < items.length ;i++){
        $nytElem.append("<li class='article'><a href='"+ items[i].web_url  + "'>" + items[i].headline.main +"</a>");
        $nytElem.append("<p>" + items[i].snippet + "</p></li>");
   }
   })
   .fail(function() {
     $nytHeaderElem.text('Ney York Times Articles Could Not Be Loaded');  
  })
  .always(function() {
    console.log( "complete" );
  });

//WikiLink  code goes here             /w/api.php?action=opensearch&format=json&search=Te

var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+cityStr;
 

$.ajax({
  url: wikiUrl,
  dataType: "jsonp"
 // method: 'GET',
}).done(function(result) {
  var articleList = result[1];
  for (var i=0; i < articleList.length; i++) {
   articleTitle = articleList[i];
   var url = "http://en.wikipedia.org/wiki/" + articleTitle;
   $wikiElem.append('<li><a href= "' + url + '">' + articleTitle + '</a></li>');
  }
  //console.log('wiki result' + result);
}).fail(function(jqXHR, textStatus) {
  console.log('wiki request failed' + textStatus);
});
    return false;
};


$('#form-container').submit(loadData);
