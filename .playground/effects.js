class ChristmasWonderland {
  constructor() {
  }

  activate() {
    if (this._root_element) {
      return;
    }

    this._root_element = document.createElement('div');
    this._root_element.classList.add('c-effect__christmas-wonderland');

    const lightrope = this.buildLightrope();
    this._root_element.appendChild(lightrope);

    const left_candy_cane = this.buildCandyCane('l');
    const right_candy_cane = this.buildCandyCane('r');
    this._root_element.appendChild(left_candy_cane);
    this._root_element.appendChild(right_candy_cane);

    document.body.appendChild(this._root_element);
  }

  deactivate() {
    if (!this._root_element) {
      return;
    }

    document.body.removeChild(this._root_element);
    this._root_element = null;
  }

  buildLightrope() {
    const container = document.createElement('ul');
    container.classList.add('c-effect__lightrope');

    // TODO: Change css to set display: none on many of the unused lights
    for (let i = 0; i < 50; i++) {
      const light = document.createElement('li');
      container.appendChild(light);
    }

    return container;
  }

  buildCandyCane(direction = 'l') {
    const container = document.createElement('div');
    container.classList.add('c-candy-cane');
    if (direction === 'r') {
      container.classList.add('c-candy-cane--right');
    }

    for (let i = 0; i < 100; i++) {
      const ring = document.createElement('div');
      ring.classList.add('c-candy-cane-ring');
      if (i % 2) {
        ring.classList.add('c-candy-cane-ring--red');
      } else {
        ring.classList.add('c-candy-cane-ring--white');
      }

      container.appendChild(ring);
    }

    return container;
  }
}


const ef = new ChristmasWonderland();
ef.activate();
