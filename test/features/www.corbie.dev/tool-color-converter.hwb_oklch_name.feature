Feature: Verify Tool Color Converter

  Scenario Outline: User can sets <key> to <input>
    Given the user is using Color Connverter
    When the user changes "<key>" to "<input>"
    Then the following values should be displayed:
      | key | value |
      | rgb | <rgb> |

    Examples:
      | key       | input                | rgb         |
      | hwb       |           158 2% 33% |   5,171,110 |
      | hwb       |            0 100% 0% | 255,255,255 |
      | oklch     | 65.35% 0.1505 158.71 |   3,171,109 |
      | oklch     |         100% 0 89.88 | 255,255,255 |
      | inputName |               00bfff |   0,191,255 |
      | inputName |               000000 |       0,0,0 |
      | inputName | ffffff               | 255,255,255 |
