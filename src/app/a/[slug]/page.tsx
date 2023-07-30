import Content from '@/screen/content/content';
import React from 'react';

export type TProps = {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
};

interface IPage {
	(props: TProps): JSX.Element;
}

const Room = (props: TProps) => {
	return <Content room={props.params.slug} />;
};

export default Room;
