class mob {

    constructor(spawnI, spawnJ){
      this.spawnI = spawnI;
      this.spawnJ = spawnJ;

      this.dmg = 2;

      this.x;
      this.y;
      this.dy;
    }

    deadUpdate(){
      this.dy += 0.5;
      this.y += this.dy;

      if(area.salaAtual.grid[Math.floor(this.y/tile) +1][Math.floor((this.x +this.width/2)/tile)] == 1 &&
      this.y +this.height > (Math.floor(this.y/tile) +1)*tile ){
        this.y = (Math.floor(this.y/tile) +1)*tile -this.height;
        this.dy = 0;
      }

    }
}

class morcego extends mob{
  constructor(spawnI, spawnJ, disX){
    super(spawnI, spawnJ);

    this.hp = 5;
    this.invul = 0;

    this.disX = disX;
    this.frames = 0;

    this.width = 30;
    this.height = 30;

    this.x = (spawnJ+1) * tile - tile/2 -this.width/2;
    this.y = (spawnI+1) * tile - tile/2 -this.height/2;
  }

  update(){
    this.frames++;

    //---------------------STARTING POINT--------------------
    this.x = (this.spawnJ+1) * tile - tile/2 -this.width/2  + ((1+2*this.disX)*tile-this.width)/2  * Math.sin(this.frames/40);
    this.y = (this.spawnI+1) * tile - tile/2 -this.height/2 + (10 * Math.sin(this.frames/5));
  }

  draw(){
    if(this.invul > 0)
      this.invul--;

    if(this.invul%2 == 0){
      ctx.fillStyle = "#F00";
      ctx.fillRect(this.x -offset.x+5, this.y +this.height -offset.y, 20, 10 - (5 * Math.sin(this.frames/5)));
      ctx.fillStyle = "#F0F";
      ctx.fillRect(this.x -offset.x, this.y -offset.y, this.width, this.height);
    }
  }

  onHit(){
    this.hp--;
    this.invul = 20;
  }
}

class crazyJ extends mob{
  constructor(spawnI, spawnJ, disX){
    super(spawnI, spawnJ);

    this.hp = 5;
    this.invul = 0;

    this.disX = disX;
    this.frames = 0;

    this.width = 45;
    this.height = 45;

    this.x = (this.spawnJ) * tile;
    this.y = (this.spawnI + 1) * tile - this.height;

    this.vel = 3;

    this.state = 0; // 0 - Direita  || 1 - Esquerda
  }

  update(){
    this.frames++;
    if(this.invul > 0)
      this.invul--;

      //  Movimento
      if (this.x >= (this.spawnJ + 3) * tile){
        this.x = (this.spawnJ + 3) * tile;
        this.state = 1;
      }
      else if (this.x < this.spawnJ * tile){
        this.x = this.spawnJ * tile;
        this.state = 0;
      }

      if (this.state == 0)
        this.x += this.vel;
      else
        this.x -= this.vel;

  }

  draw(){
    ctx.fillStyle = "rgb(140, 14, 14)";
    if(this.invul%2 == 0){
      ctx.fillRect(this.x -offset.x, this.y -offset.y, this.width, this.height);
    }


    // OLHO
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.beginPath();
    ctx.arc(this.x + this.width/2 - offset.x, this.y +this.height/2 -offset.y, 12, 0, 2*Math.PI);
    ctx.fill();

    //PUPILA
    ctx.fillStyle = "rgb(140, 14, 14)";
    ctx.beginPath();
    ctx.arc(this.x + this.width/2 + 4*Math.sin(frames) - offset.x, this.y +this.height/2 - 5 -offset.y, 3, 0, 2*Math.PI);
    ctx.fill();



  }

  onHit(){
    this.hp--;
    this.invul = 20;
  }
}

class girador extends mob{
  constructor(spawnI, spawnJ, disX, disY){
    super(spawnI, spawnJ);

    this.hp = 2;
    this.invul = 0;

    this.vel = 4;

    this.disX = disX;
    this.disY = disY;
    this.state = 0;

    this.width = 40;
    this.height = 40;

    this.x = (spawnJ+1) * tile -this.width;
    this.y = (spawnI+1) * tile -this.height;
  }

