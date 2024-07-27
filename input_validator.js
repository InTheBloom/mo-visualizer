class InputValidator {
    #minimum;
    #maximum;

    constructor (mi, ma) {
        this.#minimum = mi;
        this.#maximum = ma;
    }

    validate (x) {
        if (x < this.#minimum || this.#maximum < x) return false;
        return true;
    }

    set_button_range (button_element) {
        button_element.min = this.#minimum;
        button_element.max = this.#maximum;
    }

    get_maximum () {
        return this.#maximum;
    }
}

