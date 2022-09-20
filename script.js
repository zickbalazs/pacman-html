//0 - empty, 1 - wall, 2 - dot, 3 - bigdot, 4 - pacman, 5 - red, 6 - blue, 7 - pink, 8 - orange
let gamefield,
    dir,
    pcCoord = [],
    pacman_engine,
    ghost_engine,
    timer,
    score = 0,
    MJEGAMODE,
    enemyspeed = 500,
    energizerTime = 5000,
    lifes = 3,
    time = 0,
    redLast = 2,
    blueLast = 2,
    orangeLast = 0,
    pinkLast = 2,
    canCommitMurder = false;
    scoreLbl = document.querySelector('#score'),
    livesLbl = document.querySelector('#life'),
    timerLbl = document.querySelector('#time');
    ghosts = [
        {
            "x":1,
            "y":2
        },
        {
            "x": 1,
            "y": 18
        },
        {
            "x":21,
            "y":10
        },
        {
            "x":7,
            "y":10
        }
    ];
GenTable();
function GenTable(){
    pcCoord[0] = 17;
    pcCoord[1] = 10;
    dir=-1;
    ghosts = [
        {
            "x":1,
            "y":2
        },
        {
            "x": 1,
            "y": 18
        },
        {
            "x":21,
            "y":10
        },
        {
            "x":7,
            "y":10
        }
    ];
    timer = setInterval(() => {
        time++;
    }, 1000);
    gamefield = 
    [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 5, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 6, 1, 0],
        [0, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
        [0, 1, 3, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 3, 1, 0],
        [0, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 0],
        [0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0],
        [0, 1, 2, 2, 2, 1, 1, 0, 0, 0, 8, 0, 0, 0, 1, 1, 2, 2, 2, 1, 0],
        [1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1],
        [0, 0, 0, 0, 3, 2, 2, 0, 1, 0, 0, 0, 1, 0, 2, 2, 3, 0, 0, 0, 0],
        [1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1],
        [0, 1, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 1, 0],
        [0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0],
        [0, 1, 3, 2, 2, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 3, 1, 0],
        [0, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
        [0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 1, 0],
        [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0],
        [0, 1, 3, 2, 2, 2, 2, 2, 2, 2, 7, 2, 2, 2, 2, 2, 2, 2, 3, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    ];
    pacman_engine = setInterval(() => {
       simMove(dir) 
    }, 250);
    ghost_engine = setInterval(() => {
        simGhost(5);
        simGhost(6);
        simGhost(7);
        simGhost(8);
    }, enemyspeed);
}
function isGhost(dir){
    switch (dir){
        case 0:
            return gamefield[pcCoord[0]+1][pcCoord[1]] == 5 || gamefield[pcCoord[0]+1][pcCoord[1]] == 6 || gamefield[pcCoord[0]+1][pcCoord[1]]==7 || gamefield[pcCoord[0]+1][pcCoord[1]]==8;
        case 1:
            return gamefield[pcCoord[0]][pcCoord[1]+1]==5 || gamefield[pcCoord[0]][pcCoord[1]+1]==6 || gamefield[pcCoord[0]][pcCoord[1]+1]==7 || gamefield[pcCoord[0]][pcCoord[1]+1]==8;
        case 2:
            return gamefield[pcCoord[0]-1][pcCoord[1]]==5 || gamefield[pcCoord[0]-1][pcCoord[1]]==6 || gamefield[pcCoord[0]-1][pcCoord[1]]==7 || gamefield[pcCoord[0]-1][pcCoord[1]]==8;
        case 3:
            return gamefield[pcCoord[0]][pcCoord[1]-1]==5 || gamefield[pcCoord[0]][pcCoord[1]-1]==6 || gamefield[pcCoord[0]][pcCoord[1]-1]==7 || gamefield[pcCoord[0]][pcCoord[1]-1]==8;
    }
}
function simMove(pcDir){
    switch (pcDir){
        case 0:
            if (isGhost(pcDir)){
                if (!canCommitMurder) reset();
                else {
                    placeGhost(gamefield[pcCoord[0]+1][pcCoord[1]]);
                    score+=200;
                    gamefield[pcCoord[0]+1][pcCoord[1]]=4;
                    gamefield[pcCoord[0]][pcCoord[1]]=0;
                    pcCoord = [pcCoord[0]+1, pcCoord[1]];
                }
            }
            else{
                if (gamefield[pcCoord[0]+1][pcCoord[1]]!=1)
                {
                    if (gamefield[pcCoord[0]+1][pcCoord[1]]==3){
                        canCommitMurder = true;
                        MJEGAMODE = setTimeout(() => {
                            canCommitMurder = false;
                            console.log(canCommitMurder)
                        }, energizerTime);
                    }
                    
                    score+=gamefield[pcCoord[0]+1][pcCoord[1]]==2 ?
                        10 : gamefield[pcCoord[0]+1][pcCoord[1]]==3 ? 50:0;
                    gamefield[pcCoord[0]+1][pcCoord[1]]=4;
                    gamefield[pcCoord[0]][pcCoord[1]]=0;
                    pcCoord = [pcCoord[0]+1, pcCoord[1]];
                }
            }
            break;
        case 1:
            if (isGhost(pcDir)){
                if (!canCommitMurder) reset();
                else{
                    placeGhost(gamefield[pcCoord[0]][pcCoord[1]+1]);
                    score+=200;
                    gamefield[pcCoord[0]][pcCoord[1]+1]=4;
                    gamefield[pcCoord[0]][pcCoord[1]]=0;
                    pcCoord = [pcCoord[0], pcCoord[1]+1];
                }
            }
            else if (gamefield[pcCoord[0]][pcCoord[1]+1]!=1)
            {
                if (gamefield[pcCoord[0]][pcCoord[1]+1]==3){
                    canCommitMurder = true;
                    MJEGAMODE = setTimeout(() => {
                    canCommitMurder = false;
                    console.log(canCommitMurder)
                    }, energizerTime);
                }
                score+=gamefield[pcCoord[0]][pcCoord[1]+1]==2 ?
                10:gamefield[pcCoord[0]][pcCoord[1]+1]==3?50:0;
                gamefield[pcCoord[0]][pcCoord[1]+1]=4;
                gamefield[pcCoord[0]][pcCoord[1]]=0;
                pcCoord = [pcCoord[0], pcCoord[1]+1];
            }
            if (pcCoord[0]==9&&pcCoord[1]==0){
                gamefield[9][20]=4;
                pcCoord[1] = 20
                gamefield[9][0]=0;
            }
            break;
        case 2:
            if (isGhost(pcDir)){
                if (!canCommitMurder) reset();
                else {
                    placeGhost(gamefield[pcCoord[0]-1][pcCoord[1]]);
                    score+=200;
                    gamefield[pcCoord[0]-1][pcCoord[1]]=4;
                    gamefield[pcCoord[0]][pcCoord[1]]=0;
                    pcCoord = [pcCoord[0]-1, pcCoord[1]];
                }
            }
            else if (gamefield[pcCoord[0]-1][pcCoord[1]]!=1)
            {
                if (gamefield[pcCoord[0]-1][pcCoord[1]]==3){
                    canCommitMurder = true;
                    MJEGAMODE = setTimeout(() => {
                        canCommitMurder = false;
                        console.log(canCommitMurder)
                    }, energizerTime);
                }
                score+=gamefield[pcCoord[0]-1][pcCoord[1]]==2 ?
                    10:gamefield[pcCoord[0]-1][pcCoord[1]]==3 ? 50:0;
                gamefield[pcCoord[0]-1][pcCoord[1]]=4;
                gamefield[pcCoord[0]][pcCoord[1]]=0;
                pcCoord = [pcCoord[0]-1, pcCoord[1]];
            }
            break;
        case 3:
            if (isGhost(pcDir)){
                if (!canCommitMurder) reset();
                else{
                    placeGhost(gamefield[pcCoord[0]][pcCoord[1]-1]);
                    score+=200;
                    gamefield[pcCoord[0]][pcCoord[1]-1]=4;
                    gamefield[pcCoord[0]][pcCoord[1]]=0;
                    pcCoord = [pcCoord[0], pcCoord[1]-1];
                }
            }
            else if (gamefield[pcCoord[0]][pcCoord[1]-1]!=1)
            {
                    if (gamefield[pcCoord[0]][pcCoord[1]-1]==3){
                        canCommitMurder = true;
                        MJEGAMODE = setTimeout(() => {
                            canCommitMurder = false;
                            console.log(canCommitMurder)
                        }, energizerTime);
                    }
                    score+=gamefield[pcCoord[0]][pcCoord[1]-1]==2 ?
                        10:gamefield[pcCoord[0]][pcCoord[1]-1]==3?50:0;
                    gamefield[pcCoord[0]][pcCoord[1]-1]=4;
                    gamefield[pcCoord[0]][pcCoord[1]]=0;
                    pcCoord = [pcCoord[0], pcCoord[1]-1];
                    }
                    if (pcCoord[0]==9&&pcCoord[1]==0){
                        gamefield[9][20]=4;
                        pcCoord[1] = 20
                        gamefield[9][0]=0;
            }
            break;
        
    }
    displayGame();
    if (score>=1940){
        win();
    }
}
function GhostDown(x, y){
    return gamefield[x+1][y]==1;
}
function GhostUp(x, y){
    return gamefield[x-1][y]==1;
}
function GhostRight(x, y){
    return gamefield[x][y+1]==1;
}
function GhostLeft(x, y){
    return gamefield[x][y-1]==1;
}
function sim5(){
    let r = Math.floor(Math.random()*4);
    switch (r){
        case 0:
            if (!GhostDown(ghosts[0].x, ghosts[0].y)){
                if (gamefield[ghosts[0].x+1][ghosts[0].y]==4){
                    reset();
                }
                else{
                    gamefield[ghosts[0].x][ghosts[0].y] = redLast;
                    redLast = gamefield[ghosts[0].x+1][ghosts[0].y];
                    gamefield[ghosts[0].x+1][ghosts[0].y] = 5;
                    ghosts[0].x += 1;
                }
            }
            else sim5();
            break;
        case 1:
            if (!GhostLeft(ghosts[0].x, ghosts[0].y)){
                if (gamefield[ghosts[0].x][ghosts[0].y-1]==4){
                    reset();
                }
                else{
                    redLast = gamefield[ghosts[0].x][ghosts[0].y-1];
                    gamefield[ghosts[0].x][ghosts[0].y-1] = 5;
                    gamefield[ghosts[0].x][ghosts[0].y] = redLast;
                    ghosts[0].y -= 1;
                }
            }
            else sim5();
            break;
        case 2:
            if (!GhostUp(ghosts[0].x, ghosts[0].y)){
                if (gamefield[ghosts[0].x-1][ghosts[0].y]==4){
                    reset();
                }
                else{
                    redLast = gamefield[ghosts[0].x-1][ghosts[0].y];
                    gamefield[ghosts[0].x-1][ghosts[0].y] = 5;
                    gamefield[ghosts[0].x][ghosts[0].y] = redLast;
                    ghosts[0].x -= 1;
                }
            }
            else sim5();
            break;
        case 3:
            if (!GhostRight(ghosts[0].x, ghosts[0].y)){
                if (gamefield[ghosts[0].x][ghosts[0].y-1]==4){
                    reset();
                }
                else{
                    redLast = gamefield[ghosts[0].x][ghosts[0].y+1];
                    gamefield[ghosts[0].x][ghosts[0].y+1] = 5;
                    gamefield[ghosts[0].x][ghosts[0].y] = redLast;
                    ghosts[0].y += 1;
                }
            }
            else sim5();
            break;
    }
}
function sim6(){
    let r = Math.floor(Math.random()*4);
    switch (r){
        case 0:
            if (!GhostDown(ghosts[1].x, ghosts[1].y)){
                blueLast = gamefield[ghosts[1].x+1][ghosts[1].y];
                gamefield[ghosts[1].x+1][ghosts[1].y] = 6;
                gamefield[ghosts[1].x][ghosts[1].y] = blueLast;
                ghosts[1].x += 1;
            }
            else sim6();
            break;
        case 1:
            if (!GhostLeft(ghosts[1].x, ghosts[1].y)){
                blueLast = gamefield[ghosts[1].x][ghosts[1].y-1];
                gamefield[ghosts[1].x][ghosts[1].y-1] = 6;
                gamefield[ghosts[1].x][ghosts[1].y] = blueLast;
                ghosts[1].y -= 1;
            }
            else sim6();
            break;
        case 2:
            if (!GhostUp(ghosts[1].x, ghosts[1].y)){
                blueLast = gamefield[ghosts[1].x-1][ghosts[1].y];
                gamefield[ghosts[1].x-1][ghosts[1].y] = 6;
                gamefield[ghosts[1].x][ghosts[1].y] = blueLast;
                ghosts[1].x -= 1;
            }
            else sim6();
            break;
        case 3:
            if (!GhostRight(ghosts[1].x, ghosts[1].y)){
                blueLast = gamefield[ghosts[1].x][ghosts[1].y+1];
                gamefield[ghosts[1].x][ghosts[1].y+1] = 6;
                gamefield[ghosts[1].x][ghosts[1].y] = blueLast;
                ghosts[1].y += 1;
            }
            else sim6();
            break;
    }
}
function sim7(){
    let r = Math.floor(Math.random()*4);
    switch (r){
        case 0:
            if (!GhostDown(ghosts[2].x, ghosts[2].y)){
                pinkLast = gamefield[ghosts[2].x+1][ghosts[2].y];
                gamefield[ghosts[2].x+1][ghosts[2].y] = 7;
                gamefield[ghosts[2].x][ghosts[2].y] = pinkLast;
                ghosts[2].x += 1;
            }
            else sim7();
            break;
        case 1:
            if (!GhostLeft(ghosts[2].x, ghosts[2].y)){
                pinkLast = gamefield[ghosts[2].x][ghosts[2].y-1];
                gamefield[ghosts[2].x][ghosts[2].y-1] = 7;
                gamefield[ghosts[2].x][ghosts[2].y] = pinkLast;
                ghosts[2].y -= 1;
            }
            else sim7();
            break;
        case 2:
            if (!GhostUp(ghosts[2].x, ghosts[2].y)){
                pinkLast = gamefield[ghosts[2].x-1][ghosts[2].y];
                gamefield[ghosts[2].x-1][ghosts[2].y] = 7;
                gamefield[ghosts[2].x][ghosts[2].y] = pinkLast;
                ghosts[2].x -= 1;
            }
            else sim7();
            break;
        case 3:
            if (!GhostRight(ghosts[2].x, ghosts[2].y)){
                pinkLast = gamefield[ghosts[2].x][ghosts[2].y+1];
                gamefield[ghosts[2].x][ghosts[2].y+1] = 7;
                gamefield[ghosts[2].x][ghosts[2].y] = pinkLast;
                ghosts[2].y += 1;
            }
            else sim7();
            break;
    }
}
function sim8(){
    let r = Math.floor(Math.random()*4);
    switch (r){
        case 0:
            if (!GhostDown(ghosts[3].x, ghosts[3].y)){
                orangeLast = gamefield[ghosts[3].x+1][ghosts[3].y];
                gamefield[ghosts[3].x+1][ghosts[3].y] = 8;
                gamefield[ghosts[3].x][ghosts[3].y] = orangeLast;
                ghosts[3].x += 1;
            }
            else sim8();
            break;
        case 1:
            if (!GhostLeft(ghosts[3].x, ghosts[3].y)){
                orangeLast = gamefield[ghosts[3].x][ghosts[3].y-1];
                gamefield[ghosts[3].x][ghosts[3].y-1] = 8;
                gamefield[ghosts[3].x][ghosts[3].y] = orangeLast;
                ghosts[3].y -= 1;
            }
            else sim8();
            break;
        case 2:
            if (!GhostUp(ghosts[3].x, ghosts[3].y)){
                orangeLast = gamefield[ghosts[3].x-1][ghosts[3].y];
                gamefield[ghosts[3].x-1][ghosts[3].y] = 8;
                gamefield[ghosts[3].x][ghosts[3].y] = orangeLast;
                ghosts[3].x -= 1;
            }
            else sim8();
            break;
        case 3:
            if (!GhostRight(ghosts[3].x, ghosts[3].y)){
                orangeLast = gamefield[ghosts[3].x][ghosts[3].y+1];
                gamefield[ghosts[3].x][ghosts[3].y+1] = 8;
                gamefield[ghosts[3].x][ghosts[3].y] = orangeLast;
                ghosts[3].y += 1;
            }
            else sim8();
            break;
    }
}
function simGhost(ghost){
    switch (ghost){
        case 5:
            sim5();
            break;
        case 6:
            sim6();
            break;
        case 7:
            sim7();
            break;
        case 8:
            sim8();
            break;
    }
}
function reset(){
    lifes--;
    clearInterval(pacman_engine);
    clearInterval(ghost_engine);
    setTimeout(() => {
        GenTable();
    }, 1500);
}
function win(){
    for (let i = 0; i < gamefield.length; i++) {
        if (!gamefield[i].includes(2) && !gamefield[i].includes(3)){
            console.log('win');
        }  
    };
}
function placeGhost(ghost){
    if (gamefield[9][9]==0){
        gamefield[9][9]=ghost;
        return;
    }
    if (gamefield[9][10]==0){
        gamefield[9][10]=ghost;
        return;
    }
    if (gamefield[9][11]==0){
        gamefield[9][11]=ghost;
        return;
    }
}
function displayGame(){
    document.querySelector('#field').innerHTML="";
    let i = 0, g = 0;
    gamefield.forEach(e=>{
        let t = `<tr>`
        e.forEach(y=>{
            if (y==4) pcCoord = [i, g];
            t+=`<td class="${y==0?'void':y==1?'wall':y==2?'_dot':y==3?'_bigdot':'pacman'}">${y==3||y==2||y==4||y==5||y==6||y==7||y==8?`<div class="${y==2?'dot':y==3?'bigdot':y==4?'pc':y==5?'red':y==6?'blue':y==7?'pink':'orange'}"></div>`:''}</td>`;
            g++;
        });
        t+=`</tr>`
        document.querySelector('#field').innerHTML+=t;
        i++;
        g=0;
    })
    scoreLbl.innerText = score;
    livesLbl.innerText = lifes;
    timerLbl.innerText = time+'s';
}
window.onkeyup = (e)=>{
    dir = e.key=='ArrowLeft'||e.key=='A'?3:e.key=='ArrowUp'||e.key=='W'?2:e.key=='ArrowRight'||e.key=='D'?1:e.key=='ArrowDown'||e.key=='S'?0:-1;
}