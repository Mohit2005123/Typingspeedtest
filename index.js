let input= document.querySelector('input');
const wordsArray = [
    "a",
    "about",
    "act",
    "actually",
    "add",
    "after",
    "again",
    "against",
    "age",
    "ago",
    "air",
    "all",
    "also",
    "always",
    "am",
    "among",
    "an",
    "and",
    "animal",
    "another",
    "answer",
    "appear",
    "are",
    "area",
    "as",
    "ask",
    "back",
    "ball",
    "base",
    "be",
    "beauty",
    "because",
    "become",
    "bed",
    "been",
    "before",
    "began",
    "begin",
    "behind",
    "best",
    "better",
    "better",
    "between",
    "big",
    "bird",
    "black",
    "blue",
    "boat",
    "body",
    "book",
    "both",
    "bottom",
    "box",
    "boy",
    "bring",
    "brought",
    "build",
    "built",
    "busy",
    "but",
    "by",
    "call",
    "came",
    "can",
    "car",
    "care",
    "carefully",
    "carry",
    "centre",
    "certain",
    "change",
    "check",
    "child",
    "children",
    "city",
    "class",
    "clear",
    "close",
    "cold",
    "colour",
    "come",
    "common",
    "community",
    "complete",
    "contain",
    "could",
    "country",
    "course",
    "create",
    "cried",
    "cross",
    "cry",
    "cut",
    "dark",
    "day",
    "decide",
    "decided",
    "deep",
    "develop",
    "did",
    "didn’t",
    "different",
    "do",
    "does",
    "dog",
    "don’t",
    "door",
    "down",
    "draw",
    "dream",
    "drive",
    "dry",
    "during",
    "each",
    "early",
    "earth",
    "east",
    "easy",
    "eat",
    "effort",
    "enough",
    "every",
    "example",
    "experience",
    "explain",
    "eye"
  ];
// margin-left : 40px
// display none of the start button
document.addEventListener('DOMContentLoaded', ()=>{
    input.focus();
});

let text= "";
for(let i=0; i<250; i++){
    text= text + wordsArray[Math.floor(Math.random()*wordsArray.length)] + " ";
}
let array= text.split(" ");
let textbox= document.querySelector('.textbox');
let firstkeypress= true;
for(let i=0; i<array.length; i++){
    let word= array[i];
    let newspan= document.createElement('span');
    newspan.classList.add(i);
    newspan.innerHTML=word + " ";
    textbox.appendChild(newspan);
};
let body= document.querySelector('body');
let started= false;
let current=1;
let button= document.querySelector('#submitButton');
console.dir(button);
let time=0;
let correctword=0;
let correct= document.querySelector('h3');
let index=0;
let refreshbutton= document.querySelector('#refreshButton');
refreshbutton.addEventListener('click', ()=>{
    location.reload();
});
let firstkeydown= false;
input.addEventListener('keydown', ()=>{
    if(firstkeydown== false){
        firstkeydown= true;
        if(started== false){
            index=0;
            index++;
            started= true;
            textbox.childNodes[current].classList.add('highlight');
            time=0;
            let func= setInterval(()=>{
                time++;
            }, 1000);
            start(func, input);
        }
        else{
            location.reload();
            started= false;
        }
    }
})
button.addEventListener('click', ()=>{
    if(started== false){
        started= true;
        textbox.childNodes[current].classList.add('highlight');
        time=0;
        let func= setInterval(
            ()=>{
                
                time++;
            }, 1000
        )
        start(func, input);
    }
    else{
        location.reload();
        started= false;
        correct.innerHTML='';
        current=0;
        time=0;
        correctword=0;
        textbox.innerHTML='';
        for(let i=0; i<array.length; i++){
            let word= array[i];
            let newspan= document.createElement('span');
            newspan.classList.add(i);
            newspan.innerHTML=word + " ";
            textbox.appendChild(newspan);
        }
        textbox.childNodes[current].classList.add('highlight');
        time=0;
        let func= setInterval(
            ()=>{
                
                time++;
            }, 1000
        )
        let newinput= document.createElement('input');
        body.appendChild(newinput);
        start(func, newinput);
    }
})
function start(func, input){
    setInterval(()=>{
        if(time==60){
            input.remove();
            clearInterval(func);
            correct.innerHTML= `Number of correct words typed ${correctword} WPM `;
            button.style.display='none';
            refreshbutton.style.marginLeft='40px';
        }
    })
    input.addEventListener('keydown', (event)=>{
        if(event.keyCode==32){
            index=0;
            event.preventDefault();
            let inputtext= input.value;
            let currentword= textbox.childNodes[current].innerText;
            if(inputtext.trim()===currentword.trim()){
                index=0;
                textbox.childNodes[current].classList.remove('highlight');
                textbox.childNodes[current].classList.remove('incorrect');
                textbox.childNodes[current].classList.add('correct');
                current++;
                textbox.childNodes[current].classList.add('highlight');
                input.innerHTML="";
                input.value="";
                correctword++;
                
            }
            else{
                textbox.childNodes[current].classList.remove('highlight');
                textbox.childNodes[current].classList.add('incorrect');
                
                current++;
                textbox.childNodes[current].classList.add('highlight');
                input.innerHTML="";
                input.value="";
            }
        }
        else if((event.keyCode>=65 && event.keyCode<=90)){
      
            let inputtext= input.value;
            let currentword= textbox.childNodes[current].innerText;
            let str1= inputtext.trim();
            let str2= currentword.trim();
            console.log(event.key);
            console.log(str2.charAt(index));
            if(event.key===str2.charAt(index)){
                index++;
            }
            else{
                textbox.childNodes[current].classList.add('incorrect');
                index++;
            }

        }
        
        else if(event.keyCode==8){
            index--;
            let inputtext= input.value;
            let currentword= textbox.childNodes[current].innerText;
            if(index==1){
                textbox.childNodes[current].classList.remove('incorrect');
            }
            if(inputtext.charAt(inputtext.length-2)===currentword.charAt(index-1)){
                textbox.childNodes[current].classList.remove('incorrect');
            }
            else{
                console.log(false);
            }
        }

    })
};
