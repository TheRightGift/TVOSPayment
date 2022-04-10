var App = angular.module("App", ['ngRoute', 'ngCookies']);
App.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'homeUi.html',
        controller: 'homeCtrl'
    })
    .when('/dashboard', {
        templateUrl: 'dashUi.html',
        controller: 'dashboardCtrl'
    })
    .when('/systManager', {
        templateUrl: 'systManagerUi.html',
        controller: 'systManagerCtrl'
    })
    .when('/systData', {
        templateUrl: 'systDataUi.html',
        controller: 'systDataCtrl'
    })
    .when('/patientDetail/:patientId', {
        templateUrl: 'patientDetailUi.html',
        controller: 'patientDetailCtrl'
    })
    .when('/edit/:id/:num', {
        templateUrl: 'editUi.html',
        controller: 'editCtrl'
    })
    .when('/logout', {
        templateUrl: 'logoutUi.html',
        controller: 'logoutCtrl'
    })
    .otherwise({
        redirectTo: '/'
    })
});

App.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
App.service('gateway', function($http){
    this.logUserIn = function(reg){
        var response = $http({
            method	: "POST",
            url		: "server/gateway.php",
            params 	: {
                    reg : reg
            }
        });
        return response;
    }
});

App.service('Staff', function($http){
    this.getWard = function(){
        var response = $http({
            method	: "POST",
            url		: "server/staff.php",
            params 	: {
                    par : 'Ward'
            }
        });
        return response;
    }

    this.getStaff = function(){
        var response = $http({
            method	: "POST",
            url		: "server/staff.php",
            params 	: {
                    par : 'All'
            }
        });
        return response;
    }

    this.getStaffPosition = function(reg){
        var response = $http({
            method	: "POST",
            url		: "server/staff.php",
            params 	: {
                    par : 'Pos'
            }
        });
        return response;
    }

    this.insertStaff = function(pos, fName, sName, oName, phone, dob, add, stateR){
        var response = $http({
            method	: "POST",
            url		: "server/staff.php",
            params 	: {
                    par : 'New',
                    pos : pos,
                    fName : fName,
                    sName : sName,
                    oName : oName,
                    phone : phone,
                    dob : dob,
                    add : add,
                    state : stateR                 
            }
        });
        return response;
    }
});

App.service('Drugs', function($http){
    this.getDrugs = function(reg){
        var response = $http({
            method	: "POST",
            url		: "server/drugs.php",
            params 	: {
                    par : 'All'
            }
        });
        return response;
    }

    this.insertDrug = function(drugN, amt){
        var response = $http({
            method	: "POST",
            url		: "server/drugs.php",
            params 	: {
                    par : 'Add',
                    drugName : drugN,
                    amt : amt                
            }
        });
        return response;
    }
});

App.service('patients', function($http){
    this.getPatients = function(){
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'All'
            }
        });
        return response;
    }

    this.getPatient = function(id){
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'Single',
                    id: id
            }
        });
        return response;
    }

    this.getPatientEdit = function(id){
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'Edit',
                    id: id
            }
        });
        return response;
    }

    this.getPatientRec = function(id){
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'pRec',
                    id: id
            }
        });
        return response;
    }

    this.getPatientMed = function(patId) {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'pMed',
                    id: patId
            }
        });
        return response;
    }

    this.updatePatient = function(id, table, col, rec, rec1)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'Update',
                    id : id,
                    table : table,
                    col : col,
                    rec : rec,
                    rec1 : rec1
            }
        });
        return response;
    }

    this.addAllergy = function(id, rec)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'Allergy',
                    id : id,                        
                    rec : rec
            }
        });
        return response;
    }

    this.addSurg = function(id, surg, note, phyId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'Surg',
                    id : id,
                    surg : surg,                        
                    note : note,
                    phyId: phyId
            }
        });
        return response;
    }

    this.addAdmit = function(visitId, wardId, patId, phyId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'Admit',
                    visitId : visitId,
                    wardId: wardId,
                    patId: patId,
                    phyId: phyId
            }
        });
        return response;
    }

    this.deleteAllergy = function(id)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'Del',
                    id : id
            }
        });
        return response;
    }

    this.deletePatients = function(id)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'delPat',
                    id : id
            }
        });
        return response;
    }

    this.sendToDoc = function(patId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'toDoc',
                    patId : patId
            }
        });
        return response;
    }

    this.sendToPharm = function(patId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'toPharm',
                    patId : patId
            }
        });
        return response;
    }

    this.sendToLab = function(patId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'toLab',
                    patId : patId
            }
        });
        return response;
    }

    this.getSee = function(patId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'See',
                    patId : patId
            }
        });
        return response;
    }

    this.getToSee = function(patId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'toSee'
            }
        });
        return response;
    }

    this.patientToSendToDr = function()
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'receptSendIn'
            }
        });
        return response;
    }
    
    this.sendPatientToDr = function(id)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'receptSentIn',
                    id : id
            }
        });
        return response;
    }

    this.sendIn = function(visitId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'sndIn',
                    visitId: visitId
            }
        });
        return response;
    }

    this.drugPayment = function(patVisitDrugId, price)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'payDrug',
                    patVisitDrugId: patVisitDrugId,
                    price: price
            }
        });
        return response;
    }

    this.delDrugPayment = function(id, price)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'delPayDrug',
                    patVisitDrugId: id,
                    price: price
            }
        });
        return response;
    }

    
    this.consultPayment = function(id, price)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'payConsult',
                    id: id,
                    price, price
            }
        });
        return response;
    }

    this.delConsultPayment = function(id, price)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'delPayConsult',
                    id: id,
                    price, price
            }
        });
        return response;
    }



    this.patientsForDrugs = function()
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'pat4Drug'
            }
        });
        return response;
    }

    this.getPaidDrugs = function(visitId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'paidDrug',
                    visitId: visitId
            }
        });
        return response;
    }

    this.issueDrugs = function(id)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'issueDrug',
                    id: id
            }
        });
        return response;
    }

    this.cancelIssueDrugs = function(id)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'noIssueDrug',
                    id: id
            }
        });
        return response;
    }

    this.patientMedication = function()
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'medic'
            }
        });
        return response;
    }
  
    this.patientMedicDet = function(patId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'medicDet',
                    patId : patId
            }
        });
        return response;
    }

    this.medicationDone = function(id, staffId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'medicDone',
                    id : id,
                    staffId: staffId
            }
        });
        return response;
    }

    this.patientLab = function()
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'Lab'
            }
        });
        return response;
    }

    this.addParastoUrine = function(uro, ketones, yeast, casts, wbc, bill, sugar, rbc, protien, reaction, gravity, appear, pvId, staffId)
    {
        var response = $http({
            method	: "POST",
            url		: "server/patient.php",
            params 	: {
                    par : 'paraUrine', 
                    pvId: pvId,
                    appear: appear,
                    gravity: gravity,
                    reaction: reaction,
                    protien: protien,
                    rbc: rbc,
                    sugar: sugar,
                    bill: bill,
                    wbc: wbc,
                    casts: casts,
                    yeast: yeast,
                    ketones: ketones,
                    uro: uro,
                    staffId: staffId
            }
        });
        return response;
    }
});

