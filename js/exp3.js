let step=0;

const pipette = document.getElementById("pippete");
const tube1=document.getElementById("tube1");
const tube2=document.getElementById("tube2");
const tubefilled1=document.getElementById("tubefilled1");
const tubefilled2=document.getElementById("tubefilled2");
const methCap=document.getElementById("meth-cap");
const chloroCap=document.getElementById("chloro-cap");
const drop=document.getElementById("drop");
const instruction=document.getElementById("instruction");
const startBtn=document.getElementById("start-btn");
const resetBtn=document.getElementById("reset-btn");
const centrifuge=document.getElementById("centrifuge");
const resultA=document.getElementById("resultA");
const resultB=document.getElementById("resultB");

function move(el,x,y,rot){
el.style.left=x;
el.style.top=y;
el.style.transform=`rotate(${rot}deg)`;
}
function pour(color="#fff", offset=12){

  const pipetteRect = pipette.getBoundingClientRect();
  const labRect = document.getElementById("lab").getBoundingClientRect();

  // position drop exactly under pipette tip
const tipX = pipetteRect.left + pipetteRect.width/2 - labRect.left + offset;
  const tipY = pipetteRect.bottom - labRect.top+3;

  drop.style.left = tipX + "px";
  drop.style.top = tipY + "px";

  drop.style.background = color;
  drop.style.display = "block";
  drop.style.animation = "liquidFlow 1.2s ease forwards";

  setTimeout(()=>{
    drop.style.display="none";
  },1200);
}

function pourFromCap(cap, color="#1e90ff"){

  const capRect = cap.getBoundingClientRect();
  const labRect = document.getElementById("lab").getBoundingClientRect();

  // drop comes from cap center
  const tipX = capRect.left + capRect.width/2 - labRect.left;
  const tipY = capRect.bottom - labRect.top;

  drop.style.left = tipX + "px";
  drop.style.top = tipY + "px";

  drop.style.background = color;
  drop.style.display = "block";
  drop.style.animation = "liquidFlow 1.2s ease forwards";

  setTimeout(()=>{
    drop.style.display="none";
  },1200);
}


startBtn.onclick=()=>{
startBtn.style.display="none";
instruction.textContent="Step 1: Click on Pipette to Collect Milk Sample A";
step=1;
};

pipette.onclick=()=>{

if(step===1){
move(pipette,"7%","52%",0);
instruction.textContent=" Click on Pipette again to Add Milk A to Test Tube";
step=2;
}else if(step===2){
move(pipette,"39.7%","34%",0);

setTimeout(()=>{
pour();

tube1.style.display="none";
tubefilled1.style.display="block";

/* ✅ WAIT FOR POUR TO FINISH */
setTimeout(()=>{
  move(pipette,"58%","65%",-90);
},1200);


instruction.textContent=" Now, Click on Pipette to Collect Milk Sample B";
step=3;

},700);
}

else if(step===3){
move(pipette,"16%","52%",0);
instruction.textContent="Click on Pipette again Add Milk B to Test Tube";
step=4;
}
else if(step===4){
move(pipette,"42.5%","34%",0);

setTimeout(()=>{
pour();

tube2.style.display="none";
tubefilled2.style.display="block";

/* ✅ WAIT FOR POUR TO FINISH */
setTimeout(()=>{
  move(pipette,"58%","65%",-90);
},1200);

instruction.textContent="Click on Methylene bottle cap to Add Methylene to both the test tube";
step=5;

},600);
}

else if(step===61){

  /* move pipette to chloroform bottle */
  move(pipette,"30%","60%",0);
  pipette.style.zIndex = "3"; // bottle ke peeche chala jayega


  setTimeout(()=>{

    /* change pipette liquid */
    pipette.src="images/pippete-chloroform.png";
    pipette.style.width="180px";

    instruction.textContent="Click Pipette to Add Chloroform";
    step=7;

  },800);
}
else if(step===7){

instruction.textContent="Adding Chloroform to Tube A";

/* go to tube A */
move(pipette,"41%","34%",-20);

setTimeout(()=>{

  pour("#dfefff");

  setTimeout(()=>{

    instruction.textContent="Adding Chloroform to Tube B";

    /* move to tube B */
    move(pipette,"43.5%","34%",-20);

    setTimeout(()=>{

      pour("#dfefff");

      /* return to original position */
      setTimeout(()=>{

        move(pipette,"58%","65%",-90);

        instruction.textContent="Vortex Mixing (15 sec)";
        tubefilled1.classList.add("vortex");
        tubefilled2.classList.add("vortex");

        setTimeout(()=>{
          tubefilled1.classList.remove("vortex");
          tubefilled2.classList.remove("vortex");

          centrifuge.style.display="block";

/* move centrifuge left + bigger */
setTimeout(()=>{
  centrifuge.style.right="25%";   // left side move
  centrifuge.style.bottom="50px";
  centrifuge.style.width="300px"; // bigger size
},200);

instruction.textContent="Click Centrifuge (1100 rpm)";
step=8;


        },15000);

      },1200);

    },700);

  },1200);

},700);
}

};
methCap.onclick = ()=>{

if(step===5){

  instruction.textContent="Adding Methylene Blue to Tube A";

  // move cap above tube A
  methCap.style.left="47.1%";
  methCap.style.bottom="260px";

  setTimeout(()=>{

    pourFromCap(methCap);

    setTimeout(()=>{

      instruction.textContent="Adding Methylene Blue to Tube B";

      // move cap above tube B
      methCap.style.left="49.1%";

      setTimeout(()=>{

        pourFromCap(methCap);

        setTimeout(()=>{
          step=6;

          // return cap back
          methCap.style.left="29.3%";
          methCap.style.bottom="150px";

        },1200);

      },800);

    },1200);

  },800);
}
  instruction.textContent=" click on Chloroform Bottle cap to open";

};

chloroCap.onclick = ()=>{

if(step===6){


  /* cap moves slightly right */
  chloroCap.style.left="36.5%";

  setTimeout(()=>{
    instruction.textContent="Collect Chloroform using Pipette";
    step=61;   // NEW STEP
  },700);
}
};


centrifuge.onclick=()=>{
if(step===8){
    /* tubes move towards centrifuge */
tubefilled1.style.left="55%";
tubefilled2.style.left="57%";

tubefilled1.style.bottom="120px";
tubefilled2.style.bottom="120px";

/* send behind centrifuge */
tubefilled1.style.zIndex="5";
tubefilled2.style.zIndex="5";


centrifuge.classList.add("centrifuge-spin");
instruction.textContent="Centrifugation running...";
setTimeout(()=>{

centrifuge.classList.remove("centrifuge-spin");

/* colour change */
tubefilled1.src="images/test-tube-A.png";
tubefilled2.src="images/test-tube-B.png";

/* bring tubes front */
tubefilled1.style.zIndex="4";
tubefilled2.style.zIndex="4";

/* move back to stand */
tubefilled1.style.left="39%";
tubefilled2.style.left="41%";
tubefilled1.style.bottom="65px";
tubefilled2.style.bottom="65px";

instruction.innerHTML=
"<b>Observation:</b><br>"+
"Sample A → Blue lower layer (Detergent Present)<br>"+
"Sample B → Blue upper layer (Detergent Absent)";

resetBtn.style.display="block";

},12000);

}
};

resetBtn.onclick=()=>location.reload();

