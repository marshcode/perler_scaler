
class ColorLegend {
  constructor(color_match_ignore) {
    this.color_legend = new Map();
    this.color_index = new Map();
    this.color_match_ignore = color_match_ignore;
  }

    clear() {
        this.color_legend.clear();
        this.color_index.clear();
    }   

    get_color_ignore(){
        const color_ignore = this.color_match_ignore.value;
        const r = parseInt(color_ignore.substr(1, 2), 16);
        const g = parseInt(color_ignore.substr(3, 2), 16);
        const b = parseInt(color_ignore.substr(5, 2), 16);

        return [r, g, b]
    }

    add(r, g, b, alpha, color_match){

        let color_ignore = this.get_color_ignore();
        if(r == color_ignore[0] && g == color_ignore[1] && b == color_ignore[2]){
            console.log([r,g,b],[color_ignore])
            return ["", [r, g, b, alpha]]
        }

        let key = false;
        if(color_match > 0){
            for (var [to_match, index] of this.color_index) {
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