App.service('addPatient', function($http){
    this.getEthnicGrp = function(){
        var response = $http({
            method	: "POST",
            url		: "server/addPatient.php",
            params 	: {
                    par : 'Ethnic'
            }
        });
        return response;
    }

    this.getReligion = function(){
        var response = $http({
            method	: "POST",
            url		: "server/addPatient.php",
            params 	: {
                    par : 'Religion'
            }
        });
        return response;
    }

    this.getBloodG = function(){
        var response = $http({
            method	: "POST",
            url		: "server/addPatient.php",
            params 	: {
                    par : 'BloodG'
            }
        });
        return response;
    }

    this.getGenoT = function(){
        var response = $http({
            method	: "POST",
            url		: "server/addPatient.php",
            params 	: {
                    par : 'GenoT'
            }
        });
        return response;
    }

    this.getStates = function(){
        var response = $http({
            method	: "POST",
            url		: "server/addPatient.php",
            params 	: {
                    par : 'State'
            }
        });
        return response;
    }

    this.getDosage = function(){
        var response = $http({
            method	: "POST",
            url		: "server/addPatient.php",
            params 	: {
                    par : 'dose'
            }
        });
        return response;
    }

    this.insertPatient = function(fName, sName, oName, phone, dob, occupation, religion, ethnic, bloodG, geno, state, add, stateR, nokFname, nokSname, nokOname, nokPhone, nokAdd, nokState){
        var response = $http({
            method	: "POST",
            url		: "server/addPatient.php",
            params 	: {
                    par : 'new',
                    fName : fName,
                    sName : sName,
                    oName : oName,
                    phone : phone,
                    dob : dob,
                    occupation : occupation,
                    religion : religion,
                    ethnic : ethnic,
                    bloodG : bloodG,
                    geno : geno,
                    state: state,
                    add : add,
                    stateR : stateR,
                    nokFname : nokFname,
                    nokSname : nokSname,
                    nokOname : nokOname,
                    nokPhone : nokPhone,
                    nokAdd : nokAdd,
                    nokState : nokState
            }
        });
        return response;
    }

    this.patientConsult = function(notes, fees, visitId, phyId, ward, surg, surgeon, surgNotes) {
        var response = $http({
            method	: "POST",
            url		: "server/addPatient.php",
            params 	: {
                    par : 'Consult',
                    notes : notes,
                    fees : fees,
                    visitId : visitId,
                    phyId: phyId,
                    ward : ward,
                    surg: surg,
                    surgeon: surgeon,
                    surgNotes: surgNotes
            }
        });
        return response;
    }

    this.patientConsultDrug = function(drugId, doseId, days, months, years, hospAdmin, visitId) {
        var response = $http({
            method	: "POST",
            url		: "server/addPatient.php",
            params 	: {
                    par : 'consultDrug',
                    drugId : drugId,
                    doseId : doseId,
                    days : days,
                    months : months,
                    years : years,
                    hospAdmin: hospAdmin,
                    visitId : visitId
            }
        });
        return response;
    }
});

App.factory("sessionService", ["$cookies", function($cookies) {
        var id = "";
        var fName = "";
        var lName = "";
        var sUser = "";
        var loggedIn = "";
        var position = "";

        return {
            setCookieData: function(id, firstname, lastname, superUser, position, hosp) {
                id = id;
                fName = firstname;
                lName = lastname;
                sUser = superUser;
                position = position;
                hosp = hosp;
                $cookies.put("id", id);
                $cookies.put("fName", fName);
                $cookies.put("lName", lName);
                $cookies.put("sUser", sUser);
                $cookies.put("position", position);
                $cookies.put("hosp", hosp);
                $cookies.put("loggedIn", 'Y');
            },
            getCookieData: function() {
                var data = [];
                data['sUser'] = $cookies.get("sUser");
                data['fName'] = $cookies.get("fName");
                data['lName'] = $cookies.get("lName");
                data['loggedIn'] = $cookies.get("loggedIn");
                data['id'] = $cookies.get("id");
                data['position'] = $cookies.get("position");
                data['hosp'] = $cookies.get("hosp");
                return data;
            },
            clearCookieData: function() {
                $cookies.remove("id");
                $cookies.remove("fName");
                $cookies.remove("lName");
                $cookies.remove("sUser");
                $cookies.remove("position");
                $cookies.remove("hosp");
                $cookies.remove("loggedIn");
            }
        }
    }
]);

App.controller("logoutCtrl", function($scope, $cookies, $location, gateway, sessionService){
    $cookies.remove("id");
    $cookies.remove("fName");
    $cookies.remove("lName");
    $cookies.remove("sUser");
    $cookies.remove("loggedIn");
    $cookies.remove("hosp");

    $location.path( "/" );
       
});

App.controller("homeCtrl", function($scope, $http, $location, gateway, sessionService){
    var data = sessionService.getCookieData();
    if(data.loggedIn === 'Y')
    {
        $location.path( "/dashboard" );
    } else {
        
        $scope.login = function(){
            var code = $scope.loginCode;
            var res = gateway.logUserIn(code);
            res.then( function(res) {
                var userId = res.data.staff.id;
                var fName = res.data.staff.firstname;
                var lName = res.data.staff.lastname;
                var sUser = res.data.staff.superUser;
                var position = res.data.staff.position;
                var institution = res.data.staff.name;

                
                sessionService.setCookieData (userId, fName, lName, sUser, position, institution);  
                var data = sessionService.getCookieData();
                if(data.loggedIn === 'Y')
                {
                    $location.path( "/dashboard" );
                }
            }, function () {
                alert('Error in getting User record');
            });

            
        }
    }
    
});

