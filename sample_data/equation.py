import itertools

def eq_1(a, b, c, d, e, f, g, h, i):
    return a + 13 * b / c + d + 12 * e - f - 11 + g * h / i - 10

def eq_2(a, b, c, d, e, f, g, h, i):
    return (((((((((((a + 13) * b) / c) + d) + 12) * e) - f) - 11) + g) * h) / i) - 10
    
permutations = list(itertools.permutations([1,2,3,4,5,6,7,8,9]))

for label, equation in {"eq1":eq_1, "eq2":eq_2}.items():
    for idx, sol in enumerate(permutations):
        answer = equation(*sol)
        if answer == 66:
            print(f"{label}| #{idx}: {sol} = {answer}")
            break
        elif idx % 100 == 0:
            print(f"{label}| {idx} / {len(permutations)}")
    print(len(permutations))
