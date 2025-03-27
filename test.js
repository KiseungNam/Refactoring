const assert = require('assert');
const invoices = require('./invoices.json');
const plays = require('./plays.json');

const statement = require('./statement');  // 함수 분리해둔 경우

const expectedOutput = 
`청구 내역 (고객명: BigCo)
  Hamlet: 650.00원 (55석)
  As You Like It: 580.00원 (35석)
  Othello: 500.00원 (40석)
총액: 1730.00원
`;

const actualOutput = statement(invoices[0], plays);

assert.strictEqual(actualOutput, expectedOutput);

console.log("✅ 테스트 통과: 출력 결과 일치");
