$(document).ready(function() {
$('#example').dataTable( {
"bProcessing": true,
"sAjaxSource": 'convertcsv.JSON'

});  
});


var data = {
"arr":	[
"FIELD1": "agency", "FIELD2": "date", "FIELD3": "time", "FIELD4": "event_num", "FIELD5": "incident_num", "FIELD6": "nature_code", "FIELD7": "Nature_Description", "FIELD8": "beat_zone", "FIELD9": "event_source", "FIELD10": "disposition_code",
 "FIELD11": "Hour", "FIELD12": "Year", "FIELD13": "Num", "FIELD14": "NumDay", "FIELD15": "NumMonth", "FIELD16": "YearMon", "FIELD17": "Location", "FIELD18": "NatureMajor" },
  { "FIELD1": "SRP", "FIELD2": "08/15/2017 12:00:00 AM", "FIELD3": "2027", "FIELD4": "172270401", "FIELD5": "", "FIELD6": "1154", "FIELD7": "SUSPICIOUS VEHICLE", "FIELD8": "7", "FIELD9": "OFFICER", "FIELD10": "HRI",
  "FIELD11": "20", "FIELD12": "2017", "FIELD13": "1", "FIELD14": "2 Tue", "FIELD15": "", "FIELD16": "2017_08", "FIELD17": "(38.421842863338036, -122.74936226160166)", "FIELD18": "SUSPICIOUS VEHICLE" }
]
}

let container = document.getElementById('divId')

for (var i = 0; i < data.arr.length; i++) {
	var element = '<p>' + data.arr[i].FIELD1 + '</p>'
	container.innerHTML += element
}
