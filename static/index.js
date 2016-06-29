'use strict';

var MAX_DATA_LENGTH = 128;
var FETCHING_INTERVAL = 1000;

var graphCanvas = document.getElementById('graph');

var chart = new Chart(graphCanvas, {
    type: 'line',
    data: {
        labels: new Array(MAX_DATA_LENGTH),
        datasets: [
            {
                label: 'Realtime Illuminance',
                backgroundColor: '#f93',
                borderColor: 'transparent',
                pointRadius: 0,
                data: createChartData([])
            }
        ]
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
});

var timestamp = 0;

fetchData();

function fetchData() {
    return fetch('/api/data?timestamp=' + timestamp)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            timestamp = result.timestamp;

            var data = chart.data.datasets[0].data;
            var values = result.values;

            for (var i = 0; i < values.length; i++) {
                data.push(values[i]);
                data.shift();
            }

            chart.update(0);

            setTimeout(fetchData, FETCHING_INTERVAL);
        }, function () {
            setTimeout(fetchData, FETCHING_INTERVAL);
        });
}

function createChartData(data) {
    return new Array(MAX_DATA_LENGTH - data.length)
        .fill(0)
        .concat(data);
}
