import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isOutlined?: boolean,
	isDark?: boolean
};

export function Button({ isOutlined=false, isDark=false, ...props}:ButtonProps) {
	return (
		<button 
			className={`button ${isOutlined ? 'outlined' : ''} ${isDark ? 'dark' : ''} `} 
			{...props} 
		/>
	)
}