App.controller("dashboardCtrl", function($scope, $location, $route, sessionService, addPatient, patients, Drugs, Staff){
    var data = sessionService.getCookieData();
    if(data.loggedIn !== 'Y')
    {
        $location.path( "/" );
    } else {
        $scope.whoAreYou = data.position;
        $scope.superUser = data.sUser;
        $scope.hosp = data.hosp;
        $scope.name = data.fName+' '+data.lName;


        //DATA 4 ADD PATIENT
        //Ethnic Grp
        var res = addPatient.getEthnicGrp();
        res.then( function(res) {
            $scope.ethnics = res.data;
        }, function () {
            alert('Error in getting Ethnic Groups');
        });

        //Religion
        var res = addPatient.getReligion();
        res.then( function(res) {
            $scope.religions = res.data;
        }, function () {
            alert('Error in getting Religions');
        });

        //Blood Group             
        var res = addPatient.getBloodG();
        res.then( function(res) {
            $scope.bloodGroups = res.data;
        }, function () {
            alert('Error in getting Blood Groups');
        });

        //Genotype             
        var res = addPatient.getGenoT();
        res.then( function(res) {
            $scope.genotypes = res.data;
        }, function () {
            alert('Error in getting Genotypes');
        });

        //State             
        var res = addPatient.getStates();
        res.then( function(res) {
            $scope.states = res.data;
        }, function () {
            alert('Error in getting States');
        });

        //Dosage            
        var res = addPatient.getDosage();
        res.then( function(res) {
            $scope.dosages = res.data;
        }, function () {
            alert('Error in getting Drug Dosage');
        });

        //Submit addPatient Form
        $scope.submitPatientForm = function(isValid, patient){
            // check to make sure the form is completely valid
            if (isValid) {
                var fName = patient.fName;
                var sName = patient.sName;
                if(patient.oName)
                {
                    var oName = patient.oName;
                } else {
                    var oName = "";
                }
                
                var phone = patient.phone;
                var dob = patient.dob;
                var occupation = patient.occupation;
                var religion = patient.religion;
                var ethnic = patient.ethnic;
                if(patient.bloodG)
                {
                    var bloodG = patient.bloodG;
                } else {
                    var bloodG = 0;
                }
                if(patient.geno)
                {
                    var geno = patient.geno;
                } else {
                    var geno = 0;
                }
                
                var state = patient.state;
                var add = patient.add ;
                var stateR = patient.stateR ;
                var nokFname = patient.nokFname ;
                var nokSname = patient.nokSname ;
                if(patient.nokOname){
                    var nokOname = patient.nokOname ;
                } else {
                    var nokOname = '' ;
                }
                
                var nokPhone = patient.nokPhone ;
                var nokAdd = patient.nokAdd ;
                var nokState = patient.nokState ;

                var res = addPatient.insertPatient(fName, sName, oName, phone, dob, occupation, religion, ethnic, bloodG, geno, state, add, stateR, nokFname, nokSname, nokOname, nokPhone, nokAdd, nokState);
                res.then( function(res) {
                    if(res.data == 1)
                    {
                        $('#addPatient').modal('hide');
                        //reload Page
                        $route.reload();
                    } else if(res.data == 2){
                        $scope.addPatientErr = 1;
                    }
                });
            }
        }

        //Get all Patient             
        var res = patients.getPatients();
        res.then( function(res) {
            $scope.patients = res.data;
            $scope.patientsNum = res.data.length;
        }, function () {
            alert('Error in Communicating with Database');
        });

        //Edit Patient
        $scope.editPatient = function(id){
            alert(id)
            var res = patients.getPatient(id);
            res.then( function(res) {
                $scope.fName = res.data[0]['basicData']['firstname'];
                $scope.sName = res.data[0]['basicData']['surname'];
                $scope.oName = res.data[0]['basicData']['othername'];
                $scope.phone = res.data[0]['basicData']['phone'];
                $scope.geno = res.data[0]['basicData']['genotype'];
                $scope.blood = res.data[0]['basicData']['bloodGroup'];
                $scope.add = res.data[0]['basicData']['address'];
                $scope.state = res.data[0]['basicData']['state'];
                $scope.allergies = res.data[0]['allergy'];

                $scope.id = patId;
            }, function () {
                alert('Error in getting Patient\'s bio data');
            });
        }

        //Get Patients to see             
        var res = patients.getToSee();
        res.then( function(res) {
            $scope.seePatients = res.data;
            $scope.seePatientsNum = res.data.length;
        }, function () {
            alert('Error in getting States');
        });

        //Send Patient In
        $scope.sendIn = function(visitId)
        {
            var res = patients.sendIn(visitId);
            res.then( function(res) {
                
                if(res.data == 1)
                {
                    //reload Page
                    $route.reload();
                }
            }, function () {
                alert('Error in communication');
            });
        } 

        //Get Drugs         
        var res = Drugs.getDrugs();
        res.then( function(res) {
            //console.log(res.data);
            $scope.drugLen = res.data.length;
            $scope.drugs = res.data;
        }, function () {
            alert('Error in getting drugs');
        });

        //Get Staff data         
        var res = Staff.getStaff();
        res.then( function(res) {
            $scope.staffLen = res.data.length;
            $scope.staff = res.data;
        }, function () {
            alert('Error in getting staff data');
        });

        //Get Ward data         
        var res = Staff.getWard();
        res.then( function(rs1) {
            $scope.wards = rs1.data;                
        }, function () {
            alert('Error in getting staff data');
        });

        //Drug Prescription Duration Days
        $scope.days = [];
        for(var a = 1; a <= 31; a++)
        {
            $scope.days.push(a);
        }

        //Drug Prescription Duration Months
        $scope.months = [];
        for(var a = 1; a <= 12; a++)
        {
            $scope.months.push(a);
        }

        //Drug Prescription Duration Years
        $scope.years = [];
        for(var a = 1; a <= 5; a++)
        {
            $scope.years.push(a);
        }


        //Manage show and hide surgery and admission in consultation form
        $scope.showSurg = true;

        $scope.displaySurg = function(){
            $scope.showSurg = !$scope.showSurg;
        }

        $scope.showAdmit = true;

        $scope.displayAdmit = function(){
            $scope.showAdmit = !$scope.showAdmit;
        }

        //Submit consultation form
        $scope.setPatientId = function(id){
            $scope.visitId = id;
        }

        //HANDLE DRUG PRESCRIPTION
        $scope.selection = [];

        // Toggle selection for a given drug by name
        $scope.toggleSelection = function toggleSelection(drug, id) {
            var len = $scope.selection.length;
            

            var which;
            var exists = 0;
            
            for(var a = 0; a < len; a++)
            {
                if($scope.selection[a]['drugId'] === id)//if drugId exists
                {
                    which = a;//get index of
                    exists = 1;//tell me it exists
                }
                
            }

            if(exists === 0)//if not exist
            {
                $scope.selection[len] = new Array();
                $scope.selection[len]['drugId'] = id;
                $scope.selection[len]['doseId'] = 0;
                $scope.selection[len]['days'] = 0;
                $scope.selection[len]['months'] = 0;
                $scope.selection[len]['years'] = 0;
                $scope.selection[len]['hospAdmin'] = 'N';
                console.log($scope.selection);
            } else {//if exists the unseleceted
                $scope.selection.splice(which, 1);
            }

            if ($scope.isDrugShown(drug)) {
                $scope.shownDrug = null;
            } else {
                $scope.shownDrug = drug;
            }

        };

        //control behaviour for showing drug dosage and duration
        $scope.isDrugShown = function(drug) {
            return $scope.shownDrug === drug;
        };

        //get dosage detail and input in Drug array
        $scope.toggleSelectDose = function(drugId, doseId){
            var len = $scope.selection.length;
            

            var which;
            var exists = 0;
            
            for(var a = 0; a < len; a++)
            {
                if($scope.selection[a]['drugId'] === drugId)//if drugId exists
                {
                    which = a;//get index of
                    exists = 1;//tell me it exists
                }
                
            }

            if(exists === 0)//if not exist
            {
                /*$scope.selection[len] = new Array();
                $scope.selection[len]['drugId'] = drugId;
                $scope.selection[len]['doseId'] = doseId;
                $scope.selection[len]['duration'] = 0;
                console.log($scope.selection);*/
            } else {//if exists update doseId
                $scope.selection[which]['doseId'] = doseId;               
                console.log($scope.selection);
            }
        }

        //handle duration
        //get duration(days)
        $scope.toggleSelectDays = function(drugId, days){
            var len = $scope.selection.length;
            

            var which;
            var exists = 0;
            
            for(var a = 0; a < len; a++)
            {
                if($scope.selection[a]['drugId'] === drugId)//if drugId exists
                {
                    which = a;//get index of
                    exists = 1;//tell me it exists
                }
                
            }

            if(exists === 0)//if not exist
            {
                /*$scope.selection[len] = new Array();
                $scope.selection[len]['drugId'] = drugId;
                $scope.selection[len]['doseId'] = doseId;
                $scope.selection[len]['duration'] = 0;
                console.log($scope.selection);*/
            } else {//if exists update doseId
                $scope.selection[which]['days'] = days;
            }
        }

        //get duration(months)
        $scope.toggleSelectMonths = function(drugId, months){
            var len = $scope.selection.length;
            

            var which;
            var exists = 0;
            
            for(var a = 0; a < len; a++)
            {
                if($scope.selection[a]['drugId'] === drugId)//if drugId exists
                {
                    which = a;//get index of
                    exists = 1;//tell me it exists
                }
                
            }

            if(exists === 0)//if not exist
            {
                /*$scope.selection[len] = new Array();
                $scope.selection[len]['drugId'] = drugId;
                $scope.selection[len]['doseId'] = doseId;
                $scope.selection[len]['duration'] = 0;
                console.log($scope.selection);*/
            } else {//if exists update doseId
                $scope.selection[which]['months'] = months;
            }
        }

        //get duration(months)
        $scope.toggleSelectYears = function(drugId, years){
            var len = $scope.selection.length;
            

            var which;
            var exists = 0;
            
            for(var a = 0; a < len; a++)
            {
                if($scope.selection[a]['drugId'] === drugId)//if drugId exists
                {
                    which = a;//get index of
                    exists = 1;//tell me it exists
                }
                
            }

            if(exists === 0)//if not exist
            {
                /*$scope.selection[len] = new Array();
                $scope.selection[len]['drugId'] = drugId;
                $scope.selection[len]['doseId'] = doseId;
                $scope.selection[len]['duration'] = 0;
                console.log($scope.selection);*/
            } else {//if exists update doseId
                $scope.selection[which]['years'] = years;   
            }
        }

        
        //who administers drug
        $scope.toggleHospAdminister = function(drugId){
            var len = $scope.selection.length;
            

            var which;
            var exists = 0;
            
            for(var a = 0; a < len; a++)
            {
                if($scope.selection[a]['drugId'] === drugId)//if drugId exists
                {
                    which = a;//get index of
                    exists = 1;//tell me it exists
                }
                
            }

            if(exists === 0)//if not exist
            {
                /*$scope.selection[len] = new Array();
                $scope.selection[len]['drugId'] = drugId;
                $scope.selection[len]['doseId'] = doseId;
                $scope.selection[len]['duration'] = 0;
                console.log($scope.selection);*/
            } else {//if exists update doseId
                $scope.selection[which]['hospAdmin'] = 'Y';  
                console.log($scope.selection); 
            }
        }

        //HANDLE DRUG PRESCRIPTION

        $scope.submitConsultForm = function(isValid, consult)
        {
            if (isValid) {
                
                var notes = consult.notes;
                var fees = consult.fee;
                var drugs = $scope.selection;//drugs are here
                var visitId = $scope.visitId;
                var data = sessionService.getCookieData();
                var phyId = data.id;
                //4 admission
                if(consult.ward)
                {
                    var ward = consult.ward;
                } else {
                    var ward = 0;
                }
                //4 surgery
                if(consult.surg)
                {
                    var surg = consult.surg;
                } else {
                    var surg = "";
                }
                
                if(consult.surgeon)
                {
                    var surgeon = consult.surgeon;
                } else {
                    var surgeon = 0;
                }
                
                if(consult.surgNotes)
                {
                    var surgNotes = consult.surgNotes;
                } else {
                    var surgNotes = '';
                }
                                    
                
                var res = addPatient.patientConsult(notes, fees, visitId, phyId, ward, surg, surgeon, surgNotes);
                res.then( function(res) {
                    
                    if(res.data === '1')
                    {
                        var drugLen = drugs.length;
                        for(var a = 0; a < drugLen; a++)
                        {
                            var last = drugLen - 1;
                            if(a == last)
                            {
                                var drugId = drugs[a]['drugId'];
                                var doseId = drugs[a]['doseId'];
                                var days = drugs[a]['days'];
                                var months = drugs[a]['months'];
                                var years = drugs[a]['years'];
                                var hospAdmin = drugs[a]['hospAdmin'];

                                var res1 = addPatient.patientConsultDrug(drugId, doseId, days, months, years, hospAdmin, visitId);
                                res1.then( function(rs) {
                                    $('#addConsultation').modal('hide');
                                    $route.reload();    
                                });
                            } else {
                                var drugId = drugs[a]['drugId'];
                                var doseId = drugs[a]['doseId'];
                                var days = drugs[a]['days'];
                                var months = drugs[a]['months'];
                                var years = drugs[a]['years'];
                                var hospAdmin = drugs[a]['hospAdmin'];

                                var res1 = addPatient.patientConsultDrug(drugId, doseId, days, months, years, hospAdmin, visitId);
                                res1.then( function(rs) {
                                    
                                });
                            }

                        }
                        
                    }                        
                });
            }
        }

        $scope.getDeleteModal = function(fName, lName, id) {
            $scope.id = id;
            $scope.fName = fName;
            $scope.lName = lName;

            $('#deleteModal').modal('show');
        }

        $scope.deletePat = function(id){
           
            var res1 = patients.deletePatients(id);
            res1.then( function(rs) {
                $('#deleteModal').modal('hide');
                //reload page
                $route.reload();       
            });
        }

        //HANDLE PHARMACY
        //get patients to dispense drugs
        var res = patients.patientsForDrugs();
        res.then( function(rsp1) {
            //console.log(rsp1.data);
            $scope.pharmLen = rsp1.data.pharmNum; 
            if(rsp1.data.pharmNum > 0)
            {
                /*$scope.pharmfName = rsp1.data.pharm.firstname;
                $scope.sName = rsp1.data.pharm.surname;
                $scope.phone = rsp1.data.pharm.phone;
                $scope.visitId = rsp1.data.pharm.visitId;*/
                $scope.pharms = rsp1.data.pharm;
            } /*else {
                $scope.pharms = rsp1.data;
            }*/
        }, function () {
            alert('Error in getting staff data');
        });
        
        $scope.dispenseDrug = function(visitId)
        {
            var res1 = patients.getPaidDrugs(visitId);
            res1.then( function(rs) {
                $scope.drugNum = rs.data.num;
                $scope.drugDispense = rs.data.isDrug;
                //console.log(rs.data.isDrug)
                //$scope.drugs = rs.data;
            });
        }
        $scope.issue = {
            drug: false
        }
        $scope.drugIssued = function(event, id)
        {
            
            if(event.target.checked === true)
            {
                var res1 = patients.issueDrugs(id);
                res1.then( function(rs) {
                });
            } else {
                var res1 = patients.cancelIssueDrugs(id);
                res1.then( function(rs) {
                    
                });
            }
            /**/
        }

        //notify of a route to staff
        if($scope.whoAreYou === '4' || $scope.superUser === 'Y')
        {
            //send to dr
            var res = patients.patientToSendToDr();
                res.then( function(res) {
                    
                    if(res.data !== '2')
                    {
                        $scope.patToDr = res.data;
                    } else {
                        $scope.patToDrNum = 0;
                    }
                }, function () {
                    alert('Error in getting States');
                });
        }

        $scope.sendToDoc = function(id)
        {
                var res = patients.sendPatientToDr(id);
                res.then( function(res) {
                    if(res.data)
                    {
                        //reload page
                        $route.reload();
                    }
                }, function () {
                    alert('Error in communicating with Database');
                });
        }

        //Get patient 4 Medication
        var rsp2 = patients.patientMedication();
        rsp2.then( function(rsp2) {
            $scope.medLen = rsp2.data.medNum; 
            if($scope.medLen > 0)
            {
                $scope.meds = rsp2.data.medic;
            }
        }, function () {
            alert('Error in communicating with Database');
        });

        //administer medication
        $scope.patientMedicationDet = function(patId)
        {
            var res = patients.patientMedicDet(patId);
            res.then( function(res) {
                $scope.medDetNum = res.data.medDetNum;
                if(res.data)
                {
                    $scope.medicatePat = res.data.medicDet;
                }
            }, function () {
                alert('Error in communicating with Database');
            });
        }

        //medication done
        $scope.medAdministered = function(event, id)
        {
            if(event.target.checked === true)
            {
                var data = sessionService.getCookieData();
                var staffId = data.position;
                var res1 = patients.medicationDone(id, staffId);
                res1.then( function(rs) {
                    if(rs.data === '1')
                    {
                        $('#patientMed').modal('hide');
                        //reload page
                        $route.reload();
                    }
                });
            }
        }


        //LAB
        //get patients for lab
        var rsp3 = patients.patientLab();
        rsp3.then( function(rsp3) {
            $scope.labLen = rsp3.data.labNum; 
            if($scope.labLen > 0)
            {
                $scope.labs = rsp3.data.labs;
            }
        }, function () {
            alert('Error in communicating with Database');
        });

        $scope.patientUrineForm = function(pvId)
        {
            $scope.pvId = pvId;
        }
        
        //enter Urine records
        $scope.parastoUrineForm = function(urine, pvId)
        {
            if(urine.appear)
            {
                var appear = urine.appear;
            } else {
                var appear = "";
            }

            if(urine.gravity)
            {
                var gravity = urine.gravity;
            } else {
                var gravity = "";
            }
            
            if(urine.reaction)
            {
                var reaction = urine.reaction;
            } else {
                var reaction = "";
            }
            
            if(urine.protien)
            {
                var protien = urine.protien;
            } else {
                var protien = "";
            }
            
            if(urine.rbc)
            {
                var rbc = urine.rbc;
            } else {
                var rbc = "";
            }
            
            if(urine.sugar)
            {
                var sugar = urine.sugar;
            } else {
                var sugar = "";
            }
            
            if(urine.bill)
            {
                var bill = urine.bill;
            } else {
                var bill = "";
            }
            
            if(urine.wbc)
            {
                var wbc = urine.wbc;
            } else {
                var wbc = "";
            }

            if(urine.casts)
            {
                var casts = urine.casts;
            } else {
                var casts = "";
            }
            
            if(urine.yeast)
            {
                var yeast = urine.yeast;
            } else {
                var yeast = "";
            }

            if(urine.ketones)
            {
                var ketones = urine.ketones;
            } else {
                var ketones = "";
            }
            
            if(urine.uro)
            {
                var uro = urine.uro;
            } else {
                var uro = "";
            }
            
            var staffId = $scope.whoAreYou;
            
            var res1 = patients.addParastoUrine(uro, ketones, yeast, casts, wbc, bill, sugar, rbc, protien, reaction, gravity, appear, pvId, staffId);
            res1.then( function(rs) {
                if(rs.data === '2')
                {
                    //already entered record for this patient's lab result
                    $scope.formErr = 1;
                } else if(rs.data === '1') {
                    $('#patientUrineForm').modal('hide');
                    //reload page
                    $route.reload();
                }
                   
            });
        }
    }//end of if logged in

});

