var PoleChan;
var PoleChanVariance = .07;
var PoleSmallKickPositions = [753.5,760.8,761.65,762.55,763.3,765.3,768,769.5,772.75,774.8];
var PoleBigKickPositions = [780.1,795.5];
var PoleUnlimitedKickWorksPositions = [789];

if (document.getElementById("currenttitle").textContent.indexOf("Toradora! E02: Ryuuji and Taiga") > -1) {
    StartKicking();
}

socket.on("changeMedia", function(data) {
    if (data.title.indexOf("Toradora! E02: Ryuuji and Taiga") > -1) {
        StartKicking();
    } else {
        clearInterval(PoleChan);
    }
});

function PoleChanKick(kicked, startdelay, delaytimer) {
    setTimeout(function() {
        document.getElementsByTagName("body")[0].classList.add(kicked);
    }, startdelay);
    setTimeout(function() {
        document.getElementsByTagName("body")[0].classList.remove(kicked);
    }, delaytimer + startdelay);
}

function StartKicking() {
    PoleChan = setInterval(function () {
        console.log("Active");
        if (PLAYER.player !== null) {
            PlayerTime = PLAYER.player.currentTime();
            for (var iPole = 0; iPole < PoleSmallKickPositions.length; iPole++) {
                if (PlayerTime + PoleChanVariance > PoleSmallKickPositions[iPole] && PlayerTime - PoleChanVariance < PoleSmallKickPositions[iPole]) {
                    var startDelay = 0;
                    if (PlayerTime < PoleSmallKickPositions[iPole]) {
                        startDelay = PoleSmallKickPositions[iPole] - PlayerTime;
                    }
                    PoleChanKick("kickedSmall", startDelay, 200);
                }
            }
            for (var iPole = 0; iPole < PoleBigKickPositions.length; iPole++) {
                if (PlayerTime + PoleChanVariance > PoleBigKickPositions[iPole] && PlayerTime - PoleChanVariance < PoleBigKickPositions[iPole]) {
                    var startDelay = 0;
                    if (PlayerTime < PoleSmallKickPositions[iPole]) {
                        startDelay = PoleSmallKickPositions[iPole] - PlayerTime;
                    }
                    PoleChanKick("kickedBig", startDelay, 200);
                }
            }
            for (var iPole = 0; iPole < PoleUnlimitedKickWorksPositions.length; iPole++) {
                if (PlayerTime + PoleChanVariance > PoleUnlimitedKickWorksPositions[iPole] && PlayerTime - PoleChanVariance < PoleUnlimitedKickWorksPositions[iPole]) {
                    var startDelay = 0;
                    if (PlayerTime < PoleSmallKickPositions[iPole]) {
                        startDelay = PoleSmallKickPositions[iPole] - PlayerTime;
                    }
                    PoleChanKick("UnlimitedKickWorks", startDelay, 6000);
                }
            }
        } else {
            clearInterval(PoleChan);
        }
    }, 100);
}