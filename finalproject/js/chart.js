
$( document ).ready(function() {
    createCharts();
});


var costPercent = [];
var deathPercent = [];
var yearList = [];
var stormTotal = [];
var stormType = [];


$(document).ready(function(){
  $.ajax ({
    type: "GET",
    url: "LineGraph.xml",
    datatype: "xml",
    success: function(xml) {
      $(xml).find("year").each(function(){
      var $year = $(this);

      yearList.push($year.attr("name"));
      stormTotal.push(parseInt($year.find("stormTotal").text()))
      console.log(stormTotal);

    });

    }
});

  $.ajax ({
    type: "GET",
    url: "PieCharts2.xml",
    datatype: "xml",
    success: function(xml) {
      $(xml).find("stormType").each(function(){
      var $stormType = $(this);

      stormType.push($stormType.attr("name"));
      costPercent.push(parseInt($stormType.find("costPercent").text()))
      deathPercent.push(parseInt($stormType.find("deathPercent").text()))
      console.log(stormTotal);

    });
      console.log(costPercent);
      writeChart();
    }
});
});


function writeChart(){
      $('#chart4').highcharts({
        title: null,
  subtitle: {
text: ''},
        xAxis: {
            categories: yearList,
title: {text: 'Year', align: 'high',
style: {fontFamily: 'FranklinLightCondensed',
color: '#000000',
fontSize: '9pt'}}
        },
        yAxis: {
            title: {
                text: 'Number of Events',
    style: {fontFamily: 'FranklinLightCondensed',
color: '#000000',
fontSize: '9pt'}
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
min: 0,
        },
        tooltip: {
            valueSuffix: null
        },

        series: [{
            name: 'Number of Events',
color: '#ca6a4a',
            data: stormTotal
        }]
    });


$('#chart1').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Cost by Type of Event',
style: {fontFamily: 'FranklinCondensedBlack',
color: '#000000',
fontSize: '18px'}
        },
        subtitle: {
            text: 'Percent of Total Damage Cost by Type of Climate Event',
style: {fontFamily: 'FranklinLightCondensed',
color: '#000000',
fontSize: '14px'}
        },
        xAxis: {
            categories: stormType,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percent',
                align: 'high',
    style: {fontFamily: 'FranklinLightCondensed',
color: '#000000',
fontSize: '9pt'}
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
    pointPadding: -0.2,
    marker: {},
    states: {
  hover: {
    color: '#f3d7c6'
  }
    }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Percent',
color: '#f9eadc',
            data: costPercent
        }]
    });

   $('#chart2').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Mortality by Type of Event',
style: {fontFamily: 'FranklinCondensedBlack',
color: '#000000',
fontSize: '18px'}
        },
        subtitle: {
            text: 'Percent of Total Deaths by Type of Climate Event',
style: {fontFamily: 'FranklinLightCondensed',
color: '#000000',
fontSize: '14px'}
        },
        xAxis: {
            categories: stormType,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percent',
                align: 'high',
    style: {fontFamily: 'FranklinLightCondensed',
color: '#000000',
fontSize: '9pt'}
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                },
    pointPadding: -0.2,
    marker: {},
    states: {
  hover: {
    color: '#f3d7c6'
  }
    }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Percent',
