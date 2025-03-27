const assert = require('assert');
const invoices = require('./invoices.json');
const plays = require('./plays.json');
const statement = require('./statement');

const expectedOutput = 
`청구 내역 (고객명: BigCo)
  Hamlet: $650.00원 (55석)
  As You Like It: $580.00원 (35석)
  Othello: $500.00원 (40석)
총액: $1,730.00원
적립 포인트: 47점
`;

const actualOutput = statement(invoices[0], plays);

assert.strictEqual(actualOutput, expectedOutput);
console.log("✅ 테스트 통과: 리팩터링 후 출력 동일");
