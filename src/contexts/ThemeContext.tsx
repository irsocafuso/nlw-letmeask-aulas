import { createContext, ReactNode, useState, useEffect } from 'react';

type ThemeType = 'light' | 'dark';

type ThemeContextProviderPropsType = {
	children: ReactNode
}

type ThemeContextType = {
	theme: ThemeType,
	toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props:ThemeContextProviderPropsType) {
	const [currentTheme, setCurrentTheme] = useState<ThemeType>(()=>{
		const storagedTheme = localStorage.getItem('theme')
		return (storagedTheme ?? 'light') as ThemeType;
	});

	useEffect(() => {
		localStorage.setItem('theme', currentTheme);
	},[currentTheme]);

	function toggleTheme() {
		setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
	}

	return (
		<ThemeContext.Provider value={{theme:currentTheme, toggleTheme}}>
			{props.children}
		</ThemeContext.Provider>
	);
}