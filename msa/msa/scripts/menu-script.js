
$(document).ready(function () {
    $("#coursesMenuButton").on("click", function () {
        $("#content").load("courses.html");
    });
});


$(document).ready(function () {
    $("#studentsMenuButton").on("click", function () {
        $("#content").load("students.html");
    });
});

