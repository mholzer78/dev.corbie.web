Feature: Verify corbie.dev Navigation

  Scenario Outline: User can navigate to <tool_name> via sidebar and <element_type>
    Given the user is on "http://localhost:4200"
    When the user clicks the "<tool_name>" "<element_type>"
    Then the browser URL should change to "http://localhost:4200/<target_path>"

    Examples:
      | tool_name            | element_type | target_path          |
      | Color Converter      | text link    | color-converter      |
      | Color Converter      | icon link    | color-converter      |
      | Password Generator   | text link    | password-generator   |
      | Password Generator   | icon link    | password-generator   |
      | Permission Generator | text link    | permission-generator |
      | Permission Generator | icon link    | permission-generator |
      | Change Case          | text link    | change-case          |
      | Change Case          | icon link    | change-case          |
      | Lorem Ipsum          | text link    | lorem-ipsum          |
      | Lorem Ipsum          | icon link    | lorem-ipsum          |
      | Lorem Image          | text link    | lorem-image          |
      | Lorem Image          | icon link    | lorem-image          |
      | Time Converter       | text link    | time-converter       |
      | Time Converter       | icon link    | time-converter       |