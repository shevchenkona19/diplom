export class QElement {
    public element: number;
    public priority: number;

    constructor(element: number, priority: number) {
        this.element = element;
        this.priority = priority;
    }
}

export class PriorityQueue {

    public items: QElement[];

    constructor() {
        this.items = [];
    }

    insert(element: number, priority: number): void {
        const qElement = new QElement(element, priority);
        let contain = false;

        for (let i = 0; i < this.items.length; i++) {
            //desc for asc <
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        if (!contain) {
            this.items.push(qElement);
        }
    }

    remove(): string | QElement {
        if (this.items.length === 0)
            return "Underflow";
        return this.items.shift();
    }

    removeElement(element: number): void {
        let i = this.items.length;
        while (i--) {
            const el2 = this.items[i];
            if (el2.element === element) {
                this.items.splice(i, 1);
                break;
            }
        }
    }

    front(): string | QElement {
        // returns the highest priority element
        // in the Priority queue without removing it.
        if (this.items.length === 0)
            return "No elements in Queue";
        return this.items[0];
    }

    rear(): string | QElement {
        if (this.items.length === 0)
            return "No elements in Queue";
        return this.items[this.items.length - 1];
    }

    printQueue(): string{
        let str = "";
        for (let i = 0; i < this.items.length; i++)
            str += this.items[i].element + " ";
        return str;
    }

}
