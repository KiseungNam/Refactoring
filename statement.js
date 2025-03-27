const invoices = require('./invoices.json');
const plays = require('./plays.json');

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let result = amountFor(perf, play);     // 추출한 함수로 변환

        // 포인트 적립
        volumeCredits = Math.max(perf.audience - 30, 0);
        
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if (play.type === "comedy") volumeCredits += Math.floor(perf.audience / 5);

        // 출력 줄 추가
        result += `  ${play.name}: ${(result / 100).toFixed(2)}원 (${perf.audience}석)\n`;
        totalAmount += result;
    }

    result += `총액: ${(totalAmount / 100).toFixed(2)}원\n`;
    return result;
}

// 값이 바뀌지 않는 변수는 매개변수로 전달
function amountFor(aPerformance, play){
    let result = 0;     // 변수를 초기화하는 코드

    switch (play.type) {
        case "tragedy":     // 비극
            result = 40000;
            if (aPerformance.audience > 30) {
            result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":      // 희극
            result = 30000;
            if (aPerformance.audience > 20) {
            result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return result;      // 함수 안에서 값이 바뀌는 변수 반환
}

module.exports = statement;

// 실행
console.log(statement(invoices[0], plays));

 