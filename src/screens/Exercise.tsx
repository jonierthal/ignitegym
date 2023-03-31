import { VStack,Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AppNavgatorRoutesProps } from '@routes/app.routes';

export function Exercise(){
    const navigation = useNavigation<AppNavgatorRoutesProps>();

    function handleGoBack(){
        navigation.goBack();
    }

    return (
        <VStack flex={1}>
            <VStack px={8} bg="gray.600" pt={12}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={Feather} name="arrow-left" color="green.500" size={6}/>
                </TouchableOpacity>
            </VStack>
        </VStack>
    );
}