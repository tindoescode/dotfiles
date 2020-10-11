var snackbarStyle = "\n/* The snackbar - position it at the bottom and in the middle of the screen */\n#save_to_notion_snackbar {\n  all: initial;\n  font-family: Roboto, Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  visibility: hidden; /* Hidden by default. Visible on click */\n  min-width: 200px; /* Set a default minimum width */\n  margin-left: -125px; /* Divide value of min-width by 2 */\n  background-color: #333; /* Black background color */\n  color: #fff; /* White text color */\n  text-align: center; /* Centered text */\n  border-radius: 2px; /* Rounded borders */\n  padding: 14px; /* Padding */\n  position: fixed; /* Sit on top of the screen */\n  z-index: 1000; /* Add a z-index if needed */\n  left: 50%; /* Center the snackbar */\n  bottom: 30px; /* 30px from the bottom */\n  -webkit-transition: background-color 100ms linear;\n  -ms-transition: background-color 100ms linear;\n  transition: background-color 100ms linear;\n}\n\n/* Show the snackbar when clicking on a button (class added with JavaScript) */\n#save_to_notion_snackbar.show {\n  visibility: visible; /* Show the snackbar */\n  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.\n  However, delay the fade out process for 2.5 seconds */\n  /*-webkit-animation: save_to_notion_fadein 0.5s, save_to_notion_fadeout 0.5s 2.5s;\n  animation: fadein 0.5s, save_to_notion_fadeout 0.5s 2.5s;*/\n}\n\n/* Animations to fade the snackbar in and out */\n@-webkit-keyframes save_to_notion_fadein {\n  from {bottom: 0; opacity: 0;}\n  to {bottom: 30px; opacity: 1;}\n}\n\n@keyframes save_to_notion_fadein {\n  from {bottom: 0; opacity: 0;}\n  to {bottom: 30px; opacity: 1;}\n}\n\n@-webkit-keyframes save_to_notion_fadeout {\n  from {bottom: 30px; opacity: 1;}\n  to {bottom: 0; opacity: 0;}\n}\n\n@keyframes save_to_notion_fadeout {\n  from {bottom: 30px; opacity: 1;}\n  to {bottom: 0; opacity: 0;}\n}\n";
var Snackbar = /** @class */ (function () {
    function Snackbar() {
        this.snackbarEl = document.getElementById("save_to_notion_snackbar");
        if (!this.snackbarEl) {
            {
                this.snackbarEl = document.createElement("div");
                this.snackbarEl.id = "save_to_notion_snackbar";
                this.snackbarEl.innerHTML = "";
                document.documentElement.appendChild(this.snackbarEl);
            }
            {
                var css = document.createElement("style");
                css.type = "text/css";
                css.appendChild(document.createTextNode(snackbarStyle));
                document.getElementsByTagName("head")[0].appendChild(css);
            }
        }
        this.snackbarEl.className.replace("show", "");
        /*{
          this.snackbarEl.className = "show"
          if (lastTimeout) clearTimeout(lastTimeout)
          // After 3 seconds, remove the show class from DIV
          lastTimeout = setTimeout(function () {
            this.snackbarEl.className = this.snackbarEl.className.replace(
              "show",
              ""
            )
            lastTimeout = null
          }, 3000)
        }*/
    }
    Snackbar.prototype.__show = function (timeout) {
        var _this = this;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.snackbarEl.classList.add("show");
        this.timeout = setTimeout(function () {
            _this.snackbarEl.classList.remove("show");
            _this.snackbarEl.style.backgroundColor = "#333"; //black
        }, timeout);
    };
    Snackbar.prototype.setLoadingStatus = function (msg, timeout) {
        this.snackbarEl.innerText = "Saving Highlight to Notion...";
        this.snackbarEl.style.backgroundColor = "#333"; //black
        this.__show(timeout);
    };
    Snackbar.prototype.setFailStatus = function (msg, timeout, tutorial) {
        this.snackbarEl.innerHTML = "Error: " + msg + " " + (tutorial
            ? "save page with the popup first, <a href='https://www.notion.so/a838b2ae22a7488b95a6b324819a1aa4'  style='font-weight: bold; color:white !important; text-decoration: underline !important;' target=\"_blank\">see tutorial</a>"
            : "");
        this.snackbarEl.style.backgroundColor = "#f44336"; //red
        this.__show(timeout);
    };
    Snackbar.prototype.setSuccessStatus = function (msg, timeout) {
        this.snackbarEl.innerText = "" + msg;
        this.snackbarEl.style.backgroundColor = "#4caf50"; //green
        this.__show(timeout);
    };
    return Snackbar;
}());
var snackbar = new Snackbar();
console.log("here");
switch (action) {
    case "loading":
        snackbar.setLoadingStatus(msg, timeout);
        break;
    case "fail":
        snackbar.setFailStatus(msg, timeout, tutorial);
        break;
    case "success":
        snackbar.setSuccessStatus(msg, timeout);
        break;
}
