// Read in samples.json
// Build init function
function init(i) {
    const BBBD = "samples.json";
    d3.json(BBBD).then(function(sampledata){   
        var testSubNames = sampledata.names
        var sampleValues = sampledata.samples[i].sample_values;
        console.log(sampleValues)
        var labels =  sampledata.samples[i].otu_labels;
        console.log (labels)
        var OTU_top = sampledata.samples[i].otu_ids;
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(OTU_id)

// get the metadata info for the demographic panel
        var Pmetadata = sampledata.metadata[i];
        console.log(Pmetadata)

// select dropdown menu 
        var dropdown = d3.select("#selDataset");

// get the id data to the dropdwown menu
        for (i in testSubNames) {
            var newPanelDropdownOption = dropdown.append("option")
            newPanelDropdownOption.text(testSubNames[i]);
        }
        // select demographic panel to put data
        // empty the demographic info panel each time before getting new id info
        // grab the necessary demographic data data for the id and append the info to the panel
        var demPanel = d3.select("#sample-metadata");
        demPanel.html("");  
        Object.entries(Pmetadata).forEach(function ([key, value]) {
            var row = demPanel.append("p");            
            row.text(`${key.toUpperCase()} :${value}`)               
        })

// get the top 10 labels for the plot
        var trace = [{
        x: sampleValues.slice(0,10).reverse(),
        y: OTU_id,
        text: labels.slice(0,10).reverse(),
        orientation: "h",
        marker: {
            color: "pink",
        },
        type: "bar"
        }]

// create layout variable to set plots layout
        var layout = {
        xaxis:{title: "Test Subject Sample Values"},
        yaxis:{title: "Test Subject OTU IDs"},
        title: "Top 10 OTU IDs"
        }
        
// create the bar plot
    Plotly.newPlot("bar", trace, layout);

// The bubble chart
        var bubble = {
        x: OTU_top,
        y: sampleValues,
        text: labels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: OTU_top
        },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30 }
        };

// set the layout for the bubble plot
        var layout_bubble = [bubble];
        var layout_2 = {
        title :"Belly Button Bacteria",
        xaxis:{title: "OTU ID"},
        };

// create the bubble plot
    Plotly.newPlot("bubble", layout_bubble, layout_2); 

    })

}

// create the function for the change event
function optionChanged(d) {
    const BBBD = "samples.json";
    d3.json(BBBD).then(function(sampledata){   
    var testSubNames = sampledata.names
    const isNumber = (element) => element === d;
    var indx = (testSubNames.findIndex(isNumber));
    d3.selectAll("td").remove();
    d3.selectAll("option").remove();
    var dropdown = d3.select("#selDataset");
    dropdown.append("option").text(d);
    init(indx);
});
}
  
 init(0);