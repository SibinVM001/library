
//constants

const $username = $('#username');
const $password = $('#password');
const $loginBtn = $('#loginBtn');
const $errorMsg = $('#errorMsg');

const $loginForm = $('#loginForm');

const $department = $('#department');
const $course = $('#course');
const $name = $('#name');

const $address = $('#address');
const $confirmAddress = $('#confirmAddress');
const $confirmAddressContainer = $('#confirmAddressContainer')
const $editAddressBtn = $('#editAddressBtn');
const $confAddress = $('#confAddress');
const $saveAddressBtn = $('#saveAddressBtn');

const $phone = $('#phone');

const $showBookBtn = $('#showBookBtn');
const $assignedDetails = $('#assignedDetails');
const $selectBooksModal = $('#selectBooksModal');

const $authorName = $('#authorName');
const $bookName = $('#bookName');
const $addBookBtn = $('#addBookBtn');
const $bookErrorMsg = $('#bookErrorMsg');

const bookAssignedDetails = {}

const app = {

    adminLogin : function(data) {

        $.ajax({

            url : "data/admin.json",
            type : "GET",
            success : data

        });

    },

    departmentDetails : function(data) {

        $.ajax({

            url : "data/departments.json",
            type : "GET",
            success : data

        });

    },

    studentsDetails : function(data) {

        $.ajax({

            url : "data/students.json",
            type : "GET",
            success : data

        });

    },

    bookDeatils : function(data) {

        $.ajax({

            url : "data/books.json",
            type : "GET",
            success : data

        });

    },

    keyUpFunction : function(key, msg){

        app.adminLogin(function(data) {
            if(data[key] == $("#"+key).val()) {

                $errorMsg.css('visibility','hidden');
                return true;

            } else {

                $errorMsg.text(msg);
                $errorMsg.css('visibility','visible');

            };
        });

    },

    loginBtnOnClick : function() {

        app.adminLogin(function(data) {
            if(data['username'] != $username.val()) {
                console.log(data['username'])
                $errorMsg.text("Incorrect username");
                $errorMsg.css('visibility','visible');

            } else if(data['password'] != $("#password").val()) {

                $errorMsg.text("Incorrect Password");
                $errorMsg.css('visibility','visible');

            } else {

                $loginForm.submit();

            };
        });
        
    },

    selectDepartment : function() { 

        if($department.attr('class') == 'department') {

            $department.removeClass('department');
            $department.html('<option value="">Select Department</option>');

            app.departmentDetails(function(data) {
                for(key in data){

                    $department.append("<option value='"+key+"'>"+key+"</option>");

                }
            });
        };

    },

    selectCourse : function(value) {

        $course.html('<option value="">Select Course</option>');

        app.departmentDetails(function(data) {
            for(key in data){
                if(key == value){
                    data[key].forEach(function(item) {

                        $course.append("<option value='"+item+"'>"+item+"</option>");

                    });
                };
            };
        });

    },

    selectStudent : function(value) {

        $name.html('<option value="">Select Name</option>')

        app.studentsDetails(function(data) {
            data.forEach(function(item) {
                if(value == item['course']){

                    $name.append("<option value='"+item['name']+"'>"+item['name']+"</option>");

                };
            });
        });

    },

    viewStudentDetails : function(value) {

        app.studentsDetails(function(data) {
            data.forEach(function(item) {
                if(value == item['name']){

                    $address.text(item['address']);
                    $phone.val(item['phone']);

                    window.localStorage.setItem('id', item['id']);
                    window.localStorage.setItem('name', item['name']);

                    $bookErrorMsg.css('visibility', 'hidden')
                    $('.booksList').css('display', 'none');

                    var id = window.localStorage.getItem('id');
                    var name = window.localStorage.getItem('name');
                    
                    for(key in bookAssignedDetails) {
                        if(key == id){     
                            app.bookDeatils(function(data) {
                                for(author in data) {

                                    var slno = 0;

                                    for(i in bookAssignedDetails[id]) {

                                        slno = slno + 1;

                                        if(data[author].includes(bookAssignedDetails[id][i])) {

                                            $assignedDetails.append("<tr class='booksList'><th>"+slno+"</th><td>"+name+"</td><td>"+bookAssignedDetails[id][i]+"</td><td>"+author+"</td><td><button class='btn btn-danger' onclick='app.deleteItems("+i+");'>Delete</button></td></tr>");

                                        };
                                    };  
                                };
                            });
                        };
                    };
                };
            });
        });

    },


    selectAuthor : function() {

        if($authorName.attr('class') == 'authorName') {

            $authorName.removeClass('authorName');
            $authorName.html('<option value="">Select an Author</option>');

            app.bookDeatils(function(data) {
                for(key in data){

                    $authorName.append("<option value='"+key+"'>"+key+"</option>");

                };
            });
        };

    },

    appendBooksNames : function(value) {

        $bookName.html('<option value="">Select a Book</option>');

        app.bookDeatils(function(data) {
            for(key in data){
                if(key == value){
                    data[key].forEach(function(item) {

                        $bookName.append("<option value='"+item+"'>"+item+"</option>");

                    });
                };
            };
        });

        $bookErrorMsg.css('visibility', 'hidden')

    },

    selectBook : function() {

        if($bookName.attr('class') == 'bookName') {

            $bookName.removeClass('bookName');
            $bookName.html('<option value="">Select a Book</option>');

            app.bookDeatils(function(data) {
                for(key in data){
                    data[key].forEach(function(item) {

                        $bookName.append("<option value='"+item+"'>"+item+"</option>");

                    });
                };
            });
        };

    },

    deleteItems : function(index) {

        $('.booksList').css('display', 'none');
    
        var id = window.localStorage.getItem('id');
        var name = window.localStorage.getItem('name');
        var slno = 0;
    
        for(key in bookAssignedDetails) {
    
            if(key == id){  
                bookAssignedDetails[id].splice(index,1); 
    
                app.bookDeatils(function(data) {
    
                    for(author in data) {
                        
    
                        for(i in bookAssignedDetails[id]) {
                    
                            if(data[author].includes(bookAssignedDetails[id][i])) {

                                slno = slno + 1;

                                $assignedDetails.append("<tr class='booksList'><th>"+slno+"</th><td>"+name+"</td><td>"+bookAssignedDetails[id][i]+"</td><td>"+author+"</td><td><button class='btn btn-danger' onclick='app.deleteItems("+i+");'>Delete</button></td></tr>")

                            };
                        };                  
                    };
                });
            };
        };

    }

};


