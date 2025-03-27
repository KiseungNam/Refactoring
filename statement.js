const invoice = require('./invoices.json');
const plays = require('./plays.json');

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("en-US"
            , {style:"currency", currency: "USD"
            , minimumFractionDigits:2}).format;

    for (let perf of invoice.performances) {
        
        // 포인트 적립
        volumeCredits += volumeCreditsFor(perf);    // 추출한 함수로 값을 누적 처리
                
        // 청구내역 출력 줄 추가
        result += `  ${playFor(perf).name}: ${format(amountFor(perf) / 100)}원 (${perf.audience}석)\n`;
        totalAmount += amountFor(perf);
    }

    result += `총액: ${format(totalAmount / 100)}원\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;
}

// volumeCredits 함수 추출
function volumeCreditsFor(aPerformance){
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    
    if ("comedy" === playFor(aPerformance).type) {
        result += Math.floor(aPerformance.audience / 5);
    }
    return result;
}

// 값이 바뀌지 않는 변수는 매개변수로 전달
function amountFor(aPerformance){
    let result = 0;     // 변수를 초기화하는 코드

    switch (playFor(aPerformance).type) {
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
            throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result;      // 함수 안에서 값이 바뀌는 변수 반환
}

function playFor(aPerformance){
    return plays[aPerformance.playID];
}

module.exports = statement;

// 실행
console.log(statement(invoice[0], plays));

 