  update(){
    if(this.invul > 0)
      this.invul--;

    switch(this.state){
      case 0: //ANDANDO PRA DIREITA
        this.x += this.vel;
        if(this.x > (this.spawnJ+this.disX+1) * tile){
          this.x = (this.spawnJ+this.disX+1) * tile;
          this.state = 1;
        }
        break;
      case 1: //ANDANDO PRA BAIXO
        this.y += this.vel;
        if(this.y > (this.spawnI+this.disY+1) * tile){
          this.y = (this.spawnI+this.disY+1) * tile;
          this.state = 2;
        }
        break;
      case 2: //ANDANDO PRA ESQUERDA
        this.x -= this.vel;
        if(this.x < (this.spawnJ+1) * tile -this.width){
          this.x = (this.spawnJ+1) * tile -this.width;
          this.state = 3;
        }
        break;
      case 3: //ANDANDO PRA CIMA
        this.y -= this.vel;
        if(this.y < (this.spawnI+1) * tile -this.height){
          this.y = (this.spawnI+1) * tile -this.height;
          this.state = 0;
        }
        break;
    }
  }

  draw(){
    ctx.fillStyle = "#2e67b6";
    if(this.invul%2 == 0){
      ctx.fillRect(this.x -offset.x, this.y -offset.y, this.width, this.height);

      switch(this.state){
        case 0:
          ctx.beginPath();
          ctx.strokeStyle = 'hsl(210, 64%, 28%)'
          ctx.lineWidth = 5;
          ctx.moveTo(this.x - offset.x, this.y + this.height/2 - offset.y);
          ctx.lineTo(this.x + this.width - offset.x, this.y + this.height/2 - offset.y);
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(this.x + this.width - offset.x, this.y + this.height/2 - offset.y, 12, Math.PI / 2, 3*Math.PI/2);
          ctx.fill();

          ctx.fillStyle = '#b60000'
          ctx.beginPath();
          ctx.arc(this.x + this.width - offset.x, this.y + this.height/2 - offset.y, 6, Math.PI / 2, 3*Math.PI/2);
          ctx.fill();

          break;
        case 1:
        ctx.beginPath();
          ctx.strokeStyle = 'hsl(210, 64%, 28%)'
          ctx.lineWidth = 5;
          ctx.moveTo(this.x + this.width/2 - offset.x, this.y - offset.y);
          ctx.lineTo(this.x + this.width/2 - offset.x, this.y + this.height - offset.y);
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(this.x + this.width/2 - offset.x, this.y + this.height - offset.y, 12, 0, Math.PI, true);
          ctx.fill();

          ctx.fillStyle = '#b60000'
          ctx.beginPath();
          ctx.arc(this.x + this.width/2 - offset.x, this.y + this.height - offset.y, 6, 0, Math.PI, true);
          ctx.fill();
          break;
        case 2:
        ctx.beginPath();
          ctx.strokeStyle = 'hsl(210, 64%, 28%)'
          ctx.lineWidth = 5;
          ctx.moveTo(this.x - offset.x, this.y + this.height/2 - offset.y);
          ctx.lineTo(this.x + this.width - offset.x, this.y + this.height/2 - offset.y);
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(this.x - offset.x, this.y + this.height/2 - offset.y, 12, Math.PI / 2, 3*Math.PI/2, true);
          ctx.fill();

          ctx.fillStyle = '#b60000'
          ctx.beginPath();
          ctx.arc(this.x - offset.x, this.y + this.height/2 - offset.y, 6, Math.PI / 2, 3*Math.PI/2, true);
          ctx.fill();
          break;
        case 3:
        ctx.beginPath();
          ctx.strokeStyle = 'hsl(210, 64%, 28%)'
          ctx.lineWidth = 5;
          ctx.moveTo(this.x + this.width/2 - offset.x, this.y - offset.y);
          ctx.lineTo(this.x + this.width/2 - offset.x, this.y + this.height - offset.y);
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(this.x + this.width/2 - offset.x, this.y - offset.y, 12, 0, Math.PI);
          ctx.fill();

          ctx.fillStyle = '#b60000'
          ctx.beginPath();
          ctx.arc(this.x + this.width/2 - offset.x, this.y - offset.y, 6, 0, Math.PI);
          ctx.fill();
          break;
      }
    }

  }

  onHit(){
    this.hp--;
    this.invul = 20;
  }
}

