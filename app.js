
$(function () {
   
    var apiKey = "4cf6da0f79c797b2789a37722f92a030";
    var cityHistory = JSON.parse(window.localStorage.getItem("cities")) || [];
  
    function getCityWeather(city) {
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
  
          getFiveForecast(city)
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
      getCityWeather(city);
      searchedCities(city);
      //wrap cityHistory and setItem function in if statement that checks if new city is already in array
      cityHistory.push(city);
       
      window.localStorage.setItem("cities", JSON.stringify(cityHistory));
    });
    //create event listener for each search history 
    //listen to ul by id  and listen for click and access button that clicked
    function searchedCities(data) {
      var cityList = $("<li>");
      var cityBtn = $("<button>").addClass("btn").text(data).val(data);
      cityList.append(cityBtn);
    $("#searched-cities").append(cityList);
    }
   

    function getFiveForecast(city) {
      var queryUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=" +
        apiKey;
  
      // send ajax request for current weather to OpenWeatherAPI
      $.ajax({
        url: queryUrl,
        method: "GET",
      }).then(function (data) {
        console.log(data);
        var days = data.list.filter(day => {
          return day.dt_txt.includes("15:00:00")
        });
        console.log(days);

        for (var i = 0; i < days.length; i++){
          var day1 = $("<div>").addClass("col");
          var card1 = $("<div>").addClass("card");
          var cardBody = $("<div>").addClass("card-body");
          var temp = $("<p>").text("Temp (F): " + days[i].main.temp + "°");
          var humidityDay1 = $("<p>").text("Humidity: " + days[i].main.humidity + " %");
          day1.append(card1);
          card1.append(cardBody);
          cardBody.append(temp,humidityDay1,); //add all others inside append with commas
          $("#fiveDayForecast").append(day1);
        }
       

      })

  }

  for (var i=0; i< cityHistory.length; i++){
    searchedCities(cityHistory[i]);
  };
  // function clear() {
  //   $("#searched-cities").empty();
  // }
  // $("#search-form").on("click", function(event) {
  //   // This line allows us to take advantage of the HTML "submit" property
  //   // This way we can hit enter on the keyboard and it registers the search
  //   // (in addition to clicks). Prevents the page from reloading on form submit.
  //   event.preventDefault();
  
  //   // Empty the region associated with the articles
  //   clear();
  
  // });
});
  