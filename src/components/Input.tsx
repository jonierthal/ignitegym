import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input ({...rest}: IInputProps){
    return (
        <NativeBaseInput 
            bg="gray.700"
            h={14} //altura
            px={4} //padding no eixo x = esquerda e direita
            borderWidth={0} //sem borda
            fontSize="md"
            color="white"
            fontFamily="body"
            mb={4} //margin de baixo
            placeholderTextColor="gray.300"
            {...rest}
        />
    );
}