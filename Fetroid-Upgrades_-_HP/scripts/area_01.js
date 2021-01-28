function area_01(){

  this.salaAtual;

  this.mudarSala = function(sala){
    switch(sala){
      case 1:
        this.salaAtual = new sala_01();
        break;
      case 2:
        this.salaAtual = new sala_02();
        break;
      case 3:
        this.salaAtual = new sala_03();
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
    }

    gI = this.salaAtual.grid.length;
    gJ = this.salaAtual.grid[0].length;

    mapWidth = gJ * tile;
    mapHeight = gI * tile;

    mobList = [];
    this.salaAtual.fillMobList();
	this.salaAtual.fillUpgradeList();

  }

  this.draw = function(){
    //GRELHA DOS QUADRADO-------------------------------------------------------
    ctx.strokeStyle = "#000";
    ctx.globalAlpha = 1/5;
    ctx.lineWidth = 2;
    for(var i = 0; i < gI+1; ++i){
      ctx.beginPath();
      ctx.moveTo(0 -offset.x, i*tile -offset.y);
      ctx.lineTo(mapWidth -offset.x, i*tile -offset.y);
      ctx.stroke();
    }

    for(var j = 0; j < gJ+1; ++j){
      ctx.beginPath();
      ctx.moveTo(j*tile -offset.x, 0 -offset.y);
      ctx.lineTo(j*tile -offset.x, mapHeight -offset.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    //GRELHA DOS QUADRADO-------------------------------------------------------

    // QUADRADOS
    // ctx.fillStyle = 'rgb(124, 0, 59)';
    ctx.fillStyle = 'hsl(341, 100%,' + (23 + 3*Math.sin(frames/60)) + '%)';

    for(var i = 0; i < gI; i++){
      for(var j = 0; j < gJ; j++){

        if(this.salaAtual.grid[i][j] == 1){
          ctx.fillRect(j * tile -offset.x, i * tile -offset.y, tile, tile);
        }

      }
    }

  }

}//CLASSE

function sala_01(){
        this.grid =
              [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,0,thwomp,0,0,0,0,0,0,0,thwomp,0,0,0,0,0,0,1,1,1,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
              [1,0,0,0,0,0,0,0,crazyJ,0,0,0,0,0,0,0,0,1,1,1,1],
              [1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1],
              [1,0,0,0,1,1,0,0,0,1,1,0,1,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,{sala: 2, playerI: 3, playerJ: 3},1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

        this.fillMobList = function(){
          mobList.push(new thwomp(1, 2, 2));
          mobList.push(new crazyJ(3, 8, 2));
          mobList.push(new girador(6, 3, 2, 1));
          mobList.push(new pulador(8,16, 2));
        }

        this.fillUpgradeList =  function(){
      	  upgradeList.push(new upgradeVida(9, 10));
      	  upgradeList.push(new upgradeVida(9, 12));
      	  upgradeList.push(new upgradeVida(9, 8));
      	  upgradeList.push(new upgradeVida(9, 6));
        }
}

function sala_02(){
  this.grid = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,1,0,0,1,1,0,1,1,0,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],

  this.fillMobList = function(){

  }

    this.fillUpgradeList =  function(){
	  upgradeList.push(new upgradeVida(9, 10));
	  upgradeList.push(new upgradeVida(9, 12));
	  upgradeList.push(new upgradeVida(9, 8));
	  upgradeList.push(new upgradeVida(9, 6));
  }

}

function sala_03(){
  this.grid = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,1,1,0,0,1,1,0,1,1,0,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],

  this.fillMobList = function(){

  }

    this.fillUpgradeList =  function(){
	  upgradeList.push(new upgradeVida(10, 10));
  }

  this.checkTeleport = function(){

  }

}
