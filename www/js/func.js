// clearing sessions : developer Test 

// localStorage.setItem('setupTime', '');

BaseURL = "http://mobile.shc.gov.sa/";
//BaseURL = "http://localhost:56789/";

/*------------------------------------*/
function pad(str, max) {
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}
// forceLowerCase
function forceLowerCase(obj){
    obj.value = obj.value.toLowerCase();
}

//var UserName = document.getElementById("UserName");
//var password = document.getElementById("password");

// Input Slide up :: Input Focus 

$(document).on('focus', '.AppLoginForm input', function () {

	//NewAlert('focus');

	/*$('.logo').animate({
		"margin-top": "1%"
	});*/

});

// NewAlert over ride 

function NewAlert($DataHere, $TypeClass) {
	$(".NewAlert").removeClass("SuccessAlert");
	$(".NewAlert").removeClass("FailedAlert");
	$(".NewAlert").addClass($TypeClass);
	$(".NewAlert div").html($DataHere);
	$(".NewAlert").animate({
		"top": "-5px"
	});
	$(".NewAlert").delay(2100).animate({
		"top": "-40%"
	});
}

// Session reset 

function TokenSession() {
	var hours = 24; // Reset when storage is more than 24hours
	var now = new Date().getTime();
	var setupTime = localStorage.getItem('setupTime');
	if (setupTime == null) {
		//NewAlert("Create new  ");
		//	$.notify("Create new", "success");
		localStorage.setItem('setupTime', now)
	} else {
		//NewAlert("has data ");
		//	$.notify("has data", "success");
		if (now - setupTime > hours * 60 * 60 * 1000) {
			localStorage.setItem('UserToken', '');
			localStorage.clear();
			localStorage.setItem('setupTime', now);
		}
	}

}

// Test :: not used yet

function GetoAuthoTwoToken() {
	var url = BaseURL + "/Token";
	$.getJSON(url, function (tick) {
		//	tick['ticket'].title();
		//	NewAlert(tick['error'].error());
	});
}

// Get elemet by ID 

function getElementByIdFast($IDis) {

	return document.getElementById($IDis).value;

	//NewAlert(document.getElementById($IDis).value);

}

// API post 

function PostAPIData($UserToken, $url, $postType) {

	if ($postType == 'CreateVacation') {

		PostData = "{\r\n    \"EmpID\": null,\r\n    \"VacationTypeID\": " + getElementByIdFast('NewVacVacationTypeID') + ",\r\n    \"StartDate_M\": \"" + getElementByIdFast('NewVacStartDate_M') + "\",\r\n    \"EndDate_M\": \"" + getElementByIdFast('NewVacEndDate_M') + "\",\r\n    \"Period\": " + getElementByIdFast('NewVacPeriod') + ",\r\n    \"Note\": \"" + getElementByIdFast('NewVacNote') + "\",\r\n    \"DayTypeId\":\"" + getElementByIdFast('NewVacDayTypeId') + "\"\r\n}";

		PostManToken = "a1351bdf-9515-4c42-9b14-9bab20d98e3a";
	}

	if ($postType == 'CreatePermission') {

		PostData = "{\r\n  \"EmpAbsentTypeId\": " + getElementByIdFast('EmpAbsentTypeId') + ",\r\n    \"RequestDateMekadi\": \"" + getElementByIdFast('RequestDateMekadi') + "\",\r\n    \"FromTime\": \"" + getElementByIdFast('FromTime') + "\",\r\n    \"ToTime\": \"" + getElementByIdFast('ToTime') + "\",\r\n    \"Reason\": \"" + getElementByIdFast('Reason') + "\", \"EmpID\": null, \r\n}";

		PostManToken = "ada10134-45ca-44a0-bd17-b0cf12b32f77";

	}

	if ($UserToken) {
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": $url,
			"method": "POST",
			"headers": {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + $UserToken,
				"cache-control": "no-cache",
				"Postman-Token": PostManToken
			},
			"processData": false,
			"data": PostData
			//"data": "{\r\n    \"EmpID\": null,\r\n    \"VacationTypeID\": " + getElementByIdFast('NewVacVacationTypeID') + ",\r\n    \"StartDate_M\": \"" + getElementByIdFast('NewVacStartDate_M') + "\",\r\n    \"EndDate_M\": \"" + getElementByIdFast('NewVacEndDate_M') + "\",\r\n    \"Period\": " + getElementByIdFast('NewVacPeriod') + ",\r\n    \"Note\": \"" + getElementByIdFast('NewVacNote') + "\",\r\n    \"DayTypeId\":\"" + getElementByIdFast('NewVacDayTypeId') + "\"\r\n}"

		}

		$.ajax(settings).done(function (response) {
			console.log(response);
			$('.AppHome').delay(2500).click();
			NewAlert(response, " SuccessAlert");

		});

		$.ajax(settings).fail(function (response) {
			console.log(response);
			NewAlert(response.statusText, " FailedAlert");

		});

	}

}

