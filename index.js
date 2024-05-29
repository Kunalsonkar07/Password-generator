
const sliderinput = document.querySelector("[data-sliderinput]");
const lengthdisplay = document.querySelector("[data-passwordlength]");

const passwordisplay = document.querySelector("[data-passworddisplay]");
const copy = document.querySelector("[data-copy]");
const copymsg = document.querySelector("[data-copymsg]");

const uppercases = document.getElementById("uppercase");
const lowercases = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const indicator = document.querySelector("[data-indicator]");
const generatorbin = document.querySelector(".generate");

let password = "";
let passwordsize = 10;
let checkcount = 0 ;
let symbol = '!@#$';
handleslider();
// setindicator(red);
// setindicator(green);
setindicator('#888888');

function getrandomint(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function handleslider() {
    lengthdisplay.innerText = passwordsize;
    sliderinput.value = passwordsize;

    // part for image in slider 
    const min = sliderinput.min ;
    const max = sliderinput.max ;

    sliderinput.style.backgroundSize = ( passwordsize - min )* 100  / ( max - min ) + '% 100%' ;
}

function setindicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "0px 0px 20px 0px "+ color;
}

function giveramInt() {
    return getrandomint(9, 0);
}

function giveranupperchar() {
    return String.fromCharCode(getrandomint(91 , 65 ));
}

function giveranlowercase() {
    return String.fromCharCode(getrandomint(123 , 97));
}

function givesymbol() {
    let num = getrandomint(symbol.length, 0);
    return symbol.charAt(num);
}

function calcstrength() {
    let uppercase = false;
    let lowercase = false;
    let number = false;
    let symbol = false;

    if (uppercases.checked)
        uppercase = true;
    if ( lowercases.checked)
         lowercase = true;
    if ( numbers.checked)
         number = true;
    if ( symbols.checked)
         symbol = true;

    if ( uppercase && lowercase && ( symbol || number ) && passwordsize >= 8 )
        setindicator('#00FF00')
    
    else{
        setindicator('#FF0000');
    }
}

async function copycontent (){

    try {
        await navigator.clipboard.writeText(passwordisplay.value);
        copymsg.innerText = "Copied" ;
    }
    catch(e){
        copymsg.innerText = " failed" ;
    }

    copymsg.classList.add('active') ;

    setTimeout( () => {
        copymsg.classList.remove('active');
    }, 2000) ;
}

// change nahi kar rahe niche wale func mai a usse move karne ke baad value change hoti hai 

sliderinput.addEventListener('input', (e) => {
    passwordsize = e.target.value ;
    handleslider() ;
})

copy.addEventListener('click', () => {
    if ( passwordisplay.value ){
        copycontent() ;
    }
})

const allcheckbox = document.querySelectorAll("input[type=checkbox]");

function upgradecount(){
    checkcount = 0 ;
    allcheckbox.forEach( (checkbox) => {
        if ( checkbox.checked){
            checkcount++ ;
        }
    })
    // babbar correction for IQ 

    if ( passwordsize < checkcount){
        passwordsize = checkcount ;
        handleslider() ;
    }
}

allcheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change' , upgradecount);
    // () nahi aaega function name bas .....
})

function shaffule(array){
    for( let i = array.length - 1 ; i > 0 ; i--){
        let j = Math.floor ( Math.random() * (i + 1 ));
        let temp = array[j] ;
        array[j] = array[i] ;
        array[i] = temp ;
    }
    let str = "" ;
    array.forEach( (el) => {
        str += el ;
    })
    return str ;
}

generatorbin.addEventListener('click' , () => {

    // console.log(checkcount) ;
    if ( checkcount <= 0 )
        // console.log ("kunalop");
        return ;
    
    // console.log ("kunalop");
    if ( passwordsize < checkcount ){
        passwordsize = checkcount ;
        handleslider() ;
    }

    // console.log("checking done") ;

    let funcarr = [] ;

    if ( uppercases.checked)
        funcarr.push(giveranupperchar);
    if ( lowercases.checked)
        funcarr.push(giveranlowercase);
    if ( numbers.checked)
        funcarr.push(giveramInt);    
    if ( symbols.checked)
        funcarr.push(givesymbol);
    
    password = "";

    // console.log("function ready");

    for ( let i = 0 ; i < funcarr.length ; i++ ){
        password += funcarr[i]();
    }

    // console.log("compulsory addition done" ) ;

    let p = passwordsize - funcarr.length ;
    for( let i = 0 ; i < p  ; i++ ){
        let random = getrandomint( funcarr.length , 0);
        password += funcarr[random]();
    }
    // console.log(" addition done" ) ;

    password = shaffule( Array.from(password));

    // console.log("password ready shuufling done") ;

    passwordisplay.value = password ;
    // console.log("upgraded");
    calcstrength();

})

