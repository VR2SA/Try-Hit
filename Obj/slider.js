rangeSlider = {
    totalDuration: 0,
    startDuration: 0,
    endDuration: 0,
    currentPosition: 0,
    width: 0,
    padding: 30,
    startPosition: 0,
    endPosition: 0,
    cw: 0,
    ch: 0,

    init: function(totalDuration) {
        var rs = this;

        rs.canvas = document.createElement("canvas");
        rs.canvas.width = 500;
        rs.canvas.height = 80;
        document.body.appendChild(rs.canvas);
        rs.ctx = rs.canvas.getContext('2d');
        rs.draggable = false;
        rs.mouseX = 0;
        rs.mouseY = 0;

        rs.totalDuration = totalDuration;
        rs.cw = rs.ctx.canvas.width;
        rs.ch = rs.ctx.canvas.height;
        rs.width = this.cw - (rs.padding);
        rs.startPosition = rs.padding;
        rs.endPosition = rs.width;

        //detect touch and then automatically assign events
        var isTouchSupported = 'ontouchstart' in window;
        var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
        var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
        var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

        //add the canvas listeners and functions
        rs.canvas.addEventListener(startEvent, function mousedown(e) {
            rs.draggable = true;
        }, false);
        rs.canvas.addEventListener(endEvent, function mouseup(e) {
            rs.draggable = false;
        }, false);
        rs.canvas.addEventListener(moveEvent, rangeSlider.mousemove.bind(this), false);

        rs.draw();
    },
    update: function(mouseX, cursor) {

        var rs = this;
        var cw = this.cw;
        var totalDuration = this.totalDuration;

        if (cursor) {

            rs.startPosition = Math.min(mouseX, rs.endPosition);
            rs.startPosition = Math.max(rs.startPosition, rs.padding);

            rs.currentProgress = (rs.startPosition - rs.padding) / (rs.width - rs.padding);
            rs.startDuration = totalDuration * ((rs.startPosition - rs.padding) / rs.width);

        } else {
            rs.endPosition = Math.min(mouseX, rs.width);
            rs.endPosition = Math.max(rs.endPosition, rs.startPosition);

            rs.currentProgress = (rs.endPosition - rs.padding) / (rs.width - rs.padding);
            rs.endDuration = totalDuration * ((rs.endPosition - rs.padding) / rs.width);
        }

    },
    draw: function() {
        var rs = this;
        var currentPosition = rs.currentPosition;
        var ch = this.ch;

        this.clearCanvas();

        //draw track
        rs.ctx.beginPath();
        rs.ctx.moveTo(rs.padding, ch - rs.padding);
        rs.ctx.lineTo(rs.width, ch - rs.padding);
        rs.ctx.closePath();
        rs.ctx.strokeStyle = "rgb(200,200,200)";
        rs.ctx.lineWidth = 3;
        rs.ctx.stroke();
        rs.ctx.closePath();

        //Draw selected segment
        rs.ctx.beginPath();
        rs.ctx.moveTo(rs.startPosition, ch - rs.padding);
        rs.ctx.lineTo(rs.endPosition, ch - rs.padding);
        rs.ctx.closePath();
        rs.ctx.strokeStyle = "rgb(255,200,0)";
        rs.ctx.lineWidth = 3;
        rs.ctx.stroke();
        rs.ctx.closePath();

        //cursor
        rs.ctx.beginPath();
        rs.ctx.arc(rs.startPosition, ch - rs.padding, 10, 0, 2 * Math.PI, true);
        rs.ctx.stroke();
        rs.ctx.beginPath();
        rs.ctx.arc(rs.endPosition, ch - rs.padding, 10, 0, 2 * Math.PI, true);
        rs.ctx.stroke();

    },
    mousemove: function(e) {

        var rs = this;
        var ch = rs.ch;
        var c = rs.canvas;

        rs.draw();

        e.stopPropagation();
        e.preventDefault();

        rs.mouseX = e.layerX;
        rs.mouseY = e.layerY;

        rs.mouseX = (e.targetTouches) ? e.targetTouches[0].layerX - c.offsetLeft : e.layerX - c.offsetLeft;
        rs.mouseY = (e.targetTouches) ? e.targetTouches[0].layerY - c.offsetTop : e.layerY - c.offsetTop;


        if (rs.draggable) {

            //RangeStart
            var distance = rs.getDistance(rs.startPosition, ch - rs.padding);
            //if distance< r1+r2 boom !
            if (distance <= 70) {
                rs.update(rs.mouseX, true);
                return;
            }

            //RangeEnd
            var distance = rs.getDistance(rs.endPosition, ch - rs.padding);
            //if distance< r1+r2 boom !
            if (distance <= 70) {
                rs.update(rs.mouseX, false);
                return;
            }
        }
    },
    getDistance: function(px, py) {

        var rs = this;

        //get the distance
        var xs = 0;
        var ys = 0;

        xs = px - rs.mouseX;
        xs = xs * xs;

        ys = py - rs.mouseY;
        ys = ys * ys;

        return Math.sqrt(xs + ys);
    },
    clearCanvas: function() {

        var rs = this;

        // Store the current transformation matrix
        rs.ctx.save();

        // Use the identity matrix while clearing the canvas
        rs.ctx.setTransform(1, 0, 0, 1, 0, 0);
        rs.ctx.clearRect(0, 0, this.cw, this.ch);

        // Restore the transform
        rs.ctx.restore();

    }
}

rangeSlider.init(10);