function PostVacation() {

	PostAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/VacationsAPI/CreateVacation", 'CreateVacation');

}

function PostPermession() {

	PostAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/PermissionsAPI/CreatePermission", 'CreatePermission');

}

// API data function 

function GetAPIData($UserToken, $url, $CallBackIs,IDis) {

	//alert($UserToken);

	if ($UserToken) {
		var settings2 = {
			"async": true,
			"crossDomain": true,
			"url": $url,
			"method": "GET",
			"headers": {
				"Authorization": "Bearer " + $UserToken + "",
				"cache-control": "no-cache",
				"Postman-Token": "f1345208-e767-4be6-acd8-99e8a46333c5"
			}

		}

		$.ajax(settings2).success(function (response) {

			if ($CallBackIs == "GetEmpData") {

				console.log(response);

				//	var elementExists = document.getElementsByClassName("EmpID");

				//	if(elementExists){alert($(".EmpID").html());}

				$(".EmpID").html(response.EmpID);
				$(".EmpFullNameA").html(response.EmpFullNameA);
				$(".EmploymentDateFormted").html(response.EmploymentDateFormted);
				$(".DepartmentID").html(response.DepartmentID);
				$(".JobTitleDesc").html(response.JobTitleDesc);

				localStorage.setItem("EmpID", response.EmpID);
				localStorage.setItem("EmpFullNameA", response.EmpFullNameA);
				localStorage.setItem("EmploymentDateFormted", response.EmploymentDateFormted);
				localStorage.setItem("DepartmentID", response.DepartmentID);
				localStorage.setItem("JobTitleDesc", response.JobTitleDesc);
				localStorage.setItem("IsManager", response.IsManager);

				IsManager =  response.IsManager;

				//alert( response.IsManager)

			 if(response.IsManager == false) { 

$('.EmpPermessionsList').hide();

$('.main_menu a').css({"width":"24%"});

			 }

				$('.splash').hide();
				$(".preloader").fadeOut();

				NewAlert('مرحباً : ' + response.EmpFullNameA + " <i class='fa fa-smile-o'><i>", 'SuccessAlert');

			}

			// End of : GetEmpData

			if (($CallBackIs == "GetEmpVacations") ||  ($CallBackIs == "ManagerVacations") ||  ($CallBackIs == "ManagerVacationsHistory")) {
				console.log(response);
				//	NewAlert(response[0].EmpVacationID);
				$.each(response, function (index, el) {
					// index is your 0-based array index
					// el is your value

					$.each(el, function (index2, val) {

						//	NewAlert(index2);

						if (index2 == "EmpFullNameA") {
							$EmpFullNameA = val.split(' ').slice(0, -2).join(' ');

						}

						if (index2 == "EmpVacationID") {
							$VacID =  val;

						}
						
						if (index2 == "StartDate_M") {
							$VacStartDate = val;
							$VacStartDate = val.split('T')[0]
						}
						if (index2 == "EndDate_M") {
							$VacEndDate = val;
							$VacEndDate = val.split('T')[0];
						}
						if (index2 == "VacationTypes") {
							$VacType = val.VacationTypeName;
						}
						if (index2 == "Period") {
							$VacPeriod = val;
						}
						if (index2 == "Note") {
							$VacNote = val;
						}
						if (index2 == "VacationStatus") {
							$VacStatus = val.StatusName;
						}

					});

					//NewAlert(index);

					/*if (index == 0) {
						$VacID = 1;
						//	NewAlert($VacID);  
					}*/

					if(($CallBackIs == "GetEmpVacations") ){

					$('.UserVacationsList .container .panel-group').append('<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapse' + $VacID + '"><i class="icon fa fa-th"></i> ' + $VacStartDate + ' - ' + $VacEndDate + '</a></h4></div><div id="collapse' + $VacID + '" class="panel-collapse collapse"><div class="panel-body"><p><dl class="dl-horizontal user-dl col-lg-6 col-md-6 col-sm-12 col-xs-12"><dt>النوع</dt><dd><span>' + $VacType + '</span></dd><dt>من</dt><dd><span>' + $VacStartDate + '</span></dd><dt>إلى</dt><dd><span>' + $VacEndDate + '</span></dd><dt>المدة</dt><dd><span>' + $VacPeriod + '</span></dd><dt>ملاحظات</dt><dd><span>' + $VacNote + '</span></dd><dt>الحالة</dt><dd><span>' + $VacStatus + '</span></dd></dl></p></div></div>');

					}
					//$VacID++;

					if($CallBackIs == "ManagerVacations") {

					//	alert("ManagerVacations");

						$('.EmpPermessionsListDiv .AdminVacations #accordion4').append('<div class="panel panel-default  Item_'+$VacID+'"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion4" href="#collapse' + $VacID + '"><i class="icon fa fa-th"></i> ' + $VacStartDate + ' - ' + $EmpFullNameA + '</a></h4></div><div id="collapse' + $VacID + '" class="panel-collapse collapse"><div class="panel-body"><p><dl class="dl-horizontal user-dl col-lg-6 col-md-6 col-sm-12 col-xs-12"><dt>النوع</dt><dd><span>' + $VacType + '</span></dd><dt>من</dt><dd><span>' + $VacStartDate + '</span></dd><dt>إلى</dt><dd><span>' + $VacEndDate + '</span></dd><dt>المدة</dt><dd><span>' + $VacPeriod + '</span></dd><dt>ملاحظات</dt><dd><span>' + $VacNote + '</span></dd> <dt>الحالة</dt><dd><button class="btn btn-sm btn-success col-xs-12 iDoAccept" data-id="'+$VacID+'" data-type="Vacation"><i class="fa fa-check"></i> موافق </button><br /><br /><button class="btn btn-sm btn-danger col-xs-12 iDoReject" data-id="'+$VacID+'" data-type="Vacation"><i class="fa btn-sm fa-ban"></i> رفض </button></dd></dl></p></div></div>');

					 }

					 if( ($CallBackIs == "ManagerVacationsHistory")){

						$('.EmpPermessionsListDiv .AdminVacations #accordion6').append('<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion6" href="#collapse' + $VacID + '"><i class="icon fa fa-th"></i> ' + $VacStartDate + ' - ' + $VacEndDate + '</a></h4></div><div id="collapse' + $VacID + '" class="panel-collapse collapse"><div class="panel-body"><p><dl class="dl-horizontal user-dl col-lg-6 col-md-6 col-sm-12 col-xs-12"><dt>النوع</dt><dd><span>' + $VacType + '</span></dd><dt>من</dt><dd><span>' + $VacStartDate + '</span></dd><dt>إلى</dt><dd><span>' + $VacEndDate + '</span></dd><dt>المدة</dt><dd><span>' + $VacPeriod + '</span></dd><dt>ملاحظات</dt><dd><span>' + $VacNote + '</span></dd><dt>الحالة</dt><dd><span>' + $VacStatus + '</span></dd></dl></p></div></div>');
	
						}

					// for example
					// NewAlert("element at " + index + ": " + el); // will NewAlert each value
				});

			}

			// End of : GetEmpVacations

			// End of : GetEmpData

			if ($CallBackIs == "GetEmpPermessions") {
				console.log(response);
				//	NewAlert(response[0].EmpVacationID);
				$.each(response, function (index, el) {
					// index is your 0-based array index
					// el is your value

					$.each(el, function (index2, val) {

						//	NewAlert(index2);

						if (index2 == "RequestDateMekadi") {
							$PermessionDate = val;
							$PermessionDate = val.split('T')[0]
						}
						if (index2 == "FromTime") {
							$FromTime = val;

						}
						if (index2 == "ToTime") {
							$ToTime = val;;
						}
						if (index2 == "PermissionType") {
							$VacType = val.EmpAbsentTypeDesc;
						}
						if (index2 == "Reason") {
							$Reason = val;
						}
						if (index2 == "VacationStatus") {
							$VacStatus = val.StatusName;
						}

						//NewAlert("element at " + El + ": " + val); // will NewAlert each value

					});

					//NewAlert(index);

					if (index == 0) {
						$VacID = 1;
						//	NewAlert($VacID);  
					}

					$('.UserPermessionsList .container #accordion4').append('<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion2" href="#collapse_' + $VacID + '"><i class="icon fa fa-th"></i> ' + $PermessionDate + '</a></h4></div><div id="collapse_' + $VacID + '" class="panel-collapse collapse"><div class="panel-body"><p><dl class="dl-horizontal user-dl col-lg-6 col-md-6 col-sm-12 col-xs-12"><dt>النوع</dt><dd><span>' + $VacType + '</span></dd><dt>من</dt><dd><span>' + $FromTime + '</span></dd><dt>إلى</dt><dd><span>' + $ToTime + '</span></dd><dt>ملاحظات</dt><dd><span>' + $Reason + '</span></dd><dt>الحالة</dt><dd><span>' + $VacStatus + '</span></dd></dl></p></div></div>');

					$VacID++;

					// for example
					// NewAlert("element at " + index + ": " + el); // will NewAlert each value
				});

			}

			// End of : GetEmpPermessions
			if ($CallBackIs == "ManagerPermissions") {
			
			//	alert('ManagerPermissions');

				console.log(response);

				//	NewAlert(response[0].EmpVacationID);
				$.each(response, function (index, el) {
					// index is your 0-based array index
					// el is your value

					$.each(el, function (index2, val) {

						//	NewAlert(index2);

						if (index2 == "EmpFullNameA") {
							$EmpFullNameA = val.split(' ').slice(0, -2).join(' ');
							
						}

						if (index2 == "ReqDate") {
							$PermessionDate = val;
							$PermessionDate = val.split('T')[0]
						}
						if (index2 == "FromTime") {
							$FromTime = val;

						}
						if (index2 == "ToTime") {
							$ToTime = val;
						}
						if (index2 == "EmpAbsentTypeDesc") {
							$VacType = val;
						}
						if (index2 == "Reason") {
							$Reason = val;
						}

						if (index2 == "EmpAbsentRequestID") {

							$EmpAbsentRequestID = val;
						
						}

					});

					$VacID = $EmpAbsentRequestID;

					$('.EmpPermessionsListDiv .AdminPermessions #accordion3').append('<div class="panel panel-default Item_'+$VacID+'"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion3" href="#collapse_' + $VacID + '"><i class="icon fa fa-th"></i> ' + $PermessionDate + " " + $EmpFullNameA + '</a></h4></div><div id="collapse_' + $VacID + '" class="panel-collapse collapse"><div class="panel-body"><p><dl class="dl-horizontal user-dl col-lg-6 col-md-6 col-sm-12 col-xs-12"><dt>النوع</dt><dd><span>' + $VacType + '</span></dd><dt>من</dt><dd><span>' + $FromTime + '</span></dd><dt>إلى</dt><dd><span>' + $ToTime + '</span></dd><dt>ملاحظات</dt><dd><span>' + $Reason + '</span></dd>  <dt>الحالة</dt><dd><button class="btn btn-sm btn-success col-xs-12 iDoAccept" data-id="'+$EmpAbsentRequestID+'" data-type="Permession"><i class="fa fa-check"></i> موافق </button><br /><br /><button class="btn btn-sm btn-danger col-xs-12 iDoReject" data-id="'+$EmpAbsentRequestID+'" data-type="Permession"><i class="fa btn-sm fa-ban"></i> رفض </button></dd></dl></p></div></div>');

				});

			}

			// End of : ManagerPermissions

			if ($CallBackIs == "ManagerPermissionsHistory") {
			
				//	alert('ManagerPermissions');
	
					console.log(response);
	
					//	NewAlert(response[0].EmpVacationID);
					$.each(response, function (index, el) {
						// index is your 0-based array index
						// el is your value
	
						$.each(el, function (index2, val) {
	
							//	NewAlert(index2);
	
							if (index2 == "EmpFullNameA") {
								$EmpFullNameA = val.split(' ').slice(0, -2).join(' ');
								
							}
	
							if (index2 == "ReqDate") {
								$PermessionDate = val;
								$PermessionDate = val.split('T')[0]
							}
							if (index2 == "FromTime") {
								$FromTime = val;
	
							}
							if (index2 == "ToTime") {
								$ToTime = val;
							}
							if (index2 == "EmpAbsentTypeDesc") {
								$VacType = val;
							}
							if (index2 == "Reason") {
								$Reason = val;
							}
	
							if (index2 == "EmpAbsentRequestID") {
	
								$EmpAbsentRequestID = val;
							
							}

							if (index2 == "PermissionStatus") {
	
								$PermissionStatus = val;

								if( $PermissionStatus  == 2 ) { $PermissionStatus = '<b>تمت الموافقة</b>'; }
								if( $PermissionStatus  == 3 ) { $PermissionStatus = '<b>تم الرفض</b>'; }
							
							}
							
						});
	
						$VacID = $EmpAbsentRequestID;
	
						$('.EmpPermessionsListDiv .AdminPermessions #accordion5').append('<div class="panel panel-default Item_'+$VacID+'"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion5" href="#collapse_' + $VacID + '"><i class="icon fa fa-th"></i> ' + $PermessionDate + " " + $EmpFullNameA + '</a></h4></div><div id="collapse_' + $VacID + '" class="panel-collapse collapse"><div class="panel-body"><p><dl class="dl-horizontal user-dl col-lg-6 col-md-6 col-sm-12 col-xs-12"><dt>النوع</dt><dd><span>' + $VacType + '</span></dd><dt>من</dt><dd><span>' + $FromTime + '</span></dd><dt>إلى</dt><dd><span>' + $ToTime + '</span></dd><dt>ملاحظات</dt><dd><span>' + $Reason + '</span></dd>  <dt>الحالة</dt><dd>'+$PermissionStatus+'</dd></dl></p></div></div>');
	
					});
	
				}
	
				// End of : ManagerPermissions
	
			// Start of 

			if ($CallBackIs == "GetVacationBalance") {

				console.log(response);

				$("#NewVacAllowedDuration").val(response);

				//NewAlert(response);

			}
			
			if ($CallBackIs == "AcceptPermession") {

				console.log(response);
			//	$("#NewVacAllowedDuration").val(response);
			NewAlert('تم ', "SuccessAlert");
			
			$('.Item_'+IDis).slideUp();
			$('#'+IDis).removeClass('iDoAccept btn-success');
			$('#'+IDis).addClass('btn-disabled');

				//NewAlert(response);

			}

			if ($CallBackIs == "RejectPermession") {

				console.log(response);
			//	$("#NewVacAllowedDuration").val(response);
			NewAlert('تم ', "SuccessAlert");
			
			$('.Item_'+IDis).slideUp();
			$('#'+IDis).removeClass('iDoAccept btn-danger');
			$('#'+IDis).addClass('btn-disabled');

				//NewAlert(response);

			}

			if ($CallBackIs == "AcceptVacation") {

				console.log(response);
			//	$("#NewVacAllowedDuration").val(response);
			NewAlert('تم ', "SuccessAlert");
			
			$('.Item_'+IDis).slideUp();
			$('#'+IDis).removeClass('iDoAccept btn-success');
			$('#'+IDis).addClass('btn-disabled');

				//NewAlert(response);

			}

			if ($CallBackIs == "RejectVacation") {

				console.log(response);
			//	$("#NewVacAllowedDuration").val(response);
			NewAlert('تم ', "SuccessAlert");
			
			$('.Item_'+IDis).slideUp();
			$('#'+IDis).removeClass('iDoAccept btn-danger');
			$('#'+IDis).addClass('btn-disabled');

				//NewAlert(response);

			}

		});

		$.ajax(settings2).fail(function (response) {

			$(".preloader").fadeOut();

			alert('حدث خطأ ما ، برجاء تكرار المحاولة ');

		});

	} // End if 
}

