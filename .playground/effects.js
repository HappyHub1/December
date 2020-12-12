function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

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

    const left_tree = this.buildTree(1, 'l');
    const middle_tree = this.buildTree(1, 'm');
    const right_tree = this.buildTree(2, 'r');
    this._root_element.appendChild(left_tree);
    this._root_element.appendChild(middle_tree);
    this._root_element.appendChild(right_tree);

    const kfc_bucket = this.buildKfcBucket();
    this._root_element.appendChild(kfc_bucket);

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
    const container = document.createElement('div');
    container.classList.add('c-effect__lightrope');

    // TODO: Change css to set display: none on many of the unused lights
    for (let i = 0; i < 50; i++) {
      const light = document.createElement('div');
      light.classList.add('c-effect__lightrope-light');

      const bulb = document.createElement('div');
      bulb.classList.add('c-effect__lightrope-bulb');
      light.appendChild(bulb);

      const socket = document.createElement('div');
      socket.classList.add('c-effect__lightrope-socket');
      light.appendChild(socket);

      const rope = document.createElement('div');
      rope.classList.add('c-effect__lightrope-rope');
      light.appendChild(rope);

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

  buildTree(type_number = 1, location = 'l') {
    const container = document.createElement('div');
    container.classList.add('c-christmas-tree');

    let tree_config;
    if (type_number === 1) {
      container.classList.add('c-christmas-tree--type-1');
      tree_config = ChristmasWonderland.tree_type_1;
    } else {
      container.classList.add('c-christmas-tree--type-2');
      tree_config = ChristmasWonderland.tree_type_2;
    }

    if (location === 'l') {
      container.classList.add('c-christmas-tree--left');
    } else if (location === 'm') {
      container.classList.add('c-christmas-tree--middle');
    } else {
      container.classList.add('c-christmas-tree--right');
    }

    container.innerHTML = tree_config.svg;

    const lights_container = document.createElement('div');
    lights_container.classList.add('c-christmas-tree__lights');

    for (const light_config of tree_config.lights) {
      const light = document.createElement('div');
      light.classList.add('c-christmas-tree__light');

      light.style.left = light_config.left;
      light.style.top = light_config.top;
      light.style.width = light_config.width;

      const type = getRandomInt(1, 3);
      light.classList.add(`c-christmas-tree__light--${type}`);

      lights_container.appendChild(light);
    }

    container.appendChild(lights_container);

    return container;
  }

  buildKfcBucket() {
    const container = document.createElement('div');
    container.classList.add('c-kfc-bucket');

    const image = document.createElement('img');
    image.src = ChristmasWonderland.kfc_bucket_image;
    container.appendChild(image);

    return container;
  }
}
ChristmasWonderland.tree_type_1 = {
  svg: `<svg class="c-christmas-tree__tree" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 110 154" xml:space="preserve"> <path d="M108.05,132.55c0,0-12.7-10.8-24.8-29c7.3-1.4,11.8-3.3,11.8-5.4c0,0-12.3-10.4-22.3-27.6c7.5-1,12.4-2.7,12.4-4.6 c0,0-12.4-10.5-20.2-27.3c6.2-0.7,10.4-1.9,10.4-3.4c0,0-14.8-12.5-17.3-30.9c-0.4-2.7-5.8-2.9-6.2,0c-2.4,20.2-17.3,30.9-17.3,30.9 c0,1.5,4.4,2.8,10.9,3.4c-7.7,17.9-20.7,27.3-20.7,27.3c0,2,5.3,3.7,13.3,4.8c-10.1,18.1-23.2,27.5-23.2,27.5 c0,2.2,5.1,4.3,13.2,5.7c-12.4,19-26.1,28.8-26.1,28.8c0,5,19.1,9.2,44.2,10v5.2c0,2.1,1.7,3.8,3.8,3.8h10.1c2.1,0,3.8-1.7,3.8-3.8 v-5.2C88.85,141.65,108.05,137.55,108.05,132.55z"/> </svg>`,
  lights: [
    {left: '56.122%', top: '16.66%', width: '3.63%',},
    {left: '82.142%', top: '81.89%', width: '7.27%',},
    {left: '71.683%', top: '77.08%', width: '5.45%',},
    {left: '24.489%', top: '56.41%', width: '7.27%',},
    {left: '34.948%', top: '71.79%', width: '7.27%',},
    {left: '43.112%', top: '22.11%', width: '5.45%',},
    {left: '27.806%', top: '82.53%', width: '5.45%',},
    {left: '46.938%', top: '56.57%', width: '3.63%',},
    {left: '70.408%', top: '58.49%', width: '3.63%',},
    {left: '62.755%', top: '42.14%', width: '3.63%',},
    {left: '59.693%', top: '70.51%', width: '7.27%',},
    {left: '55.867%', top: '28.52%', width: '7.27%',},
    {left: '60.204%', top: '50.00%', width: '5.45%',},
    {left: '37.244%', top: '42.62%', width: '5.45%',},
  ]
}
ChristmasWonderland.tree_type_2 = {
  svg: `<svg class="c-christmas-tree__tree" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 98 156" xml:space="preserve"> <path d="M95.7,133.8l-17.2-30.6c4-1.1,6.3-2.4,6.3-3.9L68.6,70.5c5-1,8-2.3,8-3.7l-16-28.7c5.4-0.7,8.9-1.9,8.9-3.2L52.1,4.1 c-1.4-2.4-4.8-2.4-6.2,0L28.6,34.9c0,1.3,3.5,2.5,8.9,3.2L21.4,66.8c0,1.4,3.1,2.8,8,3.7L13.2,99.3c0,1.4,2.3,2.8,6.3,3.9L2.3,133.8 c0,4.2,15.2,7.7,35.7,8.6v7.6c0,2,1.6,3.7,3.7,3.7h14.7c2,0,3.7-1.6,3.7-3.7v-7.6C80.5,141.5,95.7,138,95.7,133.8z"/> </svg>`,
  lights: [
    {left: '56.30%', top: '16.88%', width: '3.63%',},
    {left: '50.90%', top: '57.14%', width: '7.27%',},
    {left: '68.60%', top: '62.01%', width: '5.45%',},
    {left: '28.10%', top: '57.14%', width: '7.27%',},
    {left: '42.70%', top: '19.48%', width: '7.27%',},
    {left: '39.50%', top: '71.10%', width: '5.45%',},
    {left: '24.00%', top: '84.74%', width: '5.45%',},
    {left: '56.30%', top: '48.05%', width: '3.63%',},
    {left: '80.00%', top: '83.76%', width: '3.63%',},
    {left: '43.60%', top: '31.16%', width: '3.63%',},
    {left: '62.70%', top: '39.25%', width: '7.27%',},
    {left: '42.70%', top: '83.11%', width: '7.27%',},
    {left: '63.10%', top: '76.94%', width: '5.45%',},
    {left: '39.50%', top: '43.18%', width: '5.45%',},
  ],
};
ChristmasWonderland.kfc_bucket_image = './kfc.png';


