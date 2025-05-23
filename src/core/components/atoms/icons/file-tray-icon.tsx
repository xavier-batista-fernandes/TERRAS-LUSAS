import { IconProps } from '../../../models/icon.props.ts';

export function FileTrayIcon({ fill }: IconProps) {
    return (
        <svg
            height="100%"
            width="100%"
            fill={fill}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>ionicons-v5-i</title>
            <path d="M448,16H64L32,176V320H480V176ZM436,176H320a64,64,0,0,1-128,0H76L98,58H414Z" />
            <path d="M320,352a64,64,0,0,1-128,0H32V496H480V352Z" />
        </svg>
    );
}
