"use strict";

document.addEventListener("DOMContentLoaded", function () {
    let arr = [];
    let currentI = 0;

    const container = document.getElementById("array-container");
    const inputField = document.getElementById("array-input");
    const initBtn = document.getElementById("init-btn");
    const stepBtn = document.getElementById("step-btn");
    const statusMessage = document.getElementById("status-message");

    // Функція відмальовки масиву
    function renderArray(swappedIndices) {
        container.innerHTML = "";
        arr.forEach(function (value, index) {
            const div = document.createElement("div");
            div.className = "array-element";
            div.textContent = value;

            // Якщо індекс елемента є серед тих, що змінив місце, робимо його жовтим
            if (swappedIndices && swappedIndices.includes(index)) {
                div.classList.add("yellow");
            }

            container.appendChild(div);
        });
    }

    // Ініціалізація масиву з інпуту
    function initArray() {
        const rawValue = inputField.value;
        arr = rawValue.split(",").map(function (item) {
            return parseInt(item.trim(), 10);
        }).filter(function (item) {
            return !isNaN(item);
        });

        if (arr.length === 0) {
            statusMessage.textContent = "Помилка: введіть коректні числа через кому.";
            return;
        }

        currentI = 0;
        renderArray([]);
        stepBtn.disabled = false;
        statusMessage.textContent = "Масив завантажено. Натисніть 'Наступна ітерація' для початку сортування.";
    }

    // Логіка однієї ітерації SelectionSort
    function selectionSortStep() {
        if (currentI >= arr.length - 1) {
            statusMessage.textContent = "Сортування завершено!";
            stepBtn.disabled = true;
            renderArray([]);
            return;
        }

        let minIndex = currentI;
        let j;

        // Шукаємо мінімальний елемент у невідсортованій частині
        for (j = currentI + 1; j < arr.length; j += 1) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        let swapped = [];

        // Якщо знайшли елемент, менший за поточний, міняємо їх місцями
        if (minIndex !== currentI) {
            const temp = arr[currentI];
            arr[currentI] = arr[minIndex];
            arr[minIndex] = temp;

            swapped = [currentI, minIndex];
            statusMessage.textContent = "Ітерація " + (currentI + 1) + ": міняємо місцями " + arr[minIndex] + " та " + arr[currentI] + ".";
        } else {
            statusMessage.textContent = "Ітерація " + (currentI + 1) + ": елемент " + arr[currentI] + " вже на своїй позиції, обміну немає.";
        }

        // Відмальовуємо масив, передаючи індекси елементів для жовтої підсвітки
        renderArray(swapped);
        currentI += 1;
    }

    // Додавання обробників подій відповідно до сучасних стандартів
    initBtn.addEventListener("click", initArray);
    stepBtn.addEventListener("click", selectionSortStep);
});