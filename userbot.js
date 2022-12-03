var msgLength = 10000;
var userLength = 10000;
var playlistLength = 5000;
var pollLength = 5000;
var aMessagesDefault = [["Timestamp", "Username", "Message","Team Icon","Shadowed"]];
var aMessages = getOrDefault(CHANNEL.name + "_MSGS", aMessagesDefault.slice(0));
var aUserCountDefault = [["Timestamp", "Usercount"]];
var aUserCount = getOrDefault(CHANNEL.name + "_USERCOUNT", aUserCountDefault.slice(0));
var aPlaylistDefault = [["Timestamp", "Title", "Duration", "Seconds", "Type", "Link"]];
var aPlaylist = getOrDefault(CHANNEL.name + "_PLAYLIST", aPlaylistDefault.slice(0));
var aPollsDefault = [["Timestamp", "Started by", "Title", "Options", "Counts"]];
var aPolls = getOrDefault(CHANNEL.name + "_POLLS", aPollsDefault.slice(0));
var downloadMsg = false;
var downloadUsers = false;
var downloadPlaylist = false;
var downloadPoll = false;
var teamIconRegex = /Ð(.+?)Ð/;
var regex1 = /<a.+href="(.+?)".+<\/a>/gi;
var regex2 = / <span style="display:none" class="teamColorSpan">.+/gi;
var FORCETEMP = getOrDefault(CHANNEL.name + "_FORCETEMP", true);

$('<button id="dl-logs" class="btn btn-sm btn-default">DL Logs</button>')
	.insertAfter($("#emotelistbtn"))
	.on("click", function () {
		downloadMsg = true;
		downloadUsers = true;
		downloadPlaylist = true;
		downloadPoll = true;
		setTimeout(function () {
			if (downloadMsg && aMessages.length > 1) {
				var filename = CHANNEL.name + "-CHAT-" + new Date() + ".csv";
				exportToCsv(filename, aMessages);
				aMessages = aMessagesDefault.slice(0);
				setOpt(CHANNEL.name + "_MSGS", aMessages);
			}
			downloadMsg = false;
		}, 3000);
		setTimeout(function () {
			if (downloadUsers && aUserCount.length > 1) {
				var filename = CHANNEL.name + "-USERS-" + new Date() + ".csv";
				exportToCsv(filename, aUserCount);
				aUserCount = aUserCountDefault.slice(0);
				setOpt(CHANNEL.name + "_USERCOUNT", aUserCount);
			}
			downloadUsers = false;
		}, 3000);
		setTimeout(function () {
			if (downloadPlaylist && aPlaylist.length > 1) {
				var filename = CHANNEL.name + "-PLAYLIST-" + new Date() + ".csv";
				exportToCsv(filename, aPlaylist);
				aPlaylist = aPlaylistDefault.slice(0);
				setOpt(CHANNEL.name + "_PLAYLIST", aPlaylist);
			}
			downloadPlaylist = false;
		}, 3000);
		setTimeout(function () {
			if (downloadPoll && aPolls.length > 1) {
				var filename = CHANNEL.name + "-POLLS-" + new Date() + ".csv";
				exportToCsv(filename, aPolls);
				aPolls = aPollsDefault.slice(0);
				setOpt(CHANNEL.name + "_POLLS", aPolls);
			}
			downloadPoll = false;
		}, 3000);
	});

removePollSocket();
socket.on("newPoll", newPollData);
socket.on("updatePoll", updatePollData);
socket.on("closePoll", closePollDownload);

function removePollSocket() {
	socket.off("newPoll", newPollData);
	socket.off("updatePoll", updatePollData);
	socket.off("closePoll", closePollDownload);
}

function newPollData(data) {
    aPolls[aPolls.length] = [data.timestamp, data.initiator, data.title, data.options.join(","), data.counts.join(",")];
}

function updatePollData(data) {
    aPolls[aPolls.length-1] = [data.timestamp, data.initiator, data.title, data.options.join(","), data.counts.join(",")];
}

function closePollDownload() {
	if (aPolls.length > pollLength || downloadPoll) {
		downloadPoll = false;
		var filename = CHANNEL.name + "-POLLS-" + new Date() + ".csv";
		exportToCsv(filename, aPolls);
		aPolls = aPollsDefault.slice(0);
	}
	try {
		setOpt(CHANNEL.name + "_POLLS", aPolls);
	} catch {
		exportToCsv(filename, aPolls);
		aPolls = aPollsDefault.slice(0);
		setOpt(CHANNEL.name + "_POLLS", aPolls);
	}
}

removeChatSocket();
socket.on("chatMsg", chatSocket);

function removeChatSocket() {
	socket.off("chatMsg", chatSocket);
}

