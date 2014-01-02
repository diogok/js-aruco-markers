
if(typeof padDigits == "undefined") {
    function padDigits(number, digits) {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }
}

var markers_opts = [[false,true,true,true,true],[false,true,false,false,false]
                   ,[true,false,true,true,false],[true,false,false,false,true]];

function makeMarker(id,width,height) {
    var canvas = document.createElement('canvas');
    canvas.pad = arguments[3] || 15;
    canvas.height = height + canvas.pad*2;
    canvas.width = width + canvas.pad*2;
    return drawMarker(canvas,id);
}

function drawMarker(canvas,id) {
    var val = padDigits(Number(id).toString(4),5);
    var rows = /(\d)(\d)(\d)(\d)(\d)/.exec(val).slice(1,6);
    var ctx = canvas.getContext('2d');
    var pad = canvas.pad || 15;
    var sw=(canvas.width - (pad*2))/7;
    var sh=(canvas.height - (pad*2))/7;

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.rect(0,0,canvas.height,canvas.width);
    ctx.stroke();
    ctx.fill();

    for(var h=0;h<7;h++) {
        for(var w=0;w<7;w++) {
            ctx.beginPath();
            if(w==0||h==0||h==6||w==6){
                ctx.fillStyle = 'black';
                ctx.strokeStyle = 'black';
            } else if(markers_opts[rows[h - 1]][w - 1]) {
                ctx.fillStyle = 'black';
                ctx.strokeStyle = 'black';
            } else {
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'white';
            }
            ctx.rect(w*sw + canvas.pad,h*sh + canvas.pad,sw,sh);
            ctx.stroke();
            ctx.fill();
        }
    }

    return canvas;
}

