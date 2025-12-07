//_North's pixel script
//var teamList_4cc = ["konata","kagami","tsukasa","miyuki","akira","minami","sojiro","nanako","yui","misao","patricia","yutaka"];
var teamList_4cc = ["taiga","ami","minori","inko","haruta","kihara","kitamura","sensei","mom","ryuuji","pengin"];


function setTeamList(listOfTeams){
	var selector = $('#teamcolor');
	selector.html('<option value="default">Chat Icon</option>');
	listOfTeams.forEach(function(team){
		selector.append('<option value="' + team + '">/' + team + '/</option>');
	});
};

$('#chatwrap').append("<span><select id='teamcolor' style='cursor:default;padding:6px 10px' class='btn btn-sm btn-default'><option value=''>Chat Icon</option></select></span>");
var TEAMCOLOR = getOrDefault(CHANNEL.name + "_TEAMCOLOR", '');
setTeamList(teamList_4cc);
if (TEAMCOLOR){
	$('#teamcolor').val(TEAMCOLOR);
}
else {
	setOpt(CHANNEL.name + "_TEAMCOLOR", "default");	
}

$('#teamcolor').change(function(){
	TEAMCOLOR = $(this).val();
	setOpt(CHANNEL.name + "_TEAMCOLOR", TEAMCOLOR);
});


//Format messages upon page load because they're handled differently and I can't find the function
$('.teamColorSpan').each(function(){
	var color = 'team' + $(this).text().replace(new RegExp('Ð','g'),'');
	$(this).parent().parent().find('.username').addClass(color);
});
