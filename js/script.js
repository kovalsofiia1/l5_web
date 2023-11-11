// 1. Поміняйте місцями тексти, позначені «х» та «у».
(() => {
    const xNode = document.querySelector('.page-title');
    const yNode = document.querySelector('.footer-text');

    const xNodeText = xNode.textContent;
    const yNodeText = yNode.textContent;
    xNode.textContent = yNodeText;
    yNode.textContent = xNodeText;
    
})();

// 2. Напишіть функцію, яка обчислює площу трапеції,
// беручи необхідні значення із відповідних змінних у
// скрипті, і виводить отриманий результат в кінці
// контенту в блоці «3».

const formSquare = document.querySelector(".countSquare");

formSquare.addEventListener("submit", countSquare);

function countSquare(event) {
    event.preventDefault();
    const form = event.target;
    const topSide = form.elements.topSide.value;
    const bottomSide = form.elements.bottomSide.value;
    const height = form.elements.height.value;

    const square = (Number(topSide) + Number(bottomSide)) * Number(height) * 0.5;
    
    const resultNode = document.querySelector(".result");
    resultNode.textContent = square;
    
    // form.reset();
}

// 3. Напишіть скрипт, який «перевертає» задане
// натуральне число (247 -> 742), беручи необхідне
// значення із відповідної форми в блоці «3», а
// отриманий результат виводить за допомогою
// діалогового вікна на екран і зберігає в cookies,
// причому:

// а) при оновленні веб-сторінки в броузері користувачу за допомогою
// діалогового вікна виводиться інформація, збережена в cookies, із питанням про
// необхідність зберегти дані із cookies, і не виводиться згадана вище форма;
// б) при підтвердженні питання виводиться наступне діалогове вікно із
// інформуванням користувача про наявність cookies і необхідність
// перезавантаження веб-сторінки;
// в) при відмові відповідні cookies видаляються, і веб-сторінка оновлюється з
// початковим станом із наявною формою для введення даних.

const formReverse = document.querySelector(".reverseNumber");

formReverse.addEventListener("submit", reverseNum);

function reverseNum(event) {
   
    event.preventDefault();
    const form = event.target;
    const toReverse = form.elements.numberToReverse.value+"";
    let reversed = "";
    
    for (let a = 0; a < toReverse.length; a++) {
        reversed = toReverse[a] + reversed;
    }
    
    const resultNode = document.querySelector(".result-reverse");
    resultNode.textContent = reversed + "; It`s saved to cookies!";
    alert("Reversed number: " + reversed + ";");

    document.cookie = "reversedNumber=" + reversed + "; expires=" + new Date(2024, 1, 1) + "; path=/";
    
}

window.onload = function () {
    if (document.cookie) {
            formReverse.style.display = 'none';

        const userConfirmation = confirm("Cookies: " + document.cookie + ". Save cookies?");

        if (userConfirmation) {
            alert("We already have cookies. Reload page to continue working with form!");
        } else {
            document.cookie = "reversedNumber=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            formReverse.style.display = 'block';
            location.reload();
            
        }
    }
};



// 4. Напишіть скрипт, який при настанні події click задає вирівнювання по лівому
// краю вмісту блоків «2», «3», «4» при встановленні користувачем відповідних
// радіокнопок у формі і зберігає відповідні значення в localStorage броузера так,
// щоб при наступному відкриванні веб-сторінки властивості вирівнювання по
// лівому краю вмісту блоків «2», «3», «4» встановлювались із збережених
// значень в localStorage.

const updateAlignment = (blockToAlign) => {
    if (blockToAlign=== 'sBlock') {
        document.querySelector(".menu").style.marginLeft = '0';
      document.querySelector(".left h2").style.marginLeft = '0';
    }
    else if (blockToAlign=== 'tBlock') {
        document.querySelector(".countSquare").style.marginLeft = '0';
        document.querySelector(".reverseNumber").style.marginLeft = '0';
        document.querySelector(".allign-elements").style.marginLeft = '0';
        document.querySelector(".allign-elements").style.textAlign = 'left';
    }
    else {
        document.querySelector(".right").style.textAlign = 'left';
    }
}
const allignBlock = localStorage.getItem('alignment');
if (allignBlock) {
    updateAlignment(allignBlock);
}

