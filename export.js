var json_export = function(color_legend, color_grid_list){


    const palette_map = {}
    color_legend.get_color_legend().forEach(function(_, key, _){
        const color_index = color_legend.get_color_index(key);
        const [r, g, b, a_] = color_legend.parse_key(key)
        palette_map[color_index] = [r, g, b];
    });

    grids = {};
    color_grid_list.forEach(function(color_grid, idx){
        grids['grid'+(idx+1)] ={
            "palette":"p1",
            "data": color_map_to_data_list(color_grid, color_legend)
    }})
    return {
        "palettes":{
            "p1": palette_map
        },
        "grids":grids
    }

}

var color_map_to_data_list = function(color_map, color_legend){
    var data_list = [];
    color_map.forEach(function(color, position){
        let x = position[0]; let y = position[1];
        let row = data_list[y-1] || [];

        let key = color_legend.make_key(...color)
        let color_index = color_legend.get_color_index(key)
        row[x-1] = color_index;
        data_list[y-1] = row;
    })
    return data_list;
}


var png_export = function(canvas_list, canvas_target, color_legend){

    source_width = canvas_list[0].width;
    source_height = canvas_list[0].height;

    canvas_target.width = source_width + (GRID_SIZE * 20);
    canvas_target.height = source_height;
    var to_canvas_context = canvas_target.getContext('2d');

    to_canvas_context.fillStyle = document.getElementById("PNG_BACKGROUND").value
    to_canvas_context.fillRect(0, 0, source_width, source_height)
    to_canvas_context.fillStyle = "white"
    to_canvas_context.fillRect(source_width, 0, source_width + (GRID_SIZE * 20), source_height)

    canvas_list.forEach(function(source_canvas){
        to_canvas_context.drawImage(source_canvas, 0, 0);
    })    

    let grid_y_idx = 0;
    color_legend.get_color_legend().forEach(function(count, key, _){
        const color_index = color_legend.get_color_index(key);
        const [r, g, b, a_] = color_legend.parse_key(key)

        var coords = grid_coords_from_canvas(source_width, 0);
        grid_y_idx += 2;

        draw_rect(coords.grid_x, grid_y_idx, [r, g, b, 255], to_canvas_context)
        stroke_rect(coords.grid_x, grid_y_idx, [0, 0, 0, 255], to_canvas_context)

        const style = is_light(r, g, b) ? "white" : "black";
        draw_styled_text(coords.grid_x, grid_y_idx, ""+color_index,  style, to_canvas_context);
        const legend = color_legend.get_color_label(key)
        draw_styled_text(coords.grid_x + 1, grid_y_idx, count, "black", to_canvas_context)
    });

}