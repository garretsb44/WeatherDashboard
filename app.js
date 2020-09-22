
$(function () {
   
    var apiKey = "4cf6da0f79c797b2789a37722f92a030";
  
    function fetchWeatherForCity(city) {
      var queryUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        apiKey;
  
      var queryUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        apiKey;
  
      // send ajax request for current weather to OpenWeatherAPI
      $.ajax({
        url: queryUrl,
        method: "GET",
      })
        .then(function (data) {
          console.log(data);

          $("#city-name").text(data.name + " Weather");
          $("#temp").text(data.main.temp + "°");
          $("#wind").text(data.wind.speed + " mph");
          $("#humidity").text(data.main.humidity + " %");
  
        
          $("#search-input").val("");
        })
        .catch(function (error) {
          // BONUS: Handle failed search
          console.log("Error Code: " + error.status);
          console.log("Error Status: " + error.statusText);
          alert("Could not find weather for " + city);
        });
    }
     // listen for "submit" event on the #search-form
    $("#search-form").on("submit", function (event) {
      event.preventDefault();
  
      var city = $("#search-input").val().trim();

      if (city === "") {
        return;
      }
    // send ajax request for weather and display it
      fetchWeatherForCity(city);
    });

       // $(document).on("click", ".city", function () {
    //   // get the name of the city using the data-city attribute of the clicked
    //   // element
    //   var city = $(this).attr("data-city");
  
    //   // send ajax request for weather and display it
    //   fetchWeatherForCity(city);
    // });
    function updatePage(data) {
      var $cityList = $("<ul>");
      $cityList.addClass("list-group");
      
      $("#searched-cities").append($cityList);
    }
    updatePage();

    $("#run-search").on("click", function(event) {
      // This line allows us to take advantage of the HTML "submit" property
      // This way we can hit enter on the keyboard and it registers the search
      // (in addition to clicks). Prevents the page from reloading on form submit.
      event.preventDefault();
    
      // Empty the region associated with the articles
      clear();
    
      // Build the query URL for the ajax request to the NYT API
      var queryURL = buildQueryURL();
    
      // Make the AJAX request to the API - GETs the JSON data at the queryURL.
      // The data then gets passed as an argument to the updatePage function
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(updatePage);
    });
    
    //  .on("click") function associated with the clear button
    $("#clear-all").on("click", clear);
    

  });
  