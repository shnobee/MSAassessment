document.addEventListener("DOMContentLoaded", function () {

    var id = getUrlParameters("id", "", true);
    console.log(id);

    CourseModule.getCourseById(id, function (course) {
        showDetails(course);
    });

    //Setup cancel buttons
    setupReturn();

});

function showDetails(obj) {
    // Load details
    for (var key in obj[key]) {
        if (key.toLowerCase == "assessments") {
            for (assessment in obj[key]) {
                $("<li/>").appendTo("#assessments ul").html(assessment);​
            }
        }
        else if (key.toLowerCase() !== "courseid") {
            var infoelement = document.getElementById(key);
            infoelement.innerHTML = obj[key];
        }
    }
}
