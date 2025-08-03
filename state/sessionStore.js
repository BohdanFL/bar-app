import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { auth } from '../Firebase/firebaseConfig';

const useSessionStore = create(
    persist(
        (set) => ({
            guestSessionActive: false,
            guestUsername: '',
            barmanEmail: '',
            barmanSessionActive: false,
            barmanFullEmail: '',

            setGuestSession: (username, email) => {
                set({
                    guestSessionActive: true,
                    guestUsername: username,
                    barmanEmail: email,
                });
            },

            clearGuest: () =>
                set({
                    guestSessionActive: false,
                    guestUsername: '',
                    barmanEmail: '',
                }),
            setBarmanSession: (email) =>
                set({ barmanSessionActive: true, barmanFullEmail: email }),
            // clearBarmanSession: () =>
            //     set({ barmanSessionActive: false, barmanFullEmail: '' }),
            signOutBarman: async () => {
                try {
                    await auth.signOut();
                    set({ barmanSessionActive: false, barmanFullEmail: '' });
                    console.log('User signed out successfully.');
                } catch (error) {
                    console.error('Error signing out:', error);
                }
            },
        }),
        {
            name: 'session-storage', // ключ в AsyncStorage
            storage: {
                getItem: async (name) => {
                    const value = await AsyncStorage.getItem(name);
                    console.log('getItem AS: ', value);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (name, value) => {
                    console.log('setItem AS: ', value);

                    await AsyncStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: async (name) => {
                    await AsyncStorage.removeItem(name);
                },
            },
        }
    )
);

export default useSessionStore;