class thwomp extends mob{
  constructor(spawnI, spawnJ, disY){
    super(spawnI, spawnJ);

    this.hp = 5;
    this.invul = 0;

    this.acc = 1;
    this.vel = 0;

    this.restTime = 50;
    this.shakeTime = 30;
    this.rest = 0;

    this.disY = disY;
    this.state = 0;

    this.width = 60;
    this.height = 60;

    this.x = (spawnJ) * tile +tile/2 -this.width/2;
    this.y = (spawnI) * tile;
  }

  update(){
    if(this.invul > 0)
      this.invul--;

    switch(this.state){
      case 0: //GRUDADO NO TETO (SE REST FOR MAIOR QUE 0 ELE TA DESCANSANDO)
        if(this.rest > 0)
          this.rest--;
        if(this.rest == 0){
          if(((p1.x +p1.width/2 > (this.spawnJ)  * tile -tile/2 && p1.j <= this.spawnJ)
          || (p1.x -p1.width/2 < (this.spawnJ+1) * tile +tile/2 && p1.j >= this.spawnJ))
          && (p1.i >= this.spawnI && p1.i <= this.spawnI +this.disY +1)){
            this.state = 1;
            this.vel = 0;
            this.rest = this.shakeTime;
          }
        }
        break;
      case 1: //TA CAINDO (SE REST FOR MAIOR QUE 0 ELE TA TREMENDO NO TETO AINDA)
        if(this.rest > 0)
          this.rest--;
        if(this.rest == 0){
          this.vel += this.acc;
          this.y += this.vel;
          if(this.y > (this.spawnI +this.disY +1)*tile -this.height){
            this.y = (this.spawnI +this.disY +1)*tile -this.height;
            this.vel = 0;
            this.state = 2;
            this.rest = this.restTime;
          }
        }
        break;
      case 2: //TA NO CHAO DESCANSANDO
        this.rest--;
        if(this.rest == 0){
          this.state = 3;
          this.vel = -2;
        }
        break;
      case 3: //TA SUBINDO
        this.y += this.vel;
        if(this.y < (this.spawnI)*tile){
          this.y = (this.spawnI)*tile;
          this.rest = this.restTime;
          this.state = 0;
        }
        break;
    }
  }

  draw(){
    ctx.fillStyle = "#425166";
    if(this.state == 1)
      ctx.fillStyle = "rgb(140, 14, 14)";

    if(this.invul%2 == 0){
      var shake = 0;
      if(this.state == 1 && this.rest > 0){
        if(this.rest% 4 == 1)
          shake = -5;
        else if(this.rest% 4 == 1)
          shake =  5;
      }

      if(this.state == 2 || this.state == 3 || (this.state == 0 && this.rest > 0)){
        ctx.fillRect(this.x -offset.x, this.y -offset.y, this.width, this.height);

        ctx.fillStyle = "#000";
        //ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 -offset.x, this.y +this.height/2 -offset.y, 15, 0, 2*Math.PI, false);
        ctx.fill();

        ctx.fillStyle = "rgb(140, 14, 14)";
        ctx.fillRect(this.x +this.width/2 -offset.x -7.5, this.y +this.height/2 -offset.y -3, 15, 6);
      }
      else{
        ctx.fillRect(this.x -offset.x +shake, this.y -offset.y, this.width, this.height);

        ctx.fillStyle = "#000";
        //ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 -offset.x +shake, this.y +this.height/2 -offset.y, 15, 0, 2*Math.PI, false);
        ctx.fill();

        var vetor = vetorUnit({x: this.x + this.width/2, y: this.y +this.height/2}, p1);
        ctx.fillStyle = "rgb(140, 14, 14)";
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 +10*vetor.x -offset.x +shake, this.y +this.height/2 +10*vetor.y -offset.y, 5, 0, 2*Math.PI, false);
        ctx.fill();
      }

    }

    // ctx.fillStyle = "#660";
    // ctx.globalAlpha = 1/10;
    // ctx.fillRect(this.spawnJ*tile -offset.x -tile/2, this.spawnI*tile -offset.y, tile +tile , (this.spawnI +this.disY +1)*tile);
    // ctx.globalAlpha = 1;
  }

  onHit(){
    this.hp--;
    this.invul = 20;
  }

}

