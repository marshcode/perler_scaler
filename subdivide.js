class SubDiGuideController {
    constructor(canvas) {
        this.canvas = canvas
    }


    set_guide(canvas_x, canvas_y, grid_width){
        clear_canvas(this.canvas)
        
        let grid_coords = grid_coords_from_canvas(canvas_x, canvas_y);

        draw_rect(grid_coords['grid_x']-1, grid_coords['grid_y']-1, [1, 0, 1], this.canvas.getContext('2d'))

    }
}