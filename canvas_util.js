           var draw_rect = function(grid_x, grid_y, rgb_array, scale_context){

                canvas_coords = convert_coords(grid_x, grid_y);
                scale_context.fillStyle = `rgba(${rgb_array[0]}, ${rgb_array[1]}, ${rgb_array[2]}, ${rgb_array[3]})`;
                scale_context.fillRect(canvas_coords['canvas_x'], canvas_coords['canvas_y'], GRID_SIZE, GRID_SIZE)
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

            var draw_text = function(grid_x, grid_y, text, scale_context){
                canvas_coords = convert_coords(grid_x, grid_y);
                scale_context.fillText(text, canvas_coords['canvas_x']+7, canvas_coords['canvas_y']+11)
            }

            var draw_styled_text = function(grid_x, grid_y, text, style, scale_context){
                scale_context.save();
                scale_context.fillStyle = style;
                draw_text(grid_x, grid_y, text, scale_context);
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

            function color_diff(color_one, color_two){
                const [r1,g1,b1,alpha1] = color_one;
                const [r2,g2,b2,alpha2] = color_two;

                const r_delta = Math.abs(r1-r2);
                const g_delta = Math.abs(g1-g2);
                const b_delta = Math.abs(b1-b2);

                return Math.sqrt( r_delta**2 + g_delta**2 + b_delta**2 );
            }

            function RGBToHSL(r, g, b) {
                // Make r, g, and b fractions of 1
                r /= 255;
                g /= 255;
                b /= 255;

                // Find greatest and smallest channel values
                let cmin = Math.min(r, g, b),
                    cmax = Math.max(r, g, b),
                    delta = cmax - cmin,
                    h = 0,
                    s = 0,
                    l = 0;

                // Calculate hue
                // No difference
                if (delta === 0)
                    h = 0;
                // Red is max
                else if (cmax === r)
                    h = ((g - b) / delta) % 6;
                // Green is max
                else if (cmax === g)
                    h = (b - r) / delta + 2;
                // Blue is max
                else
                    h = (r - g) / delta + 4;

                h = Math.round(h * 60);

                // Make negative hues positive behind 360°
                if (h < 0)
                    h += 360;

                // Calculate lightness
                l = (cmax + cmin) / 2;

                // Calculate saturation
                s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

                // Multiply l and s by 100
                s = +(s * 100).toFixed(1);
                l = +(l * 100).toFixed(1);

                return [h, s, l]
                }