color: '#f9eadc',
            data: deathPercent
        }]
    });


 $('#chart5').highcharts({
  chart: {
      type: 'bubble',
      zoomType: 'xy'
  },
plotOptions: {
  bubble: {
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: 'Year {point.x}, Cost (billions)= ${point.y}, Deaths= {point.z}'

            }
        }
    },
yAxis: {
            title: {
                text: 'Cost (billions)',
    style: {fontFamily: 'FranklinLightCondensed',
color: '#000000',
fontSize: '9pt'}
            },

min: -10,
        },
xAxis: {
        categories:['1980', '1981', '1982']
    },

  title: null,
  series: [{
name: 'Droughts',
color: '#f3d7c6',
      data: [[1980,56.4,10000],[1986,2.8,100],[1988,78.8,7500],[1989,1.9,0],[1993,1.6,16],[1995,7.4,0],
       [1998,10.7,200],[1999,1.4,502],[2000,5.4,140],[2002,12.9,0],[2005,1.2,0],[2006,6.9,0]
       ,[2007,5.6,15],[2008,2.2,0],[2009,5.4,0],[2011,12.4,95],[2012,30.3,123]]},
{ name: 'Floods',
color: '#f9eadc',
  data: [[1990,1.8,13],[1993,33.8,48],[1994,1.6,19],[1995,4.6,27],
         [1996,1.5,9],[1997,4.4,36],[1997,5.4,11],[1998,1.4,31],[2006,1.2,20],
         [2008,16.2,24],[2010,1.6,11],[2011,3.1,7]
       ,[2011,2.1,5]]
  },{ name: 'Hurricane/Tropical Storm',
  color: '#ecb096',
data: [[1980,1.7,13],[1983,7,21],[1985,2.8,4],[1985,2.1,11],[1985,3.2,63],[1989,16.9,86],
       [1991,2.6,18],[1992,44.8,61],[1992,3,7],[1994,1.6,32],[1995,3.2,13],[1995,4.6,27],
       [1996,7.4,37],[1998,1.4,3],[1998,8.4,16],[1999,8.4,77],[2001,6.6,43],[2003,6.3,55],
       [2004,18.5,35],[2004,11.1,48],[2004,17.2,57],[2004,8.6,28],[2005,2.4,15],[2005,148.8,1833],
       [2005,19,119],[2005,19,35],[2008,1.3,3],[2008,5.4,53],[2008,29.2,112],[2011,10.1,45],
       [2011,1.3,21],[2012,2.3,9],[2012,65.7,159]
       ]
  },
  { name: 'Tornado/Severe Weather',
  color: '#d58667',
data: [[1981,1,20],[1982,1.2,30],[1983,2.6,50],[1983,2.6,45],[1984,1.1,80],[1989,1.1,21],
       [1990,1.4,0],[1991,1.1,0],[1992,1.3,0],[1992,1.6,0],[1992,1.2,0],[1992,2.5,19],
       [1994,1.5,3],[1995,8.4,32],[1997,1.5,67],[1997,1.4,132],[1998,2.1,1],[1998,1.4,20],
       [1999,1.8,17],[1999,2.2,55],[2001,2.5,3],[2002,2.2,7],[2003,2,3],[2003,4.3,51],
       [2003,1.2,7],[2004,1.2,4],[2006,1.2,10],[2006,1.3,27],[2006,1.7,10],[2007,1.7,9],
       [2008,1.1,57],[2008,2.6,13],[2008,1.2,18],[2009,1.5,10],[2009,1.1,0],[2009,1.3,6],[2009,1.2,0],
       [2010,2.5,32],[2010,3.2,3],[2010,2.1,0],[2011,2.9,9],[2011,2.3,0],[2011,2.2,38],[2011,10.5,321],
       [2011,9.4,177],[2011,1.3,3],[2011,1,2],[2012,3.1,42],[2012,1,0],[2012,1.1,6],[2012,3.3,1],
       [2012,2.3,1],[2012,2.6,0],[2012,2.9,28]
       ]
  },{ name: 'Wildfires',
  color: '#ca6a4a',
data: [[1991,4.3,25],[1993,1.6,4],[1994,1.6,0],[2000,2.7,0],[2002,2.6,21],[2003,3.2,22],
       [2006,1.2,28],[2007,1.1,12],[2008,2.2,16],[2009,1.1,10],[2011,1.0,5],[2012,1,8]
       ]
  },{ name: 'Winter Weather',
  color: '#db5654',
data: [[1983,4.7,0],[1985,2.6,0],[1985,1.2,150],[1989,1.2,100],[1990,6.1,0],[1993,8.9,270],
       [1994,1.6,70],[1994,4.7,9],[1996,4.4,187],[1998,2,16],[1998,3.6,0],[1999,1.4,25],
       [2007,1.6,1],[2007,2.2,0],[2011,1.9,36]
       ]
  }]  /* Spent a really long time trying to figure out the array to input the data but nothing i tried worked.. */

});
};
