
var app = {
		initialize: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	
	onDeviceReady: function() {

		StatusBar.overlaysWebView(true);
		StatusBar.styleDefault();
		StatusBar.backgroundColorByName("red");
  
		function checkConnection() {
			var networkState = navigator.connection.type;
			var states = {};
			states[Connection.UNKNOWN] = 'Unknown connection';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI] = 'WiFi connection';
			states[Connection.CELL_2G] = 'Cell 2G connection';
			states[Connection.CELL_3G] = 'Cell 3G connection';
			states[Connection.CELL_4G] = 'Cell 4G connection';
			states[Connection.CELL] = 'Cell generic connection';
			states[Connection.NONE] = 'No network connection';
			//alert('Connection type: ' + states[networkState]);
			if (states[networkState] == states[Connection.NONE]) {
				//alert(" غير متصل بالانترنت !");
				$(".check_interent").on().fadeIn(1000);

			} else {
				//alert("Connected");
				if (localStorage.login_is) {
					$(".splash").hide();
				} else {
				//	alert("  متصل  !");

					//$(".skip_to_home").on().fadeIn(1000);
				}
			}
			//document.addEventListener("deviceready", onDeviceReady, false);
			//function onDeviceReady() {
			//	console.log(navigator.vibrate);
			//}
			// Vibrate for 1 second
			// Wait for 1 second
			// Vibrate for 3 seconds
			// Wait for 1 second
			// Vibrate for 5 seconds
			//	navigator.vibrate([1000, 1000, 3000, 1000, 5000]);
		}
		checkConnection();
		
		/*FCMPlugin.subscribeToTopic('HasanGadSupport');
		FCMPlugin.subscribeToTopic('HasanGadSupportMobile');
		
		FCMPlugin.onTokenRefresh(function(token) {
			localStorage.MobileToken = token;
		});
		
		FCMPlugin.getToken(function(token) {
			localStorage.MobileToken = token;
		});
		
		localStorage.BadgeCount = 0;
		FCMPlugin.onNotification(function(data) {
			if (data.wasTapped) {
				
				var GetNotify = JSON.stringify(data);
				
				JSON.parse(GetNotify, (NotifyKey, NotifyValue) => {
					if (NotifyKey === 'TicketID') {
						
						notify(NotifyValue);
					}
					
				});
				
			} else {
				JSON.parse(GetNotify, (NotifyKey, NotifyValue) => {
					if (NotifyKey === 'TicketID') {
						$('.NotifyBellMenu')
							.append("<a onclick='" + notify(NotifyValue) + "'>تنبيه جديد للتذكرة رقم " + NotifyValue + "</a>");;
					}
				});
				
				$BadgeCount = $("#BadgeCount")
					.text();
				$("#BadgeCount")
					.text(parseInt($BadgeCount) + 1);
				localStorage.BadgeCount++;
				$('.badge')
					.removeClass('badge-dark');
				$('.badge')
					.addClass('badge-danger');
			}
		});*/
	}
	};
