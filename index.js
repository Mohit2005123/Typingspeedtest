let input= document.querySelector('input');
// margin-left : 40px
// display none of the start button
let container= ["the sun was high in the sky casting a warm glow over the land birds chirped merrily in the trees adding to the peaceful atmosphere children laughed as they played in the grass their joy infectious nearby a river flowed gently its waters shimmering in the sunlight flowers bloomed in vibrant colors painting the landscape with beauty a dog barked happily chasing after a ball it was a perfect day filled with simple pleasures life felt good and worries seemed far away happiness was found in the little things like a smile or a kind word as the day wore on the sun began to set painting the sky with hues of orange and pink stars appeared one by one twinkling in the twilight soon the world was bathed in darkness but the beauty remained in the quiet of the night peace settled over the land like a warm blanket and as the stars shone brightly overhead all was right in the world" , 
"the cat ran fast down the road chasing mice and birds it purred softly as it moved enjoying the thrill of the chase the sky was blue with fluffy clouds drifting lazily by trees swayed in the breeze their leaves rustling softly a squirrel scampered up a tree its tail twitching with excitement nearby a dog barked loudly alerting its owner to something unseen flowers bloomed in bright colors attracting bees and butterflies the air was filled with the scent of freshly cut grass and blooming flowers children played nearby their laughter echoing through the air it was a peaceful scene full of life and energy as the sun began to set painting the sky with hues of orange and pink the world seemed to slow down night fell and the stars came out twinkling in the darkness and as the moon rose high overhead casting its gentle glow all was calm and quiet", "the dog barked loudly running through the field chasing after butterflies and bees it was a sunny day with blue skies and fluffy clouds children laughed and played nearby their joy infectious birds chirped happily in the trees adding to the peaceful atmosphere the river flowed gently its waters shimmering in the sunlight flowers bloomed in vibrant colors painting the landscape with beauty it was a perfect day filled with simple pleasures the sun was high in the sky casting a warm glow over the land trees swayed gently in the breeze their leaves rustling softly a squirrel scampered up a tree its tail twitching with excitement nearby a rabbit hopped through the grass its ears perked up alert and curious birds chirped merrily in the branches adding to the tranquil scene it was a peaceful day full of simple pleasures." , "the cat lounged lazily in the sun soaking up its warmth and light nearby a mouse scurried across the grass its tiny feet barely making a sound birds chirped happily in the trees adding to the serene atmosphere children laughed and played nearby their laughter filling the air with joy flowers bloomed in vibrant colors painting the landscape with beauty it was a beautiful day full of simple pleasures the river flowed gently its waters shimmering in the sunlight birds chirped happily in the trees adding to the peaceful atmosphere children played nearby their laughter echoing through the air flowers bloomed in vibrant colors painting the landscape with beauty it was a perfect day filled with simple pleasures."
];
document.addEventListener('DOMContentLoaded', ()=>{
    input.focus();
})
let textselector= Math.floor(Math.random()*container.length);
let text= container[textselector];
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