class fentesma extends mob{
  constructor(spawnI, spawnJ){
    super(spawnI, spawnJ);

    this.hp = 5;
    this.invul = 0;

    this.disX = 2;
    this.disY = 3;

    this.frames = 0;

    this.width = 40;
    this.height = 40;

    this.x = (this.spawnJ) * tile +tile/2 -this.width/2;
    this.y = (this.spawnI) * tile +tile/2 -this.height/2;
  }

  update(){
    this.frames++;
    if(this.invul > 0)
      this.invul--;

    var vvv;
    if((p1.i >= this.spawnI && p1.i < this.spawnI+4) && (p1.j > this.spawnJ-5 && p1.j < this.spawnJ+5)){
      vvv = vetorUnit({x:this.x + this.width/2, y: this.y +this.height/2}, p1);
      if(this.frames %100 == 0)
        enemyBullets.push({x: this.x +this.width/2, y: this.y +this.height/2, radius: 10, dx: vvv.x*3, dy: vvv.y*3});
    }
    else{
      vvv = vetorUnit({x:this.x + this.width/2, y: this.y +this.height/2},
        {x: (this.spawnJ) * tile +tile/2 -this.width/2, y: (this.spawnI) * tile +tile/2 -this.height/2});
    }

    this.x += 1*vvv.x;
    this.y += 1*vvv.y;

    if(this.x +this.width > (this.spawnJ+2)*tile)
      this.x = (this.spawnJ+2)*tile -this.width;
    else if(this.x < (this.spawnJ-1)*tile)
      this.x = (this.spawnJ-1)*tile;

    if(this.y +this.height> (this.spawnI+2)*tile)
      this.y = (this.spawnI+2)*tile -this.height;
    else if(this.y < (this.spawnI-1)*tile)
      this.y = (this.spawnI+2)*tile;
  }

  draw(){
    ctx.fillStyle = "#f278f2";
    if(this.invul%2 == 0){
      ctx.fillRect(this.x -offset.x, this.y -offset.y, this.width, this.height);
    }
  }

  onHit(){
    this.hp--;
    this.invul = 20;
  }
}

class fentesma2 extends mob{
  constructor(spawnI, spawnJ, disX, disY){
    super(spawnI, spawnJ);

    this.hp = 5;
    this.invul = 0;

    this.disX = disX;
    this.disY = disY;

    this.frames = 0;

    this.width = 40;
    this.height = 40;

    this.x = (this.spawnJ) * tile +tile/2 -this.width/2;
    this.y = (this.spawnI) * tile +tile/2 -this.height/2;
  }

  update(){
    this.frames++;
    if(this.invul > 0)
      this.invul--;

    if(rectCollision({x: p1.x -p1.width/2, y: p1.y - p1.height/2, width: p1.width, height: p1.height},
    {x: (this.spawnJ-this.disX) * tile, y: (this.spawnI-this.disY) * tile, width: (2*this.disX +1)*tile, height: (2*this.disY +1)*tile})){

      var vvv = vetorUnit({x:this.x + this.width/2, y: this.y +this.height/2}, p1);

      this.x += 2*vvv.x;
      this.y += 2*vvv.y;
    }
    // else{
    //   this.x -= (this.x -((this.spawnJ) * tile +tile/2 -this.width/2))/10;
    //   this.y -= (this.y -((this.spawnI) * tile +tile/2 -this.height/2))/10;
    // }

  }

  draw(){
    ctx.fillStyle = "#f278f2";
    if(this.invul%2 == 0){
      ctx.globalAlpha = 0.6 +0.5*Math.sin(this.frames/10);
      ctx.fillRect(this.x -offset.x, this.y -offset.y +5*Math.cos(this.frames/10), this.width, this.height);
      ctx.globalAlpha = 1;
    }

    ctx.globalAlpha = 1/100;
    ctx.fillRect((this.spawnJ-this.disX) * tile -offset.x, (this.spawnI-this.disY) * tile -offset.y, (2*this.disX +1)*tile, (2*this.disY +1)*tile);
    ctx.globalAlpha = 1;

  }

  onHit(){
    this.hp--;
    this.invul = 20;
  }
}

