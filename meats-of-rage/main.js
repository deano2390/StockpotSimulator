(()=>{

  let charBoxes = document.querySelectorAll(".char-box");
  const NUM_CHARS = charBoxes.length;
  let selectedCharIndex = 0;

  let bgImages = [
    'url("../images/ainsley-bg.jpeg")',
    'url("../images/marco-bg.jpg")',
    'url("../images/gordon-bg.jpg")',
    'url("../images/keith-bg.jpeg")',
    'url("../images/guy-bg.jpg")',
    'url("../images/anthony-bg.jpg")'
  ];

  let imagesToCache = [
    "../images/ainsley-bg.jpeg",
    "../images/ainsley.png",
    "../images/anthony.png",
    "../images/guy.png",
    "../images/beef.jpg",
    "../images/gordon-bg.jpg",
    "../images/gordon.png",
    "../images/marco-bg.jpg",
    "../images/marco.png",
    "../images/keith-bg.jpeg",
    "../images/anthony-bg.jpg",
    "../images/guy-bg.jpg",
  ];

  let summaries = [
    "Ainsley is a formidable close-range fighter, deploying his MEAT RUB and SPECIAL AROMA to vanquish any and all foes",
    "Marco is the best ranged fighter, launching STOCK POTS and STOCK CUBES great distances.",
    "Gordon is a well-rounded fighter, deploying the IDIOT SANDWICH at close range and general VERBAL ABUSE over distance.",
    "Keith has a powerful, but inaccurate ranged WINE BOTTLE attack, and his perma-pissed state allows him to absorb damage.",
    "Guy is pretty useless and basically chucks BURGERS at people, but his natural armour allows him to take a lot of damage.",
    "Anthony is the weakest fighter, and his ANNOYING LITTLE CUNT attack is limited, but his tiny stature means that many attacks will go wide of their mark."
  ];

  let charSelectBox       = document.querySelector("#char-select-box");
  let charSelectScreen    = document.querySelector("#char-select-screen");
  let meatYourFate        = document.querySelector("#meat-your-fate-button");
  let preloadScreen       = document.querySelector("#preload-screen");
  let loadingProgressText = document.querySelector("#loading-progress-text");
  let mainScreen          = document.querySelector("#main-screen");
  let canvas              = document.querySelector("#canvas");
  let summary             = document.querySelector("#character-summary");

  let game = new Game({
    container : mainScreen,
    canvas    : canvas
  });


  let States = {
    CharSelect : 0
  };

  function setState(state)
  {
    switch(state)
    {
      case States.CharSelect:
        setStateCharSelect();
        break;
      case States.GameIntro:
        unsetStateCharSelect();
        setStateGameIntro();
        break;
    }
  }

  function setStateGameIntro()
  {

  }

  function unsetStateCharSelect()
  {
    let boxStyle = charSelectBox.style;
    boxStyle.transform = "scale(0)";
    boxStyle.opacity = 0;
    charSelectScreen.style.opacity = 0;
    setTimeout(()=>{
      charSelectScreen.style.display = "none";
    }, 1000);
  }

  function setStateCharSelect()
  {
    let boxStyle = charSelectBox.style;
    meatYourFate.style.visibility = "hidden";
    meatYourFate.style.transform = "scale(0)";
    boxStyle.transform = "scale(1)";
    boxStyle.opacity = 1;
    for(let i = 0; i < charBoxes.length; ++i)
    {
      let charBox = charBoxes[i];
      charBox.style.transform = "scale(0.8)";
    }
  }


  // ======================================================================= GENERAL INITIALISATION

  for(let i = 0; i < charBoxes.length; ++i)
  {
    let charBox = charBoxes[i];
    charBox.addEventListener("click", ()=>{
      meatYourFate.style.visibility = "visible";
      meatYourFate.style.transform = "scale(1)";
      selectedCharIndex = i;
      summary.innerHTML = summaries[i];
      charSelectScreen.style.backgroundImage = bgImages[i];
      console.log("cccc", charSelectScreen.style);
      drawCharacterSelection();
    });
  }

  function drawCharacterSelection()
  {
    for(let i = 0; i < charBoxes.length; ++i)
    {
      let selected = (i == selectedCharIndex);
      let charBox = charBoxes[i];
      charBox.style.transform = selected ? "scale(1)" : "scale(0.8)";
    }
  }




  function loadImages(list, onProgress, onComplete)
  {
    let count = list.length;
    let lCount = 0;
    function onLoad()
    {
      ++lCount;
      onProgress((lCount / count) * 100)
      if(lCount == count)
        onComplete();
    }
    for(let i = 0; i < count; ++i)
    {
      let img = new Image();
      img.onload = onLoad;
      img.src = list[i];
    }
  }


  meatYourFate.addEventListener("click", ()=>{
    setState(States.GameIntro);
  });


  loadImages(imagesToCache,
  (percent)=>{
    loadingProgressText.innerHTML = "Loading " + Math.round(percent) + "%"
  },
  ()=>{
    preloadScreen.style.opacity = 0;
    setTimeout(function(){
      preloadScreen.style.display = "none";
      setState(States.CharSelect);
    }, 1000);
  });


})();