App.controller("patientDetailCtrl", function($scope, $http, $location, $route, sessionService, $routeParams, patients, addPatient, Staff){
    var data = sessionService.getCookieData();
    if(data.loggedIn !== 'Y')
    {
        $location.path( "/" );
    } else {
        $scope.whoAreYou = data.position;
        $scope.superUser = data.sUser;
        $scope.hosp = data.hosp;
        $scope.name = data.fName+' '+data.lName;

        var patId = $routeParams.patientId;
        //Get Patient Bio data         
        var res = patients.getPatient(patId);
        res.then( function(res) {
            //console.log(res.data)
            $scope.id = res.data[0]['basicData']['id'];
            $scope.fName = res.data[0]['basicData']['firstname'];
            $scope.sName = res.data[0]['basicData']['surname'];
            $scope.oName = res.data[0]['basicData']['othername'];
            $scope.phone = res.data[0]['basicData']['phone'];
            $scope.geno = res.data[0]['basicData']['genotype'];
            $scope.blood = res.data[0]['basicData']['bloodGroup'];
            $scope.allergies = res.data[0]['allergy'];
            $scope.add = res.data[0]['basicData']['address'];
            $scope.state = res.data[0]['basicData']['state'];

            //nok
            $scope.nokFname = res.data[0]['nok']['firstname'];
            $scope.nokSname = res.data[0]['nok']['surname'];
            $scope.nokAdd = res.data[0]['nok']['address'];
            $scope.nokPhone = res.data[0]['nok']['phone'];
            $scope.nokState = res.data[0]['nok']['state'];
            
            
            $scope.id = patId;
        }, function () {
            alert('Error in getting Patient\'s bio data');
        });

        //SURGERY AND ADMISSION
        var res1 = patients.getPatientRec(patId);
        res1.then( function(rs) {
            $scope.visited = rs.data;
            $scope.visitNum = rs.data[0]['visitNum'];
            //surgery
            $scope.surgLen = rs.data[0]['surgNum'];
            if($scope.surgLen > 0)
            {
                $scope.surgName = rs.data[0]['surgery']['surgery'];
                $scope.surgNotes = rs.data[0]['surgery']['notesProg'];
                $scope.surgeon = rs.data[0]['surgery']['surgeon'];
                $scope.surgDate = rs.data[0]['surgery']['surgDate'];
            }            
            
            //admission
            $scope.admitLen = rs.data[0]['admitNum'];
            if($scope.admitLen > 0)
            {
                $scope.admitDate = rs.data[0]['admitted']['dateAdmitted'];
                $scope.dischargeDate = rs.data[0]['admitted']['dateDischarged'];
                $scope.dischargeSatus = rs.data[0]['admitted']['Status'];
                $scope.admitWard = rs.data[0]['admitted']['ward'];
            }
            
            //Medication
            $scope.medLen = rs.data[0]['medNum'];
            $scope.patMed = rs.data.med;

            //Lab
            console.log(rs.data);
        }, function () {
            alert('Error in getting Patient\'s medical records');
        });

        $scope.edit = function(table, column, id)
        {
            if(column === 'firstname')
            {
                $scope.table = 1;
                $scope.col = 1;
                $scope.targ = "firstname";
                $('#edit').modal('show');
            } else if(column === 'surname'){
                $scope.table = 1;
                $scope.col = 2;
                $scope.targ = "surname";
                $('#edit').modal('show');
            } else if(column === 'othername'){
                $scope.table = 1;
                $scope.col = 3;
                $scope.targ = "othername";
                $('#edit').modal('show');
            } else if(column === 'phone'){
                $scope.table = 1;
                $scope.col = 4;
                $scope.targ = "phone";
                $('#edit').modal('show');
            } else if(column === 'address'){
                $scope.table = 2;
                $scope.col = 0;
                $scope.targ = "address";
                //State             
                var res = addPatient.getStates();
                res.then( function(res) {
                    $scope.states = res.data;
                }, function () {
                    alert('Error in getting States');
                });
                
                $('#edit').modal('show');
            } else if(column === 'nokFirst'){
                $scope.table = 3;
                $scope.col = 1;
                $scope.targ = "Next of Kin Firstname";
                $('#edit').modal('show');
            } else if(column === 'nokSur'){
                $scope.table = 3;
                $scope.col = 2;
                $scope.targ = "Next of Kin Surname";
                $('#edit').modal('show');
            } else if(column === 'nokAdd'){
                $scope.table = 3;
                $scope.col = 3;
                $scope.targ = "Next of Kin Address";
                //State             
                var res = addPatient.getStates();
                res.then( function(res) {
                    $scope.states = res.data;
                }, function () {
                    alert('Error in getting States');
                });
                $('#edit').modal('show');
            } else if(column === 'nokPhone'){
                $scope.table = 3;
                $scope.col = 4;
                $scope.targ = "Next of Kin Phone";
                $('#edit').modal('show');
            } else if(column === 'bloodG'){
                $scope.table = 1;
                $scope.col = 5;
                $scope.targ = "Blood Group";

                //Blood Group             
                var res = addPatient.getBloodG();
                res.then( function(res) {
                    $scope.bloodGroups = res.data;
                }, function () {
                    alert('Error in getting Blood Groups');
                });
                $('#edit').modal('show');
            } else if(column === 'geno'){
                $scope.table = 1;
                $scope.col = 6;
                $scope.targ = "Genotype";

                //Genotype             
                var res = addPatient.getGenoT();
                res.then( function(res) {
                    $scope.genotypes = res.data;
                    //console.log(res.data);
                }, function () {
                    alert('Error in getting Genotypes');
                });
                $('#edit').modal('show');
            } else if(column === 'allergy'){
                $scope.table = 4;
                $scope.col = 0;
                $scope.targ = "Allergy";

                $('#edit').modal('show');
            }            

            
        }

        $scope.editPatient = function(isValid, pat,  table, col)
        {
            var rec = pat.data;
            if(pat.data1)
            {
                var rec1 = pat.data1;
            } else {
                var rec1 = '';
            }
        
            var rs = patients.updatePatient(patId, table, col, rec, rec1);
            rs.then( function(resp) {
                //console.log(resp.data)
                if(resp.data === '1')
                {
                    $('#edit').modal('hide');
                    //reload page
                    $route.reload();
                }
                
            }, function () {
                alert('Error in updating patient record');
            });
        }

        $scope.addAllergy = function(isValid, pat)
        {
            var rec = pat.data; 
                    
            var res = patients.addAllergy(patId, rec);
            res.then( function(res) {
                //console.log(res.data);
                if(res.data === '1')
                {
                    $('#edit').modal('hide');
                    //reload page
                    $route.reload();
                }                  
            }, function () {
                alert('Error in getting staff data');
            });
        }

        $scope.deleteAllergy = function(id)
        {
            var res = patients.deleteAllergy(id);
            res.then( function(res) {
                if(res.data === '1')
                {
                    $('#edit').modal('hide');
                    //reload page
                    $route.reload();
                }                  
            }, function () {
                alert('Error in deleting Alergy');
            });
        }

        $scope.addSurg = function(id) {
            $scope.visitId = id;
            //Get Staff data         
            var res = Staff.getStaff();
            res.then( function(rs1) {
                $scope.staffLen = rs1.data.length;
                $scope.staff = rs1.data;
                
            }, function () {
                alert('Error in getting staff data');
            });
            $('#surgModal').modal('show');
        }

        $scope.submitSurgForm = function(isValid, surg, id){
            var visitId = id;
            var surgery = surg.surg;
            var not = surg.notes;
            var phyId = surg.surgeon;
            var res = patients.addSurg(visitId, surgery, not, phyId);
            res.then( function(rs2) {
                if(rs2.data === '1'){
                    $('#surgModal').modal('hide');
                    //reload page
                    $route.reload();
                }
            }, function () {
                alert('Error in getting staff data');
            });
        }

        $scope.addAdmission = function(id) {
            $scope.visitId = id;
            //Get Ward data         
            var res = Staff.getWard();
            res.then( function(rs1) {
                $scope.wards = rs1.data;                
            }, function () {
                alert('Error in getting staff data');
            });

            
            $('#admitModal').modal('show');
        }
        //submitAdmitForm(surgForm.$valid, admit, visitId)
        $scope.submitAdmitForm = function(isValid, admit, id){
            var visitId = id;
            var wardId = admit.ward;
            var data = sessionService.getCookieData();
            var phyId = data.id;
            
            var res = patients.addAdmit(visitId, wardId, patId, phyId);
            res.then( function(rs2) {
                if(rs2.data === '1'){
                    $('#admitModal').modal('hide');
                    //reload page
                    $route.reload();
                }
            }, function () {
                alert('Error in getting staff data');
            });
        }

        //Patient Visit Manager
        //see Dr
        $scope.seeDoc = function(){
            var res = patients.sendToDoc(patId);
            res.then( function(rs2) {
                if(rs2.data === '1'){
                    //reload page
                    $route.reload();
                }
            }, function () {
                alert('Error Communicating with Database');
            });
        }

        //see Pharm
        $scope.seePharma = function(){
            var res = patients.sendToPharm(patId);
            res.then( function(rs2) {
                if(rs2.data === '1'){
                    //reload page
                    $route.reload();
                }
            }, function () {
                alert('Error communicating with Database');
            });
        }

        //see Lab
        $scope.seeLabo = function(){
            var res = patients.sendToLab(patId);
            res.then( function(rs2) {
                if(rs2.data === '1'){
                    //reload page
                    $route.reload();
                }
            }, function () {
                alert('Error communicating with Database');
            });
        }

        //who to see
        var res = patients.getSee(patId);
        res.then( function(rs2) {
        if(rs2.data[0]['seeNum'] === 1)
        {
            $scope.see = 1;
            $scope.seeDr = rs2.data[0]['nxt'][0]['see'];                
            $scope.seenDr = rs2.data[0]['nxt'][0]['seen'];
            $scope.seePharm = rs2.data[0]['nxt'][0]['seePharm'];
            $scope.seenPharm = rs2.data[0]['nxt'][0]['seenPharm'];
            $scope.seeLab = rs2.data[0]['nxt'][0]['seeLab'];
            $scope.seenLab = rs2.data[0]['nxt'][0]['seenLab'];
        } else {
                $scope.see = 0;
        }
                        
        }, function () {
            alert('Error in getting staff data');
        });  


        //DRUG PAYMENT
        //pay 4 drug
        $scope.payForDrug = function(id, price)
        {
            var res = patients.drugPayment(id, price);
            res.then( function(rs2) {
                if(rs2.data === '1')
                {
                    //reload page
                    $route.reload();
                }
            }, function () {
                alert('Error communicating with Database');
            });
        }

        //revert pay 4 drug
        $scope.delPayForDrug = function(id, price)
        {
            var res = patients.delDrugPayment(id, price);
            res.then( function(rs3) {
                if(rs3.data === '1')
                {
                    //reload page
                    $route.reload();
                }
            }, function () {
                alert('Error communicating with Database');
            });
        }

        //PAY 4 CONSULTANCY
        //pay 4 Consult
        $scope.payForConsult = function(id, price)
        {
            var res = patients.consultPayment(id, price);
            res.then( function(rs2) {
                if(rs2.data === '1')
                {
                    //reload page
                    $route.reload();
                }
            }, function () {
                alert('Error communicating with Database');
            });
        }

        //revert pay 4 Consult
        $scope.delPayForConsult = function(id, price)
        {
            var res = patients.delConsultPayment(id, price);
            res.then( function(rs3) {
                if(rs3.data === '1')
                {
                    //reload page
                    $route.reload();
                }
            }, function () {
                alert('Error communicating with Database');
            });
        }

        

    }      
});

