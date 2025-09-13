var json_export = function(color_legend, color_grid_list){


    const palette_map = {}
    color_legend.get_color_legend().forEach(function(_, key, _){
        const color_index = color_legend.get_color_index(key);
        const [r, g, b, a_] = color_legend.parse_key(key)
        palette_map[color_index] = [r, g, b];
    });

    grids = {};
    color_grid_list.forEach(value, idx){
        grids['grid'+(idx+1)] ={
            "palette"
        }
    }

    return {
        "palettes":{
            "p1": palette_map
        },
        "grids":grids
    }

}