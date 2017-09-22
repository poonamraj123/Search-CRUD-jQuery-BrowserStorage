/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = $.ajax({
  url: 'data.json',
  type: 'get',
  dataType: 'json',
  error: function(data){
  },
  success: function(data){
      localStorage.setItem('dataToStore',JSON.stringify(data)); //saving to local storage
        displayTable();         
  }
});
//function to display data
function displayTable(){ 
     var retrievedObject = localStorage.getItem("dataToStore");
     var parsedObject1 = JSON.parse(retrievedObject);
     var html = "<table id='dataTable' border='1|1'>";
    html+="<tr>";
        html+="<th>"+"FirstName"+"</th>";
        html+="<th>"+"lastName"+"</th>";
        html+="<th>"+"Email"+"</th>";
        html+="<th>"+"Phone"+"</th>";
        html+="<th>"+"Batch"+"</th>";
        html+="<th>"+"Address"+"</th>";
        html += "<th>view</th>";
        html += "<th>Edit</th>";
        html += "<th>Delete</th>";
        html+="</tr>";
      for (var i in parsedObject1 ) {
      
        html+="<tr id='parsedObject1[i]'>";
        html+="<td>"+parsedObject1[i].firstname+"</td>";
        html+="<td>"+parsedObject1[i].lastname+"</td>";
        html+="<td>"+parsedObject1[i].email+"</td>";
        html+="<td>"+parsedObject1[i].phone+"</td>";
        html+="<td>"+parsedObject1[i].batch+"</td>";
        html+="<td>"+parsedObject1[i].Address.Personal+"</td>";
         html += '<td><a href = "#" id = "view_'+ i +' ">View</a></td>'; 
         html += "<td><button alt='edit" + i + "' class='edit'>Edit</button></td>";
          html += "<td><button alt='delete" + i + "' class='delete'>Delete</button></td>";
        html+="</tr>";
    }
    
    html+="</table>";
if(localStorage.dataToStore!==null){
    document.getElementById('display').innerHTML = html;
}
else{
    document.getElementById('display').innerHTML += html;
    }
    
    $(".delete").on('click', function () {
         alert('Delete called');
        selected_index = parseInt($(this).attr("alt").replace("delete", ""));
        console.log(selected_index);
        var local = parsedObject1.splice(selected_index, 1);
        localStorage.setItem("dataToStore", JSON.stringify(parsedObject1));
        displayTable();

    });
    
    $(".edit").on("click", function () {
        selected_index = parseInt($(this).attr("alt").replace("edit", ""));
        console.log(selected_index);
        // var per = JSON.parse(parsedObject1[selected_index]); 
        $("#firstname").val(parsedObject1[selected_index].firstname);
        $("#lastname").val(parsedObject1[selected_index].lastname);
        $("#batch").val(parsedObject1[selected_index].batch);
        $("#phone").val(parsedObject1[selected_index].phone);
        $("#email").val(parsedObject1[selected_index].email);
        $("#location").val(parsedObject1[selected_index].Location);
        $('#address').val(parsedObject1[selected_index].Address.Personal);
          $('#previous_employer').val(parsedObject1[selected_index].Previous_employer.facebook);
        
         
        parsedObject1.splice(selected_index, 1);
        localStorage.setItem("data_obj", JSON.stringify(parsedObject1));
       Edit();
        //$("#submit").replaceWith("<button style='width:100%' onclick='Edit()'>Update</button>");
    });

}



function Edit() {
   var firstname = $('#firstname').val();
   
    var formArray = {Name: fName.value, Email: fEmail.value,
        Contact: fContact.value, Location: fLocation.value};
    //parsedObject1.splice(selected_index, 1);
    localArray = JSON.parse(localStorage.getItem('data_obj'));
    if (!localArray) {
        // Push the new data (whether it be an object or anything else) onto the array
        localArray.slice(selected_index);
        var local = localArray.push(formArray);
        // var local1= localArray.splice(selected_index, 1,local);
        localStorage.setItem('dataToStore', JSON.stringify(localArray));
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
        var firstName = document.getElementById("firstname");
        var lastName = document.getElementById("lastname");
        var phoneNo= document.getElementById("phone");
        var fEmail = document.getElementById("email");
        var fBatch = document.getElementById("batch");
        var faddress = document.getElementById("address");
        var flocation = document.getElementById("location");
        

        var formArray = {FirstName: firstName.value, LastName: lastName.value,
            PhoneNumber: phoneNo.value, Email: fEmail.value,Batch:fBatch,Address:faddress,location:flocation};
        // console.log(formArray);                
        // Parse the serialized data back into an aray of objects
        localArray = JSON.parse(localStorage.getItem('dataToStore'));

        // Push the new data (whether it be an object or anything else) onto the array
        var local = localArray.push(formArray);

        // Re-serialize the array back into a string and store it in localStorage
        localStorage.setItem('dataToStore', JSON.stringify(localArray));
        //function call for display in table
        displayTable(local);

 }
}

function Delete() {
    localArray.splice(selected_index, 1);
    localStorage.setItem("data_obj", JSON.stringify(localArray));
    alert("Record deleted successfully!");
}