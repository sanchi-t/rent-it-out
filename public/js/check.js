<script src="https://kit.fontawesome.com/dfdf35b65f.js" crossorigin="anonymous"></script>

var modal = document.getElementById("myModal");

// Get the button that opens the modal
		var btn = document.getElementById("mybtn");
		btn.onclick= function() {
			modal.style.display = "block";
			event.preventDefault();
			};
			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
		}

var http = require('http');
const {total} = require('/script.js');