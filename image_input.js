            function drawpattern(ev) {
                var canvas = document.getElementById('canvas')

                var ctx = canvas.getContext('2d'),
                    img = new Image(),
                    f = document.getElementById("uploadpattern").files[0],
                    url = window.URL || window.webkitURL,
                    src = url.createObjectURL(f);

                img.src = src;

                img.onload = function() {
                    resize_canvas('canvas', this.width, this.height);
                    // consider bringing this down for larger images
                    ctx.drawImage(img, 0, 0);
                    copy_canvas(canvas, backCanvas, 0, 0)
                    url.revokeObjectURL(src);

                    // this lets us use other formats in the future
                    const image_grid_color = function(x, y){
                        const canvas = document.getElementById("canvas");
                        const ctx = canvas.getContext("2d");
                        return get_color_at_grid_point(x, y, ctx);
                    }

                    set_scale_options(canvas.width / GRID_SIZE, canvas.height / GRID_SIZE);
                    set_scale_onclick(image_grid_color);
                }
            }

            function drawsprite(ev) {
                var canvas = document.getElementById('canvas')
                var ctx = canvas.getContext('2d'),
                    img = new Image(),
                    f = document.getElementById("uploadsprite").files[0],
                    url = window.URL || window.webkitURL,
                    src = url.createObjectURL(f);


                    img.src = src;
                    img.onload = function() {
                        resize_canvas('canvas', this.width, this.height);
                        // consider bringing this down for larger images
                        ctx.drawImage(img, 0, 0);
                        url.revokeObjectURL(src);

                    // this lets us use other formats in the future
                    const image_grid_color = function(x, y){
                        const canvas = document.getElementById("canvas");
                        const ctx = canvas.getContext("2d");
                        const pixel_data = ctx.getImageData(x-1, y-1, 1, 1).data;
                        
                        alpha = pixel_data[3]
                        if(alpha > 0){
                            pixel_data[3] = 255;
                        }

                        return pixel_data;
                    }
                    set_scale_options(canvas.width+1, canvas.height+1);
                    set_scale_onclick(image_grid_color);
                }
                return f.name
            }
