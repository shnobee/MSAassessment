// We've sepearated out all the functions related to making the AJAX calls to the API
// Just keeps things tidy, allows us to keep some things private
document.addEventListener("DOMContentLoaded", function () {
    console.log("reow!");
    loadStudentsTable();
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


function loadStudentsTable() {

    var studentsTable = document.getElementById("tblstudentcontent");

    StudentModule.getStudents(function (studentsList) {
        setupStudentsTable(studentsList);
    });

    function setupStudentsTable(students) {

        // Loop through list of students
        for (i = 0; i < students.length; i++) {

            // Create row
            var row = document.createElement('tr');
            row.setAttribute("data-id", students[i].ID);

            // Create columns
            var lastnamecol = document.createElement('td');
            lastnamecol.innerHTML = students[i].LastName;
            row.appendChild(lastnamecol);

            var firstnamecol = document.createElement('td');
            firstnamecol.innerHTML = students[i].FirstMidName;
            row.appendChild(firstnamecol);

            var enrollmentdatecol = document.createElement('td');
            enrollmentdatecol.innerHTML = students[i].EnrollmentDate;
            row.appendChild(enrollmentdatecol);

            // Create edit and delete buttons
            var editcol = document.createElement('td');
            var editbtn = document.createElement('button');
            editbtn.className = "btn btn-default";
            editbtn.innerHTML = "Edit";

            // You can set your own attributes to elements. This is pretty handy
            // for idenitfying them without using the id tag, or keeping context
            // between different pages (see the 'detail' page event handler down)
            editbtn.setAttribute("data-id", students[i].ID);
            editbtn.setAttribute("data-btntype", "edit");

            editcol.appendChild(editbtn);
            row.appendChild(editcol);

            var deletecol = document.createElement('td');
            var deletebtn = document.createElement('button');
            deletebtn.className = "btn btn-default";
            deletebtn.innerHTML = "Delete";
            deletebtn.setAttribute("data-id", students[i].ID);
            deletebtn.setAttribute("data-btntype", "delete");

            deletecol.appendChild(deletebtn);
            row.appendChild(deletecol);

            // Add newly created row to the table
            studentsTable.appendChild(row);
        }

        // Show table after it's all loaded
        // The "hidden" class is part of bootstrap
        document.getElementById("tblstudent").classList.remove("hidden");


        // This basically navigates you to more details, edit or delete on the front page respective to the student you clicked
        // For more info, search "Event Delegation" online and have a read
        studentsTable.addEventListener('click', function (e) {
            var target = e.target;

            // Bubble up to tbody - need to bubble the event up because the click occurs in 
            // the td cells but the data-id attribute is in the row (for going to more detail page)
            while (target.nodeName.toLowerCase() !== "tbody") {

                // For all these cases we use the data-id stored in either the cell or the row to keep context
                // between seperate pages

                // Edit
                if (target.getAttribute("data-btntype") === "edit") {
                    window.location.href = 'edit.html' + '?id=' + target.getAttribute("data-id");
                    return;

                    // Delete
                } else if (target.getAttribute("data-btntype") === "delete") {
                    StudentModule.deleteStudent(target.getAttribute("data-id"), function () {
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



var StudentModule = (function () {
	
	// Return anything that you want to expose outside the closure
    return {
        getStudents: function (callback) {

            $.ajax({ 
                type: "GET",
                dataType: "json",
                url: "https://msashnobee.azurewebsites.net/api/Students",
                success: function(data){        
                    console.log(data);
                    callback(data);
                }
             });
			
        },


        getStudentById: function (id, callback) {

            $.ajax({
                type: "GET",
                dataType: "json",
                url: "https://msashnobee.azurewebsites.net/api/Students/" + id,
                success: function (data) {
                    console.log(data);
                    callback(data);
                }
            });

        },

        updateStudent: function (studentid, student, callback) {

            $.ajax({
                url: "https://msashnobee.azurewebsites.net/api/Students/" + studentid,
                type: "PUT",
                data: student,
                success: function (data, textStatus, jqXHR) {
                    callback();
                }
            });
        },

        addStudent: function (student, callback) {

            $.ajax({
                url: "https://msashnobee.azurewebsites.net/api/Students/",
                type: "POST",
                data: student,
                success: function (data, textStatus, jqXHR) {
                    callback();
                }
            });

        },

        deleteStudent: function (studentid, callback) {

            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: "https://msashnobee.azurewebsites.net/api/Students/" + studentid,
                success: function (data) {
                    callback();
                }
            });
        }
	};
}());