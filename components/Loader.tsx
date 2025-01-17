import Image from 'next/image';
import React from 'react';

const Loader = () => {
	return (
		<div className='flex items-center justify-center h-screen w-full'>
			<Image
				src='/assets/icons/loading-circle.svg'
				alt='loading'
				width={50}
				height={50}
			/>
		</div>
	);
};

export default Loader;
