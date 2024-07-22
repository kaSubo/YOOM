import Image from 'next/image';
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { avatarImages } from '@/constants';
import { useToast } from './ui/use-toast';
import { formatDate } from '@/utils/formatDate';

interface MeetingCardProps {
	icon: string;
	title: string;
	date: string;
	startTime?: string;
	endTime?: string;
	link: string;
	isPreviousMeeting?: boolean;
	buttonIcon?: string;
	buttonText?: string;
	handleClick: () => void;
}

const MeetingCard = ({
	icon,
	title,
	date,
	startTime,
	endTime,
	link,
	isPreviousMeeting,
	buttonIcon,
	buttonText,
	handleClick,
}: MeetingCardProps) => {
	const { toast } = useToast();

	return (
		<section className='flex min-h-[258px] w-full flex-col gap-3 justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]'>
			<article className='flex flex-col gap-5'>
				<Image
					src={icon}
					alt='upcoming'
					width={28}
					height={28}
				/>
				<div className='flex flex-col justify-between'>
					<div className='flex flex-col gap-2.5'>
						<h1 className='text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-96'>{title}</h1>
						{!isPreviousMeeting ? (
							<div className='flex flex-wrap justify-between gap-5'>
								<h2 className='text-base font-semibold'>
									<span className='font-light'>Start time:</span> {formatDate(startTime!)}
								</h2>
								<h2 className='text-base font-semibold'>
									<span className='font-light'>End time:</span> {formatDate(endTime!)}
								</h2>
							</div>
						) : (
							<h2>{date}</h2>
						)}
					</div>
				</div>
			</article>
			<article className={cn('flex justify-center relative', {})}>
				<div className='relative flex w-full max-sm:hidden'>
					{avatarImages.map((image, index) => (
						<Image
							key={index}
							src={image}
							alt='attendants'
							width={48}
							height={48}
							className={cn('rounded-full border-[3px] border-dark-3', { absolute: index > 0 })}
							style={{ top: 0, left: index * 28 }}
						/>
					))}
					<div className='flex items-center justify-center absolute left-[136px] size-12 rounded-full border-[3px] border-dark-3 bg-dark-4 font-semibold text-[15px]'>
						+5
					</div>
				</div>
				{!isPreviousMeeting && (
					<div className='flex gap-2'>
						<Button
							onClick={handleClick}
							className='rounded bg-blue-1 px-6'>
							{buttonIcon && (
								<Image
									src={buttonIcon}
									alt='feature'
									width={20}
									height={20}
								/>
							)}
							&nbsp;
							{buttonText}
						</Button>
						<Button
							onClick={() => {
								navigator.clipboard.writeText(link);
								toast({
									title: 'Link Copied!',
								});
							}}
							className='bg-dark-4 px-6 rounded'>
							<Image
								src='/assets/icons/copy.svg'
								alt='feature'
								width={20}
								height={20}
							/>
							&nbsp; Copy Link
						</Button>
					</div>
				)}
			</article>
		</section>
	);
};

export default MeetingCard;
