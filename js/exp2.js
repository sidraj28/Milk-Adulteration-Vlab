
let step = 0;

const pipette = document.getElementById("pippete");
const tube1 = document.getElementById("tube1");
const tube2 = document.getElementById("tube2");
const tubefilled1 = document.getElementById("tubefilled1");
const tubefilled2 = document.getElementById("tubefilled2");
const resultA = document.getElementById("resultA");
const resultB = document.getElementById("resultB");
const drop = document.getElementById("drop");
const instruction = document.getElementById("instruction");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const dmabCap = document.getElementById("dmab-cap");

// Start experiment
startBtn.onclick = () => {
  startBtn.style.display = "none";
  instruction.textContent = "Step 1: Click pipette to take Milk Sample A";
  step = 1;
};

// Pipette clicks
pipette.onclick = () => {
  if(step === 1){
    pipette.style.left = "7%"; pipette.style.top = "52%"; pipette.style.transform = "rotate(0deg)";
    step = 2;
    instruction.textContent = "Milk A collected. Click pipette to add to Test Tube A";
  }
  else if(step === 2){
    pipette.style.left = "47%"; pipette.style.top = "45%"; pipette.style.transform = "rotate(-30deg)";
    drop.style.backgroundColor = "#ffffff"; drop.style.display = "block";
    setTimeout(()=>{ drop.style.display = "none"; tube1.style.display="none"; tubefilled1.style.display="block"; 
      step=3; instruction.textContent="Step 2: Click pipette to take Milk Sample B"; }, 1200);
  }
  else if(step===3){
    pipette.style.left="16%"; pipette.style.top="52%"; pipette.style.transform="rotate(0deg)";
    step=4; instruction.textContent="Milk B collected. Click pipette to add to Test Tube B";
  }
  else if(step===4){
    pipette.style.left="49%"; pipette.style.top="42%"; pipette.style.transform="rotate(-30deg)";
    drop.style.backgroundColor="#ffffff"; drop.style.display="block";
    setTimeout(()=>{ drop.style.display="none"; tube2.style.display="none"; tubefilled2.style.display="block";
      step=5; instruction.textContent="Step 3: Click DMAB bottle cap to open"; },1200);
  }
  else if(step===6){
    pipette.src="images/pippete-dmab.png";
    pipette.style.left="20%"; pipette.style.top="58%"; pipette.style.transform="rotate(0deg)";
    setTimeout(()=>{ step=7; instruction.textContent="DMAB collected. Click pipette to add to Test Tube A first"; },500);
  }
  else if(step===7){
    // Pour into Test Tube A
    pipette.style.left="47%"; pipette.style.top="42%"; pipette.style.transform="rotate(-30deg)";
    drop.style.backgroundColor="#f5e6b3"; drop.style.display="block";
    setTimeout(()=>{
      drop.style.display="none"; tubefilled1.style.display="none"; resultA.style.display="block";
      // Pour into Test Tube B after short delay
      setTimeout(()=>{
        pipette.style.left="49%"; pipette.style.top="42%";
        drop.style.display="block";
        setTimeout(()=>{
          drop.style.display="none"; tubefilled2.style.display="none"; resultB.style.display="block";
          // Cap back to normal
          dmabCap.style.left="29.5%";
          instruction.innerHTML="<b>Observation:</b><br>Sample A → Distinct Yellow (Urea Present)<br>Sample B → Light Yellow (Urea Absent)<br><br><b>Inference:</b> Milk Sample A is adulterated with urea.";
          resetBtn.style.display="block";
          step=8;
        },1300);
      },500);
    },1300);
  }
};

// DMAB cap click
dmabCap.onclick = () => {
  if(step===5){
    dmabCap.style.left="130px";
    step=6;
    instruction.textContent="Click pipette to collect DMAB reagent";
  }
};

// Reset
resetBtn.onclick = ()=>location.reload();
