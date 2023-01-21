import React, { useMemo, useState } from 'react';

export const AppContext = React.createContext(null);

export function ContextWrapper({children}) {
	const [ store, setStore ] = useState({
		speakersRef: null,
		loading: null,
		loadingMsg: null,
	});
	const [ actions, setActions ] = useState({
		setSpeakersRef: ref => setStore({ ...store, speakersRef: ref }),
		setLoading: bool => setStore({ ...store, loading: bool }),
		setLoadingMsg: msg => setStore({ ...store, setLoadingMsg: msg })
	});
	const appProviderValue= useMemo(() => ({ store, actions }), [store, actions]);
	return (
		<AppContext.Provider value={appProviderValue}>
			{children}
		</AppContext.Provider>
	);
}