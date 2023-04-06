import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
    errorMessage?: string | null;
}

export function Input ({errorMessage = null, isInvalid,...rest}: Props){
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl isInvalid={invalid} mb={4}>
            <NativeBaseInput 
                bg="gray.700"
                h={14} //altura
                px={4} //padding no eixo x = esquerda e direita
                borderWidth={0} //sem borda
                fontSize="md"
                color="white"
                fontFamily="body"
                placeholderTextColor="gray.300"
                _focus={{
                    bg: "gray.700",
                    borderWidth: 1,
                    borderColor: "green.500",
                }}
                {...rest}
            />
            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}