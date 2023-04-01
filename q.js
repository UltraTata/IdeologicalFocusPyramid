let user = {
    trad: 0,
    prog: 0,
    glob: 0,
    nat: 0,
	
	auth: 0,
	lib: 0,
	left: 0,
	right: 0,

    maxNatGlob: 0,
    maxTradProg: 0,
    maxCol: 0,
	
	maxAuthLib: 0,
	maxLeftRight: 0
}
function result(){
    let four = ["trad","prog","glob","nat",  "auth","lib","left","right"];
    for(let x = 0;x<q.length;x++){
        let ans = q[x].answers[document.getElementById("q"+x).value];
        for(let y = 0;y<four.length;y++){
            if(ans[four[y]] != undefined){
                user[four[y]] += ans[four[y]];
            }
        }
        if(ans["ignore"] != "ignore"){
            user.maxNatGlob += maxAxis(q[x].answers,["nat","glob"]);
            user.maxTradProg += maxAxis(q[x].answers,["trad","prog"]);
            user.maxCol += maxAxis(q[x].answers,["trad","prog","nat","glob"]);
			
            user.maxAuthLib += maxAxis(q[x].answers,["auth","lib"]);
            user.maxLeftRight += maxAxis(q[x].answers,["left","right"]);
        }
    }
    putData(user);
    putAxes(user);
    drawIt(user);
    pyramidIt(user);
    explainedGraph();
    nolanIt(user);
    closeQuestionary();
}

let col = function(){
    return user.trad+user.prog+user.nat+user.glob;
}

function maxAxis(ans,axis){
    let max = 0;
    for(let x = 0;x<ans.length;x++){
        let n = 0;
        for(let y = 0;y<axis.length;y++){
            if(!isNaN(ans[x][axis[y]])){
                n += ans[x][axis[y]];
            }
        }
        if(max < n){
            max = n;
        }
    }
    return max;
}

let maxNatGlob = () => user.maxNatGlob;
let maxTradProg = () => user.maxTradProg;
let maxCol = () => user.maxCol;

let maxAuthLib = () => user.maxAuthLib;
let maxLeftRight = () => user.maxLeftRight;
let q = JSON.parse(jsonQ);