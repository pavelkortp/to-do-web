class Entry {
    private static counter: number = 0;
    private id: number;

    constructor(private content: string){
        this.id = Entry.counter++;
    }
}