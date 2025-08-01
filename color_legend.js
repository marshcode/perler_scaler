
class ColorLegend {
    constructor() {
        this.color_legend = new Map();
        this.color_index = new Map();
        this.color_ignore = new Set();
        this.color_labels = new Map();
    }

    clear() {
        this.color_legend.clear();
        this.color_index.clear();
        this.color_labels.clear();
    }

    make_key(r, g, b, alpha) {
        return [r, g, b, alpha].join(",");
    }

    parse_key(key) {
        return key.split(",").map(Number)
    }

    add_color_ignore(r, g, b) {
        this.color_ignore.add(this.make_key(r, g, b, ''))
    }

    get_color_label(key) {
        return this.color_labels.get(key);
    }

    is_color_ignored(color_array) {
        var check_key = this.make_key(color_array[0], color_array[1], color_array[2], '');
        return this.color_ignore.has(check_key);
    }

    add(r, g, b, alpha, color_match) {

        if (this.is_color_ignored([r, g, b])) {
            return ["", [r, g, b, alpha]]
        }

        let key = false;
        let label = '';
        if (color_match) {
            [[r, g, b, alpha], label] = color_match.match(r, g, b, alpha, this);
            key = this.make_key(r, g, b, alpha)
        }

        if (!key) {
            key = this.make_key(r, g, b, alpha);

        }

        const current = this.color_legend.get(key);
        this.color_legend.set(key, (current || 0) + 1);

        let index = this.color_index.get(key);
        if (!index) {
            this.color_index.set(key, this.color_index.size + 1);
            index = this.color_index.get(key);
        }

        this.color_labels.set(key, label);
        return [index, [r, g, b, alpha]];
    }

    get_color_index(key) {
        return this.color_index.get(key)
    }

    get_color_legend() {
        return this.color_legend;
    }
}


const euclidian_distance = function (thing1, thing2, cardinalilty) {
    thing3 = [];
    for (let i = 0; i < cardinalilty; i++) {
        thing3.push((thing1[i] - thing2[i]) ** 2)
    }

    return Math.sqrt(thing3.reduce((acc, num) => acc + num, 0))
}

const ColorComparisons = Object.freeze({
    'RGB_DISTANCE': {
        'convert': function (r, g, b) { return [r, g, b] },
        'compare': (rgb1, rgb2) => euclidian_distance(rgb1, rgb2, 3)
    }
})

class ColorCompare {

    constructor(color_compare_algo) {
        this.color_compare_algo = color_compare_algo.toUpperCase();
    }

    compare(rgb_lhs, rgb_rhs) {
        const comparison_algo = ColorComparisons[this.color_compare_algo]
        const lhs_converted = comparison_algo.convert(rgb_lhs[0], rgb_lhs[1], rgb_lhs[2]);
        const rhs_converted = comparison_algo.convert(rgb_rhs[0], rgb_rhs[1], rgb_rhs[2]);
        return comparison_algo.compare(lhs_converted, rhs_converted)
    }
}

class ColorMatchThreshold {
    // 1) match the color to the existing set of colors if it is close enough
    // 2) if it does not match, return the given color. This will add this color to the color legend to be matched again
    constructor(color_match_threshold, color_compare_algo) {
        this.color_match_threshold = color_match_threshold;
        this.color_compare = new ColorCompare(color_compare_algo);
    }

    match(r, g, b, alpha, color_legend) {
        for (var [to_match, _] of color_legend.color_index) {
            const [r2, g2, b2, alpha2] = color_legend.parse_key(to_match);
            const diff = this.color_compare.compare([r, g, b], [r2, g2, b2])

            if (diff <= this.color_match_threshold) {
                return [[r2, g2, b2, alpha2], ""];
            }
        }

        return [[r, g, b, alpha], ""];
    }
}

class ColorMatchPalette {
    // match to an existing palette. Will force matches
    constructor(color_palette, color_compare_algo) {
        this.color_palette = color_palette
        this.color_compare = new ColorCompare(color_compare_algo);
    }

    match(r, g, b, alpha, color_legend) {

        let best_color = false;
        let best_match = Number.MAX_SAFE_INTEGER;
        let best_label = false;

        for (var [label, to_match] of this.color_palette) {
            const [r2, g2, b2, alpha2] = to_match
            const diff = this.color_compare.compare([r, g, b], [r2, g2, b2])
            if (diff <= best_match) {
                best_color = [r2, g2, b2, alpha2];
                best_match = diff;
                best_label = label;
            }
        }

        return [best_color, best_label];
    }
}