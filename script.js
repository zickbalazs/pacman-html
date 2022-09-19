//0 - empty, 1 - wall, 2 - dot, 3 - bigdot, 4 - pacman, 5 - red, 6 - blue, 7 - pink, 8 - orange
let gamefield,
    dir,
    pcCoord = [],
    pacman_engine,
    timer,
    score = 0,
    MJEGAMODE
    energizerTime = 5000,
    lifes = 3,
    time = 0,
    canCommitMurder = false;
    scoreLbl = document.querySelector('#score'),
    livesLbl = document.querySelector('#life'),
    timerLbl = document.querySelector('#time');
GenTable();
function GenTable(){
    pcCoord[0] = 17;
    pcCoord[1] = 10;
    dir=-1;
    timer = setInterval(() => {
        time++;
    }, 1000);
    gamefield = 
    [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
        [0, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
        [0, 1, 3, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 3, 1, 0],
        [0, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 0],
        [0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0],
        [0, 1, 2, 2, 2, 1, 1, 0, 0, 0, 5, 0, 0, 0, 1, 1, 2, 2, 2, 1, 0],
        [1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1],
        [0, 0, 0, 0, 3, 2, 2, 0, 1, 6, 7, 8, 1, 0, 2, 2, 3, 0, 0, 0, 0],
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
        [0, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    ];
    pacman_engine = setInterval(() => {
       simMove(dir) 
    }, 250);
}

function simMove(pcDir){
    switch (pcDir){
        case 0:
            if (gamefield[pcCoord[0]+1][pcCoord[1]]==5){
                console.log('GHOST HAS INVADED BÜTT')
                lifes--;
                clearInterval(pacman_engine)
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
            if (gamefield[pcCoord[0]][pcCoord[1]+1]!=1)
            {
                if (gamefield[pcCoord[0]][pcCoord[1]+1]==5){
                    console.log('GHOST HAS INVADED BÜTT')
                    lifes--;
                    clearInterval(pacman_engine)
                    setTimeout(() => {
                        GenTable();
                    }, 1000);
                }
                else{
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
                }
            break;
        case 2:
            if (gamefield[pcCoord[0]-1][pcCoord[1]]!=1)
            {
                if (gamefield[pcCoord[0]-1][pcCoord[1]]==5){
                    console.log('GHOST HAS INVADED BÜTT')
                    lifes--;
                    clearInterval(pacman_engine)
                }
                else{
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
            }
            break;
        case 3:
            if (gamefield[pcCoord[0]][pcCoord[1]-1]!=1)
            {
                if (gamefield[pcCoord[0]][pcCoord[1]-1]==5){
                    console.log('GHOST HAS INVADED BÜTT')
                    lifes--;
                    clearInterval(pacman_engine)
                }
                else{
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
                }
            break;
        
    }
    displayGame();
    if (score>=1940){
        win();
    }
}
function win(){
    for (let i = 0; i < gamefield.length; i++) {
        if (!gamefield[i].includes(2) && !gamefield[i].includes(3)){
            console.log('win');
        }  
    };
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