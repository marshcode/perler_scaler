            COLOR_INDEX = new Map();
            COLOR_LEGEND = new Map();
            function legend_clear(){
                COLOR_LEGEND.clear();
                COLOR_INDEX.clear();
            }

            function color_diff(color_one, color_two){
                const [r1,g1,b1,alpha1] = color_one;
                const [r2,g2,b2,alpha2] = color_two;

                const r_delta = Math.abs(r1-r2);
                const g_delta = Math.abs(g1-g2);
                const b_delta = Math.abs(b1-b2);

                return Math.sqrt( r_delta**2, g_delta**2, b_delta**2 );
            }

            function get_color_ignore(){
                const color_ignore = document.getElementById("color_match_ignore").value;
                const r = parseInt(color_ignore.substr(1, 2), 16);
                const g = parseInt(color_ignore.substr(3, 2), 16);
                const b = parseInt(color_ignore.substr(5, 2), 16);

                return [r,g,b]
            }

            function legend_add(r, g, b, alpha, color_match){

                let color_ignore = get_color_ignore();
                console.log([r,g,b], color_ignore, [r,g,b] == color_ignore);
                if(color_diff([r,g,b], color_ignore) === 0){
                    return ["", [r, g, b, alpha]]
                }

                let key = false;
                if(color_match > 0){
                    for (var [to_match, index] of COLOR_INDEX) {
                        const [r2,g2,b2,alpha2] = to_match.split(",").map(Number);
                        const diff = color_diff([r,g,b], [r2,g2,b2]);
                        if(diff <= color_match){
                            key = to_match;
                            [r, g, b, alpha] = [r2, g2, b2, alpha2];
                            break;
                        }
                    }
                } 

                if(!key){
                    key = [r,g,b,alpha].join(",")
                    
                }

                const current = COLOR_LEGEND.get(key);
                COLOR_LEGEND.set(key, (current || 0) + 1);

                index = COLOR_INDEX.get(key);
                if(!index){
                    COLOR_INDEX.set( key, COLOR_INDEX.size + 1 );
                    index = COLOR_INDEX.get(key);
                }
                return [index, [r,g,b,alpha]];
            }
