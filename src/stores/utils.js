export class Utils {
    static CalculatePrice(min,max){
        return Math.trunc(Math.floor(Math.random() * (max - min + 1) + min));
    }

    static ArbitraryRandom(min, max) {
        return Math.trunc(Math.random() * (max - min) + min);
    }
      
}