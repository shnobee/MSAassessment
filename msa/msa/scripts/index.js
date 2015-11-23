// This event triggers on page load
document.addEventListener("DOMContentLoaded", function () {
    $(".fakeloader").fakeLoader({
        timeToHide: 20000000, //Time in milliseconds for fakeLoader disappear
        spinner: "spinner1",//Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7'
        bgColor: "#2ecc71", //Hex, RGB or RGBA colors

    })
	console.log("This works!");
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