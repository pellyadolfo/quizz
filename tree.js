var QuizzComponent = function(mapAttr) {
	var self = this;

	var map = mapAttr;

	var question;
	var order = -1;
	var NUM_CHOICES = 1;

	this.init = function() {

	}

	// ************************************************************************************************************
	// ************************************************ num responses *********************************************
	// ************************************************************************************************************
	this.setNumResponses = function(numResponses) {
		NUM_CHOICES = numResponses;
	}

	// ************************************************************************************************************
	// **************************************************** render ************************************************
	// ************************************************************************************************************
	this.showSections = function(obj) {
		var keys = Object.keys(obj);

		// populate title
		document.getElementById("patternName").innerHTML = "SECTIONS";

		// populate options
		var ul = document.getElementById("responsesList");
		ul.innerHTML = "";

		// populate sections
		for (var i = 0; i < keys.length; i++) {
			if (obj[keys[i]] == "SECTION") {
				var li = document.createElement('li');
				li.innerHTML = keys[i];
				li.classList.add("list-group-item");
				li.classList.add("h1");
				li.setAttribute("order", i + "");
				li.onclick = function(id) {
					var order = this.getAttribute("order");
					self.goto(obj, order);
				}
				ul.appendChild(li);
			}
		}
	}

	// ************************************************************************************************************
	// *********************************************** button changes *********************************************
	// ************************************************************************************************************
	this.goto = function (obj, orderAttr) {
		order = parseInt(orderAttr, 10);

		// show question
		var request = (order + 1) + "/" + Object.entries(obj).length + ' ' + Object.entries(obj)[order][0];
		document.getElementById("patternName").innerHTML = request;

		// show response
		var correctResponse = Object.entries(obj)[order][1];
		self.renderResponses(obj, correctResponse);
	}

	this.next = function (obj, i) {
		console.log('order ' + order + '; i:' + i);
		console.log('order + i:' + (order + i));

		if (order + i >= Object.entries(obj).length - 1)
			order = Object.entries(obj).length - 1;
		else if (order + i <= 0)
			order = 0;
		else order = order + i;
		console.log('order ' + order + ' is ' + Object.entries(obj)[order][0]);
		console.log(Object.entries(obj).length);

		// show question
		var request = (order + 1) + "/" + Object.entries(obj).length + ' ' + Object.entries(obj)[order][0];
		document.getElementById("patternName").innerHTML = request;

		// show response
		var correctResponse = Object.entries(obj)[order][1];
		self.renderResponses(obj, correctResponse);
	}

	this.randomProperty = function (obj) {
		var keys = Object.keys(obj)
		document.getElementById("patternName").style.color = "black";
		console.log("********************");
					
		// show question
		var correctKey = keys[ keys.length * Math.random() << 0];
		question = correctKey;
		document.getElementById("patternName").innerHTML = correctKey;

		// show response
		var correctValue = obj[correctKey];
		console.log(correctKey + " : " +  correctValue);
		self.renderResponses(obj, correctValue);
	};

	// ************************************************************************************************************
	// **************************************************** render ************************************************
	// ************************************************************************************************************
	this.renderResponses = function(obj, correctResponse) {
		var keys = Object.keys(obj)
		let responses = [];

		// ad correct response
		responses.push(correctResponse);

		// get 4 more random responses
		for (var i = 0; i < NUM_CHOICES - 1; i++)
			responses.push(obj[keys[ keys.length * Math.random() << 0]]);
		console.log(responses);
					
		// randow order for responses
		self.shuffleArray(responses);
		console.log(responses);
					
		// populate options
		var ul = document.getElementById("responsesList");
		ul.innerHTML = "";
		for (var i = 0; i < responses.length; i++) {
			var li = document.createElement('li');
			li.innerHTML = responses[i];
			li.classList.add("list-group-item");
			li.classList.add("h1");
			li.onclick = function(id) {
				if (this.innerHTML == correctResponse) {
					this.classList.add("list-group-item-success");
				} else {
					this.classList.add("list-group-item-danger");
				}
			}
			ul.appendChild(li);
		}
	}

	this.shuffleArray = function (array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
	
	this.checkAnswer = function (valueItem) {		
		//var key = document.getElementById("patternName").innerHTML;
		console.log('question: ' + question);

		var valueSelected = self.unEntity(document.getElementById(valueItem).innerHTML);
		console.log('answer selected: ' + valueSelected);

		var valueCorrect = map[question];
		console.log('right answer: ' + map[question]);
					
		if (valueCorrect == valueSelected) {
			document.getElementById(valueItem).style.color = "green";
			//document.getElementById("patternName").style.color = "green";
			console.log('OK');
		} else {
			document.getElementById(valueItem).style.color = "red";
			//document.getElementById("patternName").style.color = "red";
			console.log('Fail');
		}
	}

	this.unEntity = function (str){
		return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
	}

}