$(document).ready(function() {
$('#example').dataTable( {
"bProcessing": true,
"sAjaxSource": 'convertcsv.JSON'

});
});
var r = new Array(), j = -1;
for (var key=0, size=data.length; key<size; key++){
    r[++j] ='<tr><td>';
    r[++j] = data[key][0];
    r[++j] = '</td><td class="whatever1">';
    r[++j] = data[key][1];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][2];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][3];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][4];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][5];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][6];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][7];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][8];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][9];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][10];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][11];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][12];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][13];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][14];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][15];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][16];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][17];
    r[++j] = '</td><td class="whatever2">';
    r[++j] = data[key][18];
    r[++j] = '</td></tr>';
}
$('#example').html(r.join(''));
