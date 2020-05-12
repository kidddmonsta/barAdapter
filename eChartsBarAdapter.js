function formatData(jsonUrl) {
    return $.getJSON(jsonUrl).then(function (data) {
        let legendDataNames = [];
        let series = [];
        let yAxis = [];

        data.forEach(function (dataVal, index) {
            let formattedData = [];
            dataVal.series.forEach(function (val, key) {
                //console.log(val);
                formattedData[key] = val.value;
                if (dataVal.timeInterval == "day") {
                    yAxis[key] = moment(val.x).format("YYYY-MM-DD");
                }
                if (dataVal.timeInterval == "month") {
                    yAxis[key] = moment(val.x).format("YYYY-MM");
                }
                if (dataVal.timeInterval == "year") {
                    yAxis[key] = moment(val.x).format("YYYY");
                }
                if (yAxis[key] == 'Invalid date') {
                    yAxis[key] = val.x;
                }
            });
            //console.log(yAxis);
            //console.log(dataVal.timeInterval);
            legendDataNames[index] = dataVal.title_rus;
            series[index] = {
                name: dataVal.title_rus,
                data: formattedData,
                type: 'bar',
                stack: 'total',
                label: {
                    show: true,
                    position: 'insideRight'
                },
            };
        });
        var returnData = {
            legendDataNames: legendDataNames,
            series: series,
            yAxis: yAxis
        };
        console.log(returnData);
        return returnData;
    });
}
