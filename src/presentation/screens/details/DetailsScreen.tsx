import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Text, View } from 'react-native'
import { RootStackParams } from '../../navigation/Navigation';
import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../components/movie/movieHeader';
import { MovieDetails } from '../../components/movie/MovieDetails';
import { ScrollView } from 'react-native-gesture-handler';
import { FullScreenLoader } from '../../components/loader/FullScreenLoader';

interface Props extends StackScreenProps<RootStackParams, 'Details'>{};


export const DetailsScreen = ({ route } : Props) => {

  const { movieId } = route.params;

  //console.log({movieId});

  const { isLoading, movie, cast=[] } = useMovie(movieId);

  if (isLoading){
    return <FullScreenLoader />
  }


  return (
    <ScrollView>
        <MovieHeader movie={ movie! } />
        <MovieDetails movie={movie!} cast={cast} />
    </ScrollView>
  )
}