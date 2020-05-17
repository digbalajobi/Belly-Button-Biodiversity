// Read in samples.json
//Define function for metadata panel containing demographic info
//Read in json file
function metadata(sample) {
    const belly = "samples.json";
    d3.json(belly).then(function(data) {
        console.log(data);

// Select metadata panel, add code to reset page, and add key value data to panel

    var mdPanel = d3.select("#sample-metadata");
    mdPanel.html("");
    Object.entries(data).forEach(function([key, value]) {
        var text = key + ":" + value;
        mdPanel.append("p").text(text);
    });
    
});


}
//Build function to retrieve data for plots and build plots

function buildCharts (sample) {
    const belly = "samples.json";
    d3.json(belly).then(function(data){
        
        var sampleValues = data.samples[0].sample_values;
        console.log(sampleValues);
        var otuIDs = data.samples[0].otu_ids;
        console.log(otuIDs);
        var otuLabels = data.samples[0].otu_labels;
        console.log(otuLabels);

    
    //Slice the top 10 sample values for each individual for bar chart
    
    var dataSlice = sample.sort((a,b) => b.sample_values - a.sample_values);
    var slicedData = dataSlice.slice(0, 10);


    var barData = [{
        x: slicedData.map(object => object.sampleValues),
        y: slicedOtuID.map(object => object.otuIDs),
        text: otuLabels,
        orientation: "h",
        type: "bar"
    }]


    Plotly.newPlot("bar", barData);
    })
  
}
buildCharts();