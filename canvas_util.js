           var draw_rect = function(grid_x, grid_y, rgb_array, scale_context){

                canvas_coords = convert_coords(grid_x, grid_y);
                scale_context.fillStyle = `rgba(${rgb_array[0]}, ${rgb_array[1]}, ${rgb_array[2]}, ${rgb_array[3]})`;
                scale_context.fillRect(canvas_coords['canvas_x'], canvas_coords['canvas_y'], GRID_SIZE, GRID_SIZE)
            }

           var stroke_rect = function(grid_x, grid_y, rgb_array, scale_context){

                canvas_coords = convert_coords(grid_x, grid_y);
                scale_context.strokeStyle = `rgba(${rgb_array[0]}, ${rgb_array[1]}, ${rgb_array[2]}, ${rgb_array[3]})`;
                scale_context.strokeRect(canvas_coords['canvas_x'], canvas_coords['canvas_y'], GRID_SIZE, GRID_SIZE)
            }

            var draw_rect_border = function(grid_x, grid_y, context){
                canvas_coords = convert_coords(grid_x, grid_y);
                context.save();
                context.beginPath();
                context.lineWidth = "3";
                context.strokeStyle = "red";
                context.rect(canvas_coords['canvas_x'] - GRID_SIZE_HALF, 
                             canvas_coords['canvas_y'] - GRID_SIZE_HALF, GRID_SIZE, GRID_SIZE);
                context.stroke();    
                context.restore();              
            }

            var draw_text = function(grid_x, grid_y, text, scale_context, offset){
                canvas_coords = convert_coords(grid_x, grid_y);

                offset = offset || {};
                let x_offset = 7 + (offset['x'] || 0);
                let y_offset = 11 + (offset['y'] || 0);

                scale_context.fillText(text, canvas_coords['canvas_x']+x_offset, canvas_coords['canvas_y']+y_offset)
            }

            var draw_styled_text = function(grid_x, grid_y, text, style, scale_context, font, offset){
                scale_context.save();

                if (font){
                    scale_context.font = font
                }

                scale_context.fillStyle = style;
                draw_text(grid_x, grid_y, text, scale_context, offset);
                scale_context.restore()
            }
            

            var draw_line = function(grid_x_start, grid_y_start, grid_x_end, grid_y_end, scale_context){

                start_coord = convert_coords(grid_x_start, grid_y_start);
                end_coord = convert_coords(grid_x_end, grid_y_end);
                scale_context.beginPath();
                scale_context.moveTo(start_coord['canvas_x'], start_coord['canvas_y']);
                scale_context.lineTo(end_coord['canvas_x'], end_coord['canvas_y']);

                // Draw the Path
                scale_context.save();
                scale_context.strokeStyle = "white";
                scale_context.stroke();

                scale_context.restore();
                scale_context.strokeStyle = "black";
                scale_context.setLineDash([2, 2]);
                scale_context.stroke();
                scale_context.restore();
            }

            var copy_canvas = function(from_canvas, to_canvas, x, y){
                to_canvas.width = from_canvas.width;
                to_canvas.height = from_canvas.height;
                var to_canvas_context = to_canvas.getContext('2d');
                to_canvas_context.drawImage(from_canvas, x, y);
            }

            var clear_canvas = function(canvas){
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
            }

            function is_light(r,g,b){
                brightness=0.2126*r + 0.7152*g + 0.0722*b;
                return brightness < 128;
            }
