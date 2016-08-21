
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
    console.log( "second success" );
    var items = data.response.docs;
    for (var i=0;i < items.length ;i++){
        $nytElem.append("<li class='article'><a href='"+ items[i].web_url  + "'>" + items[i].headline.main +"</a>");
        $nytElem.append("<p>" + items[i].snippet + "</p></li>");
   }
   })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
 
    return false;
};


$('#form-container').submit(loadData);
