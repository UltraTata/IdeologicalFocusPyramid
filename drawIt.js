function canvasToImg(canvas, img){
    img.setAttribute("src",canvas.toDataURL("image/png"));
    img.parentElement.classList = ["m-3"];
    canvas.remove();
}
function doIt(){
    let social = ((document.getElementById("Auth/Lib").value == "Lib")*2-1)*document.getElementById("Social").value;
    let economic = ((document.getElementById("Left/Right").value == "Right")*2-1)*document.getElementById("Economic").value;
    document.body.innerHTML = document.getElementById("nextPage").innerHTML;
    drawIt(social, economic);
}
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}
function putData(user){
    let data = document.getElementById("data");
    let percent = (n,max)=>parseInt(n*100/max);
    let indiv = ()=>100-percent(user.trad+user.prog+user.nat+user.glob,maxCol());
    data.innerHTML = `
        Traditional: ${percent(user.trad,maxTradProg())}%
        <br>
        Progressive: ${percent(user.prog,maxTradProg())}%
        <br>
        Global: ${percent(user.glob,maxNatGlob())}%
        <br>
        National: ${percent(user.nat,maxNatGlob())}%
        <br>
        Individual: ${indiv()}%
    `;
}
function putAxes(user){
    let canvas = document.getElementsByTagName("CANVAS")[0];
    let ctx = canvas.getContext("2d");
    let roundSqPadding = 2;
    let roundSqTextSp = 12;
    let roundSqBorderColor = "black";
    let roundSqTextColor = "white";
    let roundSqSize = 65;
    let roundSqExtraSize = 5;
    let roundSqDist = 10;
    let textY = 62;
    let firstX = 30;
    let firstY = 100;
    let axisSize = 302;
    let axisPadding = roundSqPadding;
    let axisMaxValue = axisSize-axisPadding;
    let percent = (n,max)=>parseInt(n*axisMaxValue/max);
    let indiv = ()=>axisMaxValue-percent(user.trad+user.prog+user.nat+user.glob,maxCol());
    //base
    //title
    ctx.font = "bold 48px arial";
    ctx.fillText("Your axes:",30,60);
    //axes	
    ctx.fillStyle = roundSqBorderColor;
    ctx.fillRect(firstX+roundSqSize,firstY+roundSqExtraSize,axisSize,roundSqSize-roundSqExtraSize*2);
    ctx.fillRect(firstX+roundSqSize,firstY+roundSqExtraSize+roundSqSize+roundSqDist,axisSize,roundSqSize-roundSqExtraSize*2);
    ctx.fillRect(firstX+roundSqSize,firstY+roundSqExtraSize+roundSqSize*2+roundSqDist*2,axisSize,roundSqSize-roundSqExtraSize*2);
	
    ctx.fillRect(firstX+roundSqSize,firstY+roundSqExtraSize+roundSqSize*4+roundSqDist*4,axisSize,roundSqSize-roundSqExtraSize*2);
    ctx.fillRect(firstX+roundSqSize,firstY+roundSqExtraSize+roundSqSize*5+roundSqDist*5,axisSize,roundSqSize-roundSqExtraSize*2);
	
	if(user.glob > 0){
		ctx.fillStyle = "#ff8000"; //World
		ctx.fillRect(firstX+axisPadding+roundSqSize,firstY+axisPadding+roundSqExtraSize,axisSize-axisPadding*2,roundSqSize-roundSqExtraSize*2-axisPadding*2);
    }
	if(user.trad > 0){
	ctx.fillStyle = "#ff00ff"; //Tradition
    ctx.fillRect(firstX+axisPadding+roundSqSize,firstY+axisPadding+roundSqExtraSize+roundSqSize+roundSqDist,axisSize-axisPadding*2,roundSqSize-roundSqExtraSize*2-axisPadding*2);
    }
	if(col() > 0){
	ctx.fillStyle = "#ffffff"; //Collective
    ctx.fillRect(firstX+axisPadding+roundSqSize,firstY+axisPadding+roundSqExtraSize+roundSqSize*2+roundSqDist*2,axisSize-axisPadding*2,roundSqSize-roundSqExtraSize*2-axisPadding*2);
	}
	
	if(user.nat > 0){
		ctx.fillStyle = "#8080ff"; //Nation
		ctx.fillRect(firstX+percent(user.glob,maxNatGlob())+axisPadding+roundSqSize,firstY+axisPadding+roundSqExtraSize,axisSize-axisPadding*2-percent(user.glob,maxNatGlob()),roundSqSize-roundSqExtraSize*2-axisPadding*2);
	}
	if(user.prog > 0){
		ctx.fillStyle = "#80ff00"; //Progress
		ctx.fillRect(
			firstX+percent(user.trad,maxTradProg())+axisPadding+roundSqSize,
			firstY+axisPadding+roundSqExtraSize+roundSqSize+roundSqDist,
			axisSize-axisPadding*2-percent(user.trad,maxTradProg()),
			roundSqSize-roundSqExtraSize*2-axisPadding*2);
	}
	if(indiv() > 0){
		ctx.fillStyle = "#808080"; //Individual
		ctx.fillRect(firstX+(axisMaxValue-indiv())+axisPadding+roundSqSize,firstY+axisPadding+roundSqExtraSize+roundSqSize*2+roundSqDist*2,axisSize-axisPadding*2-(axisMaxValue-indiv()),roundSqSize-roundSqExtraSize*2-axisPadding*2);
    }
	
	if(user.auth > 0){
		ctx.fillStyle = "#0000ff"; //Authority
		ctx.fillRect(
			firstX+axisPadding+roundSqSize,
			firstY+axisPadding+roundSqExtraSize+roundSqSize*4+roundSqDist*4,
			axisSize-axisPadding*2,
			roundSqSize-roundSqExtraSize*2-axisPadding*2);
	}
	if(user.left > 0){
		ctx.fillStyle = "#ff0000"; //Left
		ctx.fillRect(
			firstX+axisPadding+roundSqSize,
			firstY+axisPadding+roundSqExtraSize+roundSqSize*5+roundSqDist*5,
			axisSize-axisPadding*2,
			roundSqSize-roundSqExtraSize*2-axisPadding*2);
	}
	if(user.lib > 0){
		ctx.fillStyle = "#00ff00"; //Liberty
		ctx.fillRect(
			firstX+percent(user.auth,maxAuthLib())+axisPadding+roundSqSize,
			firstY+axisPadding+roundSqExtraSize+roundSqSize*4+roundSqDist*4,
			axisSize-axisPadding*2-percent(user.auth,maxAuthLib()),
			roundSqSize-roundSqExtraSize*2-axisPadding*2);
	}
	if(user.right > 0){
		ctx.fillStyle = "#ffff00"; //Right
		ctx.fillRect(
			firstX+percent(user.left,maxLeftRight())+axisPadding+roundSqSize,
			firstY+axisPadding+roundSqExtraSize+roundSqSize*5+roundSqDist*5,
			axisSize-axisPadding*2-percent(user.left,maxLeftRight()),
			roundSqSize-roundSqExtraSize*2-axisPadding*2);
	}
    //roundSq
    ctx.font = "12px arial"

    ctx.fillStyle = roundSqBorderColor;
    roundRect(ctx,firstX,firstY,roundSqSize,roundSqSize,5,true,false);
    ctx.fillStyle = "#ff8000";
    roundRect(ctx,firstX+roundSqPadding,firstY+roundSqPadding,roundSqSize-roundSqPadding*2,roundSqSize-roundSqTextSp-roundSqPadding*2,5,true,false);
    ctx.fillStyle = roundSqTextColor;
    ctx.fillText("World",17+firstX,textY+firstY);

    ctx.fillStyle = roundSqBorderColor;
    roundRect(ctx,firstX+roundSqSize+axisSize,firstY,roundSqSize,roundSqSize,5,true,false);
    ctx.fillStyle = "#8080ff";
    roundRect(ctx,firstX+roundSqSize+axisSize+roundSqPadding,firstY+roundSqPadding,roundSqSize-roundSqPadding*2,roundSqSize-roundSqTextSp-roundSqPadding*2,5,true,false);
    ctx.fillStyle = roundSqTextColor;
    ctx.fillText("Nation",16+firstX+roundSqSize+axisSize,textY+firstY);

    ctx.fillStyle = roundSqBorderColor;
    roundRect(ctx,firstX,firstY+roundSqSize+roundSqDist,roundSqSize,roundSqSize,5,true,false);
    ctx.fillStyle = "#ff00ff";
    roundRect(ctx,firstX+roundSqPadding,firstY+roundSqSize+roundSqDist+roundSqPadding,roundSqSize-roundSqPadding*2,roundSqSize-roundSqTextSp-roundSqPadding*2,5,true,false);
    ctx.fillStyle = roundSqTextColor;
    ctx.fillText("Tradition",10+firstX,textY+firstY+roundSqSize+roundSqDist);

    ctx.fillStyle = roundSqBorderColor;
    roundRect(ctx,firstX+roundSqSize+axisSize,firstY+roundSqSize+roundSqDist,roundSqSize,roundSqSize,5,true,false);
    ctx.fillStyle = "#80ff00";
    roundRect(ctx,firstX+roundSqSize+axisSize+roundSqPadding,firstY+roundSqSize+roundSqDist+roundSqPadding,roundSqSize-roundSqPadding*2,roundSqSize-roundSqTextSp-roundSqPadding*2,5,true,false);
    ctx.fillStyle = roundSqTextColor;
    ctx.fillText("Progress",8+firstX+roundSqSize+axisSize,textY+firstY+roundSqSize+roundSqDist);

    ctx.fillStyle = roundSqBorderColor;
    roundRect(ctx,firstX,firstY+roundSqSize*2+roundSqDist*2,roundSqSize,roundSqSize,5,true,false);
    ctx.fillStyle = "#ffffff";
    roundRect(ctx,firstX+roundSqPadding,firstY+roundSqSize*2+roundSqDist*2+roundSqPadding,roundSqSize-roundSqPadding*2,roundSqSize-roundSqTextSp-roundSqPadding*2,5,true,false);
    ctx.fillStyle = roundSqTextColor;
    ctx.fillText("Collective",6+firstX,textY+firstY+roundSqSize*2+roundSqDist*2);

    ctx.fillStyle = roundSqBorderColor;
    roundRect(ctx,firstX+roundSqSize+axisSize,firstY+roundSqSize*2+roundSqDist*2,roundSqSize,roundSqSize,5,true,false);
    ctx.fillStyle = "#808080";
    roundRect(ctx,firstX+roundSqSize+axisSize+roundSqPadding,firstY+roundSqSize*2+roundSqDist*2+roundSqPadding,roundSqSize-roundSqPadding*2,roundSqSize-roundSqTextSp-roundSqPadding*2,5,true,false);
    ctx.fillStyle = roundSqTextColor;
    ctx.fillText("Individual",8+firstX+roundSqSize+axisSize,textY+firstY+roundSqSize*2+roundSqDist*2);
	
	ctx.fillStyle = roundSqBorderColor;
    roundRect(ctx,firstX,firstY+roundSqSize*4+roundSqDist*4,roundSqSize,roundSqSize,5,true,false);
    ctx.fillStyle = "#0000ff";
    roundRect(ctx,firstX+roundSqPadding,firstY+roundSqSize*4+roundSqDist*4+roundSqPadding,roundSqSize-roundSqPadding*2,roundSqSize-roundSqTextSp-roundSqPadding*2,5,true,false);
    ctx.fillStyle = roundSqTextColor;
    ctx.fillText("Authority",8+firstX,textY+firstY+roundSqSize*4+roundSqDist*4);
	
    ctx.fillStyle = roundSqBorderColor;
    roundRect(ctx,firstX+roundSqSize+axisSize,firstY+roundSqSize*4+roundSqDist*4,roundSqSize,roundSqSize,5,true,false);
    ctx.fillStyle = "#00ff00";
    roundRect(ctx,firstX+roundSqSize+axisSize+roundSqPadding,firstY+roundSqSize*4+roundSqDist*4+roundSqPadding,roundSqSize-roundSqPadding*2,roundSqSize-roundSqTextSp-roundSqPadding*2,5,true,false);
    ctx.fillStyle = roundSqTextColor;
    ctx.fillText("Liberty",15+firstX+roundSqSize+axisSize,textY+firstY+roundSqSize*4+roundSqDist*4);
	
	ctx.fillStyle = roundSqBorderColor;
    roundRect(ctx,firstX,firstY+roundSqSize*5+roundSqDist*5,roundSqSize,roundSqSize,5,true,false);
    ctx.fillStyle = "#ff0000";
    roundRect(ctx,firstX+roundSqPadding,firstY+roundSqSize*5+roundSqDist*5+roundSqPadding,roundSqSize-roundSqPadding*2,roundSqSize-roundSqTextSp-roundSqPadding*2,5,true,false);
    ctx.fillStyle = roundSqTextColor;
    ctx.fillText("Left",20+firstX,textY+firstY+roundSqSize*5+roundSqDist*5);
	
    ctx.fillStyle = roundSqBorderColor;
    roundRect(ctx,firstX+roundSqSize+axisSize,firstY+roundSqSize*5+roundSqDist*5,roundSqSize,roundSqSize,5,true,false);
    ctx.fillStyle = "#ffff00";
    roundRect(ctx,firstX+roundSqSize+axisSize+roundSqPadding,firstY+roundSqSize*5+roundSqDist*5+roundSqPadding,roundSqSize-roundSqPadding*2,roundSqSize-roundSqTextSp-roundSqPadding*2,5,true,false);
    ctx.fillStyle = roundSqTextColor;
    ctx.fillText("Right",17+firstX+roundSqSize+axisSize,textY+firstY+roundSqSize*5+roundSqDist*5);

    ctx.strokeRect(0,0,500,600);
    canvasToImg(canvas,document.getElementById("axes"));
}
function drawIt(user){
    let canvas = document.getElementsByTagName("CANVAS")[0];
    let ctx = canvas.getContext("2d");
    ctx.fillStyle="#ff0000";
    ctx.fillRect(0,0,500/3,500/3);
    ctx.fillStyle="#ff00ff";
    ctx.fillRect(500/3,0,500/3,500/3);
    ctx.fillStyle="#0000ff";
    ctx.fillRect(1000/3,0,500/3,500/3);
    ctx.fillStyle="#ff8000";
    ctx.fillRect(0,500/3,500/3,500/3);
    ctx.fillStyle="#808080";
    ctx.fillRect(500/3,500/3,500/3,500/3);
    ctx.fillStyle="#8080ff";
    ctx.fillRect(1000/3,500/3,500/3,500/3);
    ctx.fillStyle="#00ff00";
    ctx.fillRect(0,1000/3,500/3,500/3);
    ctx.fillStyle="#80ff00";
    ctx.fillRect(500/3,1000/3,500/3,500/3);
    ctx.fillStyle="#ffff00";
    ctx.fillRect(1000/3,1000/3,500/3,500/3);
    ctx.fillStyle="black";
    let horAxis = (user.nat-user.glob)/maxNatGlob()*250+250-5;
    let verAxis = (user.prog-user.trad)/maxTradProg()*250+250-5;
    if(isNaN(horAxis) || Math.abs(horAxis) == Infinity){
        horAxis = 245;
    }
    if(isNaN(verAxis) || Math.abs(horAxis) == Infinity){
        verAxis = 245;
    }
    ctx.fillRect(horAxis, verAxis, 10, 10);
    canvasToImg(canvas,document.getElementById("without indiv"));
}
function pyramidIt(user){
    let canvas = document.getElementsByTagName("CANVAS")[0];
    let colorPow = (col()/maxCol())*255;
    let d = (col()/maxCol())*490+10;
    let p = (500-d)/2;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle=`rgb(${colorPow},0,0)`;
    ctx.fillRect(p,p,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow},0,${colorPow})`;
    ctx.fillRect(p+d/3,p,d/3,d/3);
    ctx.fillStyle=`rgb(0,0,${colorPow})`;
    ctx.fillRect(p+d*2/3,p,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow},${colorPow/2},0)`;
    ctx.fillRect(p,p+d/3,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow/2},${colorPow/2},${colorPow/2})`;
    ctx.fillRect(p+d/3,p+d/3,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow/2},${colorPow/2},${colorPow})`;
    ctx.fillRect(p+d*2/3,p+d/3,d/3,d/3);
    ctx.fillStyle=`rgb(0,${colorPow},0)`;
    ctx.fillRect(p,p+d*2/3,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow/2},${colorPow},0)`;
    ctx.fillRect(p+d/3,p+d*2/3,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow},${colorPow},0)`;
    ctx.fillRect(p+d*2/3,p+d*2/3,d/3,d/3);
    ctx.fillStyle="black";
    let horAxis = p+(user.nat-user.glob)/2/maxNatGlob()*d+d/2-5;
    let verAxis = p+(user.prog-user.trad)/2/maxTradProg()*d+d/2-5;
    if(isNaN(horAxis) || Math.abs(horAxis) == Infinity){
        horAxis = p+d/2-5;
    }
    if(isNaN(verAxis) || Math.abs(horAxis) == Infinity){
        verAxis = p+d/2-5;
    }
    ctx.fillRect(horAxis, verAxis, 10, 10);

    ctx.lineWidth = 2;
    ctx.moveTo(0,0);
    ctx.lineTo(500,0);
    ctx.lineTo(500,500);
    ctx.lineTo(0,500);
    ctx.lineTo(0,0);
    ctx.stroke();

    canvasToImg(canvas,document.getElementById("graph"));
}

