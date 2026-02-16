const billInput = document.getElementById('billInput');
const tipOptions = document.getElementById('tipOptions');
const tipOptionsButtons = tipOptions.querySelectorAll('button');

console.log(billInput.value);

tipOptionsButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tipOptionsButtons.forEach((btn) => {
      btn.classList.remove('tip-options__button--active');
    });

    button.classList.add('tip-options__button--active');
  });
});
