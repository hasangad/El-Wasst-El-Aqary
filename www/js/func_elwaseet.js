console.log('Elwaseet El Aqary');
// API data function 
/*function GetAPIData($UserToken, $url, $CallBackIs) {
	alert('Elwaseet El Aqary');
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
				IsManager = response.IsManager;
				if (response.IsManager == false) {
					$('.EmpPermessionsList').hide();
					$('.main_menu a').css({
						"width": "24%"
					});
				}
				$('.splash').hide();
				$(".preloader").fadeOut();
				//NewAlert('مرحباً : ' + response.EmpFullNameA + " <i class='fa fa-smile-o'><i>", 'SuccessAlert');
			}
         });
    }
};*/
Page = 1;
PageCount = 1;
Limit = 10;
$(".MainThumbHolder .Items").html("");
$(".preloader").fadeIn();
function GetItems($page, $Limit) {
    $('#MoreItems').hide();
    var url = "http://www.elwaseetmnf.net/api/GeneralAPI.php?offset=" + $page + "&limit=" + $Limit;
    $.getJSON(url, function (tick) {
        console.log[tick];
        $.each(tick, function (i, item) {
            if (item['Elevator'] == 1) {
                elevator = "يوجد ";
            } else {
                elevator = "لا يوجد  ";
            }
            //   alert(item);
            $(".MainThumbHolder .Items").append('<a item-id="'+item[0]+'" class="MainThumb MainThumbblock Page' + Page + '" onclick="ClickMe()"><img src="http://elwaseetmnf.net/admin/layoute/img/upload/' + item[1] + '" width="" title="' + item[2] + '" /><b>' + item[2] + '</b><p>' + item[4] + '</p><span class="col-xs-3"><i class="fa fa-th"></i> <em>' + item[6] + '</em></span><span class="col-xs-5"><i class="fa fa-th"></i> <em>' + item[7] + '</em></span><span class="col-xs-4"><i class="fa fa-th"></i> <em>' + item['CountRoom'] + ' غرف</em></span><span class="col-xs-3"><i class="fa fa-th"></i> <em>' + item['CountBathroom'] + ' حمام</em></span><span class="col-xs-5"><i class="fa fa-th"></i> <em>' + item['Finished'] + '</em></span><span class="col-xs-4"><i class="fa fa-th"></i> <em>' + elevator + ' أسانسير</em></span></a>');
            if (Page == 10) {
                Page = 0;
            } else {
                Page++;
            }
            PageCount++;
        });
        $('#MoreItems').show();
    }); //$('.tickets  , .products').slideUp();
    $(".preloader").fadeOut();
};
GetItems(0, 10);
function CheckMore() {
    if ($('#MoreItems').on().visible()) {
        $(".preloader").fadeIn();
        //alert($('#MoreItems').on().visible());
        GetItems(PageCount, 5);
    }
};
setTimeout(function () {
    if (PageCount = 10) {
        // alert(PageCount);
        setInterval(CheckMore, 500);
    }
}, 2000)



function ClickMe() {

    alert('Test');

}

$(document).ready(function() {
   /* $('.MainThumb').click(function(){
        alert('clicked ');
        $(this).addClass('ItemActive');
        
            });*/




                $(document).on('click', '.MainThumb', function () {
               // $(this).addClass('ItemActive');
              // $(this).prepend('<span class="CloseMe"></span>');
              //  $(this).animate({"position":"fixed","top":"0","left":"0","width":"100%","z-index":"9999999999","margin":"6vh 0 0 0","border-radius":"0","height":"90vh"});
 $itemid = $( this).attr( "item-id" );
 HTML = $(this).html();

$('.ItemDetails > div.MainThumb').html(HTML);
var url = "http://www.elwaseetmnf.net/api/GeneralAPI.php?GetItem=" + $itemid;
    $.getJSON(url, function (tick) {
        console.log[tick];
        $.each(tick, function (i, item) {
            if (item['Elevator'] == 1) {
                elevator = "يوجد ";
            } else {
                elevator = "لا يوجد  ";
            }
            //   alert(item);
            $(".ItemDetails > div").append('<span class="col-xs-6"><i class="fa fa-th"></i> حالة العقار : '+item['status']+'</span><span class="col-xs-6"><i class="fa fa-th"></i> مفروش : '+item['Brush']+'</span><span class="col-xs-12"><i class="fa fa-th"></i> السعر : '+item['Price']+'</span><span class="col-xs-12"><i class="fa fa-th"></i> تفاصيل  : '+item['Description']+'</span>');
            if (Page == 10) {
                Page = 0;
            } else {
                Page++;
            }
            PageCount++;
        });
    });

$(".page").animate({
    "left": "100%"
});
//$(".page").hide();
$(".ItemDetails").show().animate({
    "left": "0%"
});

                    });

                    $(document).on('click', '.CloseMe', function () {
                  // alert('iClick');
                  $(".page").animate({
                    "left": "0%"
                });
                //$(".page").hide();
                $(".ItemDetails").show().animate({
                    "left": "-100%"
                });
                });
            });