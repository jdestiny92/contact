var app = angular.module("starter", []); 

app.controller("myCtrl", function($scope, $http) {

$scope.refresh = function(){  
	$http.get('total').then(function(response){
  	//console.log(response.data);
  	$scope.contactlist = response.data;
  })
};

$scope.refresh();

  $scope.modal = function(){
  	$('#myModal').modal('show');

  	$('#submit').show();

  	var x = document.getElementsByClassName("form-control");

  	var i; 

  	for (i = 0; i < x.length; i++) {
    	x[i].readOnly = "";
    	x[i].value = "";
    	x[i].placeholder = "";

	}

	$('#submit').attr('value', 'submit');

  };

  $scope.add = function(){

  	var firstname = $('#firstname').val();
  	var lastname = $('#lastname').val();
  	var email = $('#email').val();
  	var phone = $('#phone').val();
  	var birthdate = $('#birthdate').val();
  	var picture = $('#picture').val();
  	var group = [];
  	var group1 = $('#group1');
  	var group2 = $('#group2');
  	var group3 = $('#group3');
  	var group4 = $('#group4');
  	var comments = $('#comments').val();

  	if(document.getElementById('group1').checked){
  		var val = $('#group1').val();
  		group.push(val);
  	}
  	if(document.getElementById('group2').checked){
  		var val = $('#group2').val();
  		group.push(val);
  	}
  	if(document.getElementById('group3').checked){
  		var val = $('#group3').val();
  		group.push(val);
  	}
  	if(document.getElementById('group4').checked){
  		var val = $('#group4').val();
  		group.push(val);
  	}

  	var data = {
  		first_name: firstname,
  		last_name: lastname,
  		email: email
  	};

  	if(phone){
  		data.phone = phone;
  	}
  	if(birthdate){
  		data.birthdate = birthdate;
  	}
  	if(picture){
  		data.picture = picture;
  	}
  	if(group){
  		data.groups = group;
  	}
  	if(comments){
  		data.comments = comments;
  	}

  	//console.log(data);

  	$http.post('add', data).then(function(response){
  		console.log(response.data);
  	})

  	$scope.refresh();

  	$('#myModal').modal('hide');
  };

  $scope.view = function(data){
  	//console.log(data);

  	$scope.modal();

  	$('#submit').hide();

  	$('#firstname').attr('placeholder', data.first_name);
  	$('#lastname').attr('placeholder', data.last_name);
  	$('#email').attr('placeholder', data.email);
  	if(data.phone){
  		$('#phone').attr('placeholder', data.phone);
  	}
  	if(data.birthdate){
  		$('#birthdate').attr('placeholder', data.birthdate);
  	}
  	if(data.picture){
  		$('#picture').attr('placeholder', data.picture);
  	}
  	if(data.comments){
  		$('#comments').attr('placeholder', data.comments);
  	}
  	if(data.groups){
  		var x = data.groups;
  		var i;
  		for (i = 0; i < x.length; i++) {
    		if(x[i] == 'family'){
    			document.getElementById('group1').checked = true;
    		}
    		else if(x[i] == 'friend'){
    			document.getElementById('group2').checked = true;
    		}
    		else if(x[i] == 'colleague'){
    			document.getElementById('group3').checked = true;
    		}
    		else{
    			document.getElementById('group4').checked = true;
    		}
		}
  	}
  	
  	var x = document.getElementsByClassName("form-control");

  	var i; 

  	for (i = 0; i < x.length; i++) {
    	x[i].readOnly = "true";
	}

  }

  $scope.remove = function(data){
  	var id = data._id;
  	console.log(id);

  	id = {
  		id: id
  	}

  	$http.post('delete', id).then(function(response){
  		console.log(response);
  	});

  	$scope.refresh();

  }

  $scope.edit = function(data){
  	
  	console.log(data);

  	var x = document.getElementsByClassName("form-control");

  	var i; 

  	for (i = 0; i < x.length; i++) {
    	x[i].readOnly = "";
    	x[i].value = "";
    	x[i].placeholder = "";

	}

	$('#submit2').attr('value', 'submit');

  	var firstname = $('#firstname2');
  	var lastname = $('#lastname2');
  	var email = $('#email2');
  	var phone = $('#phone2');
  	var birthdate = $('#birthdate2');
  	var picture = $('#picture2');
  	var group = [];
  	var group1 = $('#group1-2');
  	var group2 = $('#group2-2');
  	var group3 = $('#group3-2');
  	var group4 = $('#group4-2');
  	var comments = $('#comments2');

  	firstname.val(data.first_name);
  	lastname.val(data.last_name);
  	email.val(data.email);
  	if(data.phone){
  		phone.val(data.phone);
  	}
  	if(data.birthdate){
  		birthdate.val(data.birthdate);
  	}
  	if(data.picture){
  		picture.val(data.picture);
  	}
  	if(data.comments){
  		comments.val(data.comments);
  	}
  	if(data.groups){
  		var x = data.groups;
  		var i;
  		for (i = 0; i < x.length; i++) {
    		if(x[i] == 'family'){
    			document.getElementById('group1-2').checked = true;
    		}
    		else if(x[i] == 'friend'){
    			document.getElementById('group2-2').checked = true;
    		}
    		else if(x[i] == 'colleague'){
    			document.getElementById('group3-2').checked = true;
    		}
    		else{
    			document.getElementById('group4-2').checked = true;
    		}
		}
  	}

  	$('#myModal2').modal('show');
  }

  $scope.change = function(){
  	var group = [];

  	data = {
  		first_name: $('#firstname2').val(),
  		last_name: $('#lastname2').val(),
  		email: $('#email2').val()
  	}

  	if(document.getElementById('group1-2').checked){
  		var val = $('#group1-2').val();
  		group.push(val);
  	}
  	if(document.getElementById('group2-2').checked){
  		var val = $('#group2-2').val();
  		group.push(val);
  	}
  	if(document.getElementById('group3-2').checked){
  		var val = $('#group3-2').val();
  		group.push(val);
  	}
  	if(document.getElementById('group4-2').checked){
  		var val = $('#group4-2').val();
  		group.push(val);
  	}

  	if($('#phone2').val()){
  		data.phone = $('#phone2').val();
  	}
  	if($('#birthdate2').val()){
  		data.birthdate = $('#birthdate2').val();
  	}
  	if($('#picture2').val()){
  		data.picture = $('#picture2').val()
  	}
  	if(group){
  		data.groups = group;
  	}
  	if($('#comments2').val()){
  		data.comments = $('#comments2').val()
  	}

  	console.log(data);

  	$http.post('edit', data).then(function(response){
  		console.log(response.data);
  	})

  	$scope.refresh();

  	$('#myModal2').modal('hide');
  }

});