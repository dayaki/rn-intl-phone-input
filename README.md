# rn-intl-phone-input

A React Native component for international phone number input with country selection, formatting and validation. Built with Typescript and no external dependencies.

## Installation

```bash
npm install rn-intl-phone-input
# or
yarn add rn-intl-phone-input
```

## Usage

### JavaScript

```jsx
import React, { useState } from "react";
import { View, Text } from "react-native";
import { IntlPhoneInput } from "rn-intl-phone-input";

const MyComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(false);

  const onChangePhoneNumber = (number, isValid) => {
    setPhoneNumber(number);
    setValid(isValid);
  };

  return (
    <View>
      <IntlPhoneInput
        onChangePhoneNumber={onChangePhoneNumber}
        disableCountrySelection={false}
        priorityCountryCodes={["US", "GB", "NG"]}
      />
      <Text>Phone Number: {phoneNumber}</Text>
      <Text>Is Valid: {valid ? "Yes" : "No"}</Text>
    </View>
  );
};

export default MyComponent;
```

### TypeScript

```tsx
import React, { useState } from "react";
import { View, Text } from "react-native";
import { IntlPhoneInput } from "rn-intl-phone-input";

const MyComponent: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [valid, setValid] = useState<boolean>(false);

  const onChangePhoneNumber = (number: string, isValid: boolean) => {
    setPhoneNumber(number);
    setValid(isValid);
  };

  return (
    <View>
      <IntlPhoneInput
        onChangePhoneNumber={onChangePhoneNumber}
        disableCountrySelection={false}
        priorityCountryCodes={["US", "GB", "NG"]}
      />
      <Text>Phone Number: {phoneNumber}</Text>
      <Text>Is Valid: {valid ? "Yes" : "No"}</Text>
    </View>
  );
};

export default MyComponent;
```

## Props

| Prop                    | Type                                            | Description                                                           | Default  |
| ----------------------- | ----------------------------------------------- | --------------------------------------------------------------------- | -------- |
| onChangePhoneNumber     | (phoneNumber: string, isValid: boolean) => void | Callback function that is called when the phone number changes        | Required |
| containerStyle          | ViewStyle                                       | Custom style for the container                                        | {}       |
| inputStyle              | TextStyle                                       | Custom style for the input field                                      | {}       |
| countryPickerStyle      | ViewStyle                                       | Custom style for the country picker                                   | {}       |
| disableCountrySelection | boolean                                         | If true, disables the ability to change the country                   | false    |
| priorityCountryCodes    | string[]                                        | Array of country codes to be displayed at the top of the country list | []       |

## Features

- Country selection with search functionality
- Phone number formatting based on selected country
- Validation of phone number length
- Customizable styles
- Option to disable country selection
- Priority country list

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
