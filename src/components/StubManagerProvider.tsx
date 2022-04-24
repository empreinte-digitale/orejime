import React, {useContext, useRef} from 'react';
import Context from './Context';

interface StubManagerProviderProps {
	children: (commit: () => void) => JSX.Element;
	onCommit: () => void;
}

export default function StubManagerProvider({
	children,
	onCommit
}: StubManagerProviderProps) {
	const {manager, ...context} = useContext(Context);

	// Child components manipulate this clone as it was the
	// real thing, but we're using it as a temporary store.
	// Its data is copied into the real one when the user
	// explicitly saves his choices.
	const {current: deferred} = useRef(manager.clone());

	const commit = () => {
		manager.setConsents(deferred.getAllConsents());
		onCommit();
	};

	return (
		<Context.Provider value={{...context, manager: deferred}}>
			{children(commit)}
		</Context.Provider>
	);
}
