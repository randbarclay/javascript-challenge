// from data.js
var tableData = data;
var button = d3.select("#filter-btn");

button.on("click", function() {
    var inputDate = d3.select(".form-control");
    var inputValue = inputDate.property("value");
    console.log(`User searched date: ${inputValue}`);
    
    var filteredData = tableData.filter(data => data.datetime === inputValue);
    console.log(filteredData)

    // clear out any previously searched dates (otherwise table will keep appending rows)
    var data = d3.selectAll("td")
    data.remove()

    filteredData.forEach((ufoMatch) => {
        var row = d3.select("tbody").append("tr");
        Object.entries(ufoMatch).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
});