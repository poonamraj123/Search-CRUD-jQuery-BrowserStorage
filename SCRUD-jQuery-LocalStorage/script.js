/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var selected_index = -1;
function displayTable(parsedObject) {
    //retrieve object from local storage
    var retrieved_object = localStorage.getItem('data_obj');
    var parsedObject1 = JSON.parse(retrieved_object);
    // console.log(JSON.stringify(parsedObject1));
    var html = "<table id='dataTable' border='1|1'>";
    html += "<tr>";
    for (var key in parsedObject1[0]) {
        html += "<th>" + key + "</th>";
    }
    html += "<th>Edit</th>";
    html += "<th>Delete</th>";
    html += "</tr>";

    for (var i in parsedObject1) {

        html += "<tr id='parsedObject1[i]'>";
        html += "<td>" + parsedObject1[i].Name + "</td>";
        html += "<td>" + parsedObject1[i].Email + "</td>";
        html += "<td>" + parsedObject1[i].Contact + "</td>";
        html += "<td>" + parsedObject1[i].Location + "</td>";
        html += "<td><button alt='edit" + i + "' class='edit'>Edit</button></td>";
        html += "<td><button alt='delete" + i + "' class='delete'>Delete</button></td>";

        html += "</tr>";
    }
    html += "</table>";

    document.getElementById("dataDispaly").innerHTML = html;

    $(".delete").on("click", function () {

        selected_index = parseInt($(this).attr("alt").replace("delete", ""));
        console.log(selected_index);
        var local = parsedObject1.splice(selected_index, 1);
        localStorage.setItem("data_obj", JSON.stringify(parsedObject1));
        displayTable(local);

    });

    $(".edit").on("click", function () {
        div_show();
        selected_index = parseInt($(this).attr("alt").replace("edit", ""));
        console.log(selected_index);
        // var per = JSON.parse(parsedObject1[selected_index]); 

        $("#name").val(parsedObject1[selected_index].Name);
        $("#email").val(parsedObject1[selected_index].Email);
        $("#contact").val(parsedObject1[selected_index].Contact);
        $("#location").val(parsedObject1[selected_index].Location);
        parsedObject1.splice(selected_index, 1);
        localStorage.setItem("data_obj", JSON.stringify(parsedObject1));
        Edit();
        //$("#submit").replaceWith("<button style='width:100%' onclick='Edit()'>Update</button>");
    });

}
function Edit() {
    var fName = $("#name").val();
     var fEmail = $("#email").val();
    var fContact = $("#contact").val();
    var fLocation = $("#location").val();

    var formArray = {Name: fName.value, Email: fEmail.value,
        Contact: fContact.value, Location: fLocation.value};
    //parsedObject1.splice(selected_index, 1);
    localArray = JSON.parse(localStorage.getItem('data_obj'));
    if (!localArray) {
        // Push the new data (whether it be an object or anything else) onto the array
        localArray.slice(selected_index);
        var local = localArray.push(formArray);
        // var local1= localArray.splice(selected_index, 1,local);
        localStorage.setItem('data_obj', JSON.stringify(localArray));
        //function call for display in table
        displayTable(local1);
    }
}

function formData() {
    var tags = document.getElementsByTagName("input");
    var flag = true;
      var store = document.querySelectorAll('input[type="text"]');
    for (var val of store) {
        var chk = document.getElementById("perr" + val.getAttribute('id'));
        if (val.value == "") {
            flag = false;
            if (!chk) {
                val.insertAdjacentHTML('afterend', '<p style="font-size: 16px;padding: 10px;background-color: #f44336; color: white;margin-bottom: 15px;margin-top: 5px; " data-valid id="perr' + val.getAttribute('id') + '">Please enter  ' + val.getAttribute('id') + ' field</p>');
            }
        } else {
            if (chk) {
                chk.remove();
            }
        }
    }

    if (flag)
    {
        var fName = document.getElementById("name");
        var fEmail = document.getElementById("email");
        var fContact = document.getElementById("contact");
        var fLocation = document.getElementById("location");

        var formArray = {Name: fName.value, Email: fEmail.value,
            Contact: fContact.value, Location: fLocation.value};
        // console.log(formArray);                
        // Parse the serialized data back into an aray of objects
        localArray = JSON.parse(localStorage.getItem('data_obj'));

        // Push the new data (whether it be an object or anything else) onto the array
        var local = localArray.push(formArray);

        // Re-serialize the array back into a string and store it in localStorage
        localStorage.setItem('data_obj', JSON.stringify(localArray));
        //function call for display in table
        displayTable(local);

    }
}

// Json File

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    // body...
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        //	document.getElementById("abc").innerHTML = xhttp.responseText;
        var obj = xhttp.responseText;
        var parsedObject = JSON.parse(obj);
        var dataToStore = JSON.stringify(parsedObject);
        var retrievedData = localStorage.getItem('data_obj');
        //console.log(parsedObject);
        if (!retrievedData) {
            //parsing data of JSON

            //Storing Json Object in local storage
            localStorage.setItem('data_obj', dataToStore);

            //function call for display in table
            displayTable(parsedObject);
        } else {
            displayTable(parsedObject);
        }
    }
};
//get method
xhttp.open('GET', 'data.json');
xhttp.send();
function Delete() {
    localArray.splice(selected_index, 1);
    localStorage.setItem("data_obj", JSON.stringify(localArray));
    alert("Record deleted successfully!");
}