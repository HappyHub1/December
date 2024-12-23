use wasm_bindgen::prelude::*;
use rand::Rng;

// Constants matching JavaScript implementation
const MIN_SIZE: f64 = 1.5;
const MAX_SIZE: f64 = 4.0;
const MIN_X_SPEED: f64 = 0.5;
const MAX_X_SPEED: f64 = 3.0;
const MIN_Y_SPEED: f64 = 0.5;
const MAX_Y_SPEED: f64 = 2.0;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct Snowflake {
    x: f64,
    y: f64,
    size: f64,
    velocity_x: f64,
    velocity_y: f64,
}

#[wasm_bindgen]
pub struct SnowSystem {
    snowflakes: Vec<Snowflake>,
    width: f64,
    height: f64,
    snow_level_min: f64,
    snow_level_max: f64,
}

#[wasm_bindgen]
impl SnowSystem {
    #[wasm_bindgen(constructor)]
    pub fn new(width: f64, height: f64, snow_level_min: f64, snow_level_max: f64) -> Self {
        Self {
            snowflakes: Vec::new(),
            width,
            height,
            snow_level_min,
            snow_level_max,
        }
    }

    pub fn update(&mut self, delta_time: f64) {
        let mut rng = rand::thread_rng();

        // Add new snowflakes
        let min_new = self.width / self.snow_level_max;
        let max_new = self.width / self.snow_level_min;
        let number_of_new_flakes = rng.gen_range(min_new..=max_new).floor() as usize;

        for _ in 0..number_of_new_flakes {
            self.snowflakes.push(Self::create_snowflake(self.width));
        }

        // Update positions and remove off-screen snowflakes
        self.snowflakes.retain_mut(|flake| {
            // Apply velocity with deltaTime scaling (60fps normalization)
            flake.x += flake.velocity_x * delta_time * 60.0;
            flake.y += flake.velocity_y * delta_time * 60.0;

            // Keep if not off screen
            !(flake.y > self.height || flake.x > self.width || flake.x < -flake.size)
        });
    }

    fn create_snowflake(width: f64) -> Snowflake {
        let mut rng = rand::thread_rng();

        let size = rng.gen_range(MIN_SIZE..=MAX_SIZE);
        let mut x_vel = rng.gen_range(MIN_X_SPEED..=MAX_X_SPEED);

        // 50% chance to reverse x direction
        if rng.gen_bool(0.5) {
            x_vel = -x_vel;
        }

        Snowflake {
            x: rng.gen_range(0.0..width),
            y: -size * 2.0, // Start above screen
            size,
            velocity_x: x_vel,
            velocity_y: rng.gen_range(MIN_Y_SPEED..=MAX_Y_SPEED),
        }
    }

    // Getter to expose snowflake data to JavaScript
    pub fn get_snowflakes(&self) -> js_sys::Float64Array {
        let mut data = Vec::with_capacity(self.snowflakes.len() * 3);

        for flake in &self.snowflakes {
            data.push(flake.x);
            data.push(flake.y);
            data.push(flake.size);
        }

        js_sys::Float64Array::from(&data[..])
    }

    // Utility methods
    pub fn set_dimensions(&mut self, width: f64, height: f64) {
        self.width = width;
        self.height = height;
    }

    pub fn set_snow_level(&mut self, min: f64, max: f64) {
        self.snow_level_min = min;
        self.snow_level_max = max;
    }

    pub fn clear(&mut self) {
        self.snowflakes.clear();
    }
}
