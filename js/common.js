/* document ready function */
$(document).ready(function() {
    var clickedshape, lastchildelement;
    var svgshapeholder = document.getElementById("chartarea");
    var svgHolder = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgHolder.setAttribute('id', "svgObj");
    svgHolder.setAttribute('width', "800px");
    svgHolder.setAttribute('height', "500px");
    svgshapeholder.appendChild(svgHolder);
    $('#chartarea').click(function(e) {
        var mousexval, mouseyval;
        mousexval = e.pageX - $("#svgObj").offset().left;
        mouseyval = e.pageY - $("#svgObj").offset().top;

        /* switch case to identify the clickedelement the view */
        switch (clickedshape) {
            case "circle":
                if (svgHolder != null) {
                    svgHolder.appendChild(circle(mousexval, mouseyval));
                }
                break;
            case "line":
                if (svgHolder != null) {
                    svgHolder.appendChild(linefunction(mousexval, mouseyval));
                }
                break;
            case "square":
                if (svgHolder != null) {
                    svgHolder.appendChild(squarefunction(mousexval, mouseyval));
                }
                break;
            case "default":
                console.log("select the shape");
                break;
        }
        lastchildelement = svgHolder.lastChild;
        if ($("#svgObj").children().length > 0) {
            $("#undo").removeClass("disabled");
            $("#clear").removeClass("disabled");
        }


    });
    $(".clickable_elements").unbind("click").bind("click", function() {
        clickedshape = $(this).attr("id");
    });
    $("#clear").unbind("click").bind("click", function() {
        if (!$(this).hasClass("disabled")) {
            if (svgHolder != null) {
                $("#svgObj").html("");
                $("#undo").addClass("disabled");
            }
        }
    });
    $("#undo").unbind("click").bind("click", function() {
        if (!$(this).hasClass("disabled")) {
            if (svgHolder != null) {
                if ($("#svgObj").children().length > 0) {
                    svgHolder.removeChild(lastchildelement);
                }
            } else {
                $(this).addClass("disabled");
            }
            $("#redo").removeClass("disabled");
        }

    });
    $("#redo").unbind("click").bind("click", function() {
        if (!$(this).hasClass("disabled")) {
            if (svgHolder != null) {
                svgHolder.appendChild(lastchildelement);
            }
            $(this).addClass("disabled");
        }
    });
});
/* circle creation function */
function circle(xpoint, ypoint) {
    if (!isNaN(xpoint) && isFinite(xpoint)) { //condition to check whether the x value is number/finite
        var circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circ.setAttribute('cx', xpoint);
        circ.setAttribute('cy', ypoint);
        circ.setAttribute('r', 40);
        circ.setAttribute('stroke-width', '1');
        circ.setAttribute('fill', 'transparent');
        circ.setAttribute('stroke', '#000');
        return circ;
    }
}
/* line creation function */
function linefunction(xpoint, ypoint) {
    if (!isNaN(xpoint) && isFinite(xpoint)) { //condition to check whether the x value is number/finite
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', xpoint);
        line.setAttribute('y1', ypoint);
        line.setAttribute('x2', xpoint + 80);
        line.setAttribute('y2', ypoint);
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke', '#000');
        return line;
    }
}
/* square creation function */
function squarefunction(xpoint, ypoint) {
    if (!isNaN(xpoint) && isFinite(xpoint)) { //condition to check whether the x value is number/finite
        var square = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        square.setAttribute('x', xpoint);
        square.setAttribute('y', ypoint);
        square.setAttribute('height', "60");
        square.setAttribute('width', "60");
        square.setAttribute('fill', '#cfe2f3');
        square.setAttribute('stroke-width', '1');
        square.setAttribute('stroke', '#000');
        return square;
    }
}