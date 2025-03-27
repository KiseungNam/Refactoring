const invoice = require('./invoices.json');
const plays = require('./plays.json');

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("en-US",
            {style:"currency", currency: "USD"
            , minimumFractionDigits:2}).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf, play);     // 추출한 함수로 변환

        // 포인트 적립
        volumeCredits = Math.max(perf.audience - 30, 0);
        
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if (play.type === "comedy") volumeCredits += Math.floor(perf.audience / 5);

        // 출력 줄 추가
        result += `  ${play.name}: ${format(thisAmount / 100)}원 (${perf.audience}석)\n`;
        totalAmount += thisAmount;
    }

    result += `총액: ${format(totalAmount / 100)}원\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;
}

// 값이 바뀌지 않는 변수는 매개변수로 전달
function amountFor(perf, play){
    let result = 0;     // 변수를 초기화하는 코드

    switch (play.type) {
        case "tragedy":     // 비극
            result = 40000;
            if (perf.audience > 30) {
            result += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":      // 희극
            result = 30000;
            if (perf.audience > 20) {
            result += 10000 + 500 * (perf.audience - 20);
            }
            result += 300 * perf.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return result;      // 함수 안에서 값이 바뀌는 변수 반환
}

module.exports = statement;

// 실행
console.log(statement(invoice[0], plays));

 