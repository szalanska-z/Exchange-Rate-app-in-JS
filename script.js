const currencyOne = document.querySelector("#currency-one");
const currencyTwo = document.querySelector("#currency-two");
const amountOne = document.querySelector(".amount-one");
const amountTwo = document.querySelector(".amount-two");
const swapBtn = document.querySelector(".swap");
const rateInfo = document.querySelector(".rate-info");

const calculate = () => {
  fetch(
    `https://api.ratesapi.io/api/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      const currency1 = currencyOne.value;
      const currency2 = currencyTwo.value;
      const rate = data.rates[currency2];
      rateInfo.innerHTML = `1 ${currency1} = <span>${rate.toFixed(
        4
      )}</span> ${currency2}`;
      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
};

const swap = () => {
  const oldValue = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = oldValue;
  calculate();
};

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
swapBtn.addEventListener("click", swap);

calculate();
