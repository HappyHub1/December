var AmiFace;
var AmiFaceVariance = .07;
var AmiFacePositions = [["[tsukarimasen] Toradora! - 06 (BD 1280x720)", [1287.75,1289.5]],["[tsukarimasen] Toradora! - 07 (BD 1280x720)", [14,15.75]]];
var iAmi = -1;
var AmiFaceCSS = this.document.createElement("link");
AmiFaceCSS.id = "amifacecss";
AmiFaceCSS.rel = "stylesheet";
AmiFaceCSS.type = "text/css";
AmiFaceCSS.disabled = true;
AmiFaceCSS.href = `${SCRIPT_FOLDER_URL}/amiface.css`;
document.head.appendChild(AmiFaceCSS);

for (var i = 0; i < AmiFacePositions.length; i++) {
	if (document.getElementById("currenttitle").textContent.indexOf(AmiFacePositions[i][0]) > -1) {
		StartAmiFace();
		iAmi = i;
		break;
	}
}

socket.on("changeMedia", function(data) {
	for (var i = 0; i < AmiFacePositions.length; i++) {
		if (data.title.indexOf(AmiFacePositions[i][0]) > -1) {
			iAmi = i;
			StartAmiFace();
			break;
		} else {
			iAmi = -1;
			clearInterval(AmiFace);
		}
	}
});

function AmiFacePopup(startdelay, delaytimer) {
    setTimeout(function() {
        AmiFaceCSS.disabled = false;
    }, startdelay);
    setTimeout(function() {
        AmiFaceCSS.disabled = true;
    }, delaytimer + startdelay);
}

function StartAmiFace() {
	loadImg(`${SCRIPT_FOLDER_URL}/Images/ami-face-hq-popup.png`, removeImg, "amiface");
	
    AmiFace = setInterval(function () {
        if (PLAYER.player !== null && iAmi !== -1) {
            PlayerTime = PLAYER.player.currentTime();
			for (var i = 0; i < AmiFacePositions[iAmi][1].length; i++) {
				if (PlayerTime + AmiFaceVariance > AmiFacePositions[iAmi][1][i] && PlayerTime - AmiFaceVariance < AmiFacePositions[iAmi][1][i]) {
					var startDelay = 0;
					if (PlayerTime < AmiFacePositions[iAmi][1][i]) {
						startDelay = AmiFacePositions[iAmi][1][i] - PlayerTime;
					}
					AmiFacePopup(startDelay, 200);
				}
			}
        } else {
            clearInterval(AmiFace);
        }
    }, 100);
}

function loadImg(url, callback, imgid) {
	var imgelement = new Image();
	imgelement.onload = function() {
		callback(imgelement)
	};
	imgelement.onerror = function() {};
	imgelement.src = url;
	imgelement.id = imgid;
	document.head.appendChild(imgelement);
}

function removeImg(imgtoremove) {
	imgtoremove.remove();
}