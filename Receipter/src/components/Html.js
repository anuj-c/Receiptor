import React from 'react';

const generateInvoiceNo = () => {
  let a = Math.floor(Math.random() * 1000);
  let b = Math.floor(Math.random() * 1000);
  return `#${a}-${b}`;
};

const HTML = (shopName, items, addr, date, buyer, total) => {
  const itemList = () => {
    let str = ``;
    items.forEach((item, index) => {
      str += `
      <tr class="item">
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.ppq}</td>
        <td>${item.discount}</td>
        <td>${item.gst}</td>
        <td>Rs. ${item.total}</td>
      </tr>
      `;
    });
    return str;
  };
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <style>
        .invoice-box {
          max-width: '85%';
          margin: auto;
          padding: 30px;
          border: 1px solid rgb(175, 175, 175);
          font-size: 16px;
          line-height: 24px;
          font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color: #555;
        }
  
        .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
        }
  
        .invoice-box table td {
          padding: 5px;
          vertical-align: top;
        }
  
        .invoice-box table tr td:nth-child(6) {
          text-align: right;
        }
  
        .invoice-box table tr.top table td {
          padding-bottom: 20px;
        }
  
        .invoice-box table tr.top table td.title {
          font-size: 45px;
          line-height: 45px;
          color: #333;
        }
  
        .invoice-box table tr.information table td {
          padding-bottom: 40px;
        }
  
        .invoice-box table tr.heading td {
          background: #eee;
          border-bottom: 1px solid #ddd;
          font-weight: bold;
        }
  
        .invoice-box table tr.details td {
          padding-bottom: 20px;
        }
  
        .invoice-box table tr.item td {
          border-bottom: 1px solid #eee;
        }
  
        .invoice-box table tr.item.last td {
          border-bottom: none;
        }
  
        .invoice-box table tr.total td:nth-child(6) {
          border-top: 2px solid #eee;
          font-weight: bold;
        }
  
        @media only screen and (max-width: 600px) {
          .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
          }
  
          .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
          }
        }
  
        /** RTL **/
        .invoice-box.rtl {
          direction: rtl;
          font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial,
            sans-serif;
        }
  
        .invoice-box.rtl table {
          text-align: right;
        }
  
        .invoice-box.rtl table tr td:nth-child(6) {
          text-align: left;
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
          <tr class="top">
            <td colspan="2">
              <table>
                <tr>
                  <td class="title">
                    <span>${shopName}</span><br />
                    <span style="font-size: 20px">${addr}</span>
                  </td>
  
                  <td></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table cellpadding="0" cellspacing="0">
          <tr class="information">
            <td>
              <table>
                <tr>
                  <td style="width: 70%;">
                    To,<br />
                    <b>${buyer.name}</b><br />
                    <b>+91 ${buyer.number}</b>
                  </td>
                  <td>
                    Invoice ${generateInvoiceNo()}<br />
                    Issue Date: <b>${date.toDateString()}</b><br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table cellpadding="0" cellspacing="0">
          <tr class="heading">
            <td style="width: 40%">Item Name</td>
            <td>Qty</td>
            <td>Unit Price</td>
            <td>Discount%</td>
            <td>GST%</td>
            <td>Amt</td>
          </tr>
  
          ${itemList()}
  
          <tr class="total">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style="text-align: right">Total:</td>
  
            <td>Rs. ${total}</td>
          </tr>
        </table>
        <p>Thank you for your business</p>
      </div>
    </body>
  </html>
  `;
  return html;
};

export default HTML;
