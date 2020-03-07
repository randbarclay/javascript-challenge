// from data.js
var tableData = data;
var button = d3.select("#filter-btn");

// javascript skips index 0 ("falsy"), so we prepend
// the dataset with an empty dictionary at index 0
tableData.unshift({});

// populate additional search filter dropdowns
var countryDropdown = d3.select("#country-dropdown");
countryDropdown.selectAll("option")
    //collect only unique values
    .data(d3.map(tableData, d => d.country).keys())
    .enter().append("option").attr("value", d => d)
    .text(d => d).sort(d3.ascending);
//console.log(d3.map(tableData, d => d.country).keys());

var stateDropdown = d3.select("#state-dropdown");
stateDropdown.selectAll("option")
    //collect only unique values
    .data(d3.map(tableData, d => d.state).keys())
    .enter().append("option").attr("value", d => d)
    .text(d => d).sort(d3.ascending);
//console.log(d3.map(tableData, d => d.state).keys());

var cityDropdown = d3.select("#city-dropdown");
cityDropdown.selectAll("option")
    //collect only unique values
    .data(d3.map(tableData, d => d.city).keys())
    .enter().append("option").attr("value", d => d)
    .text(d => d).sort(d3.ascending);   
//console.log(d3.map(tableData, d => d.city).keys());

var shapeDropdown = d3.select("#shape-dropdown");
shapeDropdown.selectAll("option")
    //collect only unique values
    .data(d3.map(tableData, d => d.shape).keys())
    .enter().append("option").attr("value", d => d)
    .text(d => d).sort(d3.ascending); 
//console.log(d3.map(tableData, d => d.shape).keys());

// event listener
button.on("click", function() {
    var filteredData = tableData

    var inputDate = d3.select(".form-control");
    var dateValue = inputDate.property("value");
    console.log(`User searched date: ${dateValue}`);
    if (dateValue.length > 0) {
        filteredData = tableData.filter(data => data.datetime === dateValue);
    };

    var inputCountry = d3.select("#country-dropdown");
    var countryValue = inputCountry.property("value");
    console.log(`User searched country: ${countryValue}`);
    if (countryValue !== "Select One") {
        filteredData = filteredData.filter(c => c.country === countryValue);
    };

    var inputState = d3.select("#state-dropdown");
    var stateValue = inputState.property("value");
    console.log(`User searched state: ${stateValue}`);
    if (stateValue != "Select One") {
        filteredData = filteredData.filter(c => c.state === stateValue);
    };

    var inputCity = d3.select("#city-dropdown");
    var cityValue = inputCity.property("value");
    console.log(`User searched city: ${cityValue}`);
    if (cityValue != "Select One") {
        filteredData = filteredData.filter(c => c.city === cityValue);
    };

    var inputShape = d3.select("#shape-dropdown");
    var shapeValue = inputShape.property("value");
    console.log(`User searched UFO shape: ${shapeValue}`);
    if (shapeValue != "Select One") {
        filteredData = filteredData.filter(c => c.shape === shapeValue);
    };

    // clear out any previously searched dates (otherwise table will keep appending rows)
    d3.selectAll("td").remove()

    filteredData.forEach((ufoMatch) => {
        var row = d3.select("tbody").append("tr");
        Object.entries(ufoMatch).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
});