function getRandomImage() {
    const randomimage = {
      sad1: "assets/sad.webp",
      sad2: "assets/sad2.webp",
      sad3: "assets/sad3.webp",
      sad4: "assets/sad4.webp",
      sad5: "assets/sad5.webp",
      sad6: "assets/sad6.webp",
      sad7: "assets/sad7.webp",
    };
  
    const keys = Object.keys(randomimage);
    const number = keys[Math.floor(Math.random() * keys.length)];
  
    document.getElementById("result").innerHTML = `<img src="${randomimage[number]}">`;
  }
  
  window.onload = getRandomImage();