// We've sepearated out all the functions related to making the AJAX calls to the API
// Just keeps things tidy, allows us to keep some things private
document.addEventListener("DOMContentLoaded", function () {
    console.log("reow!");
    loadStudents();
});

function loadStudents(){
	
	// We need a reference to the div/table that we are going to chuck our data into
    var studentsTable = document.getElementById("tblstudentcontent");

    StudentModule.getStudents(function (studentsList) {
        setupStudentsTable(studentsList);
    });
	
	// This is the callback for when the data comes back in the studentmodule
	function setupStudentsTable(students) {
	    console.log(students);

		for (i = 0; i < students.length; i++) {
            
            // Create row 
            var row = document.createElement('tr');

            // Add the columns in the row (td / data cells)
            var lastnamecol = document.createElement('td');
            lastnamecol.innerHTML = students[i].LastName;
            row.appendChild(lastnamecol);

            var firstnamecol = document.createElement('td');
            firstnamecol.innerHTML = students[i].FirstMidName;
            row.appendChild(firstnamecol);

            var enrollmentdatecol = document.createElement('td');
            enrollmentdatecol.innerHTML = students[i].EnrollmentDate;
            row.appendChild(enrollmentdatecol);
            
            // Append the row to the end of the table
            studentsTable.appendChild(row);

		}
	}
} 


var StudentModule = (function () {
	
	// Return anything that you want to expose outside the closure
    return {
        getStudents: function (callback) {

            $.ajax({ 
                type: "GET",
                dataType: "json",
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