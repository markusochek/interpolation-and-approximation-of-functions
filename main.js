import {calculateInterpolationPolynomial} from "./CalculateInterpolationPolynomial.js";
import {spline} from "./Spline.js";
import {bestQuadraticApproximation} from "./BestQuadraticApproximation.js";

let names = ["введите все X ",
             "введите все Y "]

let N = 25;
let k = 5;
let m = 8
let values = [`0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9 1.0`,
              `${0.2 * N} ${0.3 * m} ${0.5 * k} ${0.6 * N} ${0.7 * m} ${k} ${0.8 * N} ${1.2 * k} ${1.3 * m} ${N}`]

let inputs = []

for(let i = 0; i < 2; i++) {
    let div = document.createElement("div");

    let label = document.createElement("label");
    label.textContent = names[i];

    inputs.push(document.createElement("input"));
    inputs[i].placeholder = names[i];
    inputs[i].defaultValue = values[i];

    div.append(label, inputs[i])
    document.body.append(div);
}

names = ["calculate interpolation polynomial",
         "spline",
         "best quadratic approximation"];

let functions = [(div) => showLx(div, calculateInterpolationPolynomial(inputs)),
                 (div) => showSpline(div, spline(inputs)),
                 (div) => showBestQuadraticApproximation(div, bestQuadraticApproximation(inputs))];

for (let i = 0; i < functions.length; i++) {
    let div = document.createElement("div")
    let button = document.createElement("button");
    button.textContent = names[i]
    button.onclick = (div) => functions[i](div)
    div.append(button)

}



function showLx(Lx) {
    let str = "L(x) = " + Lx[0] + "\n";
    for(let i = 1; i < Lx.length; i++) {
        str += "+ x^" + i + " * " + Lx[i] + "\n";
    }
    getTextarea(str);
}

function showSpline(elements) {
    let [bAll, aAll, X, Y] = elements;

    let str = "";
    for(let i = 0; i < Y.length-1; i++) {
        if (aAll[i]) {
            str += `${aAll[i]} * (x-${X[i]})^2`;
        }
        if (bAll[i]) {
            str += ` + ${bAll[i]} * (x-${X[i]})`;
        }
        str += ` при x принадлежащем [${X[i]}, ${X[i+1]}]` + "\n";
    }
    getTextarea(str);
}


function showBestQuadraticApproximation(A) {
    let str = "φ(x) = " + A[0]
    for (let i = 1; i < A.length; i++) {
        str += ` + ${A[i]} * x^` + i;
    }
    getTextarea(str);
}



function getTextarea(str) {
    let textarea = document.createElement("textarea");
    textarea.textContent = str;
    textarea.cols = 30;
    textarea.rows = 30;
    document.body.append(textarea)
}