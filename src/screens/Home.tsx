import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { VStack, Text, HStack } from 'native-base';

export function Home(){
    return (
        <VStack flex={1}>
            <HomeHeader />
            
            <HStack>
                <Group name="costas"/>
                <Group name="ombro"/>

            </HStack>
        </VStack>
    );
}