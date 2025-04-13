function getRandomSadImage() {
    const randomimage = {
      sad1: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad1.webp",
      sad2: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad2.webp",
      sad3: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad3.webp",
      sad4: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad4.webp",
      sad5: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad5.webp",
      sad6: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad6.webp",
      sad7: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad7.webp",
      sad8: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad8.webp",
      sad9: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad9.webp",
      sad10: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad11.webp",
      sad11: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad12.webp",
      sad12: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad13.webp",
      sad13: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad14.webp",
      sad14: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad15.webp",
      sad15: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad16.webp",
      sad16: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad17.webp",
      sad17: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad18.webp",
      sad18: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad19.webp",
      sad19: "https://raw.githubusercontent.com/notPotatoe/imissmumei/main/assets/sad20.webp"
    };
  
    const keys = Object.keys(randomimage);
    const number = keys[Math.floor(Math.random() * keys.length)];
  
    document.getElementById("result").innerHTML = `<img src="${randomimage[number]}">`;
}