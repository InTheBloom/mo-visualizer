class Drawer {
    #canvas;
    #padding = 10;
    #y_max = 100;
    #x_max = 100;

    set_canvas (canvas) {
        this.#canvas = canvas;
    }

    set_draw_range (y_ma, x_ma) {
        this.#y_max = y_ma;
        this.#x_max = x_ma;
    }

    #convert_coordinate_to_pixel (y, x) {
        return [y * ((this.#canvas.get_height() - 2 * this.#padding) / this.#y_max) + this.#padding, x * ((this.#canvas.get_width() - 2 * this.#padding) / this.#x_max) + this.#padding];
    }

    all_clear () {
        const ctx = this.#canvas.get_ctx();
        ctx.clearRect(0, 0, this.#canvas.get_width(), this.#canvas.get_height());
    }

    draw_cartesian_coordinate_system () {
        const y_lines = Math.floor(this.#y_max / 100) + 1;
        const x_lines = Math.floor(this.#x_max / 100) + 1;

        const ctx = this.#canvas.get_ctx();

        ctx.strokeStyle = "gray";
        // 横向きの軸
        for (let i = 0; i <= y_lines; i++) {
            const begin = this.#convert_coordinate_to_pixel(i * (this.#y_max / y_lines), 0);
            const end = this.#convert_coordinate_to_pixel(i * (this.#y_max / y_lines), this.#x_max);

            ctx.beginPath();
            ctx.moveTo(begin[1], begin[0]);
            ctx.lineTo(end[1], end[0]);
            ctx.stroke();
        }

        // 縦向きの軸
        for (let i = 0; i <= x_lines; i++) {
            const begin = this.#convert_coordinate_to_pixel(0, i * (this.#x_max / x_lines));
            const end = this.#convert_coordinate_to_pixel(this.#y_max, i * (this.#x_max / x_lines));

            ctx.beginPath();
            ctx.moveTo(begin[1], begin[0]);
            ctx.lineTo(end[1], end[0]);
            ctx.stroke();
        }
    }

    draw_tour_route (query, line_color, point_color) {
        const ctx = this.#canvas.get_ctx();

        const pixels = new Array(0);
        for (let i = 0; i < query.length; i++) pixels.push(this.#convert_coordinate_to_pixel(query[i][0], query[i][1]));

        ctx.strokeStyle = line_color;
        for (let i = 0; i < pixels.length - 1; i++) {
            // 次の点まで線を引く
            // y->xで合わせる
            ctx.beginPath();
            ctx.moveTo(pixels[i][1], pixels[i][0]);
            ctx.lineTo(pixels[i][1], pixels[i + 1][0]);
            ctx.lineTo(pixels[i + 1][1], pixels[i + 1][0]);
            ctx.stroke();
        }

        ctx.fillStyle = point_color;
        for (let i = 0; i < pixels.length; i++) {
            // クエリ点を打つ
            ctx.beginPath();
            ctx.moveTo(pixels[i][1], pixels[i][0]);
            ctx.arc(pixels[i][1], pixels[i][0], 3, 0, 2 * Math.PI);
            ctx.fill();
        }

    }
}
