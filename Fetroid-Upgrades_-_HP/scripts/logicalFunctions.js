function randint(min,max){
  return Math.floor((max-min+1)*Math.random() + min);
}

function circleCollision(s1, s2){
  var dx = Math.abs(s2.x - s1.x);
  var dy = Math.abs(s2.y - s1.y);

  var ds12 = Math.hypot(dx, dy);

  if(ds12 < s1.radius + s2.radius)
    return true;
  return false;
}

function pointcircleCollision(point, circle){
  var dx = Math.abs(circle.x - point.x);
  var dy = Math.abs(circle.y - point.y);

  var ds12 = Math.hypot(dx, dy);

  if(ds12 < circle.raio)
    return true;
  return false;
}

function pointRectCollision(point, square){
  if(point.x >= square.x && point.x <= square.x + square.width)
    if (point.y >= square.y && point.y <= square.y + square.height)
      return true;
  return false;
}

function circleRectCollision(circle, rect){
  var deltaX = circle.x - Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  var deltaY = circle.y - Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

  return (deltaX * deltaX + deltaY * deltaY) < (circle.radius * circle.radius);
}

function rectCollision(square1, square2){
  var xmin,xmax,ymin,ymax,wmin,hmin;

  if(square1.x <= square2.x){
    xmin = square1.x;
    xmax = square2.x;
    wmin = square1.width;
  } else {
    xmin = square2.x;
    xmax = square1.x
    wmin = square2.width;
  }

  if(square1.y <= square2.y){
    ymin = square1.y;
    ymax = square2.y;
    hmin = square1.height;
  } else {
    ymin = square2.y;
    ymax = square1.y;
    hmin = square2.height;
  }

  if(xmin + wmin > xmax && ymin + hmin > ymax){
    return true;
  }
  return false;
}

function lineLineCollision(p0, p1, p2, p3){ //substituir
  var s1, s2;
  s1 = {x: p1.x - p0.x, y: p1.y - p0.y};
  s2 = {x: p3.x - p2.x, y: p3.y - p2.y};

  var s10_x = p1.x - p0.x;
  var s10_y = p1.y - p0.y;
  var s32_x = p3.x - p2.x;
  var s32_y = p3.y - p2.y;

  var denom = s10_x * s32_y - s32_x * s10_y;

  if(denom == 0)
      return false;

  var denom_positive = denom > 0;

  var s02_x = p0.x - p2.x;
  var s02_y = p0.y - p2.y;

  var s_numer = s10_x * s02_y - s10_y * s02_x;

  if((s_numer < 0) == denom_positive)
      return false;

  var t_numer = s32_x * s02_y - s32_y * s02_x;

  if((t_numer < 0) == denom_positive)
      return false;

  if((s_numer > denom) == denom_positive || (t_numer > denom) == denom_positive)
      return false;

  var t = t_numer / denom;

  var p = {x: p0.x + (t * s10_x), y: p0.y + (t * s10_y)};
  return p;
}

function vetorUnit(p1, p2){
  var vetor = {x: p2.x - p1.x, y: p2.y - p1.y};
  if(vetor.x == 0 && vetor.y == 0)
    return vetor;
  var modVetor = Math.hypot(vetor.x, vetor.y);

  vetor.x = vetor.x / modVetor;
  vetor.y = vetor.y / modVetor;

  return vetor;
}

function pointPointAngle(p1, p2){
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;

  var theta = Math.atan2(dy, dx);
  //theta *= 180 / Math.PI;
  //return Math.round(theta);
  return theta;
}

function angleInterval(a1, a2, interval){
  if(Math.abs(a2 - a1) > Math.PI)
    return angleInterval(a1 -((a1/Math.abs(a1))*Math.PI), a2 -((a2/Math.abs(a2))*Math.PI), interval);

  var limEsq = a1 - interval/2;

  var limDir = a1 + interval/2;

  if(a2 > limEsq && a2 < limDir)
    return true;
  return false;
}

function rotateVector(vect, ang){
  //xcos + ysen      |      -xsin + ycos
  return {x: vect.x*Math.cos(ang) + vect.y*Math.sin(ang),
          y: -vect.x*Math.sin(ang) + vect.y*Math.cos(ang)};
}

function angleBetweenVectors(v,u){
  return Math.acos( (v.x*u.x + v.y*u.y) / (Math.hypot(v.x,v.y)*Math.hypot(u.x,u.y)) );
}
