

const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// This function creates a horizontal barchart of sample_values vs otu_ids for a specific ID number
function BarChart(ID){
    // Getting data from API 
    d3.json(url).then(function(data) {
        // Searching in samples list for the dictionary with id number = ID
        let samples = Object.values(data.samples).filter(sample => sample.id==ID)[0];
        // Defining variables to be used in bar chart
        let sample_values = samples.sample_values;
        let otu_ids = samples.otu_ids;
        let otu_labels = samples.otu_labels;
        let new_otu_ids=otu_ids
        // Adding the string 'OTU' to otu_ids 
        for (let i=0;i<10;i++){
            new_otu_ids[i]=`OTU ${otu_ids[i]}`;
        } 
        // storing variables in object within array along with style choices
        let bar_data = [{
            // Finding top ten values from smallest to largest
            x: sample_values.slice(0,10).reverse(),
            y: new_otu_ids.slice(0,10).reverse(),
            text:otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation:'h'
        }];
        // Adding plot to div with id = "bar" 
        Plotly.newPlot("bar", bar_data);
})};

function Bubble(ID){
    // Getting data from API
    d3.json(url).then(function(data) {
        // retrieving object in samples with id number = ID
        let samples = Object.values(data.samples).filter(sample => sample.id==ID)[0];
        // storing variables in object within array along with style choices
        let bubble_data = [{
            x: samples.otu_ids,
            y: samples.sample_values,
            mode:'markers',
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
                colorscale: 'Earth'
            },
            type: "bubble",
            text: samples.otu_labels 
        }];
        // Adding plot to div with id = "bubble" 
        Plotly.newPlot("bubble", bubble_data);
})};

// 
let panel_body = d3.select("#sample-metadata")

function DemographicInfo(ID){
    // Retrieving data form API
    d3.json(url).then(function(data) {
        // Finding object with id number = ID
        let meta = data.metadata.filter(n => n.id==ID)[0];
        // Extracting values and keys from object 'meta'
        let values = Object.values(meta);
        let keys = Object.keys(meta);
        // Clearing html of panel_body from last ID
        panel_body.html("");
        // Adding key-value pairs to html
        for (let i=0;i<values.length;i++){
            panel_body.append('h6').text(`${keys[i]}: ${values[i]}`)
}})};


// This function gets the ID chosen in the dropdown menu by the yser and then plots the charts and provides
// demographic information for the ID chosen.

// Assigning variable to div with class = selDataset
let dropdownMenu = d3.select("#selDataset");

function optionChanged(){
    // Finding ID chosen
    let ID = dropdownMenu.property("value");
    // Calling functions defined above for chosen ID
    BarChart(ID);
    Bubble(ID);
    DemographicInfo(ID)
}


// This function plots default charts for when the page is vistited 
function init(){
    // Plotting default charts for ID=940
    BarChart(940);
    Bubble(940);
    DemographicInfo(940)
    // Put all IDs in the dropdown menu 
    d3.json(url).then(function(data) {
    let IDs = Object.values(data.names);
    let dropdownMenu = d3.select("#selDataset");
    for (let i = 0;i<IDs.length;i++){
        let option = dropdownMenu.append("option").text(IDs[i]);
}})}
    

init()