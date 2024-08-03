import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import TabIcons from './TabIcons';

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
    return (
        <View
            style={{
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: -2,
                },
                borderRadius:10,
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 4,
            }}>
            <SafeAreaView
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}>
                {state.routes.map((route, index) => {
                    const {options} = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={{
                                alignItems: 'center',
                                paddingVertical: 7,
                                marginTop: 4,
                                borderTopWidth: isFocused ? 2 : 0,
                                borderTopColor: '#4A68F8',
                                width: 52,
                            }}>
                            <TabIcons name={route.name} active={isFocused} />
                        </TouchableOpacity>
                    );
                })}
            </SafeAreaView>
        </View>
    );
};

export default TabBar;
