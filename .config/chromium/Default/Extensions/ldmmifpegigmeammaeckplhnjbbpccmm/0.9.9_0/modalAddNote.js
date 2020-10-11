var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __saveToNotionIds = {
    submitButton: "__SaveToNotion_submitButton",
    textArea: "__SaveToNotion_textArea",
    modal: "__SaveToNotion_modal",
    statusDiv: "__SaveToNotion_statusDiv"
};
//var port = chrome.runtime.connect()
var done = null;
function closeModal() {
    var modal = document.getElementById(__saveToNotionIds.modal);
    modal.style.display = "none";
    done();
}
function addCss(rule) {
    var css = document.createElement("style");
    css.type = "text/css";
    css.appendChild(document.createTextNode(rule)); // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css);
}
function upsertModal() {
    var modal = document.getElementById(__saveToNotionIds.modal);
    var modalAlreadyExist = modal != null;
    var needAppend = modal == null;
    if (!modal)
        modal = document.createElement("div");
    modal.id = __saveToNotionIds.modal;
    modal.style.cssText = "\n  display: none; /* Hidden by default */\n  position: fixed; /* Stay in place */\n  z-index: 9000 !important; /* Sit on top */\n  left: 0;\n  top: 0;\n  width: 100%; /* Full width */\n  height: 100%; /* Full height */\n  overflow: auto; /* Enable scroll if needed */\n  background-color: rgb(0,0,0); /* Fallback color */\n  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n  ";
    var modalContentStyle = "\n  all: initial;\n  background-color: #fefefe;\n  margin: 15% auto; /* 15% from the top and centered */\n  padding: 20px;\n  border: 1px solid #888;\n  border-radius:3px;\n  width: 80%;\n  display:flex;\n  flex-direction:column;\n  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;\n  font: 400 13.3333px;\n  max-width:600px;\n  ";
    var textAreaStyle = "\n    all: initial;\n    border:1px solid grey\n    font:inherit !important;\n    -webkit-font-smoothing: antialiased;\n    width:100% !important;\nfont-size:15px !important;\ncolor: rgba(0, 0, 0, 0.87);\ncursor: text;\ndisplay: inline-flex;\nfont-size: 1rem !importantt;\nbox-sizing: border-box;\nalign-items: center;\nfont-family: Roboto, Helvetica, Arial, sans-serif;\nfont-weight: 400;\nline-height: 1.1876em;\nletter-spacing: 0.00938em;\nposition: relative;\nborder-radius: 4px !important;\npadding: 18.5px 14px;\n  resize:none;\n    border-radius:4px;\n    padding: 18.5px 14px;\n    display:inline-flex;\n  border: 1px solid #909090 !important;\n    font-family: inherit !important;\n    overflow:hidden;\n  ";
    var wrapperTextAreaStyle = "\n  ";
    var modalInnerContentStyle = "\n  display:flex;\n  flex-direction:column;\n  max-width:600px;\n  ";
    var buttonStyle = "\n  background-color:#4F9BC7;\n  height: 40px;\n  color:#fff !important;\n  font-size:15px !important;\n  font-family:inherit !important;\n    -webkit-font-smoothing: antialiased;\nborder: 0;\ncursor: pointer;\nmargin: 0;\ndisplay: inline-flex;\noutline: 0;\nposition: relative;\nalign-items: center;\nuser-select: none;\nvertical-align: middle;\njustify-content: center;\n-webkit-tap-highlight-color: transparent;\npadding: 6px 16px;\nfont-size: 0.875rem;\nmin-width: 64px;\nbox-sizing: border-box;\ntransition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\nfont-weight: 500;\nline-height: 1.75;\nborder-radius: 4px;\nletter-spacing: 0.02857em;\ntext-transform: capitalize !important;\ntext-decoration: none;\nbox-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);\n  ";
    var customCssStyle = "\n  \n    #" + __saveToNotionIds.textArea + ":hover {\n      border-color:#303030 !important;\n    }\n    #" + __saveToNotionIds.textArea + ":focus {\n      border-color:#303030 !important;\n    }\n\n    #" + __saveToNotionIds.submitButton + ":hover{\n      background-color:#3f7c9f !important;\n    }\n    \n    #" + __saveToNotionIds.submitButton + ":focus {\n      background-color:#3f7c9f !important;\n    }\n    \n    #" + __saveToNotionIds.submitButton + ":disabled {\n      background-color:#737373 !important;\n    }\n\n  ";
    //if (!modalAlreadyExist) {
    console.log("here");
    addCss(customCssStyle);
    //}
    if (!modalAlreadyExist) {
        console.log("add event register");
        function listener(event) {
            // We only accept messages from ourselves
            if (event.source != window)
                return;
            if (event.data.type && event.data.type == "SAVE_TO_NOTION_FROM_PAGE") {
                console.log("Content script received: " + event.data.text);
                //port.postMessage(event.data.text)
                saveToNotion();
            }
        }
        window.addEventListener("message", listener, false);
    }
    modal.innerHTML = "<div style=\"" + modalContentStyle + "\">\n    <div style=\"" + modalInnerContentStyle + "\">\n    <x-div style='font-size:18px; font-family:inherit !important; font-weight:bold; margin-bottom:12px'>Save To Notion - New Note</x-div>\n    <x-div style=\"margin-bottom:8px; " + wrapperTextAreaStyle + "\"><textarea onkeyup=\"document.getElementById('" + __saveToNotionIds.submitButton + "').disabled = this.value.length == 0\" style=\"" + textAreaStyle + "\" id=\"" + __saveToNotionIds.textArea + "\" placeholder=\"Enter Something...\"></textarea></x-div>\n    <button style=\"" + buttonStyle + "\" id=\"" + __saveToNotionIds.submitButton + "\" disabled onclick='window.postMessage({ type: \"SAVE_TO_NOTION_FROM_PAGE\", text: \"Hello from the webpage!\" }, \"*\")'>add note</button>\n    <x-div id=\"" + __saveToNotionIds.statusDiv + "\"></x-div>\n    </div>\n  </x-div>";
    var textarea = modal.querySelector("textarea");
    function autoResize() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    }
    window.setTimeout(function () {
        document.getElementById(__saveToNotionIds.textArea).focus();
    }, 0);
    textarea.addEventListener("input", autoResize, false);
    if (needAppend)
        document.documentElement.appendChild(modal);
    //hide on change
    modal.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    };
    return modal;
}
var x = window.addEventListener;
function saveToNotion() {
    return __awaiter(this, void 0, void 0, function () {
        var button, textArea, statusDiv, text, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    button = document.getElementById(__saveToNotionIds.submitButton);
                    textArea = document.getElementById(__saveToNotionIds.textArea);
                    statusDiv = document.getElementById(__saveToNotionIds.statusDiv);
                    text = textArea.value;
                    statusDiv.textContent = "";
                    button.textContent = "saving to notion...";
                    button.style.opacity = "0.7";
                    button.disabled = true;
                    console.log("send message...");
                    return [4 /*yield*/, sendMessage({
                            action: "addText",
                            text: text
                        })];
                case 1:
                    resp = _a.sent();
                    console.log("resp", resp);
                    button.textContent = "add to notion";
                    button.style.opacity = "1";
                    button.disabled = false;
                    if (resp.success == true) {
                        closeModal();
                        return [2 /*return*/];
                    }
                    statusDiv.style.color = "red";
                    statusDiv.textContent = "Error!";
                    return [2 /*return*/];
            }
        });
    });
}
function sendMessage(msg) {
    return new Promise(function (ok) {
        chrome.runtime.sendMessage(__assign(__assign({}, msg), { asyncId: asyncId }), function (response) {
            console.log("received", response);
            ok(response);
        });
    });
}
function modalAddNote() {
    return __awaiter(this, void 0, void 0, function () {
        var modal;
        return __generator(this, function (_a) {
            modal = upsertModal();
            modal.style.display = "block";
            return [2 /*return*/, new Promise(function (_resolve) {
                    done = function (d) { return _resolve(__assign({}, (d || {}))); };
                })];
        });
    });
}
function sendAsyncRespToBackground(promise) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = sendMessage;
                    _b = [{}];
                    return [4 /*yield*/, promise];
                case 1:
                    _a.apply(void 0, [__assign.apply(void 0, [__assign.apply(void 0, _b.concat([(_c.sent())])), { end: true }])]);
                    return [2 /*return*/];
            }
        });
    });
}
sendAsyncRespToBackground(modalAddNote());
