class Message {
    constructor({ id, content, type }) {
        this.id = id;
        this.content = content;
        this.type = type;
    }

    getId() {
        return this.id;
    }

    getContent() {
        return this.content;
    }

    setContent(newContent) {
        this.content = newContent;
    }
}

module.exports = Message;