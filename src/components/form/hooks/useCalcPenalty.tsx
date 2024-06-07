class calcPenalty {
  static calcPenalty(interest: number, surcharge: number) {
    // Your calculation logic here
    return interest + surcharge;
  }
}

const item = { interest: 10, surcharge: 5 };
const penalty = calcPenalty.calcPenalty(item.interest, item.surcharge);
console.log("Penalty:", penalty);

export default calcPenalty;
