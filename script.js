/* browser:true, onevar:true, eqeqeq:true, curly:true, maxlen:80 */

(function () {

   var body          = document.querySelector('body'),
      depth          = document.querySelector('#depth'),
      color          = document.querySelector('#color'),
      redraw         = document.querySelector('#redraw'),
      reset          = document.querySelector('#reset'),
      canvas         = document.createElement('canvas'),
      ctx            = canvas.getContext('2d'),
      middle         = Math.floor(220 + window.innerWidth / 2),
      maxGenerations = parseInt(localStorage.getItem('depth'), 10),
      colorDefault   = parseInt(localStorage.getItem('color'), 10),
      generation     = 0,
      scale          = 0;


   /* Defaults */
   depth.value = isNaN(maxGenerations) ? 10 : maxGenerations;
   color.value = isNaN(colorDefault) ? 280 : colorDefault;

   /* Redraw button listener */
   redraw.addEventListener('click', function (ev) {
      ev.preventDefault();

      var depthValue = depth.value,
         colorValue  = color.value;

      if (depthValue > 14 || depthValue <= 0) {
         return smoke.alert("Sorry, invalid depth. Keep it between 1 and 14");
      } else if (colorValue < 100 || colorValue > 360) {
         return smoke.alert("Sorry, invalid color. Keep it between 100 and 260");
      } else {
         localStorage.setItem('depth', depth.value);
         localStorage.setItem('color', color.value);

         location.reload();
      }
   }, false);

   /* Reset button listener */
   reset.addEventListener('click', function (ev) {
      ev.preventDefault();

      localStorage.setItem('depth', 14);
      localStorage.setItem('color', 280);

      location.reload();
   }, false);


   body.appendChild(canvas);
   canvas.width   = window.innerWidth -25;
   canvas.height  = window.innerHeight -5;
   ctx.translate(middle, window.innerHeight -75);

   /* draw the first stem */
   init(-Math.PI/2);

   function init (angle) {
      generation++;

      ctx.save();

      ctx.strokeStyle = "hsl("+ (colorDefault - generation * 10) +", 100%, 50%)";
      if (generation > maxGenerations) {
         ctx.strokeStyle = "white";
      }

      ctx.lineWidth = 6;
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(80, 0);
      ctx.stroke();
      ctx.translate(80, 0);
      scale = randomRange(0.75, 1);
      ctx.scale(scale, scale);

      /* branch out twice */
      if (generation < maxGenerations) {
         init(randomRange(0, Math.PI/4));
         init(randomRange(-Math.PI/4, 0));
      }

      /* blooms */
      if (generation === maxGenerations) {
         ctx.fillStyle = "white";
         ctx.beginPath();
         ctx.arc(0, 0, 20, 0, Math.PI * 2, true);
         ctx.fill();
      }

      ctx.restore();
      generation--;
   }

   function randomRange(min,max){
      return Math.random()*(max-min) + min;
   }

}) ();
