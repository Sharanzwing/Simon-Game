/* ==========================================================================
   SIMON GAME - GAME ENGINE & INTERACTION LOGIC
   ========================================================================== */

$(document).ready(function() {
  // Game Configuration & State
  var buttonColours = ["green", "red", "yellow", "blue"];
  var gamePattern = [];
  var userClickedPattern = [];
  var level = 0;
  var started = false;
  var isSequencePlaying = false;

  // Sound effects preloader map
  var soundMap = {
    green: new Audio("sounds/green.mp3"),
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    blue: new Audio("sounds/blue.mp3"),
    wrong: new Audio("sounds/wrong.mp3")
  };

  // Keyboard mapping for desktop quick play
  var keyMap = {
    q: "green",
    1: "green",
    w: "red",
    2: "red",
    a: "yellow",
    3: "yellow",
    s: "blue",
    4: "blue"
  };

  // Initialize High Score from LocalStorage
  var highScore = parseInt(localStorage.getItem("simon_high_score"), 10) || 0;
  $("#high-score").text(highScore);

  // -------------------------------------------------------------------------
  // Sound Player Helper with Error Catching (Mobile Autoplay Safety)
  // -------------------------------------------------------------------------
  function playSound(name) {
    var audio = soundMap[name];
    if (audio) {
      audio.currentTime = 0;
      var playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(function(error) {
          console.warn("Audio autoplay prevented or error:", error);
        });
      }
    }
  }

  // -------------------------------------------------------------------------
  // Button Visual Animation
  // -------------------------------------------------------------------------
  function animatePress(currentColour) {
    var $btn = $("#" + currentColour);
    $btn.addClass("pressed");
    setTimeout(function() {
      $btn.removeClass("pressed");
    }, 250);
  }

  // -------------------------------------------------------------------------
  // Start Game Sequence
  // -------------------------------------------------------------------------
  function startGame() {
    if (!started) {
      started = true;
      level = 0;
      gamePattern = [];
      $("#start-btn-text").text("RESTART");
      $("#hub-indicator").removeClass("wrong").addClass("active");
      $("#current-score").text("0");
      nextSequence();
    } else {
      // If already started, acts as restart
      resetAndRestart();
    }
  }

  function resetAndRestart() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = true;
    isSequencePlaying = false;
    $("#hub-indicator").removeClass("wrong").addClass("active");
    $("#current-score").text("0");
    nextSequence();
  }

  // -------------------------------------------------------------------------
  // Next Sequence
  // -------------------------------------------------------------------------
  function nextSequence() {
    userClickedPattern = [];
    level++;
    isSequencePlaying = true;

    // Update level display
    $("#level-title").text("Level " + level);
    $("#current-score").text(level);

    // Update high score in real time if surpassed
    if (level > highScore) {
      highScore = level;
      $("#high-score").text(highScore);
      localStorage.setItem("simon_high_score", highScore);
    }

    // Pick random color
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Give the player a slight breath before flashing the button
    setTimeout(function() {
      animatePress(randomChosenColour);
      playSound(randomChosenColour);
      
      // Allow user input after sequence flash finishes
      setTimeout(function() {
        isSequencePlaying = false;
      }, 300);
    }, 400);
  }

  // -------------------------------------------------------------------------
  // User Input Handler (Pad Click & Touch)
  // -------------------------------------------------------------------------
  function handleColorInput(userChosenColour) {
    if (!started) {
      startGame();
      return;
    }

    if (isSequencePlaying) {
      return; // Ignore clicks while Simon is demonstrating
    }

    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }

  $(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    handleColorInput(userChosenColour);
  });

  // -------------------------------------------------------------------------
  // Verify User Answer
  // -------------------------------------------------------------------------
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      // User tapped correct button
      if (userClickedPattern.length === gamePattern.length) {
        // User finished the full sequence for this level!
        isSequencePlaying = true;
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    } else {
      // User tapped wrong button
      handleGameOver();
    }
  }

  // -------------------------------------------------------------------------
  // Game Over Handler
  // -------------------------------------------------------------------------
  function handleGameOver() {
    playSound("wrong");

    $("body").addClass("game-over");
    $("#hub-indicator").removeClass("active").addClass("wrong");
    $("#level-title").html("Game Over!<br>Score: " + (level > 0 ? level - 1 : 0));
    $("#start-btn-text").text("PLAY AGAIN");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 350);

    startOver();
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    isSequencePlaying = false;
  }

  // -------------------------------------------------------------------------
  // Start / Restart Button Click
  // -------------------------------------------------------------------------
  $("#start-btn").on("click", function() {
    startGame();
  });

  // -------------------------------------------------------------------------
  // Keyboard Controls
  // -------------------------------------------------------------------------
  $(document).on("keydown", function(event) {
    // If modal is open, ignore game keys
    if (!$("#instructions-modal").is("[hidden]")) {
      if (event.key === "Escape") {
        closeModal();
      }
      return;
    }

    var key = event.key.toLowerCase();

    // Start with Space or Enter
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      startGame();
      return;
    }

    // Key mapped to pad
    if (keyMap[key]) {
      var colour = keyMap[key];
      handleColorInput(colour);
      return;
    }

    // Any other key starts game if not already started
    if (!started && event.key.length === 1) {
      startGame();
    }
  });

  // -------------------------------------------------------------------------
  // Instructions Modal Handlers
  // -------------------------------------------------------------------------
  function openModal() {
    $("#instructions-modal").removeAttr("hidden");
  }

  function closeModal() {
    $("#instructions-modal").attr("hidden", "true");
  }

  $("#instructions-btn").on("click", function() {
    openModal();
  });

  $("#modal-close-btn, #modal-got-it, .modal-backdrop").on("click", function() {
    closeModal();
  });
});
