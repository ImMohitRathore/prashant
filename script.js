(function () {
  const valentineCard = document.getElementById("valentine-card");
  const hangoutCard = document.getElementById("hangout-card");
  const valentineWeek = document.getElementById("valentine-week");
  const celebration = document.getElementById("celebration");
  const displayName = document.getElementById("display-name");
  const daySlides = document.querySelectorAll(".day-slide");
  const btnNextAll = document.querySelectorAll(".btn-next");
  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const btnHangoutYes = document.getElementById("btn-hangout-yes");
  const btnHangoutNo = document.getElementById("btn-hangout-no");
  const floatingRomantic = document.getElementById("floating-romantic");

  var noClickCount = 0;
  var noMessages = [
    "Mark as Unread",

    "Still No ?",
    "Have a heart",
  ];
  var noScale = 1;
  var yesScale = 1;
  var scaleStepNo = 0.85;
  var scaleStepYes = 1.28;
  var minNoScale = 0.35;
  var maxYesScale = 15;

  function getNameFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("name") || "";
  }

  function showScreen(screenEl) {
    [valentineCard, hangoutCard, valentineWeek, celebration].forEach(function (el) {
      if (el) el.classList.add("hidden");
    });
    if (screenEl) screenEl.classList.remove("hidden");
    if (floatingRomantic) {
      if (screenEl === valentineWeek || screenEl === celebration || screenEl === hangoutCard) {
        floatingRomantic.classList.add("visible");
      } else {
        floatingRomantic.classList.remove("visible");
      }
    }
  }

  var valentineDayAudio = document.getElementById("valentine-day-audio");

  function showDaySlide(index) {
    var i = Math.max(0, Math.min(index, daySlides.length - 1));
    daySlides.forEach(function (slide, idx) {
      slide.classList.toggle("active", idx === i);
      slide.classList.remove("just-opened");
    });
    if (daySlides[i]) {
      daySlides[i].classList.add("just-opened");
      setTimeout(function () {
        daySlides[i].classList.remove("just-opened");
      }, 2200);
    }
    if (i === 6 && valentineDayAudio) {
      valentineDayAudio.play().catch(function () { });
    } else if (valentineDayAudio) {
      valentineDayAudio.pause();
      valentineDayAudio.currentTime = 0;
    }
  }

  // function setDisplayName(name) {
  //   const n = (name || "Rakhu").trim() || "Rakhu";
  //   displayName.textContent = n;
  // }

  function openValentineCard(name) {
    // setDisplayName(name);
    noClickCount = 0;
    noScale = 1;
    yesScale = 1;
    applyButtonSizes();
    if (btnNo) btnNo.textContent = noMessages[0];
    showScreen(valentineCard);
  }

  function applyButtonSizes() {
    if (btnNo) btnNo.style.transform = "scale(" + noScale + ")";
    if (btnYes) btnYes.style.transform = "scale(" + yesScale + ")";
  }

  if (btnNo) {
    btnNo.addEventListener("click", function () {
      noClickCount++;
      var msgIndex = Math.min(noClickCount, noMessages.length - 1);
      btnNo.textContent = noMessages[msgIndex];
      noScale = Math.max(minNoScale, noScale * scaleStepNo);
      yesScale = Math.min(maxYesScale, yesScale * scaleStepYes);
      console.log("all Index", msgIndex);
      if (msgIndex === 2) {
        applyButtonSizes();
        // Hide No button when it reaches "Have a heart"
        btnNo.style.display = "none";
      }


    });
  }

  var currentDayIndex = 0;

  // Show Message button - shows hangout card
  if (btnYes) {
    btnYes.addEventListener("click", function () {
      showScreen(hangoutCard);
    });
  }

  // Hangout card Yes button - show fourth image with happy message
  if (btnHangoutYes) {
    btnHangoutYes.addEventListener("click", function () {
      // Change to fourth image with happy message
      var hangoutImage = document.querySelector("#hangout-card .valentine-photo");
      var hangoutQuestion = document.querySelector("#hangout-card .valentine-question");
      var hangoutMessage = document.querySelector("#hangout-card .hangout-message");

      if (hangoutImage) {
        hangoutImage.src = "assets/forth.jpeg";
      }
      if (hangoutQuestion) {
        hangoutQuestion.innerHTML = "<strong>Yeah! 🎉</strong>";
      }
      if (hangoutMessage) {
        hangoutMessage.innerHTML = "Mujhe pta tha tum haa bol dogi 😊💕";
        hangoutMessage.style.fontStyle = "normal";
        hangoutMessage.style.fontWeight = "600";
      }

      // Hide Yes button after clicking
      if (btnHangoutYes) {
        btnHangoutYes.style.display = "none";
      }

      // Make sure No button stays hidden if it was already hidden
      if (btnHangoutNo) {
        btnHangoutNo.style.display = "none";
      }
    });
  }

  // Hangout card No button - same behavior as original No button + change image
  var hangoutNoClickCount = 0;
  var hangoutNoScale = 1;
  var hangoutYesScale = 1;

  if (btnHangoutNo) {
    btnHangoutNo.addEventListener("click", function () {
      hangoutNoClickCount++;
      var msgIndex = Math.min(hangoutNoClickCount, noMessages.length - 1);
      btnHangoutNo.textContent = noMessages[msgIndex];
      hangoutNoScale = Math.max(minNoScale, hangoutNoScale * scaleStepNo);
      hangoutYesScale = Math.min(maxYesScale, hangoutYesScale * scaleStepYes);
      btnHangoutNo.style.transform = "scale(" + hangoutNoScale + ")";
      btnHangoutYes.style.transform = "scale(" + hangoutYesScale + ")";

      var hangoutImage = document.querySelector("#hangout-card .valentine-photo");
      var hangoutQuestion = document.querySelector("#hangout-card .valentine-question");
      var hangoutMessage = document.querySelector("#hangout-card .hangout-message");

      // First click: Change to second.jpeg
      if (hangoutNoClickCount === 1) {
        if (hangoutImage) {
          hangoutImage.src = "assets/second.jpeg";
        }
        if (hangoutQuestion) {
          hangoutQuestion.innerHTML = "Please ,";
        }
        if (hangoutMessage) {
          hangoutMessage.textContent = "Esa toh mat kero";
        }

        // Show crying tears animation
        var tearsContainer = document.getElementById("tears-container");
        if (tearsContainer) {
          tearsContainer.classList.remove("hidden");
        }
      }

      // Second click: Change to third.jpeg
      if (hangoutNoClickCount === 2) {
        if (hangoutImage) {
          hangoutImage.src = "assets/third.jpeg";
        }
        if (hangoutQuestion) {
          hangoutQuestion.innerHTML = "<strong>Yaad kro woh Pal</strong>";
        }
        if (hangoutMessage) {
          // hangoutMessage.innerHTML = "Jab hum saath the...<br>Kitne khush the hum 💔";
          hangoutMessage.style.fontStyle = "normal";
        }

        if (hangoutMessage) {
          hangoutMessage.textContent = "";
        }

        // Hide crying tears animation for third image
        var tearsContainer = document.getElementById("tears-container");
        if (tearsContainer) {
          tearsContainer.classList.add("hidden");
        }

        // Hide No button and center Yes button
        if (btnHangoutNo) {
          btnHangoutNo.style.display = "none";
        }
      }
    });
  }

  btnNextAll.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentDayIndex++;
      if (currentDayIndex >= daySlides.length) {
        currentDayIndex = 0;
        showScreen(celebration);
      } else {
        showDaySlide(currentDayIndex);
      }
    });
  });

  // On load: start with Valentine ask card (name from URL or "Cutie")
  (function init() {
    const name = getNameFromUrl() || "Rakhu";
    openValentineCard(name);
  })();
})();