function chatSocket(data) {
	if (data.meta.addClass !== "server-whisper") {
		var teamIcon = "None";
		if (teamIconRegex.test(data.msg2)) {
			teamIcon = data.msg2.match(teamIconRegex)[1];
		}
		
		var parsedMsg2 = data.msg2 || data.msg;
		
		if (parsedMsg2.match(regex1) !== null) {
		    parsedMsg2 = parsedMsg2.replace(regex1, "$1")
		}
		if (parsedMsg2.match(regex2) !== null) {
		    parsedMsg2 = parsedMsg2.replace(regex2,"");
		}

		aMessages[aMessages.length] = [data.time, data.username, parsedMsg2, teamIcon, data.meta.shadow || false];
		if (aMessages.length > msgLength || downloadMsg) {
			downloadMsg = false;
			var filename = CHANNEL.name + "-CHAT-" + new Date() + ".csv";
			exportToCsv(filename, aMessages);
			aMessages = aMessagesDefault.slice(0);
		}
		try {
			setOpt(CHANNEL.name + "_MSGS", aMessages);
		} catch {
			exportToCsv(filename, aMessages);
			aMessages = aMessagesDefault.slice(0);
			setOpt(CHANNEL.name + "_MSGS", aMessages);
		}
	}
}

removeUserSocket();
socket.on("usercount", userSocket);

function removeUserSocket() {
	socket.off("usercount", userSocket);
}

function userSocket(data) {
	aUserCount[aUserCount.length] = [new Date().getTime(), data];
	if (aUserCount.length > userLength || downloadUsers) {
		downloadUsers = false;
		var filename = CHANNEL.name + "-USERS-" + new Date() + ".csv";
		exportToCsv(filename, aUserCount);
		aUserCount = aUserCountDefault.slice(0);
	}
	try {
		setOpt(CHANNEL.name + "_USERCOUNT", aUserCount);
	} catch {
		exportToCsv(filename, aUserCount);
		aUserCount = aUserCountDefault.slice(0);
		setOpt(CHANNEL.name + "_USERCOUNT", aUserCount);
	}
}

removeMediaSocket();
socket.on("changeMedia", mediaSocket);

function removeMediaSocket() {
	socket.off("changeMedia", mediaSocket);
}

function mediaSocket(data) {
	aPlaylist[aPlaylist.length] = [new Date().getTime(), data.title, "`" + data.duration, data.seconds, data.type, data.id];
	if (aPlaylist.length > playlistLength || downloadPlaylist) {
		downloadPlaylist = false;
		var filename = CHANNEL.name + "-PLAYLIST-" + new Date() + ".csv";
		exportToCsv(filename, aPlaylist);
		aPlaylist = aPlaylistDefault.slice(0);
	}
	try {
		setOpt(CHANNEL.name + "_PLAYLIST", aPlaylist);
	} catch {
		exportToCsv(filename, aMessages);
		aMessages = aMessagesDefault.slice(0);
		setOpt(CHANNEL.name + "_PLAYLIST", aPlaylist);
	}
}

