const invoices = require('./invoices.json');
const plays = require('./plays.json');

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf, play);     // 추출한 함수로 변환

        // 포인트 적립
        volumeCredits = Math.max(perf.audience - 30, 0);
        
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if (play.type === "comedy") volumeCredits += Math.floor(perf.audience / 5);

        // 출력 줄 추가
        result += `  ${play.name}: ${(thisAmount / 100).toFixed(2)}원 (${perf.audience}석)\n`;
        totalAmount += thisAmount;
    }

    result += `총액: ${(totalAmount / 100).toFixed(2)}원\n`;
    return result;
}

// 값이 바뀌지 않는 변수는 매개변수로 전달
function amountFor(perf, play){
    let thisAmount = 0;     // 변수를 초기화하는 코드

    switch (play.type) {
        case "tragedy":     // 비극
            thisAmount = 40000;
            if (perf.audience > 30) {
            thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":      // 희극
            thisAmount = 30000;
            if (perf.audience > 20) {
            thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return thisAmount;      // 함수 안에서 값이 바뀌는 변수 반환
}

module.exports = statement;

// 실행
console.log(statement(invoices[0], plays));

 