// End Get API Data 

//function GetEmpVacations(){

//}

VacTypeID = 1;

VacToDate = '';

$(document).on('change', '#NewVacVacationTypeID', function () {

	//$('#NewVacVacationTypeID').on("change", function () {

	VacTypeID = $(this).val();

	GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/VacationsAPI/GetVacationBalance?VacationTypeId=" + VacTypeID + "&ToDate=", 'GetVacationBalance');

	//alert($(this).val());

	//NewAlert($(this).val());

});

// Seconds counter 

var el = document.getElementById('seconds-counter');

ForceStop = "";

function incrementSeconds() {
	if( seconds > 0 ) {
    seconds -= 1; }
	el.innerText =  seconds;
	
	/*if ((IsLogged == "No"))  {

	NewAlert('خطأ في تسجيل الدخول', 'FailedAlert');
	$("#seconds-counter").animate({"bottom":"-20%"});
		$('.preloader').fadeOut();
		clearInterval(CountDownFive);

	} else if ((IsLogged == "") && (seconds > 0 ))  {

		DoUserLogin(seconds)
	
		} else if ((IsLogged == "No") && (seconds == 0 )) {
		NewAlert('خطأ في تسجيل الدخول', 'FailedAlert');
		ForceStop = 'Exit';
		$("#seconds-counter").animate({"bottom":"-20%"});
		$('.preloader').fadeOut();
		clearInterval(CountDownFive);
		return;

	} else if (IsLogged == "Logged") {

		$("#seconds-counter").animate({"bottom":"-20%"});

		$('.preloader').fadeOut();
		clearInterval(CountDownFive);
		return;

	 } else {

		if(seconds <= 0) { 
			NewAlert('Time Out ...', 'FailedAlert');
			$('.preloader').fadeOut();
			clearInterval(CountDownFive);
		}

	  }*/

}