class SnowEffect {
  static pixels_per_flake_min = 500;
  static pixels_per_flake_max = 5000;

  static snow_levels = {
    // The rate at which snow falls. High numbers means less snow
    low: {min: 1000, max: 10000},
    medium: {min: 500, max: 5000},
    high: {min: 250, max: 4000},
    blizzard: {min: 100, max: 1000},
  };

  static max_size = 12;
  static min_size = 3;

  static min_x_speed = 0.5;
  static max_x_speed = 4;

  static min_y_speed = 1;
  static max_y_speed = 3;

  constructor() {
    this.state = {
      enabled: false,
      snow_level: SnowEffect.snow_levels.medium,
    };
  }

  activate(snow_level = 'medium') {
    snow_level = snow_level.toLowerCase();
    if (SnowEffect.snow_levels[snow_level]) {
      this.state.snow_level = SnowEffect.snow_levels[snow_level];
    }

    if (this._canvas || this.state.enabled) {
      return;
    }

    this.state.enabled = true;

    this._canvas = document.createElement('canvas');
    this._canvas.classList.add('c-effect__snow-canvas');
    document.body.appendChild(this._canvas);

    this._context = this._canvas.getContext('2d');

    // 0 timeout to allow the CSSOM to update the size of the canvas appropriately
    setTimeout(() => this.initAndReset(), 0);

    // If the window resizes, just start all over again for simplicity
    this._resizeHandler = () => this.initAndReset();
    window.addEventListener('resize', this._resizeHandler);
  }

  deactivate() {
    if (!this._canvas || !this.state.enabled) {
      return;
    }

    this.state.enabled = false;
    window.removeEventListener('resize', this._resizeHandler);

    if (this._requested_animation_frame) {
      this._requested_animation_frame = null;
      cancelAnimationFrame(this._requested_animation_frame);
    }

    this._context = null;
    this._canvas.parentElement.removeChild(this._canvas);
    this._canvas = null;
  }

  initAndReset() {
    this._width = this._canvas.width = window.innerWidth;
    this._height = this._canvas.height = window.innerHeight;
    this._snowflakes = [];

    if (!this._requested_animation_frame) {
      this._requested_animation_frame = requestAnimationFrame(() => this.handleFrame());
    }
  }

  handleFrame() {
    this._context.clearRect(0, 0, this._width, this._height);

    // Add new snowflakes
    const min_new = this._width / this.state.snow_level.max;
    const max_new = this._width / this.state.snow_level.min;
    const number_of_new_flakes = getRandomInt(min_new, max_new);
    for (let i = 0; i < number_of_new_flakes; i++) {
      this._snowflakes.push(this.createSnowflake());
    }

    // Move all the flakes
    for (const snowflake of this._snowflakes) {
      snowflake.x += snowflake.velocity.x;
      snowflake.y += snowflake.velocity.y;

      this._context.fillStyle = '#fff';
      this._context.beginPath();
      this._context.arc(snowflake.x, snowflake.y, snowflake.size, 0, 2 * Math.PI, false);
      this._context.fill();
    }

    // Remove particles below the screen
    this._snowflakes = this._snowflakes.filter((snowflake) => {
      const top_y = snowflake.y + (snowflake.size / 2);
      if (top_y > this._height) {
        return false;
      }

      const top_x = snowflake.x - (snowflake.size / 2);
      if (top_x > this._width) {
        return false;
      }

      return true;
    });

    this._requested_animation_frame = requestAnimationFrame(() => this.handleFrame());
  }

