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