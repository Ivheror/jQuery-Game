function collision(jqDiv1, jqDiv2) {
      var x1 = jqDiv1.offset().left;
      var y1 = jqDiv1.offset().top;
      var h1 = jqDiv1.outerHeight(true);
      var w1 = jqDiv1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = jqDiv2.offset().left;
      var y2 = jqDiv2.offset().top;
      var h2 = jqDiv2.outerHeight(true);
      var w2 = jqDiv2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;
        
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
}

$(document).ready(function(){
  $.noConflict();

      var timer = 100;
      var interval = setInterval(function() {
         if(timer!=0)
          timer--;
          $('.timer').text(timer);
          if (timer == 0) 
            {
              clearInterval(interval);
              timer=0;//faltaria añadir debajo de esta linea la perdida de vida del jugador adjuntando un mensaje que dijera que has perdido una vida
              muere();
              setTimeout(mensaje, 2000);
            }
      }, 1000);

      function muere(){
          $('#ob1').remove();
          $('#enemigo').remove();
          $('#capa').remove();
          $('#llave').remove();
          $('#contenedor').css("background-image","url('img/muerte.gif')");
      }

      function mensaje(){
        alert("Has perdio ,Pulsa f5 para repetir el nivel");
      }

      var direccion = "right";//Para el disparo 

      function aleatorio(inferior,superior){
      numPosibilidades = superior - inferior
      aleat = Math.random() * numPosibilidades
      aleat = Math.round(aleat)
      return parseInt(inferior) + aleat
      } 

      $('#ob1').css({
        'top': '400px',
        'left': '650px'
      });

      setInterval(moverEnemigo,3000);
      function moverEnemigo()
      {
        var arribaX=aleatorio(0,459);
        var izqX=aleatorio(0,782);
        $('#enemigo').animate({
          'top':arribaX, 
          'left':izqX
        },3000);

      }  

      //Para la asignacion de teclas presionadas y soltadas
      $(document).keydown(function(tecla){

          if (tecla.keyCode == 40) {
              $('#capa').animate({top: "+=10px"},10);

              $(document).keyup(function(tecla){
              if (tecla.keyCode == 40) {
                  $("#capa").stop(true,true);
                  $("#pj").attr('src', 'img/normal.gif');
              }          
          });
          }else if(tecla.keyCode == 38) {
              $('#capa').animate({top: "-=10px"},10);


          }else if(tecla.keyCode == 37){
              if ($('#pj').attr('src')=="img/normal.gif")  
              {
                $('#pj').attr('src', 'img/crash.gif');
                direccion = "left";
              }
              $('#capa').animate({left: "+=-10px"},10);
              $(document).keyup(function(tecla){
              if (tecla.keyCode == 37) {
                  $("#capa").stop(true,true);
                  $("#pj").attr('src', 'img/normal.gif');

              }
              });
          }
          else if(tecla.keyCode == 39){
              if ($('#pj').attr('src')=="img/normal.gif")  
              {
                $('#pj').attr('src', 'img/crashder.gif');
                direccion = "right";
              }
              $('#capa').animate({left: "+=10px"},10);
              $(document).keyup(function(tecla){
              if (tecla.keyCode == 39) {
                  $("#capa").stop(true,true);
                  $("#pj").attr('src', 'img/normal.gif');
                }
              });
          }
          else if(tecla.keyCode == 32)
            {
              $('#pj').attr('src', 'img/spintotal.gif');
              var audio = document.createElement("audio");//Para crear el sonido del giro cuando crash ataca
              audio.src = "spin.mp3";//le aañdo sonido al giro
              audio.play();//le hago play al audio

              disparar(direccion);

              setTimeout(function() 
              {
                $("#pj").attr('src', 'img/normal.gif').fadeIn(1500);
              },500);
           }   
      });  

      
});




function disparar(direccion)
{
  var manzana = $("<div>").addClass("manzana");
  $(manzana).css({left: $("#capa").offset().left, top: $("#capa").offset().top});
  $(manzana).data("direccion", direccion);
  $("body").append($(manzana));
} 

