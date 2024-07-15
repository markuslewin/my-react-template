import {
	type HTMLAttributes,
	type ImgHTMLAttributes,
	type SourceHTMLAttributes,
} from 'react'

export interface Img {
	src: string
	width: number
	height: number
}

export interface PictureProps extends HTMLAttributes<HTMLPictureElement> {}

export function Picture(props: PictureProps) {
	return <picture {...props} />
}

export interface SourceProps extends SourceHTMLAttributes<HTMLSourceElement> {
	image: Img
}

export function Source({ image, ...props }: SourceProps) {
	return (
		<source
			srcSet={image.src}
			width={image.width}
			height={image.height}
			{...props}
		/>
	)
}

export interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
	alt: string
	image: Img
	priority?: boolean
}

export function Img({ image, priority, ...props }: ImgProps) {
	return (
		<img
			src={image.src}
			width={image.width}
			height={image.height}
			loading={priority ? 'eager' : 'lazy'}
			{...props}
		/>
	)
}