//seconds = 20;

function DoUserLogin(SecondsCount) {
	seconds = 10;
	//if(SecondsCount){ seconds  = SecondsCount;  }

	$("#seconds-counter").animate({"bottom":"47vh"});
	IsLogged = "";

	el.innerText = seconds;
	
	CountDownFive = setInterval(incrementSeconds, 1000);

	var UserName = document.getElementById("UserName");

	var password = document.getElementById("password");

	$(".preloader")
		.fadeIn();

	var body = {
		grant_type: 'password',
		username:  UserName.value,
		password: password.value
	};
	
	$.ajax({
		url: BaseURL + "/Token",
		type: 'POST',
		dataType: 'json',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		/* data: JSON.stringify(body), /* wrong */
		data: body, /* right */
		/*complete: function(result) {
			//called when complete
			console.log(result);

		},*/
	
		success: function(result) {
			//called when successful
			console.log(result);

			AccToken = result.access_token;

		localStorage.setItem("UserToken", AccToken);

		GetAPIData(AccToken, BaseURL + "/api/EmployeeAPI/get", 'GetEmpData');

		GetAPIData(AccToken, BaseURL + "/api/VacationsAPI/GetVacations", 'GetEmpVacations');

		GetAPIData(AccToken, BaseURL + "/api/permissionsAPI/GetPermissions", 'GetEmpPermessions');

		GetAPIData(AccToken, BaseURL + "/api/VacationsAPI/GetVacationBalance?VacationTypeId=1&ToDate=", 'GetVacationBalance');

		/*GetAPIData(AccToken, BaseURL + "/api/PermissionsAPI/ManagerPermissions", 'ManagerPermissions');
		GetAPIData(AccToken, BaseURL + "/api/PermissionsAPI/ManagerPermissionsHistory", 'ManagerPermissionsHistory');

		GetAPIData(AccToken, BaseURL + "/api/VacationsAPI/ManagerVacations", 'ManagerVacations');
		GetAPIData(AccToken, BaseURL + "/api/VacationsAPI/ManagerVacationsHistory", 'ManagerVacationsHistory');*/

		IsLogged = "Logged";

		$("#seconds-counter").animate({"bottom":"-20%"});

		$('.preloader').fadeOut();
		clearInterval(CountDownFive);
		return;

		},
	
		error: function(result) {

			navigator.vibrate(300);

			//called when there is an error
			console.log(result);

			//alert('Error');

			NewAlert('خطأ في تسجيل الدخول', 'FailedAlert');
		ForceStop = 'Exit';
		$("#seconds-counter").animate({"bottom":"-20%"});
		$('.preloader').fadeOut();
		clearInterval(CountDownFive);
		return;

			IsLogged = "No";

		/*if (!ForceStop) {

			if (!IsLogged) {

				$(".preloader").fadeOut();

				NewAlert('خطأ في تسجيل الدخول', 'FailedAlert');

				$('.preloader').fadeOut();

			}
		}*/
		},
	});

} // End Do User Login Function 

