Feature: Verify Tool Color Converter

  Scenario Outline: User can sets hex to <input>
    Given the user is using Color Connverter
    When the user changes "hex" to "<input>"
    Then the following values should be displayed:
      | key       | value       |
      | rgb       | <rgb>       |
      | hwb       | <hwb>       |
      | oklch     | <oklch>     |
      | inputName | <inputName> |
      | hsv-h     | <hsv-h>     |
      | hsv-s     | <hsv-s>     |
      | hsv-v     | <hsv-v>     |
      | hsl-h     | <hsl-h>     |
      | hsl-s     | <hsl-s>     |
      | hsl-l     | <hsl-l>     |
      | cmyk-c    | <cmyk-c>    |
      | cmyk-m    | <cmyk-m>    |
      | cmyk-y    | <cmyk-y>    |
      | cmyk-k    | <cmyk-k>    |

    Examples:
      | input  | rgb         | hwb        | oklch                | inputName | hsv-h | hsv-s | hsv-v | hsl-h | hsl-s | hsl-l | cmyk-c | cmyk-m | cmyk-y | cmyk-k |
      | 000000 |       0,0,0 |  0 0% 100% |               0% 0 0 |    000000 |     0 |     0 |     0 |     0 |     0 |     0 |      0 |      0 |      0 |    100 |
      | 00bfff |   0,191,255 |  195 0% 0% | 75.54% 0.1534 231.64 |    00bfff |   195 |   100 |   100 |   195 |   100 |    50 |    100 |     25 |      0 |      0 |
      | 04aa6d |   4,170,109 | 158 2% 33% | 65.09% 0.1491 158.94 | default   |   158 |  97.6 |  66.7 |   158 |  95.4 |  34.1 |     98 |      0 |     36 |     33 |
      | ffffff | 255,255,255 |  0 100% 0% |         100% 0 89.88 | ffffff    |     0 |     0 |   100 |     0 |     0 |   100 |      0 |      0 |      0 |      0 |
      | ffd801 |   255,216,1 |   51 0% 0% |  88.88% 0.1826 95.75 | default   |    51 |  99.6 |   100 |    51 |   100 |  50.2 |      0 |     15 |    100 |      0 |
