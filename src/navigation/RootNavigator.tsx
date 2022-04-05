import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import {getGroup} from '../redux/modules/group';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const RootNavigator = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const isLoadingGroup = useAppSelector(state => state.group.isLoadingGroup);

  useEffect(() => {
    dispatch(getGroup());
  }, [dispatch]);

  if (isLoadingGroup) {
    return (
      <View>
        <Text>Checking Data ...</Text>
      </View>
    );
  }

  if (isAuthenticated) {
    return <MainStack />;
  }

  return <AuthStack />;
};

export default RootNavigator;