/////////////////////////////////////////////////
var UserName = document.getElementById("UserName");
var password = document.getElementById("password");
//confirm_password = document.getElementById("confirm_password");

function validatePassword() {
	if (password.value != confirm_password.value) {
		confirm_password.setCustomValidity("Passwords Don't Match");
	} else {
		confirm_password.setCustomValidity('');
	}
}

function CurrentDate() {

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = dd + '/' + mm + '/' + yyyy;

	return today;

}

$(document).on('click','.iDoAccept',function(){

	ThisID = 	$(this).data('id');

//	alert(ThisID);
	ThisType = 	$(this).data('type');

	$.confirm({
		title: '',
		content: 'هل أنت متأكد',
		buttons: {
			موافق: function () {
				//$.alert('تمت الموافقة ');

				//alert(ThisType);
			
				if(ThisType === 'Permession' ) { 
			
				GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/PermissionsAPI/accept?EmpAbsentRequestID="+ThisID, 'AcceptPermession',ThisID)
			
				} else { 
			
				GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/VacationsAPI/accept?EmpVacationId="+ThisID+"&Reason=test", 'AcceptVacation',ThisID)
			
				}

			},
			تراجع : function () {
				//$.alert('تم التراجع');

			}/*,
			somethingElse: {
				text: 'Something else',
				btnClass: 'btn-blue',
				keys: ['enter', 'shift'],
				action: function(){
					$.alert('Something else?');
				}
			}*/
		}
	});

	//r = ConfirmDialog("cهل أنت متأكد ؟");

	});
	
	$(document).on('click','.iDoReject',function(){

		ThisID = 	$(this).data('id');
		ThisType = 	$(this).data('type');
		
		$.confirm({
			title: '',
			content: 'هل أنت متأكد ؟',
			buttons: {
				رفض: function () {
					//$.alert('تم الرفض !');
	if(ThisType === 'Permession' ) { 

	GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/PermissionsAPI/reject?EmpAbsentRequestID="+ThisID, 'RejectPermession',ThisID)
	
	} else {
		GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/VacationsAPI/reject?EmpVacationId="+ThisID+"&Reason=test", 'AcceptVacation',ThisID)

	}
				},
				تراجع: function () {
				//	$.alert('Canceled!');
				}
			}
		});

	});
	
