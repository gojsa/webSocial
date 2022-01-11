//Pozivanje funkcija//
//1. worning poruke: GojsaMessageWorning(polje, poruka) -- za apex ex. GojsaMessageWorning("P7_NEW","Worning poruka nece da moze")
//2. Worning poruka bez oblaka GojsaMessageWorningText(polje, poruka)
//3. Time picker: GojsaTimePicker(item) item je hidden na osnovu njega ce se time picker pojaviti, i on ce cuvat vrijednost vremena 
//4. GojsaMessageError() error na prazna input polja, u funkciju ubaciti argumente: 1. id dugmeta, 2.tekst poruke, ostali argumenti su nazivi input polja, neogranicen broj
//5. GojsaBagde(number)
//6. GojsaCtoL(word, true) Pretvara rijec iz ćerilice u latinicu i obrnuto, prvi parametar je rijec a drugi je uslovan, ako je true onda pretvara iz ćerilice u latinicu, ako nije onda obrnuto
//7. GojsaCalculator(num1, num2, operator) - digitron
//8. GojsaCheckPass(polje, polje2) Provjerava dal se sifre u input poljima podudaraju
//9. GojsacheckForAllEmptyInputs Provjerava vise input polja da li su prazna
//10. GojsaCapsLockCheck (item ,message)Provjerava dal je caps lock upaljen

function Z(id) {
    if (id.includes(".")) {
        return document.querySelector(id);
    } else {
        return document.getElementById(id)
    }
}
function Zv(id) {
    return document.getElementById(id).value;
}


function Zs(id, text) {
    return document.getElementById(id).value = text;
}
function cl(nesto) {
    return console.log(nesto)
}
function Zc(tag) {
    return document.createElement(tag);
}

////////////////////Funkcija za worning poruke za iteme////////////////////////////////////////////////////////////////
function GojsaMessageWorning(polje1, poruka) {


    let inputPolje = Z(polje1);

    inputPolje.classList.add("polje_pozicija")

    inputPolje.addEventListener("focus", () => {
        worningMess(inputPolje, "poruka_za_input")
    })

    function worningMess(polje, klasa) {
        if (Z(`.${CSS.escape(polje1)}_W_G`)) {
            // Z(`.${CSS.escape(polje1)}_W_G`).classList.remove("hide-worning")
            Z(`.${CSS.escape(polje1)}_W_G`).style.opacity = "1";
        } else {
            let div = Zc("div");
            div.classList.add("poruka_za_input", polje1 + "_W_G");
            div.innerText = poruka;

            polje.parentElement.appendChild(div);

        }
    }

    inputPolje.addEventListener("focusout", () => {
        hide(polje1);


    })
}

//Funkciju pozivat on lose focus

function hide(polje) {
    if (Z(`.${CSS.escape(polje)}_W_G`)) {
        // Z(`.${CSS.escape(polje)}_W_G`).classList.add("hide-worning")
        Z(`.${CSS.escape(polje)}_W_G`).style.opacity = "0";

    }

}


////////////////////////////////////////worning bez oblaka//////////////////////////////////////////////////////////////
function GojsaMessageWorningText(polje1, poruka) {


    let inputPolje = Z(polje1);

    inputPolje.classList.add("polje_pozicija")

    inputPolje.addEventListener("focus", () => {
        worningMess(inputPolje, "poruka_za_input")
    })

    function worningMess(polje, klasa) {
        if (Z(`.${CSS.escape(polje1)}_W_G`)) {
            // Z(`.${CSS.escape(polje1)}_W_G`).classList.remove("hide-worning")
            Z(`.${CSS.escape(polje1)}_W_G`).style.opacity = "1";
        } else {
            let div = Zc("div");
            // div.classList.add("poruka_za_input", polje1 + "_W_G");
            div.classList.add(polje1 + "_W_G");
            div.style.color = "#ff6700"
            div.style.marginBottom = "-14px"
            div.innerText = poruka;
            polje.parentElement.style.display = "block";
            polje.style.width = "100%";
            polje.parentElement.appendChild(div);

        }
    }

    inputPolje.addEventListener("focusout", () => {
        hide(polje1);


    })
}

//Funkciju pozivat on lose focus

function hide(polje) {
    if (Z(`.${CSS.escape(polje)}_W_G`)) {
        // Z(`.${CSS.escape(polje)}_W_G`).classList.add("hide-worning")
        Z(`.${CSS.escape(polje)}_W_G`).style.opacity = "0";


    }

}

