import { IconProps } from '../../../models/icon.props.ts';

export function BarChartIcon({ fill }: IconProps) {
    return (
        <svg fill={fill} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <title>ionicons-v5-p</title>
            <polygon points="496 496 16 496 16 16 48 16 48 464 496 464 496 496" />
            <path d="M192,432H80V208H192Z" />
            <path d="M336,432H224V160H336Z" />
            <path d="M479.64,432h-112V96h112Z" />
        </svg>
    );
}