$(document).ready(function () {

	// Loads 
	$('.splash').load("admin/_splash.html");
	$('.main_menu').load("admin/_Menu.html");
	$('.EmpPermessionsListDiv').load("admin/_EmpPermessionsList.html");

	// Check if User Token Available 

	TokenSession();

	if ((localStorage.getItem('UserToken') !== '') && (localStorage.getItem('UserToken') !== null)) {

		//NewAlertNewAlert(localStorage.getItem('UserToken'));

		//NewAlert(localStorage.getItem('UserToken'))

		$('.splash').hide();

		//NewAlert(localStorage.getItem('UserToken'));

		//GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/EmployeeAPI/get", 'GetEmpData');

		//alert(localStorage.getItem('EmpFullNameA'));

		$(window).on('load', function() {

		$(".EmpID").html(localStorage.getItem('EmpID'));
				$(".EmpFullNameA").html(localStorage.getItem('EmpFullNameA'));
				$(".EmploymentDateFormted").html(localStorage.getItem('EmploymentDateFormted'));
				$(".DepartmentID").html(localStorage.getItem('DepartmentID'));
				$(".JobTitleDesc").html(localStorage.getItem('JobTitleDesc')); 
			 });

			 $IsManager =  localStorage.getItem('IsManager');

			 //alert($IsManager);

			 if($IsManager == "false") { 

$('.EmpPermessionsList').hide();

$('.main_menu a').css({"width":"24%"});

			 }

		GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/VacationsAPI/GetVacations", 'GetEmpVacations');

		GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/permissionsAPI/GetPermissions", 'GetEmpPermessions');

		GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/VacationsAPI/GetVacationBalance?VacationTypeId=1&ToDate=", 'GetVacationBalance');
/*
		if($IsManager == "true" ) { 
			//alert($IsManager);
			GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/PermissionsAPI/ManagerPermissions", 'ManagerPermissions');
			GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/PermissionsAPI/ManagerPermissionsHistory", 'ManagerPermissionsHistory');

			GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/VacationsAPI/ManagerVacations", 'ManagerVacations');
			GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/VacationsAPI/ManagerVacationsHistory", 'ManagerVacationsHistory');

		}*/

	}

	//$.notify("Access granted", "success");

	/*----------- Index JS ----------------*/
	/*$(".skip_to_home").on('click',function () {
		alert('jhgfjhfgjhf');
			$(".splash")
				.animate({
					"right": "-100%"
				});
		});*/
	$(".skip_to_home_icon")
		.click(function () {
			$(".splash")
				.animate({
					"right": "-100%"
				});
		});

	$(document).on('click', '.AppHome', function () {
		$(".page")
			.animate({
				"top": "100%"
			});
		$(".page").hide();
		$(".HomePage").show().animate({
			"top": "0%"
		});

	});
	$('.EjazahServ').click(function () {
		$(".page")
			.animate({
				"top": "100%"
			});
		$(".page").hide();
		$(".EmpVacations").show();
		$(".EmpVacations")
			.animate({
				"top": "0%"
			});
	});

	$('.PermessionServ').click(function () {
		$(".page")
			.animate({
				"top": "100%"
			});
		$(".page").hide();
		$(".EmpPermession").show();
		$(".EmpPermession")
			.animate({
				"top": "0%"
			});
	});

	// $('.UserVacationsList').load("_UserVacations.html");

	// Load scripts this way to run on loaded external html 

	/*----------------------------*/

	VacTypeID = 1;

	VacToDate = '';

	$('#NewVacVacationTypeID').on("change", function () {

		VacTypeID = $(this).val();

		GetAPIData(localStorage.getItem("UserToken"), BaseURL + "/api/VacationsAPI/GetVacationBalance?VacationTypeId=" + VacTypeID + "&ToDate=" + CurrentDate(), "GetVacationBalance");

		//NewAlert(CurrentDate());
	});

	$(document).on("change", '#NewVacEndDate_M', function () {
		//	$('#NewVacEndDate_M').on("change", function () {

		//NewAlert(VacTypeID);

		//NewAlert($(this).val());

		//NewAlert(parseDate($('#NewVacEndDate_M').val()));

		NewVacEndDate_M = $(this).val().replace('-', '');
		NewVacEndDate_M = NewVacEndDate_M.replace('-', '');

		VacToDate = $(this).val();

		NewVacStartDate_M = $('#NewVacStartDate_M').val().replace('-', '');
		NewVacStartDate_M = NewVacStartDate_M.replace('-', '');

		if ((NewVacEndDate_M - NewVacStartDate_M) == 0) {
			NewVacPeriod = 1
		} else if ((NewVacEndDate_M - NewVacStartDate_M) >= 1) {
			NewVacPeriod = (NewVacEndDate_M - NewVacStartDate_M) + 1;
		}

		$('#NewVacPeriod').val(NewVacPeriod);

		$VacAvailability = $("#NewVacAllowedDuration").val() - $('#NewVacPeriod').val();

		$NewVacDayTypeId = $('#NewVacDayTypeId').val();

		if ($VacAvailability >= 0) {

			if ((($NewVacDayTypeId == 1) && ($VacAvailability >= 1)) || (($NewVacDayTypeId == 2) && ($VacAvailability >= 0.5)) || (($NewVacDayTypeId == 3) && ($VacAvailability >= 0.5))) {

				NewAlert("رصيدك يسمح !", 'SuccessAlert');

			} else if ((($NewVacDayTypeId == 1) && ($VacAvailability < 1)) || (($NewVacDayTypeId == 2) && ($VacAvailability < 0.5)) || (($NewVacDayTypeId == 3) && ($VacAvailability < 0.5))) {

				NewAlert("رصيدك إجازاتك لا يسمح ، فضلاً تواصل مع الإدارة !", 'FailedAlert');

			}

		} else {

			NewAlert("رصيدك إجازاتك لا يسمح ، فضلاً تواصل مع الإدارة ! ", 'FailedAlert');
		}

		GetAPIData(localStorage.getItem("UserToken"), BaseURL + "/api/VacationsAPI/GetVacationBalance?VacationTypeId=" + VacTypeID + "&ToDate=" + NewVacEndDate_M, "GetVacationBalance");

	});

	// Thee same 
	/*$(document).on('change', '#NewVacEndDate_M', function() {
		NewAlert($(this).val());

	});*/

	/*------------------------------------*/
	$(".preloader")
		.fadeOut(500);
	/*------------------------------------*/
	/*///////////// Login Form //////////////////////*/
	$(document).on('click', '#logout', function () {
		//$("#logout").addClass('hidden');
		//localStorage.login_is = "";
		//localStorage.pass_is = "";
		//localStorage.u_id = "";
		navigator.vibrate(100);
		$.confirm({
			title: '',
			content: 'هل أنت متأكد ؟',
			buttons: {
				نعم : function () {
					
					//$clearStorage =	localStorage.clear();

					//alert($clearStorage);
					localStorage.clear()
					window.location.href = "index.html";
					/*if(localStorage.clear()) {  } else { 
							alert('Try again ... ');
					return false; }*/
				},
				تراجع: function () {
				//	$.alert('Canceled!');
			
				}
			}
		});

/*
		if (confirm('Are you sure you want to logout ?')) {
			
		} else {
			// Do nothing!
			alert('Try again ... ');
			return false;
		}*/
		return false;

	});

	/*------------ menu clicks -------------------*/

	$(document).on("click", '.skip_to_home', function () {
		$(".splash")
		.animate({
			"right": "-100%"
		});
	});	

	$(".skip_to_home_icon")
		.click(function () {
			$(".splash")
				.animate({
					"right": "-100%"
				});
		});

	$(document).on('click', '.bottom_buttons a', function () {
		$('.bottom_buttons a').removeClass('active');
		$(".bottom_buttons a").css({
			"border-bottom": "none"
		});
		$(this).css({
			"border-bottom": "15px solid #c32e2e"
		});

		$(this).addClass('active');

	});
	$(document).on('click', '.MainSearch', function () {

		//alert('test ');

		$(".page").animate({
			"top": "100%"
		});
		$(".page").hide();
		$(".SearchPage").show().animate({
			"top": "0%"
		});
		//	$(".UserVacationsList").animate({ "top": "0%"});
	});
	$(document).on('click', '.UserPermessionsLink', function () {
		$(".page").animate({
			"top": "100%"
		});
		$(".page").hide();
		$(".UserPermessionsList").show().animate({
			"top": "0%"
		});

		//	$(".UserVacationsList").animate({ "top": "0%"});
	});
	
	$(document).on('click', '.EmpPermessionsList', function () {

		//if(IsManager == true ) { 
			GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/PermissionsAPI/ManagerPermissions", 'ManagerPermissions');
			GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/PermissionsAPI/ManagerPermissionsHistory", 'ManagerPermissionsHistory');
		
			GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/VacationsAPI/ManagerVacations", 'ManagerVacations');
			GetAPIData(localStorage.getItem('UserToken'), BaseURL + "/api/VacationsAPI/ManagerVacationsHistory", 'ManagerVacationsHistory');
		
		//}

		$(".page").animate({
			"top": "100%"
		});
		$(".page").hide();
		$(".EmpPermessionsListDiv").show().animate({
			"top": "0%"
		});
	});

	$(document).on('click', '.AdminNav button', function () {
		$('.AdminNav button').removeClass('Active');
		$(this).addClass('Active');

		$MyID = $(this).data('dir');

		//alert($MyID);
		if($MyID === "left"){
			
			$(this).closest("nav").next('.DoublePagesWide').animate({"right":"-100vw"});
		}  else {
			$(this).closest("nav").next('.DoublePagesWide').animate({"right":"0vw"});
		}

		//	$(".UserVacationsList").animate({ "top": "0%"});
	});

});

// End of document ready 