All commands are case-insensitive regarding the command name itself (e.g., `/snow` or `/SNOW`), but parameter sensitivity varies. Commands are generally restricted to Moderators/Admins based on the logic found in `formatChatMessage`.

### Global Controls
These commands control the effects system globally or locally for the user.

| Command | Description |
| :--- | :--- |
| `/effects_enable` | Globally enables the effects system. |
| `/effects_disable` | Globally disables the effects system (preventing new ones from starting). |
| `/effects_stop` | Immediately stops all currently running effects. |
| **Button** | There is also a local "Effects ON/OFF" button in the chat wrap that toggles rendering locally. |

---

### Visual & Overlay Effects

#### `/snow`
Enables a WebGL snow overlay on the screen.
* **Syntax:** `/snow [level]`
* **Stop:** `/snow off`
* **Parameters (Level):**
    * `low`, `dust`, `light` (Light snow)
    * `medium`, `normal` (Default)
    * `high`, `blizzard` (Heavy snow)
    * `prime95`, `space_heater`, `whiteout` (Heavier snow)
    * `danger`, `bigdanger`, `canada`, `death` (Maximum particle count)

#### `/padoru`
Spawns drifting "Padoru" (chibi Christmas anime) sprites across the screen.
* **Syntax:** `/padoru [level]`
* **Stop:** `/padoru off`
* **Parameters:**
    * `1` (Default): Low spawn rate, max 6 sprites.
    * `2`: Medium spawn rate, max 10 sprites.
    * `3`: High spawn rate, max 20 sprites.

#### `/orange`
Spawns floating orange emojis (🍊).
* **Syntax:** `/orange [level]`
* **Stop:** `/orange off`
* **Parameters:**
    * `1` to `5`: Increases spawn rate and max limit (Level 5 = 60 oranges).

#### `/wonderland`
Transforms the page into a Christmas theme. Adds a light rope, candy canes, Christmas trees, and a KFC bucket image to the layout.
* **Syntax:** `/wonderland`
* **Stop:** `/wonderland off`
* **Parameters:** None.

#### `/idol`
Adds a disco overlay with a disco ball, spotlights, and sparkles.
* **Syntax:** `/idol`
* **Stop:** `/idol off`
* **Parameters:** None.

#### `/heartbeat`
Creates a "low health" vignette effect (red edges) and plays a looping heartbeat sound.
* **Syntax:** `/heartbeat [seconds]`
* **Stop:** `/heartbeat off`
* **Parameters:**
    * `seconds`: (Optional) Duration to run. Defaults to 10 seconds.

#### `/geass`
Triggers a full-screen "Code Geass" eye animation sequence with a vignette and static effect.
* **Syntax:** `/geass`
* **Stop:** Automatically stops after animation completion (approx 4 seconds).
* **Parameters:** None.

#### `/banri`
A "Ghost Banri" image will pop up at random intervals and random screen locations.
* **Syntax:** `/banri [minutes] [infection_rate]`
* **Stop:** `/banri off`
* **Parameters:**
    * `minutes`: How long the effect stays active (Default: 10).
    * `infection_rate`: Probability (0-100) of the ghost appearing on a tick (Default: 50).

#### `/loopy`
Distorts the page layout using CSS variable randomization (makes elements wobble/shift).
* **Syntax:** `/loopy [mode]`
* **Stop:** `/loopy off`
* **Parameters:**
    * (empty): Standard wobbling.
    * `chaos`: Adds an extra CSS class for more extreme distortion.

#### `/spinzaku`
Displays a spinning image of Suzaku (Code Geass).
* **Syntax:** `/spinzaku [type]`
* **Stop:** Stops automatically after animation.
* **Parameters (Type):** controls speed and direction.
    * `n` (Normal - Default), `s` (Slow), `vs` (Very Slow), `f` (Fast), `vf` (Very Fast).
    * Prefix any of the above with `r` to reverse direction (e.g., `rvf`, `rs`).

---

### Interactive & Utility Effects

#### `/erabe`
Spawns floating "erabe" text. If the command sender is a mod/admin, it also automatically creates a system poll titled "ERABE".
* **Syntax:** `/erabe [count] [seconds] [options_count]`
* **Stop:** `/erabe off`
* **Parameters:**
    * `count`: Number of "erabe" text elements to spawn (Max 15).
    * `seconds`: How long they last (Max 20).
    * `options_count`: How many options to add to the poll (Max 10).

#### `/wheel`
Renders a spinning SVG wheel on screen to make a random selection.
* **Syntax:** `/wheel [seed] [choice1, choice2, ...]`
* **Stop:** `/wheel off` (or waits for spin to finish).
* **Parameters:**
    * `seed`: A text seed for the random number generator (ensures deterministic spin).
    * `choices`: A comma or space-separated list of items to put on the wheel.

#### `/punch`
Spawns a clickable character image. Clicking it plays a punch sound and updates a global server-side counter.
* **Syntax:** `/punch [character] [counter_id] [seconds]`
* **Stop:** `/punch off` (or waits for timer).
* **Parameters:**
    * `character`: Must be one of: `ami`, `nina`, `satanya`, `rolo`, `rossiu`, `shoe`, `hitlershoe`.
    * `counter_id`: A unique ID string to track clicks on the server.
    * `seconds`: How long the image remains on screen (Default/Max: 60).

#### `/arcade_theme`
Changes the UI to an "Arcade" fighting game style. It hooks into the polling system—if a poll is running, it turns the poll options into "Health Bars" at the top of the screen based on vote percentages.
* **Syntax:** `/arcade_theme`
* **Stop:** `/arcade_theme off`
* **Parameters:** None.

#### `/tlnote`
Displays a "TL Note:" banner at the top of the screen with custom text. Stays on screen based on estimated reading time (min 5 seconds).
* **Syntax:** `/tlnote [your text here]`
* **Stop:** `/tlnote off`
* **Parameters:** Any text following the command.

#### `/soundboard`
Plays a specific audio file from the server's `Media/soundboard/` directory.
* **Syntax:** `/soundboard [filename]`
* **Stop:** `/soundboard off` (Stops all currently playing sounds).
* **Parameters:**
    * `filename`: The name of the file (without `.mp3` extension).

#### `/presents`
Runs a specific "Presents" animation sequence involving a face animation and falling presents.
* **Syntax:** `/presents`
* **Stop:** `/presents stop`
* **Parameters:**
    * (empty): Starts the animation.
    * `update`: Refreshes the present image URLs from the server.
    * `cache`: Pre-loads images (technical).