/////////////////////////////////////////////end worning bez oblaka/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////TIME PICKER///////////////////////////////////////////////////////////////////////////////


var satV = "00";
var minutV = "00";
var vrijemeV;

function GojsaTimePicker(item) {
    const cssSatMinut = `
    margin-top: -29px !important;
    height: 53px !important;
    text-align: center !important;
    font-weight: 600;
    vertical-align: middle !important;
    border-radius: 4px;
    border-width: 1px;
    `;

    const cssDivs = "display: inline-block !important;";
    let itemApp = Z(item)

    let div = Zc("div");
    div.classList.add("time_pick_change_position")
    div.style.width = "171px"
    let div4 = Zc("div");
    div4.setAttribute("id", "div_4_id");
    div4.classList.add("div4");

    let divSat = Zc("div");
    divSat.classList.add("div_sat");
    let divMin = Zc("div");
    divMin.classList.add("div_min");
    let p = Zc("p");
    p.classList.add("p_dot");
    p.innerText = ":";

    div4.appendChild(p);


    //button sat +
    let satPlus = Zc("button");
    satPlus.classList.add("sat_plus");
    satPlus.setAttribute("id", "sat_plus_id");
    satPlus.innerText = "+";
    let div1 = Zc("div");
    div1.setAttribute("id", "div_1_id");
    div1.classList.add("div1");
    div1.appendChild(satPlus);

    //button sat -
    let satMinus = Zc("button");
    satMinus.classList.add("sat_minus");
    satMinus.setAttribute("id", "sat_minus_id");
    satMinus.innerText = "-";
    let div2 = Zc("div");
    div2.setAttribute("id", "div_2_id");
    div2.classList.add("div2");
    div2.appendChild(satMinus)


    //input polja
    let inputSat = Zc("input"); //////////////////////////
    inputSat.classList.add("sat");
    inputSat.setAttribute("id", "sat_id");
    let div3 = Zc("div");
    div3.setAttribute("id", "div_3_id");
    div3.classList.add("div3");
    div3.appendChild(inputSat)

    //button sat +
    let minutPlus = Zc("button");
    minutPlus.classList.add("minut_plus");
    minutPlus.setAttribute("id", "minut_plus_id");
    minutPlus.innerText = "+";
    let div6 = Zc("div");
    div6.setAttribute("id", "div_6_id");
    div6.classList.add("div6");
    div6.appendChild(minutPlus)
    // timeP.append(div1, div2, div4, div3, div6)

    //button sat -
    let minutMinus = Zc("button");
    minutMinus.classList.add("minut_minus");
    minutMinus.setAttribute("id", "minut_minus_id");
    minutMinus.innerText = "-";
    let div7 = Zc("div");
    div7.setAttribute("id", "div_7_id");
    div7.classList.add("div7");
    div7.appendChild(minutMinus)
    let div_6_7 = Zc("div");

    div_6_7.classList.add("div_6_7");
    div_6_7.append(div6, div7)

    let inputMin = Zc("input"); //////////////////////////
    inputMin.classList.add("minut");
    inputMin.setAttribute("id", "minut_id");
    let div5 = Zc("div");
    div5.setAttribute("id", "div_5_id");
    div5.classList.add("div5");
    div5.appendChild(inputMin);
    div.append(div1, div2, div3, div4, div5, div_6_7)
    itemApp.parentElement.append(div)
    itemApp.parentElement.style.display = "block"


    let sat = Z("sat_id");
    let minut = Z("minut_id");
    sat.readOnly = true;
    minut.readOnly = true;

    //default vrijednosti

    var dd = new Date();
    // sat.value = '0' + dd.getHours();
    let trenutnSat = dd.getHours() < 10 ? '0' + dd.getHours() : dd.getHours();
    let trenutniMinut = dd.getMinutes() < 10 ? '0' + dd.getMinutes() : dd.getMinutes();
    sat.value = trenutnSat;
    minut.value = trenutniMinut;
    satV = trenutnSat;
    minutV = trenutniMinut;
    vrijemeV = trenutnSat + ":" + trenutniMinut;
    itemApp.value = vrijemeV

    //sat

    satPlus.addEventListener("click", (e) => {
        e.preventDefault();
        let result = Number(inputSat.value);
        result += 1;
        if (result > 23) {
            result = 00;
            inputSat.value = Number(result);
        }
        if (result < 10) {
            result = "0" + result;
        }
        inputSat.value = result;
        satV = result;

        vrijemeV = time_concat(satV, minutV, item);

    });

    satMinus.addEventListener("click", (e) => {
        e.preventDefault();
        let result = Number(inputSat.value);
        result -= 1;
        if (result < 0) {
            result = 23;
            inputSat.value = result;
        }
        if (result < 10) {
            result = "0" + result;
        }
        inputSat.value = result;
        satV = result;

        vrijemeV = time_concat(satV, minutV, item);


    });
    //minut
    minutPlus.addEventListener("click", (e) => {
        e.preventDefault();
        let result = Number(inputMin.value);
        result += 1;
        if (result > 59) {
            result = 00;
            inputMin.value = Number(result);
        }
        if (result < 10) {
            result = "0" + result;
        }
        inputMin.value = result;
        minutV = result;

        vrijemeV = time_concat(satV, minutV, item);

    });

    minutMinus.addEventListener("click", (e) => {
        e.preventDefault();
        let result = Number(inputMin.value);
        result -= 1;
        if (result < 0) {
            result = 59;
            inputMin.value = result;
        }
        if (result < 10) {
            result = "0" + result;
        }
        inputMin.value = result;
        minutV = result;

        vrijemeV = time_concat(satV, minutV, item);

    });
}
function time_concat(sat, minut, item) {
    let itemApex = Z(item);
    let tacnoVrijeme = sat + ":" + minut;

    itemApex.value = tacnoVrijeme;


    return tacnoVrijeme;

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////ERROR MESSAGE/////////////////////////////////






function GojsaMessageError() {
    function removeErrorMessage(arr) {
        let input;
        arr.map((k, v) => {
            input=Z(k);
            input.addEventListener("keyup", () => {
                if (document.querySelector(`.${CSS.escape(k)}_E_G`)) {
                    document.querySelector(`.${CSS.escape(k)}_E_G`).style.opacity = "0";
                    document.getElementById(k).style.borderColor = ""
                    document.querySelector(`.${CSS.escape(k)}_E_G`).style.display = "none";
    
                }
            })
        })
    
    }
    let arr = [];
    let arr2 =[];
    let = Z(arguments[2]).getAttribute("action")
    const message = arguments[1];
    const button = Z(arguments[0]);
    const onClick = button.getAttribute("type");
    const form = Z(arguments[2]);
    form.setAttribute("action","");
    

    button.setAttribute("type", "")
    for (var i = 0; i < arguments.length; i++) {
       
        if (i > 1) {

            arr.push(arguments[i]);
            arr2.push(arguments[i]);
            let errP = Z(arguments[i]);

            button.addEventListener("click", () => {
                if (errP.value.length === 0) {

                    let att1 = errP.getAttribute("id");
                    if (arr.includes(att1)) {
                        null;
                    } else {
                        arr.push(att1)
                        
                    }

                } else {

                    let att = errP.getAttribute("id")
                    if (Z(`.${CSS.escape(att)}_E_G`)) {
                        Z(`.${CSS.escape(att)}_E_G`).style.opacity = "0"
                        Z(`.${CSS.escape(att)}_E_G`).style.display = "none"

                        Z(att).style.borderColor = ""

                    }
                    arr = arr.filter(e => e != att)


                }
                errorMess(arr, message)

            })

        }
        removeErrorMessage(arr2)
    }
    button.addEventListener("click", () => {
        if (arr.length === 0) {
            eval(onClick)
        }
    })
    function errorMess(arr, message) {

        for (let i = 0; i < arr.length; i++) {
            let input = Z(arr[i]);
            if (Z(`.${CSS.escape(arr[i])}_E_G`)) {
                if (input.value.length > 0) {

                    Z(`.${CSS.escape(arr[i])}_E_G`).style.opacity = "0"
                    Z(arr[i]).style.borderColor = "";
                    Z(`.${CSS.escape(arr[i])}_E_G`).style.display = "none"

                } else {
                    Z(`.${CSS.escape(arr[i])}_E_G`).style.opacity = "1"
                    Z(`.${CSS.escape(arr[i])}_E_G`).style.display = "block"

                    Z(arr[i]).style.borderColor = "#ff0000";

                }
            } else {
                let div = Zc("div");
                div.classList.add("errorMessage", `${arr[i]}_E_G`);
                div.style.marginBottom = "-13px";
                div.style.marginTop = "-3px"
                div.style.display = "block"
                div.style.fontSize = "12px";
                div.innerText = message;
                div.style.color = "#ff0000";
                div.style.transition = "opacity 1s";
                let polje = Z(arr[i])
                polje.style.borderColor = "#ff0000";
                // polje.style.width = "100%";
                polje.parentElement.style.display = "block"


                if (input.value.length === 0) {

                    input.parentElement.append(div);
                }
            }


        }
    }

    arr = []


}

/////////////////////////////////////////////////////////////////////END ERROR MESSAGE//////////////////////////////

/////////////////////////////////////////////////////////////////////BAGDE COUNTER///////////////

function GojsaBagde(number) {
    let div = Zc("div");
    let p = Zc("p");
    div.style.width = "50px"
    div.style.height = "50px"
    div.style.display = "flex";
    div.style.position = "relative"
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.boxShadow = "1px 1px 4px"
    div.style.backgroundColor = "#999999"
    div.style.borderRadius = "50%"
    p.style.textAlign = "center";
    p.style.minWidth = "20px"
    p.style.fontWeight = "600";
    p.style.backgroundColor = "#ff0000bd";
    p.style.padding = "2px";
    p.style.borderRadius = "50%"
    p.style.boxShadow = "0 0 2px black"
    p.style.fontSize = "12px";
    p.innerText = number;
    p.classList.add("box", "bounce-2")
    div.appendChild(p)

    Z(".t-Header-branding").appendChild(div) // Staviti klasu iz templeta

}



////////////////////////////////////////////////////////////////////END BAGDE COUNTER////////////////////////////

///////////////////////////////////////////////////////////////////CHANGE WORDS//////////////////////////////////

function GojsaCtoL(words, cerilicaToLatinica) {
    let cL = [
        "A", "Б", "В", "Г", "Д", "Ђ", "Е", "Ж",
        "З", "И", "Ј", "К", "Л", "Љ", "М", "a",
        "б", "в", "г", "д", "ђ", "е", "ж", "з",
        "и", "ј", "к", "л", "љ", "м", "Н", "Њ",
        "О", "П", "Р", "С", "Т", "Ћ", "Ф", "Х", "Ч",
        "Џ", "Ш", "н", "њ", "о", "п", "р", "с", "т",
        "ћ", "у", "ф", "х", "ц", "ч", "џ", "ш"];


    let lL = [
        "A", "B", "V", "G", "D", "Đ", "E", "Ž",
        "Z", "I", "J", "K", "L", "Lj", "M", "a",
        "b", "v", "g", "d", "đ", "e", "ž", "z",
        "i", "j", "k", "l", "lj", "m", "N", "Nj",
        "O", "P", "R", "S", "T", "Ć", "F", "H", "Č",
        "Dž", "Š", "n", "nj", "o", "p", "r", "s", "t",
        "ć", "u", "f", "h", "c", "č", "dž", "š"]
    if (cerilicaToLatinica) {
        for (let i = 0; i < lL.length; i++) {

            for (let a = 0; a < words.length; a++) {

                words = words.replace(cL[i], lL[i]);
            }
        }
    } else {
        for (let i = 0; i < lL.length; i++) {
            words = words.includes("nj") ? words.replace(/nj/g, "њ") : words;
            words = words.includes("Nj") ? words.replace(/Nj/g, "Њ") : words;
            words = words.includes("lj") ? words.replace(/lj/g, "љ") : words;
            words = words.includes("Lj") ? words.replace(/Lj/g, "Љ") : words;
            words = words.includes("Dž") ? words.replace(/Dž/g, "Џ") : words;
            words = words.includes("dž") ? words.replace(/dž/g, "џ") : words;
            for (let a = 0; a < words.length; a++) {
                words = words.replace(lL[i], cL[i]);

            }


        }
    }
    return words
}





//////////////////////////////////////////////////////////////////END CHANGE WORDS//////////////////////////////////////////////

//////////////////////////////////////////////////////////////////CALCULATOR////////////////////////////////////////////////////
function GojsaCalculator(num1, num2, operator) {
    let result;
    if (num1 && num2 && operator) {
        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2
                break;
            case "/":
                result = num1 / num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            default:
                console.log("Pogresan operator")
        }
    } else {
        return "Wrong parametar or invalid number"
    }
    return result;
}


