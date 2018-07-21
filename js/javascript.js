
var app = new Vue({
      el: '#app',
      data: {
      	startingZip: '',
      	startingCity: '',
      	endingZip: '',
      	endingCity: '',
      },
      watch: {
      	startingZip: function(){
      		this.startingCity = '';
      		if (this.startingZip.length == 5 ) {

      			this.lookUpStZip();
      		}
      	},
      	endingZip: function(){
      		this.endingCity='';
      		if (this.endingZip.length == 5) {
      			this.lookUpEnZip();
      		}
      	}
      },
      methods: {
      	// debounce loadash function hold up for a 500 MS after that send the requist
      	lookUpStZip:  _.debounce(function(){
      		var app = this ;
      		app.startingCity =  "Searching...";
      		axios.get('http://ziptasticapi.com/' + app.startingZip)
      			.then(function(response){
      				app.startingCity = response.data.city + ' , ' + response.data.state ;
      			})
      			.catch(function(error){
      				app.startingCity = "Invalid Zip Code";
      			})

      	} , 500),
      	lookUpEnZip: _.debounce(function(){
      		var app = this;
      		app.endingCity = "Searching...";
      		axios.get('http://ziptasticapi.com/' + app.endingZip)
      			.then(function(response){
      				app.endingCity = response.data.city + ' , ' + response.data.state;
      			})
      			.catch(function(error){
      				app.endingCity = "Invalid Zip Code";
      			})
      	},500),
      }
    });

