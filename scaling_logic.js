            var do_scale = function(grid_x_max, grid_y_max, scale, get_color_for_grid, color_match){
                const scale_canvas = document.getElementById("canvas_scale");
                const scale_context = scale_canvas.getContext("2d");

                const scale_debug = document.getElementById("canvas_scale_debug");
                const debug_context = scale_debug.getContext("2d");

                const canvas_scale_original = document.getElementById('canvas_scale_original');
                const original_context = canvas_scale_original.getContext("2d");

                COLOR_LEGEND.clear();

                resize_canvas('canvas_scale', (Number(grid_x_max)+1) * scale * GRID_SIZE, (Number(grid_y_max)+1) * scale * GRID_SIZE);
                resize_canvas('canvas_scale_original', (Number(grid_x_max)+1) * scale * GRID_SIZE, (Number(grid_y_max)+1) * scale * GRID_SIZE)
                resize_canvas('sub-di-guide', (Number(grid_x_max)+1) * scale * GRID_SIZE, (Number(grid_y_max)+1) * scale * GRID_SIZE)



                //draw number grid
                for(var grid_x=0; grid_x <= (grid_x_max * scale)+scale; grid_x++){
                    draw_text(grid_x, 0, `${grid_x}`, scale_context);
                }

                for(var grid_y=0; grid_y <= (grid_y_max * scale)+scale; grid_y++){
                    draw_text(0, grid_y, `${grid_y}`, scale_context);
                }

                const color_grid = new Map();
                //draw scale
                for(var grid_x = 1; grid_x<grid_x_max; grid_x++){
                    for(var grid_y = 1; grid_y<grid_y_max; grid_y++){
                        const color = get_color_for_grid(grid_x, grid_y);

                        const [color_index, new_color, label] = COLOR_LEGEND.add(color[0], color[1], color[2], color[3], color_match);
                        generate_scale_coordinates(grid_x, grid_y, scale).forEach(function(scale_coord){
                            draw_rect(scale_coord['scale_x'], scale_coord['scale_y'], new_color, scale_context);
                            draw_rect(scale_coord['scale_x'], scale_coord['scale_y'], color, original_context);
                            color_grid.set([scale_coord['scale_x'], scale_coord['scale_y']], color);

                            const style = is_light(new_color[0], new_color[1], new_color[2]) ? "white" : "black";
                            draw_styled_text(scale_coord['scale_x'], scale_coord['scale_y'], ""+color_index,  style, debug_context);
                        });
                    }
                }
                normal_style = [function(context){
                    context.strokeStyle='white';
                }, function(context){
                    context.strokeStyle='black';
                    context.setLineDash([2,2]);
                }]

                five_style = [function(context){
                    context.strokeStyle='pink';
                    context.lineWidth = 3;
                }]


                //draw grid lines
                for(var grid_x=0; grid_x <= (grid_x_max * scale)+scale; grid_x++){
                    var style = grid_x % 5 == 0 ? five_style : normal_style;
                    draw_line(grid_x, 0, grid_x, (grid_y_max*scale)+scale, scale_context, style)
                }

                for(var grid_y=0; grid_y <= (grid_y_max * scale)+scale; grid_y++){
                    var style = grid_y % 5 == 0 ? five_style : normal_style;
                    draw_line(0, grid_y, (grid_x_max*scale)+scale, grid_y, scale_context, style)
                }

                legend_render();
                return color_grid;
            }
        
            var generate_scale_coordinates = function(grid_x, grid_y, scale){


                let x_start = grid_x * scale
                let y_start = grid_y * scale

                const coordinates = []
                for(let scale_x=0; scale_x<scale; scale_x++){
                    for(let scale_y=0; scale_y<scale; scale_y++){
                        coordinates.push({
                            'scale_y': scale_y + y_start,
                            'scale_x': scale_x + x_start
                        })
                    }
                }

                return coordinates;
            }