//////////////////////////////////////////////////////////////////END CALCULATOR////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////CHECK ALL INPUTS///////////////////////////////////////////////
// function GojsacheckForAllEmptyInputs() {
//     let arr = [];
//     let arr2 = [];
//     let button;
//     let onClick;
//     button = Z(arguments[0])
//     onClick = button.getAttribute("onclick");
//     cl(arr)
//     for (var i = 0; i < arguments.length; i++) {
//         button.setAttribute("onclick", "")
//         if (i > 1) {
//             arr.push(String(arguments[i]))
//             arr2.push(String(arguments[i]))
//             let inp = Z(arguments[i])
//             button.addEventListener("click", () => {
//                 if (inp.value.length === 0) {
//                     errorMess(arr,"Polja moraju imati vrijednost!!")
//                 } else {
//                     for (var a = 0; a < arr.length; a++) {
//                         if (arr[a] === String(inp.getAttribute("id"))) {
//                             Z(`.${CSS.escape(arr[a])}_E_G`).style.opacity = "0"
//                             Z(arr[a]).style.borderColor = "";
//                             arr.splice(a, 1);
//                         }
//                     }
//                 }
//                 if (arr.length === 0) {
//                     eval(onClick)
//                 }
//             })
//         }
//     }
//     cl(arr2)
// }
function GojsacheckForAllEmptyInputs() {
    let button = Z(arguments[0]);
    const message = arguments[1];
    let div = Zc("div");
    const css = `
    color: red;
    font-size: 12px;
    `
    div.setAttribute("style", css)
    div.innerText = message;
    const onClick = button.getAttribute("onclick");
    button.setAttribute("onclick", "");
    let input;
    button.addEventListener("click", () => {
        for (let i = 0; i < arguments.length; i++) {
            if (i > 1) {
                input = Z(arguments[i]);
                if (input.value.length > 0) {
                    eval(onClick);
                } else {
                    button.parentElement.append(div)
                }
            }
        }

    })
}


