
var data;
var balance = [];
var age = [];
var person = [];
var maleCount = 0;
var femaleCount = 0;
var avg;


$( document ).ready(function() {
    loadData();
});


function loadData(){

    $.ajax({
            type:"GET",
            url:"data.json",
            dataType:"json",
            success: parseData
});


}

function parseData(data){
    console.log(data);
    //dataObj = JSON.parse(data);
    //console.log(dataObj);

     for (var i = 0, len = data.length; i < len; ++i) {
            //sets data to arrays for charts
            balance.push(data[i]["balance"]);
            age.push(data[i]["age"]);
            person.push(data[i]["name"]);



            if (data[i]["gender"] == "male") {
                maleCount++;
            }else{
                femaleCount++;
            }
     }

     var sum = age.reduce((previous, current) => current += previous);
    avg = sum / age.length;
     console.log(avg);
    //console.log(person);
    //console.log(maleCount);
    createCharts();
}






function createCharts(){


var chart = c3.generate({
    bindto: '#chart',
    data: {
        json: {
            data1: balance,
            data2: age

        }
    }
});


var genderChart = c3.generate({
    bindto: '#gender-chart',
    data: {
        // iris data from R
        columns: [
            ['Female', femaleCount],
            ['Male', maleCount],
        ],
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    }
});

var html = '<h2>The average age is ' + Math.round(avg) + '.<h2>';
html += '<h3>There are ' + maleCount + ' men and ' + femaleCount +  ' women.</h3>'
$( "#age-chart" ).html(html);



}
