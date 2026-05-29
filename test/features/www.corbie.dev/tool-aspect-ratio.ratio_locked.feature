Feature: Verify Aspect Ratio Tool - Ratio Locked

  @aspect-ratio
  Scenario: User can change the ratio and the pixels will update accordingly
    Given the user is using Aspect Ratio Tool
    When aspect-ratio mode is set to "<mode>"
    And the user changes "<origin>" to "<input>"
    Then the following values should be displayed:
      | key          | value        |
      | <target>     | <output>     |
      | <check1>     | <value1>     |
      | <check2>     | <value2>     |
      | inputPresets | <dropdown>   |
      | simplified   | <simplified> |
      | decimal      | <decimal>    |
      | percentage   | <percentage> |

    Examples:
      | mode         | origin      | input | target      | output | check1      | value1 | check2      | value2 | dropdown | simplified                      | decimal | percentage |
      | width/height | ratioWidth  |    32 | pixelWidth  |   3840 | ratioHeight |      9 | pixelHeight |   1080 | default  |                            32:9 |    3.56 |    355.56% |
      | width/height | ratioWidth  |     8 | pixelWidth  |    960 | ratioHeight |      9 | pixelHeight |   1080 | default  |                             8:9 |    0.89 |     88.89% |
      | width/height | ratioHeight |    10 | pixelHeight |   1200 | ratioWidth  |     16 | pixelWidth  |   1920 | default  |                             8:5 |    1.60 |       160% |
      | width/height | ratioHeight |     5 | pixelHeight |    600 | ratioWidth  |     16 | pixelWidth  |   1920 | default  |                            16:5 |    3.20 |       320% |
      | width/height | pixelWidth  |  3840 | ratioWidth  |     32 | ratioHeight |      9 | pixelHeight |   1080 | default  |                            32:9 |    3.56 |    355.56% |
      | width/height | pixelWidth  |   960 | ratioWidth  |      8 | ratioHeight |      9 | pixelHeight |   1080 | default  |                             8:9 |    0.89 |     88.89% |
      | width/height | pixelHeight |  1200 | ratioHeight |     10 | ratioWidth  |     16 | pixelWidth  |   1920 | default  |                             8:5 |    1.60 |       160% |
      | width/height | pixelHeight |   600 | ratioHeight |      5 | ratioWidth  |     16 | pixelWidth  |   1920 | default  |                            16:5 |    3.20 |       320% |
      | ratio/pixels | ratioWidth  |    32 | ratioHeight |     18 | pixelWidth  |   1920 | pixelHeight |   1080 | default  |                            16:9 |    1.78 |    177.78% |
      | ratio/pixels | ratioWidth  |     8 | ratioHeight |    4.5 | pixelWidth  |   1920 | pixelHeight |   1080 | default  |                            16:9 |    1.78 |    177.78% |
      | ratio/pixels | ratioHeight |    10 | ratioWidth  |  17.78 | pixelWidth  |   1920 | pixelHeight |   1080 | default  | 625578135739433:351843720888320 |    1.78 |     177.8% |
      | ratio/pixels | ratioHeight |     5 | ratioWidth  |   8.89 | pixelWidth  |   1920 | pixelHeight |   1080 | default  | 625578135739433:351843720888320 |    1.78 |     177.8% |
      | ratio/pixels | pixelWidth  |  3840 | pixelHeight |   2160 | ratioWidth  |     16 | ratioHeight |      9 |     16,9 |                            16:9 |    1.78 |    177.78% |
      | ratio/pixels | pixelWidth  |   960 | pixelHeight |    540 | ratioWidth  |     16 | ratioHeight |      9 |     16,9 |                            16:9 |    1.78 |    177.78% |
      | ratio/pixels | pixelHeight |  1200 | pixelWidth  |   2133 | ratioWidth  |     16 | ratioHeight |      9 |     16,9 |                            16:9 |    1.78 |    177.78% |
      | ratio/pixels | pixelHeight |   600 | pixelWidth  |   1067 | ratioWidth  |     16 | ratioHeight |      9 |     16,9 |                            16:9 |    1.78 |    177.78% |

  @aspect-ratio
  Scenario: User changes the input and the ratio and pixels will update accordingly
    Given the user is using Aspect Ratio Tool
    When user clicks the swap button
    Then the following values should be displayed:
      | key         | value |
      | ratioWidth  |     9 |
      | ratioHeight |    16 |
      | pixelWidth  |  1080 |
      | pixelHeight |  1920 |

  @aspect-ratio
  Scenario: User changes the dropdown and the ratio and pixels will update accordingly
    Given the user is using Aspect Ratio Tool
    When dropdown is set to "<dropdown>"
    Then the following values should be displayed:
      | key         | value         |
      | ratioWidth  | <ratioWidth>  |
      | ratioHeight | <ratioHeight> |
      | pixelWidth  | <pixelWidth>  |
      | pixelHeight | <pixelHeight> |

    Examples:
      | dropdown | ratioWidth | ratioHeight | pixelWidth | pixelHeight |
      |      4,3 |          4 |           3 |       1920 |        1440 |
      |     21,9 |         21 |           9 |       1920 |         823 |
      |      1,1 |          1 |           1 |       1920 |        1920 |
