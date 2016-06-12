var divtop = document.getElementById('unscrolled-menu-wrapper');
var scrollPosition;  

var productArray = [];
var dStrings = ["length","width", "height", "weight"];

document.getElementById("unscrolled-menu-wrapper").style.visibility = "visible";
document.getElementById("navbar-menu").style.visibility = "hidden";

window.onscroll = function (e)
{
    scrollPosition = document.body.scrollTop;  
    if (scrollPosition > 2) { 
    	document.getElementById("navbar-menu").style.visibility = "visible";
    	document.getElementById("unscrolled-menu-wrapper").style.visibility = "hidden";
    } else {
    	document.getElementById("unscrolled-menu-wrapper").style.visibility = "visible";
		document.getElementById("navbar-menu").style.visibility = "hidden";
    }
}

var obj;
var xhr = new XMLHttpRequest();
xhr.open("GET", "../data/products.json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    obj = JSON.parse(xhr.responseText);
  }
}
xhr.send();

function calculate(length, width, height, weight) {
	if(length>0 && width>0 && height>0 && weight>0) {
		productArray = []
		var i;

		Object.keys(obj.products).forEach(function(key) {
			if (length <= obj.products[key].length) {
				productArray.push(obj.products[key]);
	        }
		});

		removeProduct(width, productArray, i, dStrings[1]);
		removeProduct(height, productArray, i, dStrings[2]);
		removeProduct(weight, productArray, i, dStrings[3]);

		if(productArray.length) {
			if(productArray.length >= 1) {
				var a = parseInt(productArray[0].length)+parseInt(productArray[0].width)+parseInt(productArray[0].height)+parseInt(productArray[0].weight);
				var index = 0;

				for(i=0; i <= productArray.length - 1; i++) {
						var s = parseInt(productArray[i].length)+parseInt(productArray[i].width)+parseInt(productArray[i].height)+parseInt(productArray[i].weight);
						if (s<a) {
							a=s;
							index=i;
						}
			    }
			} else {
				document.getElementById("answer").style.visibility = "visible";
				document.getElementById("answer").innerHTML = 'use this ' + productArray[index].name;
				document.getElementById("answer").className = "animateclass";
				document.getElementById("body-answer").innerHTML = 'use this ' + productArray[index].name;

			}

			document.getElementById("answer").style.visibility = "visible";
			document.getElementById("answer").innerHTML = 'use this ' + productArray[index].name;
			document.getElementById("answer").className = "animateclass";
			document.getElementById("body-answer").innerHTML = 'use this ' + productArray[index].name;

		} else {
			document.getElementById("error").style.visibility = "visible";
			document.getElementById("error").innerHTML = "Whoa!! We don't have any poducts that can carry that, try some other mesurements.";
		}
	} else {
		document.getElementById("error").style.visibility = "visible";
		document.getElementById("error").innerHTML = "Whoa!! all values must be greater than 0";
	}	

}

function calculateProduct() {
	if(document.getElementById('length-input').value && document.getElementById('width-input').value && document.getElementById('height-input').value && document.getElementById('weight-input').value) {
		document.getElementById("error").style.visibility = "hidden";
		document.getElementById("answer").style.visibility = "hidden";
		document.getElementById("answer").className = "";
		document.getElementById("body-answer").style.visibility = "hidden";
		document.getElementById("body-answer").className = "";

		var dimensions = [];
		var lengthValue = document.getElementById('length-input').value;
		var widthValue = document.getElementById('width-input').value;
		var heightValue = document.getElementById('height-input').value;
		var weightValue = document.getElementById('weight-input').value;
		dimensions.push(lengthValue, widthValue, heightValue, weightValue);

		calculate(dimensions[0], dimensions[1], dimensions[2], dimensions[3]);

	} else {
		document.getElementById("error").style.visibility = "visible";
		document.getElementById("error").innerHTML = "All fields are required";
	}

	setTimeout(function() { closeModal(); }, 5000);

}

function removeProduct(measurement, products, i, element) {
	i = productArray.length;
	if(i) {
		while(i--) {
			if (measurement > products[i][element]) {
				productArray.splice(i, 1);
	        }
		}
	} else {
		document.getElementById("error").style.visibility = "visible";
		document.getElementById("error").innerHTML = "Whoa!! We don't have any poducts that can carry that, try some other mesurements.";
	}
}

var modal = document.getElementById('myModal');
var btn = document.getElementById("launch-btn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
	document.getElementById('length-input').value = '';
	document.getElementById('width-input').value = '';
	document.getElementById('height-input').value = '';
	document.getElementById('weight-input').value = '';
	document.getElementById("error").style.visibility = "hidden";
	document.getElementById("answer").style.visibility = "hidden";
	document.getElementById("answer").className = "";
	document.getElementById("body-answer").style.visibility = "hidden";
	document.getElementById("body-answer").className = "";
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function closeModal() {
	modal.style.display = "none";
	if(document.getElementById("answer").style.visibility == "visible") {
			document.getElementById("body-answer").style.visibility = "visible";
			document.getElementById("body-answer").className = "animateclass";
	}
}