class pulador extends mob{
  constructor(spawnI, spawnJ, disX){
    super(spawnI, spawnJ);

    this.hp = 5;
    this.invul = 0;

    this.disX = disX;
    this.frames = 0;

    this.width = 45;
    this.height = 45;

    this.x = (this.spawnJ) * tile;
    this.y = (this.spawnI + 1) * tile - this.height;

    this.velX = 2;
    this.velY = 0;
    this.accY = 0.2;

    this.state = 0;
    this.facingRight = true;
    this.rest = 0;
    this.aggroRest = 30;
  }

  update(){
    this.frames++;
    if(this.invul > 0)
      this.invul--;

    switch(this.state){
      case 0: //ANDANDO
        if (this.facingRight)
          this.x += this.velX;
        else
          this.x -= this.velX;

        //  Movimento
        if (this.x > (this.spawnJ +this.disX) * tile -this.width){
          this.x = (this.spawnJ +this.disX) * tile -this.width;
          this.facingRight = false;
        }
        else if (this.x < this.spawnJ * tile){
          this.x = this.spawnJ * tile;
          this.facingRight = true;
        }

        if(this.spawnI == p1.i){
          if(p1.x +p1.width/2 > this.x -tile*2 && p1.x < this.x +this.width/2 && !this.facingRight){
            this.state = 1;
            this.rest = this.aggroRest;
            this.facingRight = false;
          }
          else if(p1.x -p1.width/2 < this.x +this.width +tile*2 && p1.x >= this.x +this.width/2 && this.facingRight){
            this.state = 1;
            this.rest = this.aggroRest;
            this.facingRight = true;
          }
        }

        break;
      case 1: //AGGRADO
        this.rest--;
        if(this.rest == 0){
          this.velY = -5;
          this.state = 2;
        }
        break;
      case 2: //PULOU
        if(this.facingRight){
          this.velX = 5;
        }
        else{
          this.velX = -5;
        }

        this.x += this.velX;

        this.velY += this.accY;
        this.y += this.velY;

        if(this.y +this.height > (this.spawnI+1)*tile){
          this.y = (this.spawnI+1)*tile -this.height;
          this.velY = 0;
          this.velX = 2;

          if(this.x +this.width < (this.spawnJ +this.disX) * tile && this.x > this.spawnJ * tile){
            this.state = 0;
          }
          else{
            this.facingRight = !this.facingRight;
            this.state = 3;
          }
        }

        break;
      case 3: //VOLTOU
        if(this.facingRight){
          this.x += this.velX;
          if(this.x > (this.spawnJ) * tile){
            this.x = (this.spawnJ) * tile;
            this.state = 0;
          }
        }
        else{
          this.x -= this.velX;
          if(this.x +this.width < (this.spawnJ +this.disX) * tile){
            this.x = (this.spawnJ +this.disX) * tile -this.width;
            this.state = 0;
          }
        }
        break;
    }

  }

  draw(){
    ctx.fillStyle = "rgb(140, 14, 14)";
    if(this.state == 0)
      ctx.fillStyle = "rgb(14, 140, 14)";
    else if(this.state == 3)
      ctx.fillStyle = "rgb(14, 14, 140)";

    if(this.invul%2 == 0){

      if(this.rest > 0){
        var shake = 0;
        if(this.rest % 3 == 1)
          shake = -5;
        else if(this.rest % 3 == 2)
          shake =  5;

        ctx.fillRect(this.x -offset.x +shake, this.y -offset.y, this.width, this.height);
        ctx.fillStyle = "#000";
        if(this.facingRight){
          ctx.fillRect(this.x +this.width -offset.x +shake, this.y -offset.y +this.height/4, -this.width/2, this.height/2);
        }
        else{
          ctx.fillRect(this.x -offset.x +shake, this.y -offset.y +this.height/4, this.width/2, this.height/2);
        }
      }
      else{
        ctx.fillRect(this.x -offset.x, this.y -offset.y, this.width, this.height);
        ctx.fillStyle = "#000";
        if(this.facingRight){
          ctx.fillRect(this.x +this.width -offset.x, this.y -offset.y +this.height/4, -this.width/2, this.height/2);
        }
        else{
          ctx.fillRect(this.x -offset.x, this.y -offset.y +this.height/4, this.width/2, this.height/2);
        }
      }

    }
  }

  onHit(){
    this.hp--;
    this.invul = 20;
  }
}