/////////////////////////////////////////////////////////////END CHECK ALL INPUTS////////////////////////////////////////
//////////////////////////////////////////CHECK PASSWORD VALID///////////////////////////////////////////////
function GojsaCheckPass(polje, polje2) {
    function check() {

        const css = "border-width: 2px; border-color: #90EE90; transition: border-color 1s;";
        const prviInput = Z(polje);
        const drugiInput = Z(polje2);
        if (prviInput.value.length > 0 && drugiInput.value.length > 0) {
            if (prviInput.value == drugiInput.value) {

                prviInput.setAttribute("style", css)
                drugiInput.setAttribute("style", css)


            } else {
                prviInput.setAttribute("style", "")
                drugiInput.setAttribute("style", "")
            }
        } else {
            prviInput.setAttribute("style", "")
            drugiInput.setAttribute("style", "")
        }

    }
    const item1 = Z(polje);
    const item2 = Z(polje2);

    item1.addEventListener("keyup", () => {
        check()
    })
    item2.addEventListener("keyup", () => {
        check()
    })
}

//////////////////////////////////////////END CHECK PASSWORD VALID///////////////////////////////////////////////////

///////////////////////////////////////////////////CHECK CAPS LOCK/////////////////////////////////////////////////////


function GojsaCapsLockCheck(item, message) {
    const css = `
        font-size: 12px;
        color: red;
        margin-bottom: -14px;
        margin-top:-2px;
    `;
    let a = Z(item)
    a.addEventListener("keyup", function (event) {
        if (event.getModifierState("CapsLock")) {
            if (Z("id_checkCaps")) {
                Z("id_checkCaps").style.display = "block";
            } else {
                let div = document.createElement("div");
                div.setAttribute("id", "id_checkCaps");
                div.setAttribute("style", css)
                div.innerText = message;
                a.parentElement.style.display = "block";
                a.parentElement.append(div)
            }

        } else {
            if (Z("id_checkCaps")) {
                Z("id_checkCaps").style.display = "none";
            }
        }
    });
    a.addEventListener("focusout", () => {
        Z("id_checkCaps").style.display = "none";
    })

}
///////////////////////////////////////////////////END CHECK CAPS LOCK/////////////////////////////////////////////////////




// let dugme1 = Zc("button");
//     dugme1.setAttribute("id","dugme1")
//     dugme1.innerText = "dugme1"
// let dugme2 = Zc("button");
//     dugme2.setAttribute("id","dugme2")
//     dugme2.innerText = "dugme2"
//     Z("P1_TEST_1").parentElement.append(dugme1, dugme2)

//     dugme1.addEventListener("click",(e)=>{
//         e.preventDefault();
//         Z("input1").value = "DUGME 1"
//     })
//     dugme2.addEventListener("click",(event)=>{
//         event.preventDefault();
//         // cl(111111111111111111)
//         // const myWorker = new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'})));
//         const myWorker = new Worker("worker.js")
//         myWorker.postMessage("do work");
//         cl(55)
//         myWorker.onmessage = function (e){
//             cl(2222222222)
//             Z("input1").value = e.data;
//         }
//     })
