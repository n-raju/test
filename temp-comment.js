    var that = this,
            height,
            width,
            xPos,
            yPos,
            commentTextMargin = 3,
            textCommentPopUp = [],
            dataCommentPopUp = [];
    /*  creating the comment added popup's to the chart */
    if (that.commentPopUp) {
        /*  sorted comments popup to attach z-index with each data and text comment inserted    */
        for (var i = 0; i < that.commentPopUp.length; i++) {
            if (that.commentPopUp[i]['addedCommentArrowPosition'] > 0)
                dataCommentPopUp.push(that.commentPopUp[i]);
            else
                textCommentPopUp.push(that.commentPopUp[i]);
            /*  check for the end point */
            if (i == that.commentPopUp.length - 1) {
                /*  empty the commentsPopUp array, and then push the text comments first followed by the data comments  */
                that.commentPopUp = textCommentPopUp.concat(dataCommentPopUp);
                ;
            }
        }

        for (var i = 0; i < that.commentPopUp.length; i++) {
            var dataCommentClass = '';
            if (that.commentPopUp[i]['addedCommentArrowPosition'] > 0 && that.finalDataLabels.indexOf(that.commentPopUp[i]["addedCommentChartXPosition"]) > -1) {
                xPos = that.actualChartingAreaXPosition + that.margin.left + that.xA(that.originalData[that.finalDataLabels.indexOf(that.commentPopUp[i]["addedCommentChartXPosition"])][0]['index']);
                yPos = that.commentPopUp[i]["addedCommentYPosition"];
                dataCommentClass = ' data-comment'
            } else if (that.commentPopUp[i]['addedCommentArrowPosition'] > 0) {
                continue;
            } else {
                xPos = that.commentPopUp[i]['addedCommentXPosition'];
                yPos = that.commentPopUp[i]['addedCommentYPosition'];
            }
            height = that.commentPopUp[i]['addedCommentHeight'] + Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY']);
            
            if(that.commentPopUp[i]['addedCommentArrowPositionX'] > 0){
            	if(Math.abs(that.commentPopUp[i]['addedCommentArrowPositionX']) > that.commentPopUp[i]['addedCommentWidth'])
            		width = that.commentPopUp[i]['addedCommentWidth'] + (Math.abs(that.commentPopUp[i]['addedCommentArrowPositionX']) - that.commentPopUp[i]['addedCommentWidth']);
            	else
            		width = that.commentPopUp[i]['addedCommentWidth'];
            }else{
            	width = that.commentPopUp[i]['addedCommentWidth'] + Math.abs(that.commentPopUp[i]['addedCommentArrowPositionX']);
            }

            var addedComment = d3.select(that.el)
                    .append("div")
                    .classed("commentBox" + dataCommentClass, true)
                    .style({'position': 'absolute',
                        'left': function() {
                            if (that.commentPopUp[i]["addedCommentArrowPosition"] == 1) { /*  arrow at left top */
                                return (that.finalGraphData[0].length == 1) ? (xPos - that.commentPopUp[i]['addedCommentBorderWidth'] + (that.xB.rangeBand() / 2)) + "px" : (xPos - that.commentPopUp[i]['addedCommentBorderWidth'] + that.xB.rangeBand()) + "px";
                            } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 2) { /* arrow at right top */
                                return (that.finalGraphData[0].length == 1) ? (xPos - that.commentPopUp[i]['addedCommentBorderWidth'] + (that.xB.rangeBand() / 2) - width) + "px" : (xPos + that.xB.rangeBand() - width) + "px";
                            } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 3) { /*  arrow at left bottom  */
                           		if(that.commentPopUp[i]['addedCommentArrowPositionX'] > 0){
                           			return (that.finalGraphData[0].length == 1) ? (xPos - that.commentPopUp[i]['addedCommentBorderWidth'] - that.commentPopUp[i]['addedCommentWidth'] + (that.xB.rangeBand())) + "px" : (xPos - that.commentPopUp[i]['addedCommentWidth']) + "px";
                           		}else{
                                	return (that.finalGraphData[0].length == 1) ? (xPos - that.commentPopUp[i]['addedCommentBorderWidth'] + (that.xB.rangeBand() / 2)) + "px" : (xPos + that.xB.rangeBand()) + "px";
                                }
                            } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 4) { /*  arrow at right bottom */
                                return (that.finalGraphData[0].length == 1) ? (xPos - that.commentPopUp[i]['addedCommentBorderWidth'] + (that.xB.rangeBand() / 2) - width) + "px" : (xPos + that.xB.rangeBand() - width) + "px";
                            } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == -1) {  /*  comment without arrow  */
                                return xPos + "px";
                            }
                        },
                        'top': function() {
                            return (yPos - that.commentPopUp[i]['addedCommentBorderWidth']) + "px";
                        },
                        'height': function() {
                            return (height + (2 * that.commentPopUp[i]['addedCommentBorderWidth'])) + "px";
                        },
                        'width': function() {
                            return (width + (2 * that.commentPopUp[i]['addedCommentBorderWidth'])) + "px";
                        },
                        'z-index': function() {
                            return 300 * (i + 1);
                        }
                    });
            /*  appending an svg element for the added comment  */
            var addedCommentSvg = addedComment.append("svg")
                    .attr("height", function() {
                        return (height + (2 * that.commentPopUp[i]['addedCommentBorderWidth'])) + "px";
                    })
                    .attr("width", function() {
                        return (width + (2 * that.commentPopUp[i]['addedCommentBorderWidth'])) + "px";
                    })
                    .style("background-color", "transparent");
                    
                 /* Imp : Do not remove this commented portion, it is still under hold, its not programmed yet, it willbe used by Anil	*/ 
			    /*	appending the svg polygon element for the added comment	*/
			    /*addedCommentSvg.append("polygon")
			    				.style({
			    					'position': 	'absolute',
			    					'stroke': 	function(){
			    						return (that.commentPopUp[i]['addedCommentIsBorderVisible']) ? that.commentPopUp[i]['addedCommentBorderColor'] : '#ffffff';
			    					},
			    					'stroke-width': function(){
			    						return (that.commentPopUp[i]['addedCommentIsBorderVisible']) ? that.commentPopUp[i]['addedCommentBorderWidth'] : 0;
			    					},
			    					'fill': 
			    				})*/

            /*  appending the svg rect element for the added comment  */
            addedCommentSvg.append("rect")
                    .attr("x", function() {
                        if (that.commentPopUp[i]["addedCommentArrowPosition"] == 1) { /*  arrow at left top */
                            return (Math.abs(that.commentPopUp[i]["addedCommentArrowPositionX"]) + that.commentPopUp[i]['addedCommentBorderWidth']);
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 2) { /* arrow at right top */
                            return that.commentPopUp[i]["addedCommentBorderWidth"];
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 3) { /*  arrow at left bottom  */
                       		if(that.commentPopUp[i]['addedCommentArrowPositionX'] > 0){
                       			return that.commentPopUp[i]['addedCommentBorderWidth'] + "px";
                       		}else{
                       			return (Math.abs(that.commentPopUp[i]["addedCommentArrowPositionX"]) + that.commentPopUp[i]['addedCommentBorderWidth']);
                       		}         
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 4) { /*  arrow at right bottom */
                            return that.commentPopUp[i]["addedCommentBorderWidth"];
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == -1) {  /*  comment without arrow  */
                            return 0;
                        }
                    })
                    .attr("y", function() {
                        if (that.commentPopUp[i]["addedCommentArrowPosition"] == 1) { /*  arrow at left top */
                            return (Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY']) + that.commentPopUp[i]["addedCommentBorderWidth"]);
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 2) { /* arrow at right top */
                            return (Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY']) + that.commentPopUp[i]["addedCommentBorderWidth"]);
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 3) { /*  arrow at left bottom  */
                            return that.commentPopUp[i]['addedCommentBorderWidth'];
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 4) { /*  arrow at right bottom */
                            return that.commentPopUp[i]['addedCommentBorderWidth'];
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == -1) {  /*  comment without arrow  */
                            return 0;
                        }
                    })
                    .attr("height", that.commentPopUp[i]['addedCommentHeight'])
                    .attr("width", that.commentPopUp[i]['addedCommentWidth'])
                    .attr("rx", 2)
                    .attr("ry", 2)
                    .style({'background-color': that.commentPopUp[i]['addedCommentBackgroundColor'],
                        'stroke': function() {
                            if (that.commentPopUp[i]['addedCommentIsBorderVisible'])
                                return that.commentPopUp[i]['addedCommentBorderColor'];
                            else
                                return '#ffffff';
                        },
                        'stroke-width': function() {
                            if (that.commentPopUp[i]['addedCommentIsBorderVisible'])
                                return that.commentPopUp[i]['addedCommentBorderWidth'];
                            else
                                return 0;
                        },
                        'position': 'absolute',
                        'filter': function() {
                            return (that.commentPopUp[i]['addedCommentIsShadowVisible']) ? "url(#drop-shadow)" : '';
                        },
                        'fill': that.commentPopUp[i]['addedCommentBackgroundColor'],
                        'fill-opacity': function() {
                            return (that.commentPopUp[i]['addedCommentIsBackgroundTransparent']) ? 0 : 1;
                        }
                    });
            /*  appending foreignObject for text for added comment  */
            addedCommentSvg.append("foreignObject")
                    .attr("x", function() {
                        if (that.commentPopUp[i]["addedCommentArrowPosition"] == 1) { /*  arrow at left top */
                            return (Math.abs(that.commentPopUp[i]['addedCommentArrowPositionX']) + that.commentPopUp[i]['addedCommentBorderWidth'] + commentTextMargin);
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 2) { /* arrow at right top */
                            return (that.commentPopUp[i]['addedCommentBorderWidth'] + commentTextMargin);
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 3) { /*  arrow at left bottom  */
                       		if(that.commentPopUp[i]['addedCommentArrowPositionX'] > 0){
                       			return that.commentPopUp[i]['addedCommentBorderWidth'] + commentTextMargin;
                       		}else{
                       			return (Math.abs(that.commentPopUp[i]['addedCommentArrowPositionX']) + that.commentPopUp[i]['addedCommentBorderWidth'] + commentTextMargin);
                       		}                   
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 4) { /*  arrow at right bottom */
                            return (that.commentPopUp[i]['addedCommentBorderWidth'] + commentTextMargin);
                        }
                    })
                    .attr("y", function() {
                        if (that.commentPopUp[i]["addedCommentArrowPosition"] == 1) { /*  arrow at left top */
                            return (Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY']) + that.commentPopUp[i]['addedCommentBorderWidth'] + commentTextMargin);
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 2) { /* arrow at right top */
                            return (Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY']) + that.commentPopUp[i]['addedCommentBorderWidth'] + commentTextMargin);
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 3) { /*  arrow at left bottom  */
                            return that.commentPopUp[i]['addedCommentBorderWidth'] + commentTextMargin;
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 4) { /*  arrow at right bottom */
                            return (that.commentPopUp[i]['addedCommentBorderWidth'] + commentTextMargin);
                        }
                    })
                    .attr("height", that.commentPopUp[i]['addedCommentHeight'])
                    .attr("width", that.commentPopUp[i]['addedCommentWidth'])
                    .append("xhtml:body")
                    .html(that.commentPopUp[i]['addedCommentText']);
            /*  appending the svg polygon element for the arrow to added comment  */
            addedCommentSvg.append("polygon")
                    .style({'position': 'absolute',
                        'stroke': function() {
                            if (that.commentPopUp[i]['addedCommentIsBorderVisible'])
                                return that.commentPopUp[i]['addedCommentBorderColor'];
                            else
                                return '#ffffff';
                        },
                        'stroke-width': function() {
                            if (that.commentPopUp[i]['addedCommentIsBorderVisible'])
                                return that.commentPopUp[i]['addedCommentBorderWidth'];
                            else
                                return 0;
                        },
                        'fill': that.commentPopUp[i]['addedCommentBackgroundColor']
                    })
                    .attr("points", function() {
                        var points = '';
                        if (that.commentPopUp[i]["addedCommentArrowPosition"] == 1) { /*  arrow at left top */
                            points = (Math.abs(that.commentPopUp[i]["addedCommentArrowPositionX"]) + that.commentPopUp[i]['addedCommentBorderWidth']) + "," + (Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY']) + that.commentPopUp[i]['addedCommentBorderWidth']) + ", " + that.commentPopUp[i]['addedCommentBorderWidth'] + "," + that.commentPopUp[i]['addedCommentBorderWidth'] + " " + (Math.abs(that.commentPopUp[i]["addedCommentArrowPositionX"]) + that.commentPopUp[i]['addedCommentBorderWidth'] + 20) + "," + (Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY']) + that.commentPopUp[i]['addedCommentBorderWidth']);
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 2) { /* arrow at right top */
                            points = (that.commentPopUp[i]['addedCommentWidth'] + that.commentPopUp[i]['addedCommentBorderWidth'] - 20) + "," + (Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY']) + that.commentPopUp[i]['addedCommentBorderWidth']) + ", " + (that.commentPopUp[i]['addedCommentWidth'] + Math.abs(that.commentPopUp[i]['addedCommentArrowPositionX'])) + "," + that.commentPopUp[i]['addedCommentBorderWidth'] + ", " + (that.commentPopUp[i]['addedCommentWidth'] + that.commentPopUp[i]['addedCommentBorderWidth']) + "," + (Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY']) + that.commentPopUp[i]['addedCommentBorderWidth']);
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 3) { /*  arrow at left bottom  */
                       		if(that.commentPopUp[i]['addedCommentArrowPositionX'] > 0){
                       			points = that.commentPopUp[i]['addedCommentBorderWidth'] + "," + (that.commentPopUp[i]['addedCommentHeight'] + that.commentPopUp[i]['addedCommentBorderWidth']) + ", " + (that.commentPopUp[i]['addedCommentBorderWidth'] + that.commentPopUp[i]['addedCommentArrowPositionX']) + "," + (that.commentPopUp[i]['addedCommentHeight'] + Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY'])) + ", " + (that.commentPopUp[i]['addedCommentBorderWidth'] + 20) + "," + (that.commentPopUp[i]['addedCommentHeight'] + that.commentPopUp[i]['addedCommentBorderWidth']);
                       		}else{
                            	points = (Math.abs(that.commentPopUp[i]["addedCommentArrowPositionX"]) + that.commentPopUp[i]['addedCommentBorderWidth']) + "," + (that.commentPopUp[i]['addedCommentHeight'] + that.commentPopUp[i]['addedCommentBorderWidth']) + ", " + that.commentPopUp[i]['addedCommentBorderWidth'] + "," + (that.commentPopUp[i]['addedCommentHeight'] + Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY']) + that.commentPopUp[i]['addedCommentBorderWidth']) + ", " + ((Math.abs(that.commentPopUp[i]["addedCommentArrowPositionX"]) + that.commentPopUp[i]['addedCommentBorderWidth']) + 20) + "," + (that.commentPopUp[i]['addedCommentHeight'] + that.commentPopUp[i]['addedCommentBorderWidth']);
                            }
                        } else if (that.commentPopUp[i]["addedCommentArrowPosition"] == 4) { /*  arrow at right bottom */
                            points = (that.commentPopUp[i]['addedCommentWidth'] + that.commentPopUp[i]['addedCommentBorderWidth'] - 20) + "," + (that.commentPopUp[i]['addedCommentHeight'] + that.commentPopUp[i]['addedCommentBorderWidth']) + ", " + (that.commentPopUp[i]['addedCommentWidth'] + Math.abs(that.commentPopUp[i]['addedCommentArrowPositionX'])) + "," + (that.commentPopUp[i]['addedCommentHeight'] + Math.abs(that.commentPopUp[i]['addedCommentArrowPositionY']) + that.commentPopUp[i]['addedCommentBorderWidth']) + ", " + (that.commentPopUp[i]['addedCommentWidth'] + that.commentPopUp[i]['addedCommentBorderWidth']) + "," + (that.commentPopUp[i]['addedCommentHeight'] + that.commentPopUp[i]['addedCommentBorderWidth']);
                        }
                        return points;
                    });
        }
    }