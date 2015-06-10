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
		distance: 100
	};
	
    Ti.Facebook.requestWithGraphPath('search?',data,'GET',function(e){
    	var restaurants=[];
    	var categories =[];
    	var locations  =[];
    	
    	console.log(JSON.parse(JSON.stringify(e)));
    	var j = (JSON.stringify(e.result)).replace(/\\/g, '');
    	var database = JSON.parse(j.substring(1,j.length-1));
    	var i = 0;
    	var d = database["data"][i];
    	while(d){
    		restaurants.push(d['name']);
    		categories.push(d['category']);
    		console.log(d['name']);
    		console.log(d['category']);
    		var street = d['location']['street'];
    		if (street){
    			locations.push(street + ', ' + d['location']['city']);
    			console.log(street + ', ' + d['location']['city']);
    		}
    		else{
    			locations.push(d['location']['city']);
    			console.log(d['location']['city']);
    		}
    		console.log('\n');
    		//console.log(d);
    		d = database["data"][i++];
    	}
    	
    	
		/*var f = e.result;
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
		console.log(restaurants);*/
		
		for(var i = 0; i < restaurants.length; i++) {
		    var row = Ti.UI.createTableViewRow({
		    	backgroundColor: 'white',
		    	height: 45
		    });
		    var lab1 = Ti.UI.createLabel({
		        color : '3b5998',
		        text : (i+1) + ": " + restaurants[i],
		        textAlign : 'left',
		        left:15,
		        fontSize : 13,
		        top: 5
		   	});
		   	var lab2 = Ti.UI.createLabel({
		        color : '3b5998',
		        text : categories[i],
		        textAlign : 'left',
		        right:5,
		        fontSize : 5,
		        top: 5
		   	});
		   	var lab3 = Ti.UI.createLabel({
		        color : '3b5998',
		        text : locations[i],
		        textAlign : 'left',
		        left:15,
		        fontSize : '0.5em',
  				fontStyle : 'italics',
		        top: 25
		   	});
		    row.add(lab1);
		    row.add(lab2);
		    row.add(lab3);
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