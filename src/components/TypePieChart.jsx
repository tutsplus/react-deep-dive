import React from 'react';
import mimeTypes from '../core/mime-types';
import d3 from 'd3';
import _  from 'lodash';

export default class TypePieChart extends React.Component {

    constructor() {
        super();
        this.state = {
            svgWidth: 275,
            svgHeight: 275,
            width: 125,
            height: 125
        };
    }

    render() {
        var center = {
            x: this.state.svgWidth / 2,
            y: this.state.svgHeight / 2
        };

        return (<svg width={this.state.svgWidth} height={this.state.svgHeight}>
            <g ref="container" transform={`translate(${center.x}, ${center.y})`}/>
        </svg>);
    }

    componentDidMount() {
        this._buildChart(this.props.entries);
    }

    componentWillReceiveProps(props) {
        this._buildChart(props.entries);
    }

    _buildChart(entries) {
        var groups = this._getEntriesByGroup(entries || []);

        var radius = Math.min(this.state.width, this.state.height) / 2,
            arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(radius / 2),
            labelArc = d3.svg.arc()
                .outerRadius(radius - 5)
                .innerRadius(radius - 5),
            pie = d3.layout.pie()
                .sort(null)
                .value(function (d) { return d.count; });

        var data = pie(groups),
            keyFn = (x)=> { return x.data.type; };

        var parent = d3.select(this.refs.container.getDOMNode());


        // Pie slices
        var paths = parent.selectAll('path')
            .data(data, keyFn);
        paths
            .enter()
            .append('path');

        paths
            .attr('d', function (d) {
                var data = arc(d);

                console.log(data);
                return data;
            })
            .style('fill', function (d) {
                return mimeTypes.types[d.data.type].color;
            });

        paths.exit()
            .remove();

        // Labels
        var labels = parent.selectAll('text')
            .data(data, keyFn);
        labels
            .enter()
            .append("text")
            .attr('dy', '0.5em')
            .style('font-size', '0.7em')

        labels
            .attr("transform", (d) => {
                var angle = (d.startAngle + d.endAngle) / 2,
                    degrees = displayAngle(angle);

                if (degrees > 90) {
                    degrees -= 180;
                }

                return `translate(${labelArc.centroid(d)}) rotate(${degrees} 0 0)`;
            })
            .style("text-anchor", function (d) {
                var angle = (d.startAngle + d.endAngle) / 2,
                    degrees = displayAngle(angle),
                    anchor = (degrees > 90 ? 'end' : 'start');

                return anchor;
            })
            .text(function (d) {
                var label = mimeTypes.types[d.data.type].label;
                return `${label} (${d.data.count})`;
            });

        labels.exit()
            .remove();


        function displayAngle(radians) {
            var degrees = (radians * 180) / Math.PI;

            degrees = degrees - 90;

            return degrees;
        }
    }

    _getEntriesByGroup(entries) {
        return _.chain(entries)
            .groupBy(function (x) {
                return x.type;
            })
            .map(function (g, key) {
                return {
                    type: key,
                    count: g.length
                }
            })
            .value();
    }
};

TypePieChart.defaultProps = {
    entries: null
};