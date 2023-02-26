/* eslint-disable no-nested-ternary */
import React, { useMemo, useState } from 'react'

export const AppContext = React.createContext(null)

export function ContextWrapper({ children }) {
    const [store, setStore] = useState({
        sponsorsRef: null,
        speakersRef: null,
        loading: null,
        loadingMsg: null,
        backgroundColor: '#42a5f5',
        footerColor: '#42a5f5',
    })

    const [actions, setActions] = useState({
        setSpeakersRef: (speakerRef) =>
            setStore((prevStore) => ({
                ...prevStore,
                speakersRef: speakerRef,
            })),
        setSponsorsRef: (sponsorRef) =>
            setStore((prevStore) => ({
                ...prevStore,
                sponsorsRef: sponsorRef,
            })),
        setLoading: (bool) =>
            setStore((prevStore) => ({
                ...prevStore,
                loading: bool,
            })),
        setLoadingMsg: (msg) =>
            setStore((prevStore) => ({
                ...prevStore,
                loadingMsg: msg,
            })),
        setBackgroundColor: (color) => {
            setStore((prevStore) => ({
                ...prevStore,
                backgroundColor: color,
                footerColor: `${color === '#42a5f5' ? '#1a1a1a' : '#42a5f5'}`,
            }))
        },
        setFooterColor: (color) =>
            setStore((prevStore) => ({
                ...prevStore,
                footerColor: color,
            })),
    })
    const appProviderValue = useMemo(() => ({ store, actions }), [store, actions])
    return <AppContext.Provider value={appProviderValue}>{children}</AppContext.Provider>
}
