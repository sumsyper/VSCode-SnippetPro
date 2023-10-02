const dedent = require('string-dedent');

class Snippet {

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get prefix() {
        return this._prefix;
    }

    set prefix(prefix) {
        this._prefix = prefix;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get body() {
        return this._body;
    }

    set body(body) {
        this._body = Snippet.buildBody(body);
    }

    get language() {
        return this._language;
    }

    set language(language) {
        this._language = language;
    }

    /**
     * Pre-process snippet text if needed. Converts a snippet string in to
     * Array<string> if newlines are detected - makes for easier editing in the
     * snippets JSON file. Dedents so unecessary leading tabs are removed.
     *
     * Note: Weirdly, this *used* to replace \t with \\t 
     *      code.replace(/\t/g, '\\t').split("\n");  // Wrong!
     *
     * which resulted in a horrible \\t being inserted instead of a proper \t
     * tab character.
     *
     * @param {string} code snippet text
     */
    static buildBody(code) {
        code = dedent(code)
        if (code.includes('\n'))
            return code.split("\n");
        else
            return code
    }
}

module.exports = Snippet;