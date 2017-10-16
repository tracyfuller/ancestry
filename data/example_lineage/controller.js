import * as d3 from 'd3-selection'
import lineagePlotData from './data.js'
import lineagePlotLayout from './layout.js'

export default class LineageExampleController {
    constructor() {
        this.plotData = lineagePlotData;
        this.plotLayout = lineagePlotLayout;

        let clickedPath = [],
            mouseoveredPath = [],
            originalPathAttrs = {
                stroke: '#ccc',
                'stroke-width': 1
            },
            highlightPathAttrs = {
                'stroke-width': 2,
                stroke: 'black'
            };

        this.nodeClick = function($object) {
            if (clickedPath.length) {
                d3.selectAll(clickedPath).attrs(originalPathAttrs);
                let firstLink = clickedPath[0];
                clickedPath = [];
                if (firstLink.__data__.targetNode == $object) return;
            }
            while ($object.parent) {
                clickedPath.push($object.inLink.DOMElement);
                mouseoveredPath = mouseoveredPath.filter(d => d != $object.inLink.DOMElement);
                $object = $object.parent;
            }
            d3.selectAll(clickedPath).attrs(highlightPathAttrs);

        };

        this.nodeMouseOver = function($object) {
            while ($object.parent) {
                if (clickedPath.includes($object.inLink.DOMElement)) break;
                mouseoveredPath.push($object.inLink.DOMElement);
                $object = $object.parent;
            }
            d3.selectAll(mouseoveredPath).attrs(highlightPathAttrs);
        };

        this.nodeMouseOut = function() {
            d3.selectAll(mouseoveredPath).attrs(originalPathAttrs);
            mouseoveredPath = [];
        };
    }
}

