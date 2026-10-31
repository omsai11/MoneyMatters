const SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbznvXzLpifwdTf4PJJt_QQhqpg6UXr4BX5hKeFroPNwr0G-SifK-A9adS_AehqJLg0F/exec';

const form = document.getElementById('moneyForm');
const amountInput = document.getElementById('amount');
const reasonInput = document.getElementById('reason');
const statusBox = document.getElementById('status');

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = `status ${type}`;
}

function validateFields(type) {
  const amount = Number(amountInput.value);
  const reason = reasonInput.value.trim();

  if (!amount || amount <= 0) {
    showStatus('Please enter a valid amount greater than zero.', 'error');
    amountInput.focus();
    return false;
  }

  if (!reason) {
    showStatus('Please enter a reason for this transaction.', 'error');
    reasonInput.focus();
    return false;
  }

  if (!type || (type !== 'Spent' && type !== 'Received')) {
    showStatus('Please choose whether this was spent or received.', 'error');
    return false;
  }

  return true;
}

async function saveTransaction(type) {
  if (!validateFields(type)) {
    return;
  }

  const payload = {
    type,
    amount: Number(amountInput.value),
    reason: reasonInput.value.trim(),
    date: new Date().toISOString()
  };

  if (!SHEET_WEB_APP_URL || SHEET_WEB_APP_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT')) {
    showStatus('Google Apps Script URL is missing. Add your deployed web app URL in script.js.', 'error');
    return;
  }

  try {
    const response = await fetch(SHEET_WEB_APP_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || result.status !== 'success') {
      throw new Error(result.message || 'Unable to save the transaction.');
    }

    showStatus(`${type} record saved successfully.`, 'success');
    form.reset();
    amountInput.focus();
  } catch (error) {
    showStatus(error.message || 'Something went wrong while saving the transaction.', 'error');
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const submitter = event.submitter;
  const type = submitter && submitter.dataset.type ? submitter.dataset.type : 'Spent';
  saveTransaction(type);
});