function exportToCsv(filename, rows) {
	var processRow = function (row) {
		var finalVal = '';
		for (var j = 0; j < row.length; j++) {
			var innerValue = row[j] === null ? '' : row[j].toString();
			if (row[j] instanceof Date) {
				innerValue = row[j].toLocaleString();
			};
			var result = innerValue.replace(/"/g, '""');
			if (result.search(/("|,|\n)/g) >= 0)
				result = '"' + result + '"';
			if (j > 0)
				finalVal += ',';
			finalVal += result;
		}
		return finalVal + '\n';
	};

	var csvFile = '';
	for (var i = 0; i < rows.length; i++) {
		csvFile += processRow(rows[i]);
	}

	var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) { // IE 10+
		navigator.msSaveBlob(blob, filename);
	} else {
		var link = document.createElement("a");
		if (link.download !== undefined) { // feature detection
			// Browsers that support HTML5 download attribute
			var url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", filename);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
}

if (hasPermission("mute")) {
	var FLAGGEDUSERS = getOrDefault(CHANNEL.name + "_FLAGGEDUSERS", {});
	var AUTOMUTE = getOrDefault(CHANNEL.name + "_AUTOMUTE", false);

	function autoUnmuteShadowMutedUsers(data) {
		if (Math.floor(data.currentTime) <= 0) {
			setTimeout(function() {
				var flaggedKeys = Object.keys(FLAGGEDUSERS);
				if (flaggedKeys.length > 0) {
					socket.emit("chatMsg", {
						msg: "/unmute " + flaggedKeys[0],
						meta: {}
					});
					delete FLAGGEDUSERS[flaggedKeys[0]];
					autoUnmuteShadowMutedUsers(data);
				} else {
					setOpt(CHANNEL.name + "_FLAGGEDUSERS", FLAGGEDUSERS);
				}
			}, 300);
		}
	}

	function autoShadowMuteUsers(data) {
		if (data.username !== "[server]") {
			$("#userlist").find('span[class$=userlist_owner],span[class$=userlist_siteadmin]').each(function() {
				if ($(this).text() === data.username) {
					data.ismod = true;
					return false;
				}
			});
			if (PLAYER.mediaLength > 1200 && !data.ismod && !data.meta.shadow) { // over 20 minutes
				var cleanedMsg = data.msg.replace(/<(.+?)>/gi,"");
				if (cleanedMsg.length > 50) {
					var splitMsg = cleanedMsg.split(" ");
					var uniqueWords = [splitMsg[0]];

					for (var iUnique = 1; iUnique < splitMsg.length; iUnique++) {
						if (uniqueWords.indexOf(splitMsg[iUnique]) === -1) {
							uniqueWords[uniqueWords.length] = splitMsg[iUnique];
						}
					}

					if (uniqueWords.length/splitMsg.length < .5 || uniqueWords.length <= 5) {
						FLAGGEDUSERS[data.username] = FLAGGEDUSERS[data.username] + 1 || 1; // ++ does not work
						setOpt(CHANNEL.name + "_FLAGGEDUSERS", FLAGGEDUSERS);
					}

					if (FLAGGEDUSERS[data.username] > 3) {
						socket.emit("chatMsg", {
							msg: "/smute " + data.username,
							meta: {}
						});
					}
				}
			}
		}
	}
	
	$('<button id="autoMutebtn" class="btn btn-sm btn-default" title="Toggle auto shadow mute for spammers." style="float:right">Auto Mute ' + (!AUTOMUTE ? 'OFF' : 'ON') + '</button>')
		.appendTo("#chatwrap")
		.on("click", function() {
			AUTOMUTE = !AUTOMUTE;
			setOpt(CHANNEL.name + "_AUTOMUTE", AUTOMUTE);
			if (!AUTOMUTE) {
				this.textContent = "Auto Mute OFF";
				socket.off("chatMsg", autoShadowMuteUsers);
			} else {
				this.textContent = "Auto Mute ON";
				socket.on("chatMsg", autoShadowMuteUsers);
			}
		});

	if (AUTOMUTE) {
		socket.on("chatMsg", autoShadowMuteUsers);
	}
	socket.on("changeMedia", autoUnmuteShadowMutedUsers);
	
	function unmuteAllShadowMuted() {
		setTimeout(function() {
			var mutedList = document.getElementsByClassName("userlist_smuted");
			if (mutedList.length !== 0) {
				socket.emit("chatMsg", {
					msg: "/unmute " + mutedList[0].outerText,
					meta: {}
				});
				unmuteAllShadowMuted();
			}
		}, 300);
	}
	
	$('<button id="unmuteShdwbtn" class="btn btn-sm btn-default" title="Un-shadowmute everyone" style="float:right">Unmute All</button>')
		.appendTo("#chatwrap")
		.on("click", unmuteAllShadowMuted);
}

socket.on("changeMedia", changeToTempMedia);

function changeToTempMedia() { //change to temp media if it exists in playlist after a new video.
    if (FORCETEMP) {
		if (document.querySelector(".queue_active.queue_temp") === null && document.getElementsByClassName("queue_temp").length > 0 && document.getElementById("qlockbtn").classList.contains("btn-success")) {
			var aQueueTempClassList = Array.from(document.getElementsByClassName("queue_temp")[0].classList);
			for (var i = 0; i < aQueueTempClassList.length; i++) {
				if (aQueueTempClassList[i].indexOf("pluid") > -1) {
					socket.emit("jumpTo", aQueueTempClassList[i].replace("pluid-",""));
					break;
				}
			}
		}
	}
}

function removeTempMediaSocket() {
	socket.off("changeMedia", changeToTempMedia);
}

toggleForceTempBtn = $('<button id="toggleForceTempBtn" class="btn btn-sm ' + (!FORCETEMP ? 'btn-danger' : 'btn-success') + '" title="Force Temp Media">Force Temp Media</button>')
	.appendTo("#playercontrols")
	.on("click", function() {
		FORCETEMP = !FORCETEMP;
		setOpt(CHANNEL.name + "_FORCETEMP", FORCETEMP);
		if (!FORCETEMP) {
			this.className = "btn btn-sm btn-danger";
			removeTempMediaSocket()
		} else {
			this.className = "btn btn-sm btn-success";
			socket.on("changeMedia", changeToTempMedia);
		}
	});
