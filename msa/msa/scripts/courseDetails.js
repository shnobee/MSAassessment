document.addEventListener("DOMContentLoaded", function () {

    var id = getUrlParameters("id", "", true);
    console.log(id);

    CourseModule.getCourseById(id, function (course) {
        console.log(course);
        showDetails(course);
    });

    //Setup cancel buttons
   // setupReturn();

});

function showDetails(obj) {
    // Load details
    console.log(obj);
    for (var key in obj) {
        console.log("sdgsdlkfjlsdfklds");
        if (key.toLowerCase == "assessments" && obj[key] != null) {
            for (assessment in obj[key]) {
                var assessmentfield = document.getElementById("Assessments");
                assessmentfield.append('<li>assessment</li>');
            }
        }
        else if (key.toLowerCase() !== "courseid") {
            console.log("tis is the key", key);
            var infoelement = document.getElementById(key);
            console.log(infoelement);
            infoelement.innerHTML = obj[key];
        }
    }
}


var CourseModule = (function () {

    // Return anything that you want to expose outside the closure
    return {
        getCourses: function (callback) {

            $.ajax({
                type: "GET",
                dataType: "json",
                url: "https://msashnobee.azurewebsites.net/api/Courses",
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
                url: "https://msashnobee.azurewebsites.net/api/Courses/" + id,
                success: function (data) {
                    console.log(data);
                    callback(data);
                }
            });

        },

        updateCourse: function (courseid, course, callback) {

            $.ajax({
                url: "https://msashnobee.azurewebsites.net/api/Courses/" + courseid,
                type: "PUT",
                data: course,
                success: function (data, textStatus, jqXHR) {
                    callback();
                }
            });
        },

        addCourse: function (course, callback) {

            $.ajax({
                url: "https://msashnobee.azurewebsites.net/api/Courses/",
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
                url: "https://msashnobee.azurewebsites.net/api/Courses/" + courseid,
                success: function (data) {
                    callback();
                }
            });
        }
    };
}());


function getUrlParameters(parameter, staticURL, decode) {
    /*
     Function: getUrlParameters
     Description: Get the value of URL parameters either from 
                  current URL or static URL
     Author: Tirumal
     URL: www.code-tricks.com
    */
    var currLocation = (staticURL.length) ? staticURL : window.location.search,
        parArr = currLocation.split("?")[1].split("&"),
        returnBool = true;

    for (var i = 0; i < parArr.length; i++) {
        parr = parArr[i].split("=");
        if (parr[0] == parameter) {
            returnBool = true;
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
        } else {
            returnBool = false;
        }
    }

   // if (!returnBool) return false;
};
