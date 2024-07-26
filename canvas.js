class Canvas {
    #canvas_element;
    #context;

    #ratio_to_window_width = 0.8;
    #aspect_ratio = 9 / 16;

    constructor (element) {
        // 値のセット
        this.#canvas_element = element;
        this.#context = this.#canvas_element.getContext("2d");

        // ウィンドウリサイズに追従
        window.addEventListener("resize", () => this.#resize_canvas());
        this.#resize_canvas();
    }

    #resize_canvas () {
        // 横幅をratio_to_window_widthに縮める。
        // 横:縦を16:9に保つ
        this.#canvas_element.width = this.#ratio_to_window_width * window.innerWidth;
        this.#canvas_element.height = this.#aspect_ratio * this.#canvas_element.width;
    }

    get_width () {
        return this.#canvas_element.width;
    }
    get_height () {
        return this.#canvas_element.height;
    }
}

