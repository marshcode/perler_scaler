
class ColorLegend {
  constructor() {
    this.color_legend = new Map();
    this.color_index = new Map();
    this.color_ignore = new Set();
  }

    clear() {
        this.color_legend.clear();
        this.color_index.clear();
    }   

    make_key(r, g, b, alpha){
        return [r,g,b,alpha].join(",");
    }

    parse_key(key){
        return to_match.split(",").map(Number)
    }

    add_color_ignore(r,g,b){
        this.color_ignore.add(this.make_key(r,g,b, ''))
    }

    is_color_ignored(color_array){
        var check_key = this.make_key(color_array[0], color_array[1], color_array[2], '');
        return this.color_ignore.has(check_key);
    }

    add(r, g, b, alpha, color_match){

        if(this.is_color_ignored([r,g,b])){
            return ["", [r, g, b, alpha]]
        }

        let key = false;
        if(color_match > 0){
            for (var [to_match, index] of this.color_index) {
                const [r2,g2,b2,alpha2] = this.parse_key(to_match);
                const diff = color_diff([r,g,b], [r2,g2,b2]);
                if(diff <= color_match){
                    key = to_match;
                    [r, g, b, alpha] = [r2, g2, b2, alpha2];
                    break;
                }
            }
        } 

        if(!key){
            key = this.make_key(r, g, b, alpha);
            
        }

        const current = this.color_legend.get(key);
        this.color_legend.set(key, (current || 0) + 1);

        index = this.color_index.get(key);
        if(!index){
            this.color_index.set( key, this.color_index.size + 1 );
            index = this.color_index.get(key);
        }
        return [index, [r,g,b,alpha]];
    }

    get_color_index(key){
        return this.color_index.get(key)
    }

    get_color_legend(){
        return this.color_legend;
    }
}

