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
      $("#resultado").text('850');


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
          $('#enemigo2').remove();
          $('#enemigo3').remove();
          $('#enemigo4').remove();
          $('#enemigo5').remove();
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
        },300);

        var arribaX2=aleatorio(0,459);
        var izqX2=aleatorio(0,782);
        $('#enemigo2').animate({
          'top':arribaX2, 
          'left':izqX2
        },300);

        var arribaX3=aleatorio(0,459);
        var izqX3=aleatorio(0,782);
        $('#enemigo3').animate({
          'top':arribaX3, 
          'left':izqX3
        },300);

        var arribaX4=aleatorio(0,459);
        var izqX4=aleatorio(0,782);
        $('#enemigo4').animate({
          'top':arribaX4, 
          'left':izqX4
        },300);

        var arribaX5=aleatorio(0,459);
        var izqX5=aleatorio(0,782);
        $('#enemigo5').animate({
          'top':arribaX5, 
          'left':izqX5
        },300);

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
  var bColisionPjEnemigo2=collision($('#capa'),$('#enemigo2'));
  var bColisionPjEnemigo3=collision($('#capa'),$('#enemigo3'));
  var bColisionPjEnemigo4=collision($('#capa'),$('#enemigo4'));
  var bColisionPjEnemigo5=collision($('#capa'),$('#enemigo5'));


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
  if (bColisionPjEnemigo > 0 || bColisionPjEnemigo2>0 
    || bColisionPjEnemigo3>0 || bColisionPjEnemigo4>0 || bColisionPjEnemigo5>0)  
  {
    $("#enemigo").stop(true,true); //para parar la cola y que no me quite dos vidas
    $("#enemigo2").stop(true,true); 
    $("#enemigo3").stop(true,true); 
    $("#enemigo4").stop(true,true); 
    $("#enemigo5").stop(true,true); 

    $('#enemigo').animate({top: "0px",left:"0px"},1);
    $('#enemigo2').animate({top: "0px",left:"800px"},1);//para no aparecer en el mismo sitio que el malo1
    $('#enemigo3').animate({top: "250px",left:"800px"},1);//para no aparecer en el mismo sitio que el malo1
    $('#enemigo4').animate({top: "400px",left:"800px"},1);//para no aparecer en el mismo sitio que el malo1
    $('#enemigo5').animate({top: "200px",left:"500px"},1);//para no aparecer en el mismo sitio que el malo1
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
          $('#enemigo2').remove();
          $('#enemigo3').remove();
          $('#enemigo4').remove();
          $('#enemigo5').remove();
          $('#capa').remove();
          $('#llave').remove();
          $('.manzana').css('display','none');
          $('#contenedor').css("background-image","url('img/muerte.gif')");
      }
    
  }

 

  //`each manzana shooted control si pared >1
  $(".manzana").each(function()
  {
    if($('#enemigo')!= null)
    {
      if (collision($(this),$('#enemigo')) > 0 || collision($(this),$('#enemigo2')) > 0 ||
       collision($(this),$('#enemigo3')) > 0 || collision($(this),$('#enemigo4')) > 0 || collision($(this),$('#enemigo5')) > 0) 
      {
        var total=$("#resultado").text();
        if (collision($(this),$('#enemigo'))>0)
        {
          $('#enemigo').css("display", "none");
          $(this).remove();
          var resultado=parseInt(total)+25;
          $("#resultado").text(resultado);
          //contador++;
        }
        if (collision($(this),$('#enemigo2'))>0) 
        {
          $('#enemigo2').css("display", "none");
          $(this).remove();
          var resultado=parseInt(total)+25;
          $("#resultado").text(resultado);
          //contador++;
        }
        if (collision($(this),$('#enemigo3'))>0) 
        {
          $('#enemigo3').css("display", "none");
          $(this).remove();
          var resultado=parseInt(total)+25;
          $("#resultado").text(resultado);
        }
        if (collision($(this),$('#enemigo4'))>0) 
        {
          $('#enemigo4').css("display", "none");
          $(this).remove();
          var resultado=parseInt(total)+25;
          $("#resultado").text(resultado);
        }
        if (collision($(this),$('#enemigo5'))>0) 
        {
          $('#enemigo5').css("display", "none");
          $(this).remove();
          var resultado=parseInt(total)+25;
          $("#resultado").text(resultado);
        }


        var esVisible1=$("#enemigo").is(":visible");
        var esVisible2=$("#enemigo2").is(":visible");
        var esVisible3=$("#enemigo3").is(":visible");
        var esVisible4=$("#enemigo4").is(":visible");
        var esVisible5=$("#enemigo5").is(":visible");

        if (esVisible1==false && esVisible2== false && esVisible3== false  && esVisible4== false && esVisible5== false) 
        {
          var img=$('<img/>',{id:'llave',src:'img/key.gif',width:'100px',height:'150px'}).appendTo('#contenedor');
            $('#llave').css({position:'relative',top:'40%',left:'46%'});
            if ($("#llave").dblclick(function(){
            {
              $('#item').find('p').text('1'); 
              resultado=resultado+150;
              $("#resultado").text(resultado);
              $( "#dialog-message" ).dialog({
                modal: true,
                buttons: {
                  Siguiente: function() {
                    window.location.assign("Creditos.html");
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