App.controller("systDataCtrl", function($scope, Staff, sessionService, Drugs){
    var data = sessionService.getCookieData();
    if(data.loggedIn !== 'Y')
    {
        $location.path( "/" );
    } else {
        $scope.whoAreYou = data.position;
        $scope.superUser = data.sUser;
        $scope.hosp = data.hosp;
        $scope.name = data.fName+' '+data.lName;

        //Get Staff data         
        var res = Staff.getStaff();
        res.then( function(res) {
            $scope.staffLen = res.data.length;
            $scope.staff = res.data;
        }, function () {
            alert('Error in getting staff data');
        });

        //Get Drugs         
        var res = Drugs.getDrugs();
        res.then( function(res) {
            $scope.drugLen = res.data.length;
            $scope.drugs = res.data;
        }, function () {
            alert('Error in getting staff data');
        });
    }
   
});

App.controller("editCtrl", function($scope, $filter, $routeParams, sessionService, addPatient, Staff, Drugs, patients){
    var data = sessionService.getCookieData();
    if(data.loggedIn !== 'Y')
    {
        $location.path( "/" );
    } else {
        $scope.whoAreYou = data.position;
        $scope.superUser = data.sUser;
        $scope.hosp = data.hosp;
        $scope.name = data.fName+' '+data.lName;

    
        var id = $routeParams.id;
        var whichEdit = $routeParams.num;

        if(whichEdit == 1)//edit patient data
        {
            $scope.which = 1;
            $scope.title = 'Edit Patient Data';

            //SETUP FORM
            //Ethnic Grp
            var res = addPatient.getEthnicGrp();
            res.then( function(res) {
                $scope.ethnics = res.data;
            }, function () {
                alert('Error in getting Ethnic Groups');
            });

            //Religion
            var res = addPatient.getReligion();
            res.then( function(res) {
                $scope.religions = res.data;
            }, function () {
                alert('Error in getting Religions');
            });

            //Blood Group             
            var res = addPatient.getBloodG();
            res.then( function(res) {
                $scope.bloodGroups = res.data;
            }, function () {
                alert('Error in getting Blood Groups');
            });

            //Genotype             
            var res = addPatient.getGenoT();
            res.then( function(res) {
                $scope.genotypes = res.data;
                //console.log(res.data);
            }, function () {
                alert('Error in getting Genotypes');
            });

            //State             
            var res = addPatient.getStates();
            res.then( function(res) {
                $scope.states = res.data;
            }, function () {
                alert('Error in getting States');
            });

            //PATIENT DATA
            //Get Patient Bio data         
            var res = patients.getPatientEdit(id);
            res.then( function(res) {
                $scope.patients = res.data;
                $scope.fName = res.data[0]['basicData']['firstname'];
                $scope.sName = res.data[0]['basicData']['surname'];
                $scope.oName = res.data[0]['basicData']['othername'];
                $scope.phone = res.data[0]['basicData']['phone'];
                $scope.occupation = res.data[0]['basicData']['occupation'];
                
                $scope.religion = res.data[0]['basicData']['religionId'];
                $scope.ethnic = res.data[0]['basicData']['ethnicId'];
                $scope.geno = res.data[0]['basicData']['genotypeId'];
                $scope.bloodG = res.data[0]['basicData']['bloodGroupId'];
                //$scope.allergies = res.data[0]['allergy'];
                $scope.add = res.data[0]['basicData']['address'];
                $scope.Rstate = res.data[0]['basicData']['Rstate'];
                $scope.state = res.data[0]['basicData']['stateId'];

                //nok
                
                $scope.nokFname = res.data[0]['nok']['firstname'];
                $scope.nokSname = res.data[0]['nok']['surname'];
                $scope.nokAdd = res.data[0]['nok']['address'];
                $scope.nokPhone = res.data[0]['nok']['phone'];
                $scope.nokState = res.data[0]['nok']['stateId'];
                
                $scope.updatePatientForm = function(isValid, pat){
                    if (isValid) { 
                        var fname = pat.fname;
                        var sname = pat.sName;
                        if(pat.oName)
                        {
                            var oname = pat.oName;
                        } else {
                            var oname = "";
                        }
                        var phone = pat.phone;
                        var occupation = pat.occupation;
                        var religion = pat.religion;
                        var ethnic = pat.ethnic;
                        var geno = pat.geno;
                        var bloodG = pat.bloodG;
                        var state = pat.state;

                        var add = pat.add;
                        var Rstate = pat.Rstate;

                        var nokFname = pat.nokFname;
                        var nokSname = pat.nokSname;
                        var nokAdd = pat.nokAdd;
                        var nokPhone = pat.nokPhone;
                        var nokState = pat.nokState;

                        var res = patients.updatePatient(id, fname, sname, oname, phone, occupation, religion, ethnic, geno, bloodG, state, add, Rstate, nokFname, nokSname, nokAdd, nokPhone, nokState);
                        res.then( function(res) {
                            //console.log(res.data);
                            /*if(res.data == 2)
                            {
                                $scope.addStaffErr = 1;
                            } else {
                                
                                $("#addStaff").modal('show');
                            }*/
                        });
                        //console.log(fname)
                    }
                }
                
            }, function () {
                alert('Error in getting Patient\'s bio data');
            });
        }
    }       
    
});

