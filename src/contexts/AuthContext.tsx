import { createContext, useState, useEffect, ReactNode } from "react";
import { useHistory } from "react-router-dom";

import { auth, firebase } from '../services/firebase';


type UserType = {
	id: string;
	name: string;
	avatar: string;
}

type AuthContextType = {
	user: UserType | undefined;
	signInWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
}

type AuthContextProviderPropsType = {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderPropsType){
	const [user, setUser] = useState<UserType>();
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user){
				const { displayName, photoURL, uid } = user;

				if (!displayName || !photoURL){
					throw new Error('Missing information from Google Account.');
				}

				setUser({
					id: uid,
					name: displayName,
					avatar: photoURL
				});
			}
			setLoading(false);
		})

		return () => {
			unsubscribe();
		}
	}, []);

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();

		const result = await auth.signInWithPopup(provider);
		
		if (result.user){
			const { displayName, photoURL, uid } = result.user;

			if (!displayName || !photoURL){
				throw new Error('Missing information from Google Account.');
			}

			setUser({
				id: uid,
				name: displayName,
				avatar: photoURL
			});
		}
	}

	async function signOut(){
		await auth.signOut();
		setUser(undefined);

		history.push('/')
	}

	if (loading) {
		return <p>carregando...</p>
	}

	return (
		<AuthContext.Provider value={{ user, signInWithGoogle, signOut }} >
			{props.children}
		</AuthContext.Provider>
	);
}