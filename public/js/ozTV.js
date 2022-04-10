//Material Design auto init
M.AutoInit();

var app = angular.module("ozApp",[]);

app.controller("ozController", function($scope, $compile) {
    let socket = io.connect("http://192.168.0.104:4000");
    $scope.myVal= "";

    $scope.genPin = (a) => {
        socket.emit('generatePin', {whichSub: a});
    }

    $scope.pinMSearch = (e, table) => {
        searchTable(e.currentTarget.attributes.id.value, table)
    }

    $scope.login = () => {
        let user = $('#username').val();
        let pass = $('#password').val();
        let gatewayData = {
            user: user,
            pass: pass
        }

        socket.emit('staffLogin', {gatewayData});
    }

    $scope.register = () => {
        let fName = $('#firstname').val();
        let oName = $('#othername').val();
        let lName = $('#lastname').val();
        let phone = $('#phone').val();
        let email = $('#email').val();
        let user = $('#username').val();
        let pass = $('#password').val();
        let cPass = $('#cPass').val();
        
        if(fName != "" && lName != "" && phone != "" && email != "" && user != "" && pass != "" && pass == cPass){
            let gatewayData = {
                fName: fName,
                oName: oName,
                lName: lName,
                phone: phone,
                email: email,
                pass: pass,
                user: user,
            }

            socket.emit('staffRegister', {gatewayData});
        } else {
            M.toast({html: 'Please fill all form fields!'})
        }
        
        
    }
    
    // $scope.logUserOut = (sessionId) => {
        
    //     socket.emit('logUserOut', {sessionId});
    // }   
    
    socket.on('pinGenFdbk', (data) => {
        if(data.status == 200){
            location.reload();
        } else if(data.status == 501){
            alert('Technical Error: Please try againg later');
        }
    });

    socket.on('staffLoginSuccess', (data) => {
        if(data.mStaff.confirmed == 'Y' && data.mStaff.auth == 'Exec'){
            if (typeof(Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.

                // Store
                localStorage.setItem("id", data.mStaff.id);
                localStorage.setItem("firstname", data.mStaff.firstname);
                localStorage.setItem("lastname", data.mStaff.lastname);
                localStorage.setItem("othername", data.mStaff.othername);
                localStorage.setItem("username", data.mStaff.username);
                localStorage.setItem("phone", data.mStaff.phone);
                localStorage.setItem("auth", data.mStaff.auth);
                localStorage.setItem("confirmed", data.mStaff.confirmed);
                
                //redirect to dashboard
                window.location.href = "/dash";
            } else {
                // Sorry! No Web Storage support..

                M.toast({html: 'Please update your browser!'});
            }
            
        } else {
            M.toast({html: 'This page is classified above your pay grade. The CEO has just been informed of your attempt to gain access.'});
        }
    });

    socket.on('staffLoginErrorr', (data) => {
        M.toast({html: 'Wrong/Invalid Login Details. Please try again!'});
    });
    socket.on('staffRegisterFeedback', (data) => {
        if(data.newStaff.status == 200){
            M.toast({html: 'Successfull! Please Login.'});
        } else if(data.newStaff.status == 501) {
            M.toast({html: 'Unsuccessfull! Please try again later.'});
        }
    });
    socket.on('staffRegExistingAccount', (data) => {
        M.toast({html: 'You already have an account! Please contact admin.'});
    });
});

$(document).ready(function(){
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd' 
    });    
    $('.timepicker').timepicker({
        twelveHour: false
    });
});

// $('#createVod input').on('change', () => {
//     let title = $('#title').val();
//     let genre = $('#genre').val();
//     let summary = $('#summary').val();
//     let artistes = $('#artistes').val();
//     let directors = $('#directors').val();
//     let releaseYr = $('#releaseYr').val();
//     let imgPortrait = $('#imgPortrait').val();
//     let imgLandscape = $('#imgLandscape').val();
//     let videoFilename = $('#videoFilename').val();
//     let tags = $('input[name = "vodTags"]:checked').val();
       
//     if(title != "" && genre != "" && summary != "" && artistes != "" && directors != "" && releaseYr != "" && imgPortrait != "" && imgLandscape != "" && videoFilename != "" && tags != undefined){
//         $('#createVod button').removeAttr("disabled");        
//     }
// });

// $('#createTag input').on('keyup', () => {
//     let tagName = $('#tagName').val();
//     let len = tagName.length;
    
//     if(len > 3){
//         $('#createTag button').prop('disabled', false);        
//     } else {
//         $('#createTag button').prop('disabled', true);
//     }
// });



function searchTable(input, table) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    inpt = document.getElementById(input);
    filter = inpt.value.toUpperCase();
    tb = document.getElementById(table);
    tr = tb.getElementsByTagName("tr");
  
    
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            
            if (txtValue.indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
  }

function logout(){
    localStorage.clear();
    window.location.href = "/";
}