App.controller("systManagerCtrl", function($scope, $location, $route, sessionService, addPatient, patients, Staff, Drugs){
    var data = sessionService.getCookieData();
    if(data.loggedIn !== 'Y')
    {
        $location.path( "/" );
    } else {
        $scope.whoAreYou = data.position;
        $scope.superUser = data.sUser;
        $scope.hosp = data.hosp;
        $scope.name = data.fName+' '+data.lName;

        //DATA 4 ADD PATIENT
        //Ethnic Grp
        var res = addPatient.getEthnicGrp();
        res.then( function(res) {
            $scope.ethnics = res.data;
        }, function () {
            alert('Error in getting Ethnic Groups');
        });

        //Religion
        var res = addPatient.getReligion();
        res.then( function(res) {
            $scope.religions = res.data;
        }, function () {
            alert('Error in getting Religions');
        });

        //Blood Group             
        var res = addPatient.getBloodG();
        res.then( function(res) {
            $scope.bloodGroups = res.data;
        }, function () {
            alert('Error in getting Blood Groups');
        });

        //Genotype             
        var res = addPatient.getGenoT();
        res.then( function(res) {
            $scope.genotypes = res.data;
            //console.log(res.data);
        }, function () {
            alert('Error in getting Genotypes');
        });

        //State             
        var res = addPatient.getStates();
        res.then( function(res) {
            $scope.states = res.data;
        }, function () {
            alert('Error in getting States');
        });

        //Staff position             
        var res = Staff.getStaffPosition();
        res.then( function(resp) {
            $scope.staffPos = resp.data;
        }, function () {
            alert('Error in getting Staff Position');
        });

        //Drugs             
        var res = Drugs.getDrugs();
        res.then( function(res) {
            $scope.drug = res.data;
        }, function () {
            alert('Error in getting Staff Position');
        });

        //sumbit add Staff form
        $scope.submitStaffForm = function(isValid, staff){
            if (isValid) { 
                $scope.addStaffErr = 0;
                var pos = staff.position;
                var fName = staff.sFName;
                var sName = staff.sSName;
                if(staff.sOName)
                {
                    var oName = staff.sOName;
                } else {
                    var oName = "";
                }
                
                var phone = staff.sPhone;
                var dob = staff.sdob;
                var add = staff.sAdd ;
                var stateR = staff.sStateR ;

                var res = Staff.insertStaff(pos, fName, sName, oName, phone, dob, add, stateR);
                res.then( function(res) {
                    //console.log(res.data);
                    if(res.data == 2)
                    {
                        $scope.addStaffErr = 1;
                    } else {
                        $scope.staffFname = res.data[0]['name'];
                        $scope.code = res.data[0]['code'];

                        $scope.staff.position = "";
                        $scope.staff.sFName = "";
                        $scope.staff.sSName = "";
                        $scope.staff.sOName = "";
                        $scope.staff.sPhone = "";
                        $scope.staff.sdob = "";
                        $scope.staff.sAdd = "";
                        $scope.staff.sStateR = "";

                        $("#addStaff").modal('show');
                    }
                });
            }
        }

        
        //submit add Drugs 
        $scope.submitDrugForm = function(isValid, drug){
            if (isValid) { 
                $scope.addDrugErr = 0;
                var drugN = drug.drugName;
                var amt = drug.amt;

                var res = Drugs.insertDrug(drugN, amt);
                res.then( function(res) {
                    //console.log(res.data);
                    if(res.data == 1)
                    {
                        $scope.addDrugErr = 1;
                        $scope.drug.drugName = "";
                        $scope.drug.amt = "";
                        $("#addDrug").modal('show');                            
                    } else {
                        $scope.addDrugErr = 2;
                        $scope.drug.drugName = "";
                        $scope.drug.amt = "";
                        $("#addDrug").modal('show');
                    }
                });
            }
        }

        //Submit addPatient Form
        $scope.submitPatientForm = function(isValid, patient){
            // check to make sure the form is completely valid
            if (isValid) {
                var fName = patient.fName;
                var sName = patient.sName;
                if(patient.oName)
                {
                    var oName = patient.oName;
                } else {
                    var oName = "";
                }
                
                var phone = patient.phone;
                var dob = patient.dob;
                var occupation = patient.occupation;
                var religion = patient.religion;
                var ethnic = patient.ethnic;
                if(patient.bloodG)
                {
                    var bloodG = patient.bloodG;
                } else {
                    var bloodG = 0;
                }
                if(patient.geno)
                {
                    var geno = patient.geno;
                } else {
                    var geno = 0;
                }
                
                var state = patient.state;
                var add = patient.add ;
                var stateR = patient.stateR ;
                var nokFname = patient.nokFname ;
                var nokSname = patient.nokSname ;
                var nokOname = patient.nokOname ;
                var nokPhone = patient.nokPhone ;
                var nokAdd = patient.nokAdd ;
                var nokState = patient.nokState ;

                var res = addPatient.insertPatient(fName, sName, oName, phone, dob, occupation, religion, ethnic, bloodG, geno, state, add, stateR, nokFname, nokSname, nokOname, nokPhone, nokAdd, nokState);
                res.then( function(res) {
                    //console.log(res.data);
                    if(res.data == 1)
                    {
                        $('#addPatient').modal('hide');
                        //reload Page
                        $route.reload();
                    } else if(res.data == 2){
                        $scope.addPatientErr = 1;
                    }
                });
            }
        }

        //Get all Patient             
        var res = patients.getPatients();
        res.then( function(res) {
            $scope.patients = res.data;
            $scope.patientsNum = res.data.length;
        }, function () {
            alert('Error in getting States');
        });

        
    }
    
});