'use client';

import React from 'react';

let now = new Date();
export const LiveTime = () => {
	const [timeState, setTimeState] = React.useState(now);
	const UpdateTime = () => {
		now = new Date();
		setTimeState(now);
	};
	setInterval(UpdateTime);

	const currentTime = timeState.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	});

	return <h1 className='text-4xl font-extrabold lg:text-7xl'>{currentTime}</h1>;
};

export const LiveDate = () => {
	const [dateState, setDateState] = React.useState(now);
	const UpdateTime = () => {
		now = new Date();
		setDateState(now);
	};
	setInterval(UpdateTime);

	const currentDate = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'full',
	}).format(dateState);

	return (
		<p className='text-lg font-medium text-sky-1 lg:text-2xl'>{currentDate}</p>
	);
};
