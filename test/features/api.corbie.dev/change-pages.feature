Feature: Verify api.corbie.dev Navigation

  Scenario Outline: User can navigate to <tool_name> via sidebar and <element_type>
    Given the user is on "http://localhost:4201"
    When the user clicks the "<tool_name>" "<element_type>"
    Then the browser URL should change to "http://localhost:4201/docs/<target_path>"

    Examples:
      | tool_name            | element_type | target_path          |
      | Lorem Image          | text link    | lorem-image          |
      | Lorem Image          | icon link    | lorem-image          |