setInterval(detectarColision,5);


function detectarColision(){

  var bColision = collision($('#capa'),$('#pared2'));
  var bColision2= collision($('#capa'),$('#pared'));
  var bColision3= collision($('#capa'),$('#pared3'));
  var bColision4= collision($('#capa'),$('#pared4'));
  var bColisionObstaculo=collision($('#capa'),$('#ob1'));
  var bColisionEnemigo=collision($('#enemigo'),$('#pared'));
  var bColisionPjEnemigo=collision($('#capa'),$('#enemigo'));

  if( bColision > 0){
    $("#capa").stop(false,false);   
    $('#capa').animate({left: "+=-3px"},1);     
  }
  if (bColision2 > 0) 
  {
    $("#capa").stop(false,false);   
    $('#capa').animate({left: "+=3px"},1); 
  }
  if (bColision3 > 0) 
  {
    $("#capa").stop(false,false);   
    $('#capa').animate({top: "+=3px"},1); 
  }
  if (bColision4 > 0) 
  {
    $("#capa").stop(false,false);   
    $('#capa').animate({top: "+=-3px"},1); 
  }
  if (bColisionObstaculo > 0) 
  {
    $("#capa").stop(false,false);   
    $('#capa').animate({top: "+=3px"},1); 
  }
  if (bColisionEnemigo > 0)  
  {
    $("#enemigo").stop(false,false);   
    $('#enemigo').animate({left: "+=3px"},1); 
  }
  if (bColisionPjEnemigo > 0)  
  {
    $('#enemigo').animate({top: "0px",left:"0px"},1);
    var audio = document.createElement("audio");//Para crear el sonido del giro cuando crash ataca
              audio.src = "woah.mp3";//le aañdo sonido al giro
              audio.play();//le hago play al audio
    alert("Pierdes una vida");
    var vida=$('#vidas').find('p').text(); 

    if (vida=="0") 
    {
      muere();
    }
    var totalVida=parseInt(vida)-1;
    $('#vidas').find('p').text(totalVida);

    function muere(){
          $('#ob1').remove();
          $('#enemigo').remove();
          $('#capa').remove();
          $('#llave').remove();
          $('.manzana').css('display','none');
          $('#contenedor').css("background-image","url('img/muerte.gif')");
          exit();
      }
    
  }

 

  //`each manzana shooted control si pared >1
  $(".manzana").each(function()
  {
    if($('#enemigo')!= null)
    {
      if (collision($(this),$('#enemigo')) > 0) 
      {
        $("#enemigo").stop(true,true);
        var enemigoTotal=1;
        var contador=0;
        var total=$("#resultado").text();
        $('#enemigo').css("display", "none");
        $(this).remove();
        var resultado=parseInt(total)+25;
        $("#resultado").text(resultado);
        contador++;
         if (contador==1) 
          {
            var img=$('<img/>',{id:'llave',src:'img/key.gif',width:'100px',height:'150px'}).appendTo('#contenedor');
            $('#llave').css({position:'relative',top:'40%',left:'46%'});
            if ($("#llave").dblclick(function(){
            {
              $('#item').find('p').text('x 1'); 
              resultado=resultado+150;
              $("#resultado").text(resultado);
              $( "#dialog-message" ).dialog({
                modal: true,
                buttons: {
                  Avanzar: function() {
                    window.location.assign("Fase2.html");
                    $( this ).dialog( "close" );
                  },
                  Repetir:function(){
                    location.reload(true);
                    $( this ).dialog( "close" );
                  }
                }
              });

            }
            }));
          }
          /*console.log(contador);*/
      }
    }
    
    if (collision($(this),$('#pared2')) > 0 || collision($(this),$('#pared')) >0 )
    {
      $(this).remove();
    }
    else
    {
      if ($(this).data("direccion") == "right")
        $(this).css({left: "+=5px"});
      else
        $(this).css({left: "-=5px"});
    }
  });


}