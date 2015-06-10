var win1 = Titanium.UI.createWindow({
	backgroundColor:"#fff"
});
var tableData = [];

var fb = require('facebook');
fb.appid=466178043501926;
fb.permissions = ['read_stream'];
fb.initialize(1000);
fb.authorize;

var loginButton = fb.createLoginButton({
	readPermissions: ['read_stream','email'],
	top: 20,
});
var row1 = Ti.UI.createTableViewRow({height : 65});
row1.add(loginButton);
tableData.push(row1);

Ti.Geolocation.getCurrentPosition(function(e){
	var data = {
		type: "place",
		center: e.coords.latitude + ',' + e.coords.longitude,
		distance: 50
	};
	
	//Ti.Facebook.requestWithGraphPath('search?type=place&q=bar&center='+latitude+','+longitude+'&distance=1500', {}, 'GET', function(e) {
	//Ti.Facebook.requestWithGraphPath('me', {}, 'GET', function(e)
    Ti.Facebook.requestWithGraphPath('search?',data,'GET',function(e){
    	console.log(JSON.parse(JSON.stringify(e)));
		var f = e.result;
		var NameEx = /{\"name\":\"(.*?)\"/g;
		function getMatches(string, regex, index) {
		  	index || (index = 1);
		  	var matches = [];
		  	var match;
		  	while (match = regex.exec(string)) {
			    matches.push(match[index]);
			  }
			return matches;
		}
		var restaurants = getMatches(f,NameEx,1);
		console.log(restaurants);
		for (var i=0; i<restaurants.length; i++){
			console.log(JSON.stringify(restaurants[i]));
		}
		
		for(var i = 0; i < restaurants.length; i++) {
		    var row = Ti.UI.createTableViewRow({
		    	backgroundColor: 'white',
		    	height: 45
		    });
		    var lab = Ti.UI.createLabel({
		        color : '3b5998',
		        text : (i+1) + ": " + restaurants[i],
		        textAlign : 'left',
		        left:15
		   	});
		    row.add(lab);
		    tableData.push(row); 
		}
		var tableView = Ti.UI.createTableView({
   			data : tableData
		});
		win1.add(tableView);
		win1.open();  
   	});    
});

/*var restaurants = ["Blackjack Burgers", "Cornbob Bill", "Fork and Knife","Mr.Potato",
					"Salty Fish","Prime 16","Erin's Cafe","The Homeplace",
					"Jimmy's Pretzels","Zinc Kitchen","Roia","Carne Asada","Veggie Might",
					"Tacolita"];
for(var i = 0; i < restaurants.length; i++) {
    var row = Ti.UI.createTableViewRow({
    	backgroundColor: 'white',
    	height: 45
    });
    var lab = Ti.UI.createLabel({
        color : '3b5998',
        text : (i+1) + ": " + restaurants[i],
        textAlign : 'left'
   	});
    row.add(lab);
    tableData.push(row); 
}*/ 