  createSnowflake() {
    const x = Math.random() * this._width;
    const size = getRandomFloat(SnowEffect.min_size / 2, SnowEffect.max_size / 2);

    let x_vel = getRandomFloat(SnowEffect.min_x_speed, SnowEffect.max_x_speed);
    if (Math.random() > 0.5) {
      x_vel = -x_vel;
    }

    return {
      x,
      y: -size,
      size,
      velocity: {
        x: x_vel,
        y: getRandomFloat(SnowEffect.min_y_speed, SnowEffect.max_y_speed),
      }
    };
  }

  isSnowflakeOffscreen(snowflake) {
    const top_y = snowflake.y + (snowflake.size / 2);
    if (top_y > this._height) {
      return false;
    }

    const top_x = snowflake.x - (snowflake.size / 2);
    if (top_x > this._width) {
      return false;
    }
  }
}


// const ef = new ChristmasWonderland();
// ef.activate();

// const snow = new SnowEffect();
// snow.activate();

class GhostBanriEffect {
  constructor() {
    this.state = {
      enabled: false,
      length_s: GhostBanriEffect.DEFAULT_LENGTH_S,
      // The target number of people to be affected by each activation
      infection_rate: GhostBanriEffect.DEFAULT_INFECTION_RATE,
    };
    this.banri_timeout = null;
    this.deactivate_timeout = null;
  }

  activate(length_s = 0, infection_rate = 0) {
    if (length_s > 0) {
      this.state.length_s = length_s;
      this.resetDeactivationTimer();
    }
    if (infection_rate > 0 && infection_rate <= 1) {
      this.state.infection_rate = infection_rate;
    }

    if (this.state.enabled) {
      return;
    }

    this.state.enabled = true;
    this.maybeShowBanri();
    this.resetDeactivationTimer();
  }

  deactivate() {
    if (!this.state.enabled) {
      return;
    }

    this.state.enabled = false;
    if (this.banri_timeout) {
      clearTimeout(this.banri_timeout);
      this.banri_timeout = null;
    }

    this.length_s =GhostBanriEffect.DEFAULT_LENGTH_S;
    this.infection_rate = GhostBanriEffect.DEFAULT_INFECTION_RATE;
  }

  maybeShowBanri() {
    if (this.banri_timeout) {
      clearTimeout(this.banri_timeout);
      this.banri_timeout = null;
    }

    if (!this.state.enabled) {
      return;
    }

    if (Math.random() > this.state.infection_rate) {
      console.log('MISS');
      this.banri_timeout = setTimeout(() => this.maybeShowBanri(), GhostBanriEffect.TIME_BETWEEN_ACTIVATIONS_S * 1000);
      return;
    }

    console.log('HIT');
    this.showBanri()
      .then(() => {
        clearTimeout(this.banri_timeout);
        this.banri_timeout = setTimeout(() => this.maybeShowBanri(), GhostBanriEffect.TIME_BETWEEN_ACTIVATIONS_S * 1000);
      });
  }

  showBanri() {
    const img = document.createElement('img');
    img.src = GhostBanriEffect.BANRI_IMG;
    img.classList.add('c-effect__banri');
    document.body.appendChild(img);

    const window_width = window.innerWidth;
    const window_height = window.innerHeight;

    const min_left = 0;
    const max_left = window_width - 40;
    const min_top = 0;
    const max_top = window_height - 40;

    img.style.top = getRandomInt(min_left, max_left) + 'px';
    img.style.left = getRandomInt(min_top, max_top) + 'px';
    return new Promise((resolve) => {
      img.addEventListener('animationend', () => {
        img.parentElement.removeChild(img);
        resolve();
      });
    });
  }

  resetDeactivationTimer() {
    if (this.deactivate_timeout) {
      clearTimeout(this.deactivate_timeout);
      this.deactivate_timeout = null;
    }

    this.deactivate_timeout = setTimeout(() => this.deactivate(), this.state.length_s * 1000);
  }
}
GhostBanriEffect.DEFAULT_LENGTH_S = 10 * 60;
GhostBanriEffect.DEFAULT_INFECTION_RATE = 0.5;
GhostBanriEffect.TIME_BETWEEN_ACTIVATIONS_S = 5
GhostBanriEffect.BANRI_IMG = './ghost-banri.png';

const banri = new GhostBanriEffect();
banri.activate(10 * 60, 0.9);
