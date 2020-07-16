/* global $ */
(function(){
    'use strict';
    
    let timechange=0;
    let timeUp =false;
    let maxzIndex =0;

    function dragging(){
    let dragging;
    let offset;
    
        
        $(document).on('mousedown','.pic',e=>{
            console.log('down',e);
           
            dragging = $(e.target);
            offset={ y: e.offsetY, x: e.offsetX};
            dragging.css('z-index', ++maxzIndex);
           
            e.preventDefault();
        })
        
        .mousemove(e =>{
            if(!timeUp){
                if(dragging){
                    dragging.css({top: e.pageY-offset.y, left: e.pageX-offset.x});
                    console.log('move',e);
                    e.preventDefault();
                }
           }
        }).mouseup(e =>{
            console.log('up',e);
            dragging =null;
        });
        }

    function timer(){
        const min = 1.5;
        let ticks= min * 60;
        
        function leftPad(n,length,padder=' '){
            let x = n.toString();
            while(x.length < length){
                x = padder + x;
            }
            return x;
        }

        function ensureTwoDigits(n){
            return leftPad(n,2,'0');
        }
         function Sec(){
            --ticks;
        }
        function tick(){
          
            const s=ticks % 60;
            const m= Math.floor(ticks /60) %60;
            if (m<1 && s < 45) { 
                $('#timerDiv').css('color','red'); 
            } 
            if (m < 1 && s < 1) { 
                $('#tl').empty();               
                $('#timerDiv').text('Time is Up');
                timeUp=true;
               
                
            } 
            if(s>0){
                 $('#timerDiv').text(`${ensureTwoDigits(m)}:${ensureTwoDigits(s)} `);
            }
        }
        timechange=setInterval(()=>{
            Sec();
            tick();
        },1000);
        tick();    
    }
       
        
   
    $('#start').click(()=>{
        $('#area').empty();
        $('#area').append(`<img class="pic" src="images/body.png" alt="body">
            <img class="pic" src="images/teeth.png" alt="teeth">
            <img class="pic" src="images/righthand.png" alt="righthand">
            <img class="pic"src="images/leftHand.png" alt="leftHand">
            <img class="pic" src="images/eyes.png" alt="eyes">
            <img class="pic" src="images/leftear.png" alt="leftear">
            <img class="pic" src="images/hat.png" alt="hat">
            <img class="pic" src="images/nose.png" alt="nose">
            <img class="pic" src="images/shoes.png" alt="shoes">
            <img class="pic" src="images/rightear.png" alt="rightear">`
            );
        dragging();
        timer();
        $('#start').prop('disabled',true);
        $('#music').attr('src',"bgMusic.mp3" );
    }); 
    $('#reset').click(()=>{
        $('#area').empty();
        $('#area').append(`<img class="pic" src="images/body.png" alt="body">
            <img class="pic" src="images/teeth.png" alt="teeth">
            <img class="pic" src="images/righthand.png" alt="righthand">
            <img class="pic"src="images/leftHand.png" alt="leftHand">
            <img class="pic" src="images/eyes.png" alt="eyes">
            <img class="pic" src="images/leftear.png" alt="leftear">
            <img class="pic" src="images/hat.png" alt="hat">
            <img class="pic" src="images/nose.png" alt="nose">
            <img class="pic" src="images/shoes.png" alt="shoes">
            <img class="pic" src="images/rightear.png" alt="rightear">`
            );
        $('#timer').empty();
        $('#timer').append(`
            <h4 id="tl">Time Left:</h4>
            <div id="timerDiv">1:30</div>
            `
        );
        timeUp = false;
        dragging();
        clearInterval(timechange);
        timer();
        $('#start').prop('disabled',true);
        $('#music').empty();
        $('#music').attr('src',"bgMusic.mp3" );
    });  
    
}());