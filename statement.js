const createStatementData = require('./createStatementData.js');

const invoice = require('./invoices.json');
const plays = require('./plays.json');

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data, plays){
    let result = `청구 내역 (고객명: ${data.customer})\n`;
    
    for (let perf of data.performances) {
        result += `  ${perf.play.name}: ${usd(perf.amount)}원 (${perf.audience}석)\n`;
    }

    result += `총액: ${usd(data.totalAmount)}원\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
    return result;
}

function htmlStatement(invoice, plays){
    return renderHtml(createStatementData(invoice,plays));
}

function renderHtml(data){
    let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
    for (let perf of data.performances) {
        result += `  <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>`;
    }
    result += "</table>\n";
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
    return result;
}

// format 함수 추출
function usd(aNumber){
    return new Intl.NumberFormat("en-US", 
                    {style:"currency"
                        , currency: "USD"
                        , minimumFractionDigits:2}
                    ).format(aNumber/100);
}
module.exports = statement;

// 실행
console.log(statement(invoice[0], plays));

 