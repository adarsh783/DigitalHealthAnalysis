const trigger = [
    //0
    ["hi", "hey", "hello"],
    //1
    ["I am suffering from fever","I am suffering from headache","I am suffering from body pain"],
    //2
    ["what is going on", "what is up"],
    //3
    ["happy", "good", "well", "fantastic", "cool"],
    //4
    ["bad", "bored", "tired", "sad"],
    //5
    ["tell me story", "tell me joke"],
    //6
    ["thanks", "thank you"],
    //7
    ["bye", "good bye", "goodbye"]
    ];
   
    const reply = [
    //0
    ["Hello! Tell me your problem"],
    //1
    [
        "From how many days?"
      ],
    //2
    [
        "Nothing much",
        "Exciting things!"
      ],
    //3
    ["Glad to hear it"],
    //4
    ["Why?", "Cheer up buddy"],
    //5
    ["What about?", "Once upon a time..."],
    //6
    ["You're welcome", "No problem"],
    //7
    ["Goodbye", "See you later"],
    ];
   
    const alternative = [
      "Same",
      "Go on...",
      "Try again",
      "I'm listening...",
      "Bro..."
    ];
    const robot = ["How do you do, fellow human", "I am not a bot"];
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input")
    inputField.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            let input = inputField.value;
            console.log(input);
            inputField.value = "";
            output(input);
    }
  });
});

function compare(triggerArray, replyArray, text) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
      for (let y = 0; y < replyArray.length; y++) {
        if (triggerArray[x][y] == text) {
          items = replyArray[x];
          item = items[Math.floor(Math.random() * items.length)];
        }
      }
    }
    return item;
}

function output(input) {
    console.log(input);
    let product;
    let text = input;
    text = text
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "");
 
  //compare arrays
  //then search keyword
  //then random alternative
 
    if (compare(trigger, reply, text)) {
      product = compare(trigger, reply, text);
    } else if (text.match(/robot/gi)) {
      product = robot[Math.floor(Math.random() * robot.length)];
    } else {
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }
 

    //update DOM
    addChat(input, product);
}



function addChat(input, product) {
    const mainDiv = document.getElementById("main");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.innerHTML = `You: <span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);
 
    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.innerHTML = `Doctor: <span id="bot-response">${product}</span>`;
    mainDiv.appendChild(botDiv);
    speak(product);
  }

  function speak(string) {
    const u = new SpeechSynthesisUtterance();
    allVoices = speechSynthesis.getVoices();
    u.voice = allVoices.filter(voice => voice.name === "Alex")[0];
    u.text = string;
    u.lang = "en-US";
    u.volume = 3; //0-1 interval
    u.rate = 1;
    u.pitch = 1; //0-2 interval
    speechSynthesis.speak(u);
  }
 


// function () {

//     //remove all characters except word characters, space, and digits
//       let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
   
//     // 'tell me a story' -> 'tell me story'
//     // 'i feel happy' -> 'happy'
//       text = text
//         .replace(/ a /g, " ")
//         .replace(/i feel /g, "")
//         .replace(/whats/g, "what is")
//         .replace(/please /g, "")
//         .replace(/ please/g, "");
//     }