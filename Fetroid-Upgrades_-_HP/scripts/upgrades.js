  class upgrade {
	  constructor(spawnI, spawnJ){
		  this.spawnI = spawnI;
		  this.spawnJ = spawnJ;
		  this.collected = false;
		  this.animationDone = false;

		  this.x = (this.spawnJ) * tile;
		  this.y = (this.spawnI) * tile;
		  this.contador = 0;

	  }

  }

  class upgradeVida extends upgrade{
	  constructor(spawnI, spawnJ){
		super(spawnI, spawnJ);

	  }

	  update(){
		  //FUNCIONALIDADE DO UPGRADE
		  if (p1.i == this.spawnI && p1.j == this.spawnJ && this.collected == false){
			p1.hpMax ++;
			p1.hp = p1.hpMax;
			this.collected = true;
		  }

		  //RETIRAR-SE DA LISTA DE UPGRADES UMA VEZ QUE FOI PEGO
		  if (this.collected == true && this.animationDone == true){
			  for(var i = 0; i < upgradeList.length; i++){
				 if(upgradeList[i].spawnI == this.spawnI && upgradeList[i].spawnJ == this.spawnJ){
					 upgradeList.splice(i, 1);

					 break;
				 }
			  }

		  }
	  }

	  draw(){
		  //NÃO COLETADO
		  if (this.collected == false){
			  ctx.fillStyle = "rgb(14, 14, 140)";
			  ctx.fillRect(this.x -offset.x, this.y -offset.y, tile, tile);
		  }

		  //ANIMAÇÃO DE COLETAGEM
		  else {
			  ctx.fillStyle = "rgb(14, 140," + (50 + 30*Math.sin(frames/5)) + ")";
			  ctx.fillRect(this.x -offset.x, this.y -offset.y, tile, tile);
			  this.contador++;
		  }

		  //BOOLEAN QUE VAI PERMITIR QUE O OBJETO SE DELETE DA LISTA
		  if(this.contador == 60)
			  this.animationDone = true;
	  }
  }
