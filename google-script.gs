function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const type = String(payload.type || '').trim();
    const reason = String(payload.reason || '').trim();
    const amount = Number(payload.amount);
    const date = payload.date || new Date().toISOString();

    if (!type || (type !== 'Spent' && type !== 'Received')) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Transaction type is missing or invalid.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!reason) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Reason is required.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!amount || amount <= 0) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Amount must be greater than zero.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName('Transactions');

    if (!sheet) {
      sheet = spreadsheet.insertSheet('Transactions');
      sheet.appendRow(['Date', 'Type', 'Reason', 'Amount']);
    }

    const headers = sheet.getRange(1, 1, 1, 4).getValues()[0];
    const headerMap = {
      Date: headers.indexOf('Date'),
      Type: headers.indexOf('Type'),
      Reason: headers.indexOf('Reason'),
      Amount: headers.indexOf('Amount')
    };

    if (headerMap.Date === -1 || headerMap.Type === -1 || headerMap.Reason === -1 || headerMap.Amount === -1) {
      sheet.appendRow(['Date', 'Type', 'Reason', 'Amount']);
    }

    const row = [
      new Date(date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      type,
      reason,
      amount
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Transaction saved successfully.'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.message || 'Unknown server error.'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Google Apps Script web app is active.'
  })).setMimeType(ContentService.MimeType.JSON);
}
