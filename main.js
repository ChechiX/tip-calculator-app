const billInput = document.getElementById('billInput');
const tipOptions = document.getElementById('tipOptions');
const tipOptionsButtons = tipOptions.querySelectorAll('button');
const peopleInput = document.getElementById('peopleInput');
const tipAmountElement = document.getElementById('tipAmount');
const totalAmountElement = document.getElementById('totalAmount');
const customTipInput = document.getElementById('customTip');
const resetButton = document.getElementById('resetBtn');
const errorMessage = document.getElementById('errorMessage');

let selectedTipPercentage = 15;

const updateResetButtonState = () => {
  const hasBillValue = billInput.value !== '';
  const hasTipSelected =
    document.querySelector('.tip-options__button--active') !== null ||
    customTipInput.value !== '';
  const hasPeopleValue = peopleInput.value !== '';

  if (hasBillValue || hasTipSelected || hasPeopleValue) {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
  }
};

const calculateTip = () => {
  const billAmount = +billInput.value;
  const tipAmount = billAmount * (selectedTipPercentage / 100);
  const totalAmount = billAmount + tipAmount;
  const peopleCount = +peopleInput.value;

  if (peopleCount === 0) {
    tipAmountElement.textContent = '$0.00';
    totalAmountElement.textContent = '$0.00';
    return;
  }

  tipAmountElement.textContent = `$${(tipAmount / peopleCount).toFixed(2) || '0.00'}`;
  totalAmountElement.textContent = `$${(totalAmount / peopleCount).toFixed(2)}`;
};

tipOptionsButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tipOptionsButtons.forEach((btn) => {
      btn.classList.remove('tip-options__button--active');
    });

    button.classList.add('tip-options__button--active');

    selectedTipPercentage = +button.textContent.trim().slice(0, -1);

    calculateTip();
    updateResetButtonState();
  });
});

billInput.addEventListener('input', () => {
  calculateTip();
  updateResetButtonState();
});

peopleInput.addEventListener('input', () => {
  if (peopleInput.value === '0') {
    errorMessage.classList.add('people-group__error--active');
    peopleInput.classList.add('people-container__input--error');
  } else {
    errorMessage.classList.remove('people-group__error--active');
    peopleInput.classList.remove('people-container__input--error');
  }

  updateResetButtonState();
  calculateTip();
});

customTipInput.addEventListener('input', () => {
  selectedTipPercentage = +customTipInput.value;

  tipOptionsButtons.forEach((btn) => {
    btn.classList.remove('tip-options__button--active');
  });

  updateResetButtonState();
  calculateTip();
});

resetButton.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';

  tipOptionsButtons.forEach((btn) => {
    btn.classList.remove('tip-options__button--active');
  });

  selectedTipPercentage = 0;

  tipAmountElement.textContent = '$0.00';
  totalAmountElement.textContent = '$0.00';

  updateResetButtonState();
});
