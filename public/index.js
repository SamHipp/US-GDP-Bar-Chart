// Loading initial data___________________________________________

fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    .then((response) => {return response.json();})
    .then((responseData) => {
        // Variables_______________________________________________        
        let dataString = JSON.stringify(responseData);
        let data = JSON.parse(dataString)["data"];
        console.log(data);
        let GDPData = data.map((item) => {
            return item[1];
        })
        console.log(GDPData);
        let monthToQuarter = (item) => {
            switch(item.substring(5, 7)) {
                case "01":
                    return "Q1"
                case "04":
                    return "Q2"
                case "07":
                    return "Q3"
                case "10":
                    return "Q4"
            }
        }

        let graphPadding = 50;
        let graphHeight = 600;
        let graphWidth = graphPadding + data.length * 3;
        
        
        let xMin = new Date(1947-01-01);
        let xMax = new Date(2018-01-01);
        let xScale = d3.scaleLinear()
            .domain([xMin, xMax])
            .range([0, graphWidth]);
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.format('0a'));

        let yMax = d3.max(GDPData);
        console.log(yMax);

        let yScale = d3.scaleLinear()
            .domain([0, yMax])
            .range([graphHeight, graphHeight - (graphHeight * yMax / 20000)]);
        const yAxis = d3.axisLeft(yScale);

        // Adding bars of graph______________________________________
        // Container
        const svg = d3.select('#graph-container')
            .append('svg')
            .attr('class', 'graph-bars-container')
            .style('height', graphHeight + graphPadding)
            .style('width', graphWidth);
        // Bars
            svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('y', d => {return graphHeight - graphHeight*(d[1] / 20000) + 'px'})
            .attr('x', (d, i) => {return graphPadding + (i * 3) + 'px'})
            .attr('width', "2px")
            .attr('height', d => {return graphHeight*(d[1] / 20000) + 'px'})
            .attr('class', 'bar')
            .append('title')
            .text(d => `${d[0].substring(0, 4)} ${monthToQuarter(d[0])}, $${Math.floor(d[1])} Billion`);
        // Axes
            svg.append('g')
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr('class', 'axis')
            .attr("transform", `translate(${graphPadding}, 600)`);

            svg.append('g')
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr('class', 'axis')
            .attr("transform", `translate(${graphPadding}, 0)`);

            

    })
    


