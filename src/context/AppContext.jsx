/* eslint-disable no-nested-ternary */
import React, { useMemo, useState } from 'react';

export const AppContext = React.createContext(null);

export function ContextWrapper({children}) {
	const [ store, setStore ] = useState({
		speakersRef: null,
		sponsorsRef: null,
		loading: null,
		loadingMsg: null,
		backgroundColor: '#42a5f5',
		footerColor: '#42a5f5',
	});
	const [ actions, setActions ] = useState({
		setSpeakersRef: speakerRef => setStore({ ...store, speakersRef: speakerRef }),
		setSponsorsRef: sponsorRef => setStore({ ...store, sponsorsRef: sponsorRef }),
		setLoading: bool => setStore({ ...store, loading: bool }),
		setLoadingMsg: msg => setStore({ ...store, loadingMsg: msg }),
		setBackgroundColor: color => {
			setStore({...store, backgroundColor: color})
			setStore({...store, footerColor: `${color==="#42a5f5"?"#1a1a1a":"#42a5f5"}`})
		},
		setFooterColor: color => {
			setStore({...store, footerColor: color})
		},
	});
	const appProviderValue= useMemo(() => ({ store, actions }), [store, actions]);
	return (
		<AppContext.Provider value={appProviderValue}>
			{children}
		</AppContext.Provider>
	);
}