//document ready events

$(document).ready(function() {

    app.selectDepartment();
    app.selectAuthor();
    app.selectBook();
    
});


//keyup events

$username.keyup(function() {

    app.keyUpFunction("username", "Incorrect username");

});

$password.keyup(function() {

    app.keyUpFunction("password", "Incorrect Password");

});


//click events

$loginBtn.click(function() {

    app.loginBtnOnClick();

});

$editAddressBtn.click(function() {

    $confirmAddressContainer.removeClass('d-none');
    $address.removeAttr('readonly');
    $editAddressBtn.css('display', 'none')

});

$saveAddressBtn.click(function() {

    if($confAddress.is(":checked") == true){

        alert('successfully changed the address');

        $confirmAddressContainer.addClass('d-none');
        $address.attr('readonly', true);
        $editAddressBtn.css('display', 'flex')

    } else {

        alert('Please confirm your address')

    };

});

$showBookBtn.click(function() {

    if($department.val() == ''){

        alert('Please select a department')

    } else if($course.val() == '') {

        alert('Please select a course')

    } else if($name.val() == '') {

        alert('Please select a student name')

    } else { 

        $selectBooksModal.modal('show');

    };

});

$authorName.click(function() {

    app.selectAuthor();

});

$addBookBtn.click(function(){

    var id = window.localStorage.getItem('id');
    var name = window.localStorage.getItem('name');
    var slno = 0;
    
    if($bookName.val() == ''){

        $bookErrorMsg.css('visibility', 'visible')
        $bookErrorMsg.text('Please select a book from list');

    } else {
        if($.isEmptyObject(bookAssignedDetails) == true) {

            tempArray = [];
            tempArray.push($bookName.val());
            bookAssignedDetails[id] = tempArray;

            $selectBooksModal.modal('hide');
            $bookErrorMsg.css('visibility', 'hidden');

        } else {
            for(key in bookAssignedDetails) {
                if(key == id){
                    if(bookAssignedDetails[id].includes($bookName.val())) {
                      
                        $bookErrorMsg.css('visibility', 'visible');
                        $bookErrorMsg.text('Book was alreday taken by '+$name.val());

                    } else {

                        tempArray = bookAssignedDetails[id];
                        tempArray.push($bookName.val());

                        $selectBooksModal.modal('hide');

                        $bookErrorMsg.css('visibility', 'hidden');

                    };
                } 
                else {
                    if($.isEmptyObject(bookAssignedDetails[id]) == true) {

                        tempArray = [];

                        tempArray.push($bookName.val());
                        bookAssignedDetails[id] = tempArray;

                        $selectBooksModal.modal('hide');
                        $bookErrorMsg.css('visibility', 'hidden');

                    } else {
                        if(key == id){
                            if(bookAssignedDetails[id].includes($bookName.val())) {

                                $bookErrorMsg.css('visibility', 'visible');
                                $bookErrorMsg.text('Book was alreday taken by '+$name.val());
        
                            } else {
        
                                tempArray = bookAssignedDetails[id];
                                tempArray.push($bookName.val());

                                $selectBooksModal.modal('hide');

                                $bookErrorMsg.css('visibility', 'hidden');
        
                            };
                        };
                    };
                };
                
            };
        };
        

        $('.booksList').css('display', 'none');

        for(key in bookAssignedDetails) {
            
            if(key == id){     
                app.bookDeatils(function(data) {
                    for(author in data) {
                        for(i in bookAssignedDetails[id]) {
                            
                            if(data[author].includes(bookAssignedDetails[id][i])) {

                                slno = slno + 1;

                                $assignedDetails.append("<tr class='booksList'><th>"+slno+"</th><td>"+name+"</td><td>"+bookAssignedDetails[id][i]+"</td><td>"+author+"</td><td><button class='btn btn-danger' onclick='app.deleteItems("+i+");'>Delete</button></td></tr>");

                            };
                        };       
                    };
                });
            };
        };
    };
});


//change events

$username.change(function() {

    app.keyUpFunction("username", "Incorrect username");

});

$password.change(function() {

    app.keyUpFunction("password", "Incorrect Password");

});

$department.change(function() {

    app.selectCourse($(this).val());

});

$course.change(function() {

    app.selectStudent($(this).val());

});

$name.change(function() {

    app.viewStudentDetails($(this).val());

});

$address.change(function() {

    $confirmAddress.text($(this).val());

});

$confAddress.change(function() {

    $confirmAddress.text($address.val())

});

$authorName.change(function() {

    app.appendBooksNames($(this).val());

});

$bookName.change(function() {

    $bookErrorMsg.css('visibility', 'hidden');

})


