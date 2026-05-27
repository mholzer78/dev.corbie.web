To build a truly useful and professional Aspect Ratio Calculator, you want to cover three main workflows:
Calculating unknown dimensions (most common), Discovering the ratio, and providing Industry Presets.Here is the breakdown of the features and options you should offer to make the tool highly intuitive for developers, designers, and video editors.

# 1. Core Calculator Modes (The "Choose Your Target" Options)

Instead of overwhelming the user with confusing inputs, provide toggle buttons or a dropdown to define what they want to calculate.

## Mode A: Scale Dimension (Keep Ratio Locked)

The user enters a base width and height (or selects a preset) to set the aspect ratio. Then, they change either the new width or new height, and the other value updates automatically.

- Option 1: Update Height by Width: User enters New Width $\rightarrow$ App calculates New Height.
- Option 2: Update Width by Height: User enters New Height $\rightarrow$ App calculates New Width.

## Mode B: Freeform Ratio Finder

The user inputs any pixel dimensions, and the app calculates the simplified mathematical ratio and the decimal value.

- Inputs: Pixel Width, Pixel Height.
- Outputs: Simplified Ratio (e.g., 16:9) and Decimal multiplier (e.g., 1.77).

# 2. Advanced Control Options

To make the UI smooth, include these quality-of-life toggles:

- The "Lock Ratio" Padlock: A visual padlock icon between the width and height inputs. When locked, changing one dimension recalculates the other using the current ratio. When unlocked, users can change pixels freely to define a new ratio.
- Swap Dimensions Button ($\rightleftharpoons$): A single click to flip width and height. Essential for designers switching a project from Landscape to Portrait (e.g., 1920x1080 $\rightarrow$ 1080x1920).

* Round to Nearest Even Pixel: In video encoding (like H.264/H.265), dimensions often need to be divisible by 2, 4, or 8 (macroblocks). Provide a checkbox: "Round to nearest even number".

# 3. Presets Sidebar / Dropdown

Users hate typing 1920 and 1080 manually. Provide a list of standard presets grouped by industry that instantly fill the calculator:

| Category        | Standard Ratios                                     | Common Pixel Sizes                                                |
| --------------- | --------------------------------------------------- | ----------------------------------------------------------------- |
| Video & Display | 16:9 (Widescreen), 21:9 (Ultrawide), 4:3 (Old TV)   | 1080p ($1920 \times 1080$), 4K ($3840 \times 2160$)               |
| Social Media    | 1:1 (Square), 9:16 (Vertical/Reels), 4:5 (Portrait) | Instagram Post ($1080 \times 1080$), Stories ($1080 \times 1920$) |
| Photography     | 3:2 (35mm Film/DSLR), 5:4 (Large Format)            | Print sizes ($4 \times 6$, $8 \times 10$)                         |
| Cinema          | 2.39:1 (Anamorphic), 1.85:1 (Academy)               | DCI 4K ($4096 \times 2160$)                                       |
