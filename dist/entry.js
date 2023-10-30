"use strict";
class Entry {
    constructor(content) {
        this.content = content;
        this.id = Entry.counter++;
    }
}
Entry.counter = 0;
