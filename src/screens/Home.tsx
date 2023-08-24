import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { AppNavgatorRoutesProps } from '@routes/app.routes';

import { api } from '@services/api';
import { VStack, FlatList, HStack, Heading, Text, useToast } from 'native-base';
import { AppError } from '@utils/AppError';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Loading } from '@components/Loading';

export function Home(){
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>([])
    const [exercises, setExercises] = useState<ExerciseDTO[]>([])
    const [groupSelected, setGroupSelected] = useState('Costas');

    const toast = useToast();
    const navigation = useNavigation<AppNavgatorRoutesProps>();

    function handleOpenExerciseDetails(exerciseId: string){
        navigation.navigate('exercise', { exerciseId })
    }
    
    async function fetchGroups(){
        try {
            const response = await api.get('/groups');
            setGroups(response.data);

        } catch(error){
            const isAppError = error instanceof AppError;
            const title = isAppError  ? error.message : 'Não foi possível carregar os grupos musculares.';

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
        }
    }

    async function fetchExercicesByGroup(){
        try {
            setIsLoading(true);

            const response = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(response.data);

        } catch(error){
            const isAppError = error instanceof AppError;
            const title = isAppError  ? error.message : 'Não foi possível carregar os exercícios.';

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchGroups();
    },[]);

    useFocusEffect(useCallback(() => {
        fetchExercicesByGroup();
    }, [groupSelected]))

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group 
                        name={item}
                        isActive={String(groupSelected).toLocaleUpperCase() === String(item).toLocaleUpperCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={10}
                maxH={10}
                minH={10}
            />  

            {
                isLoading ? <Loading/> : 
            <VStack flex={1} px={8}>   
                <HStack justifyContent="space-between">
                    <Heading color="gray.200" fontSize="md">
                        Exercicios
                    </Heading>

                    <Text color="gray.200" fontSize="sm">
                        {exercises.length}
                    </Text>
                </HStack>

                
                <FlatList
                    data={exercises}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => ( 
                        <ExerciseCard 
                            onPress={() => handleOpenExerciseDetails(item.id)}
                            data={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom:20 }}
                />

            </VStack>
            }
        </VStack>
    );
}