export default class Yatzy {
  private dice: number[];

  constructor(d1: number, d2: number, d3: number, d4: number, d5: number) {
    this.dice = [d1, d2, d3, d4, d5];
  }

  static chance(...args: number[]): number {
    return args.reduce((a, b) => a + b);
  }

  static yatzy(...args: number[]): number {
    if (args.every((num) => num === args[0])) {
      return 50;
    }
    return 0;
  }

  static ones(...args: number[]): number {
    return Yatzy.sumOfNumbers(1, args);
  }

  static twos(...args: number[]): number {
    return Yatzy.sumOfNumbers(2, args);
  }

  static threes(...args: number[]): number {
    return Yatzy.sumOfNumbers(3, args);
  }

  fours(): number {
    return Yatzy.sumOfNumbers(4, this.dice);
  }

  fives(): number {
    return Yatzy.sumOfNumbers(5, this.dice);
  }

  sixes(): number {
    return Yatzy.sumOfNumbers(6, this.dice);
  }

  static sumOfNumbers(kindOfNumber: number, args: number[]): number {
    if (args.some((num) => num === kindOfNumber)) {
      return args.filter((num) => num === kindOfNumber).reduce((a, b) => a + b);
    }
    return 0;
  }

  static score_pair(...args: number[]): number {
    var unics = args
      .sort((a, b) => a - b)
      .filter((num, index, array) => {
        return array.indexOf(num) === index;
      });
    var quantities = [];
    for (let i = 0; i < unics.length; i++) {
      quantities[i] = args.filter((x) => x === unics[i]).length;
    }

    return unics[quantities.lastIndexOf(2)] * 2;
  }

  static two_pair(...args: number[]): number {
    var unics = args.filter((num, index, array) => {
      return array.indexOf(num) === index;
    });
    var quantities: number[] = [];
    for (let i = 0; i < unics.length; i++) {
      quantities[i] = args.filter((x) => x === unics[i]).length;
    }
    return unics
      .filter((x) => quantities[unics.indexOf(x)] >= 2)
      .reduce((a, b) => a * 2 + b * 2);
  }

  static four_of_a_kind(...args: number[]): number {
    var unics = args.filter((num, index, array) => {
      return array.indexOf(num) === index;
    });
    var quantities: number[] = [];
    for (let i = 0; i < unics.length; i++) {
      quantities[i] = args.filter((x) => x === unics[i]).length;
    }
    unics.filter((x) => quantities[unics.indexOf(x)] === 4);
    return unics[0] * 4;
  }

  static three_of_a_kind(...args: number[]): number {
    var unics = args.filter((num, index, array) => {
      return array.indexOf(num) === index;
    });
    var quantities: number[] = [];
    for (let i = 0; i < unics.length; i++) {
      quantities[i] = args.filter((x) => x === unics[i]).length;
    }
    unics.filter((x) => quantities[unics.indexOf(x)] === 3);
    return unics[0] * 3;
  }

  static smallStraight(...args: number[]): number {
    if (
      args
        .sort((a, b) => a - b)
        .filter((num) => {
          if (num === 1 && args.indexOf(num) === 0) return true;
          if (num === args[(args.indexOf(num) - 1) % 5] + 1) return true;
          return false;
        })
        .reduce((a, b) => a + b) === 15
    )
      return 15;
    return 0;
  }

  static largeStraight(...args: number[]): number {
    if (
      args
        .sort((a, b) => a - b)
        .filter((num) => {
          if (num === 2 && args.indexOf(num) === 0) return true;
          if (num === args[(args.indexOf(num) - 1) % 5] + 1) return true;
          return false;
        })
        .reduce((a, b) => a + b) === 20
    )
      return 20;
    return 0;
  }

  static fullHouse(...args: number[]): number {
    var unics = args
      .sort((a, b) => a - b)
      .filter((num, index, array) => {
        return array.indexOf(num) === index;
      });
    if (unics.length === 2) {
      if (
        args.filter((x) => x === unics[0]).length === 2 ||
        args.filter((x) => x === unics[1]).length === 2
      )
        return (
          args.filter((x) => x === unics[0]).length * unics[0] +
          args.filter((x) => x === unics[1]).length * unics[1]
        );
    }
    return 0;
  }
}