function explainedGraph(){
    let canvas = document.getElementsByTagName("CANVAS")[0];
    let ctx = canvas.getContext("2d");
    
    ctx.font = "bold 24px arial";
    ctx.fillText("The Ideological Pyramid test results",120,30);
    ctx.fillRect(118,30, 415, 2);

    ctx.font = "15px arial";
    let text = `The Ideological Pyramid locates your ideology in a equilateral pyramid of square base.
The tip of the pyramid represent the purest individualism. As you go further down,
your ideology becomes more and more collectivist. But, how? Collectivism is all about
caring about things greater than ourselves. Is tradition or progress more important?
Will you defend your compatriot or every human on Earth?
The Ideological Pyramid has two more Axes: 
Traditional vs. Progressive     and     Global vs. National.

The white square represents the base of the pyramid and the colorful square is your level.
The smaller your level, the more individualist you are.
The black dot represents your ideology, the coordinates represents the other two axes.`.split("\n");

    for(let x = 0;x<text.length;x++){
        ctx.fillText(text[x],30,100+x*18);
    }
    
    ctx.fillText("More traditional",280,360);
    ctx.fillText("More progressive",270,900);
    ctx.fillText("More",25,630);
    ctx.fillText("Global",20,645);
    ctx.fillText("More",590,630);
    ctx.fillText("National",580,645);

    let colorPow = (col()/maxCol())*255;
    let d = (col()/maxCol())*490+10;
    let ph = (500-d)/2+75;
    let pv = (500-d)/2+375;
    ctx.fillStyle=`rgb(${colorPow},0,0)`;
    ctx.fillRect(ph,pv,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow},0,${colorPow})`;
    ctx.fillRect(ph+d/3,pv,d/3,d/3);
    ctx.fillStyle=`rgb(0,0,${colorPow})`;
    ctx.fillRect(ph+d*2/3,pv,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow},${colorPow/2},0)`;
    ctx.fillRect(ph,pv+d/3,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow/2},${colorPow/2},${colorPow/2})`;
    ctx.fillRect(ph+d/3,pv+d/3,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow/2},${colorPow/2},${colorPow})`;
    ctx.fillRect(ph+d*2/3,pv+d/3,d/3,d/3);
    ctx.fillStyle=`rgb(0,${colorPow},0)`;
    ctx.fillRect(ph,pv+d*2/3,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow/2},${colorPow},0)`;
    ctx.fillRect(ph+d/3,pv+d*2/3,d/3,d/3);
    ctx.fillStyle=`rgb(${colorPow},${colorPow},0)`;
    ctx.fillRect(ph+d*2/3,pv+d*2/3,d/3,d/3);
    ctx.fillStyle="black";
    let horAxis = ph+(user.nat-user.glob)/2/maxNatGlob()*d+d/2-5;
    let verAxis = pv+(user.prog-user.trad)/2/maxTradProg()*d+d/2-5;
    if(isNaN(horAxis) || Math.abs(horAxis) == Infinity){
        horAxis = ph+d/2-5;
    }
    if(isNaN(verAxis) || Math.abs(horAxis) == Infinity){
        verAxis = pv+d/2-5;
    }
    ctx.fillRect(horAxis, verAxis, 10, 10);

    ctx.lineWidth = 2;
    ctx.moveTo(75,375);
    ctx.lineTo(575,375);
    ctx.lineTo(575,875);
    ctx.lineTo(75,875);
    ctx.lineTo(75,375);
    ctx.stroke();

    canvasToImg(canvas,document.getElementById("explained"));
}
function nolanIt(user){
    let canvas = document.getElementsByTagName("CANVAS")[0];
    let ctx = canvas.getContext("2d");
    ctx.fillStyle="#ff0000";
    ctx.fillRect(0,0,500/3,500/3);
    ctx.fillStyle="#ff00ff";
    ctx.fillRect(500/3,0,500/3,500/3);
    ctx.fillStyle="#0000ff";
    ctx.fillRect(1000/3,0,500/3,500/3);
    ctx.fillStyle="#ff8000";
    ctx.fillRect(0,500/3,500/3,500/3);
    ctx.fillStyle="#808080";
    ctx.fillRect(500/3,500/3,500/3,500/3);
    ctx.fillStyle="#8080ff";
    ctx.fillRect(1000/3,500/3,500/3,500/3);
    ctx.fillStyle="#00ff00";
    ctx.fillRect(0,1000/3,500/3,500/3);
    ctx.fillStyle="#80ff00";
    ctx.fillRect(500/3,1000/3,500/3,500/3);
    ctx.fillStyle="#ffff00";
    ctx.fillRect(1000/3,1000/3,500/3,500/3);
    ctx.fillStyle="black";
    let horAxis = (user.right-user.left)/maxLeftRight()*250+250-5;
    let verAxis = (user.lib-user.auth)/maxAuthLib()*250+250-5;
    if(isNaN(horAxis) || Math.abs(horAxis) == Infinity){
        horAxis = 245;
    }
    if(isNaN(verAxis) || Math.abs(verAxis) == Infinity){
        verAxis = 245;
    }
    ctx.fillRect(horAxis, verAxis, 10, 10);
    canvasToImg(canvas,document.getElementById("nolan"));
}
function closeQuestionary(){
    let select;
    let x = 0;
    while(document.getElementsByTagName("SELECT").length > 0){
        select = document.getElementsByTagName("SELECT")[0];
        select.outerHTML = `<p>`+q[x].answers[select.value].answer+`</p>`;
        x++;
    }
    document.getElementsByTagName("H3")[0].innerHTML = "Your Ideological Pyramid";
    document.getElementById("theForm").innerHTML = 
        "<h3>Your answers</h3>"+document.getElementById("theForm").innerHTML;
        document.getElementsByTagName("BUTTON")[0].innerHTML = "Make the test again";
        document.getElementsByTagName("BUTTON")[0].onclick = function(){location.reload()};
}