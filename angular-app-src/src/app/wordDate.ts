export default class WordDate {
    public name: string;
    public date: Date | null;
    
    constructor(name: string, date: Date | null){
        this.name = name;
        this.date = date;
    }

    public static today(): WordDate {
        var today: Date = new Date(Date.now());
        return new WordDate('Today', new Date(today));
    }

    public static tomorrow(): WordDate {
        var today: Date = new Date(Date.now());
        return new WordDate('Tomorrow', new Date(today.setDate(today.getDate() + 1)));
    }

    public static noDate(): WordDate {
        return new WordDate('No Date', null);
    }

    public static nextMonday(): WordDate {
        var today = new Date(Date.now());
    var nextMonday: WordDate = new WordDate('Next Monday', new Date(today.setDate(today.getDate() + (((1 + 7 - today.getDay()) % 7) || 7))));
    return nextMonday;
    }

    public static nextTuesday(): WordDate {
        var today = new Date(Date.now());
        var nextTuesday: WordDate = new WordDate('Next Tuesday', new Date(today.setDate(today.getDate() + (((1 + 7 - today.getDay()) % 7) || 7)+1)));
    return nextTuesday;
    }
}