import { cn } from '@/lib/utils';
import { Description } from '@radix-ui/react-dialog';
import Image from 'next/image';
import React from 'react';

interface HomeCardProps {
	iconSrc: string;
	title: string;
	description: string;
	className?: string;
	handleClick: () => void;
}

const HomeCard = ({
	iconSrc,
	title,
	description,
	className,
	handleClick,
}: HomeCardProps) => {
	return (
		<div
			className={cn(
				'px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',
				className
			)}
			onClick={handleClick}>
			<div className='flex items-center justify-center glassmorphism3 size-12 rounded-[10px]'>
				<Image
					src={iconSrc}
					alt={description}
					width={27}
					height={27}
				/>
			</div>
			<div className='flex flex-col gap-2'>
				<h1 className='text-2xl font-bold'>{title}</h1>
				<p className='text-lg font-normal'>{description}</p>
			</div>
		</div>
	);
};

export default HomeCard;
