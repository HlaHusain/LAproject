function showdata(){
    console.log("test");
    d3.csv("/csvdata").then( function(data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            document.write(data[i]);
            }
        });
}







