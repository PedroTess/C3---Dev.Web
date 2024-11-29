const allColors = [
    "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", 
    "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", 
    "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", 
    "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", 
    "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", 
    "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", 
    "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", 
    "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", 
    "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", 
    "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", 
    "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", 
    "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", 
    "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", 
    "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", 
    "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", 
    "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", 
    "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", 
    "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", 
    "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", 
    "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", 
    "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", 
    "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"
  ];
  
  let chosenColor;
  let selectedColors = [];
  
  function initializeGame() {
    selectedColors = [];
    while (selectedColors.length < 10) {
      const randomColor = allColors[Math.floor(Math.random() * allColors.length)];
      if (!selectedColors.includes(randomColor)) {
        selectedColors.push(randomColor);
      }
    }
  
    chosenColor = selectedColors[Math.floor(Math.random() * selectedColors.length)];
    console.log("Cor escolhida (debug):", chosenColor); // Para depuração
  
    const colorSelect = document.getElementById("colorSelect");
    colorSelect.innerHTML = "";
    selectedColors.forEach(color => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      colorSelect.appendChild(option);
    });
  
    const feedback = document.getElementById("feedback");
    feedback.textContent = "";
    feedback.style.color = "black"; 
    document.body.style.backgroundColor = "#ffffff";
  }
  
  function guessColor() {
    const userInput = document.getElementById("colorSelect").value;
    const feedback = document.getElementById("feedback");
  
    if (userInput === chosenColor) {
      document.body.style.backgroundColor = chosenColor;
  
      const contrastColor = getContrastColor(chosenColor);
      feedback.innerHTML = `Parabéns! Você acertou a cor! <button onclick="initializeGame()">Jogar Novamente</button>`;
      feedback.style.color = contrastColor;
    } else if (userInput.toLowerCase() < chosenColor.toLowerCase()) {
      feedback.textContent = "A cor está mais à frente na ordem alfabética!";
      feedback.style.color = "red";
    } else {
      feedback.textContent = "A cor está mais atrás na ordem alfabética!";
      feedback.style.color = "red";
    }
  }
  
  function getContrastColor(color) {
    const rgb = getComputedStyle(document.documentElement).getPropertyValue(`--${color.toLowerCase()}`);
    const hexColor = rgb ? rgb : color;
    const [r, g, b] = hexToRgb(hexColor);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
    return luminance > 0.5 ? "black" : "white";
  }
  
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const bigint = parseInt(hex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }
  
  initializeGame();
  
  