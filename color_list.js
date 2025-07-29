class ColorList {
  constructor(parent_element) {
    this.parent_element = parent_element
    this.parent_element.addEventListener('click', this.click_handler);
  }

  click_handler(ev){
    console.log(ev);
  }

  add_color(r,g,b, label) {

    const color_container = document.createElement("span");
    const color_swatch = document.createElement("span");
    const label_element = document.createElement("span");

    color_container.append(color_swatch);
    color_container.append(label_element);

    color_swatch.classList.add('color_swatch');
    color_swatch.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    color_swatch.innerHTML='&nbsp;'

    this.parent_element.append(color_container);
  }
}