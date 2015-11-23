// We've sepearated out all the functions related to making the AJAX calls to the API
// Just keeps things tidy, allows us to keep some things private
document.addEventListener("DOMContentLoaded", function () {
    console.log("reow!");
    loadStudents();
});


var StudentModule = (function () {
	
	// Return anything that you want to expose outside the closure
    return {
        getStudents: function (callback) {

            $.ajax({ 
                type: "GET",
                dataType: "jsonp",
                url: "http://msashnobee.azurewebsites.net/api/Students",
                success: function(data){        
                    console.log(data);
                    callback(data);
                }
             });
			
        },

        addStudent: function (student, callback) {

            $.ajax({
                url: "http://msashnobee.azurewebsites.net/api/Students/",
                type: "POST",
                data: student,
                success: function (data, textStatus, jqXHR) {
                    callback();
                }
            });

        },
	};
}());