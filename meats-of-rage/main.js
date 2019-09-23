(()=>{

  let charBoxes = document.querySelectorAll(".char-box");
  const NUM_CHARS = charBoxes.length;
  let selectedCharIndex = 0;

  let bgImages = [
    'url("../images/ainsley-bg.jpeg")',
    'url("../images/marco-bg.jpg")',
    'url("../images/gordon-bg.jpg")',
    'url("../images/keith-bg.jpeg")'
  ];

  let imagesToCache = [
    "../images/ainsley-bg.jpeg",
    "../images/ainsley.png",
    "../images/beef.jpg",
    "../images/gordon-bg.jpg",
    "../images/gordon.png",
    "../images/marco-bg.jpg",
    "../images/marco.png",
    "../images/keith-bg.jpeg",
  ];

  let charSelectBox       = document.querySelector("#char-select-box");
  let charSelectScreen    = document.querySelector("#char-select-screen");
  let meatYourFate        = document.querySelector("#meat-your-fate-button");

  let preloadScreen       = document.querySelector("#preload-screen");
  let loadingProgressText = document.querySelector("#loading-progress-text");

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
    }
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
