// This event triggers on page load
document.addEventListener("load", function () {
    console.log("Hello!");
    $(".fakeloader").fakeLoader({

        timeToHide: 20000000, //Time in milliseconds for fakeLoader disappear
        spinner: "spinner1",//Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7'
        bgColor: "#2ecc71", //Hex, RGB or RGBA colors

    })
    console.log("Hello!");
    loadCourses();
});


var CourseModule = (function () {

    // Return anything that you want to expose outside the closure
    return {
        getCourses: function (callback) {

            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://msashnobee.azurewebsites.net/api/Courses",
                success: function (data) {
                    console.log(data);
                    callback(data);
                }
            });

        }
    };
}());

function loadCourses() {

    // We need a reference to the div/table that we are going to chuck our data into
    var courseTable = document.getElementById("tblcoursecontent");

    StudentModule.getStudents(function (courseList) {
        setupCoursesTable(courseList);
    });

    // This is the callback for when the data comes back in the studentmodule
    function setupCoursesTable(courses) {
        console.log(courses);

        for (i = 0; i < courses.length; i++) {

            // Create row 
            var row = document.createElement('tr');

            // Add the columns in the row (td / data cells)
            var titelCol = document.createElement('td');
            titelCol.innerHTML = courses[i].Title;
            row.appendChild(titelCol);

            var creditsCol = document.createElement('td');
            creditsCol.innerHTML = courses[i].Credits;
            row.appendChild(creditsCol);

            // Append the row to the end of the table
            courseTable.appendChild(row);

        }
    }
}