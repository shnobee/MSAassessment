// This event triggers on page load
document.addEventListener("DOMContentLoaded", function () {
    console.log("Hello!");
    $(".fakeloader").fakeLoader({

        timeToHide: 20000000, //Time in milliseconds for fakeLoader disappear
        spinner: "spinner1",//Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7'
        bgColor: "#2ecc71", //Hex, RGB or RGBA colors

    })
    console.log("Hello!");
    loadCoursesTable();
});


var CourseModule = (function () {

    // Return anything that you want to expose outside the closure
    return {
        getCourses: function (callback) {

            $.ajax({
                type: "GET",
                dataType: "json",
                url: "http://msashnobee.azurewebsites.net/api/Courses",
                success: function (data) {
                    console.log(data);
                    callback(data);
                }
            });

        },

        getCourseById: function (id, callback) {

            $.ajax({
                type: "GET",
                dataType: "json",
                url: "http://msashnobee.azurewebsites.net/api/Courses/" + id,
                success: function (data) {
                    console.log(data);
                    callback(data);
                }
            });

        },

        updateCourse: function (courseid, course, callback) {

            $.ajax({
                url: "http://msashnobee.azurewebsites.net/api/Courses/" + courseid,
                type: "PUT",
                data: course,
                success: function (data, textStatus, jqXHR) {
                    callback();
                }
            });
        },

        addCourse: function (course, callback) {

            $.ajax({
                url: "http://msashnobee.azurewebsites.net/api/Courses/",
                type: "POST",
                data: course,
                success: function (data, textStatus, jqXHR) {
                    callback();
                }
            });

        },

        deleteCourse: function (courseid, callback) {

            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: "http://msashnobee.azurewebsites.net/api/Courses/" + courseid,
                success: function (data) {
                    callback();
                }
            });
        }
    };
}());

function loadCourses() {

    // We need a reference to the div/table that we are going to chuck our data into
    var courseTable = document.getElementById("tblcoursecontent");

    CourseModule.getCourses(function (courseList) {
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

function loadCoursesTable() {

    var coursesTable = document.getElementById("tblcoursecontent");

    CourseModule.getCourses(function (coursesList) {
        setupCoursesTable(coursesList);
    });

    function setupCoursesTable(courses) {

        // Loop through list of courses
        for (i = 0; i < courses.length; i++) {

            // Create row
            var row = document.createElement('tr');
            row.setAttribute("data-id", courses[i].CourseID);

            // Create columns
            var titleCol = document.createElement('td');
            titleCol.innerHTML = courses[i].Title;
            row.appendChild(titleCol);

            var creditCol = document.createElement('td');
            creditCol.innerHTML = courses[i].Credits;
            row.appendChild(creditCol);


            // Create edit and delete buttons
            var editcol = document.createElement('td');
            var editbtn = document.createElement('button');
            editbtn.className = "btn btn-default";
            editbtn.innerHTML = "Edit";

            // You can set your own attributes to elements. This is pretty handy
            // for idenitfying them without using the id tag, or keeping context
            // between different pages (see the 'detail' page event handler down)
            editbtn.setAttribute("data-id", courses[i].CourseID);
            editbtn.setAttribute("data-btntype", "edit");

            editcol.appendChild(editbtn);
            row.appendChild(editcol);

            var deletecol = document.createElement('td');
            var deletebtn = document.createElement('button');
            deletebtn.className = "btn btn-default";
            deletebtn.innerHTML = "Delete";
            deletebtn.setAttribute("data-id", courses[i].CourseID);
            deletebtn.setAttribute("data-btntype", "delete");

            deletecol.appendChild(deletebtn);
            row.appendChild(deletecol);

            // Add newly created row to the table
            coursesTable.appendChild(row);
        }

        // Show table after it's all loaded
        // The "hidden" class is part of bootstrap



        // This basically navigates you to more details, edit or delete on the front page respective to the student you clicked
        // For more info, search "Event Delegation" online and have a read
        coursesTable.addEventListener('click', function (e) {
            var target = e.target;

            // Bubble up to tbody - need to bubble the event up because the click occurs in 
            // the td cells but the data-id attribute is in the row (for going to more detail page)
            while (target.nodeName.toLowerCase() !== "tbody") {

                // For all these cases we use the data-id stored in either the cell or the row to keep context
                // between seperate pages

                // Edit
                if (target.getAttribute("data-btntype") === "edit") {
                    window.location.href = 'editCourse.html' + '?id=' + target.getAttribute("data-id");
                    return;

                    // Delete
                } else if (target.getAttribute("data-btntype") === "delete") {
                    CourseModule.deleteCourse(target.getAttribute("data-id"), function () {
                        window.location.reload(true);
                    });
                    return;

                    // Detail - this is true if clicked anywhere within the row
                } else if (target.nodeName.toLowerCase() === "tr") {
                    window.location.href = 'detail.html' + '?id=' + target.getAttribute("data-id");
                    return;
                }

                // Keep bubbling the event up through the DOM
                target = target.parentNode;
            }
        });
    }

};