function handleAlignmentClick(event) {
    document.querySelector(".menu").style.marginLeft = 'auto';
   document.querySelector(".left h2").style.marginLeft = 'auto';
    document.querySelector(".right").style.textAlign = 'center';
    document.querySelector(".countSquare").style.marginLeft = 'auto';
    document.querySelector(".reverseNumber").style.marginLeft = 'auto';
    document.querySelector(".allign-elements").style.textAlign = 'center';
    
    updateAlignment(event.target.id);
    
    localStorage.setItem('alignment', event.target.id);
    
}

document.querySelector('.allign-elements').addEventListener('click', handleAlignmentClick);


// 5. Напишіть скрипт створення нумерованого списку:
// а) необхідні елементи форми появляються у відповідних номерних блоках (1..6)
// внаслідок події focus на обраному посиланні в блоці;
// б) кількість пунктів нумерованого списку необмежена;
// в) поруч розміщується кнопка, при натисканні на яку внесені дані нумерованого
// списку зберігаються в localStorage броузера (структуровано на ваш розсуд), а
// сам список заміщує початковий вміст відповідного номерного блока;
// г) поруч з кожним елементом списку розміщується кнопка, внаслідок
// натискання на яку даний елемент списку видаляється із localStorage і
// прибирається із веб-сторінки.


function addItem() {
   
     // Get the input value
    const newItem = document.getElementById('itemText').value;
    const ol = document.getElementById('dynamicList');
    if (newItem) {
        // Create a new list item
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.setAttribute('style', 'display: flex; justify-content:space-between;');
        div.appendChild(document.createTextNode(newItem));
        const deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('Delete'));
        deleteButton.onclick = function () {
            ol.removeChild(li);
            if (localStorage.getItem('listValues')) {
                addToStorage();
            }
        };
        div.appendChild(deleteButton);
        li.appendChild(div);
        ol.appendChild(li);

        
    }
    document.querySelector('.itemText').value = '';
   
}
function addToStorage() {

    let storageValue = '';
    const ol = document.getElementById('dynamicList');
    const liElements = ol.getElementsByTagName("li");
    for (let i = 0; i < liElements.length; i++) {
        const textNode=liElements[i].getElementsByTagName('div')[0].textContent
        storageValue += textNode.slice(0, textNode.length-6) + ';';
    }
    localStorage.setItem('listValues', storageValue);
    console.log(storageValue);
    console.log(liElements);
    const parentClass = localStorage.getItem('formInBlock');
    const parent = document.querySelector(parentClass);
    const content = parent.firstElementChild;
    content.style.display = 'none';
    console.log(content);
}


function removeForm(blockClass) {
    const block = document.querySelector(blockClass);
    console.log(block.innerHTML);
    block.innerHTML=block.innerHTML.slice(0, block.innerHTML.indexOf('<form class="create-list">'));
}

function handleLinkFocus(link) {
    if (localStorage.getItem('hasForm')) {
        console.log(localStorage.getItem('hasForm'));
        
        removeForm(localStorage.getItem('formInBlock'));
        localStorage.removeItem('hasForm');
       
    }
    
    console.log(`Link is focused ${link.id.slice(0, link.id.length - 6)}.`);
        const blockClass = link.id.slice(0, link.id.length - 6);
        const block = document.querySelector("." + blockClass);
        console.log(block.innerHTML);
        block.innerHTML += '<form class="create-list">' +
            '<h4 class="form-title">Create list</h4>' +
            '<div class="list-input-container">' +
            '<label for="itemText">List item text: </label>' +
            '<input type="text" class="itemText" id="itemText" name="itemText" required />' +
            '</div>' +
            '<button type="button" onclick="addItem()" class="form-button">' +
            'Add item' +
            '</button>' +
            '</form>' +
            '<div id="listContainer">' +
            '<h4 class="form-title">My list:</h4>' +
            '<ol id="dynamicList"></ol>' +
            '</div>' +
            '<button type="button" onclick="addToStorage()" class="form-button">' +
            'Add to storage and replace content' +
            '</button>' ;
    
    localStorage.setItem('hasForm', 'true');
    localStorage.setItem('formInBlock', '.' + blockClass);
    
}
const elements = document.getElementsByClassName('choose-block-link');
console.log(elements);
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', (event) => { event.preventDefault(); });
}
