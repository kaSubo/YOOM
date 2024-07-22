'use client';

import React from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from './ui/textarea';
import DatePicker from 'react-datepicker';
import { Input } from './ui/input';

const MeetingTypeList = () => {
	const { push } = useRouter();
	const [meetingState, setMeetingState] = React.useState<
		'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
	>();
	const { user } = useUser();
	const client = useStreamVideoClient();

	const [values, setValues] = React.useState({
		dateTime: new Date(),
		description: '',
		link: '',
	});

	const [callDetails, setCallDetails] = React.useState<Call>();
	const { toast } = useToast();

	const createMeeting = async () => {
		if (!client || !user) return;

		try {
			if (!values.dateTime) {
				toast({ title: 'Please select a date and time' });
				return;
			}

			const id = crypto.randomUUID();
			const call = client.call('default', id);

			if (!call) throw new Error('Failed to create call');

			const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
			const description = values.description || 'Instant meeting';

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			});

			setCallDetails(call);

			if (!values.description) {
				push(`/meeting/${call.id}`);
			}

			toast({ title: 'Meeting Created' });
		} catch (error) {
			console.error(error);
			toast({ title: 'Failed to create meeting' });
		}
	};

	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

	return (
		<section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
			<HomeCard
				iconSrc='/assets/icons/add-meeting.svg'
				title='New Meeting'
				description='Start an instant meeting'
				className='bg-orange-1'
				handleClick={() => setMeetingState('isInstantMeeting')}
			/>
			<HomeCard
				iconSrc='/assets/icons/schedule.svg'
				title='Schedule Meeting'
				description='Plan your meeting'
				className='bg-blue-1'
				handleClick={() => setMeetingState('isScheduleMeeting')}
			/>
			<HomeCard
				iconSrc='/assets/icons/join-meeting.svg'
				title='Join Meeting'
				description='via invitation link'
				className='bg-purple-1'
				handleClick={() => setMeetingState('isJoiningMeeting')}
			/>
			<HomeCard
				iconSrc='/assets/icons/recordings.svg'
				title='View Recordings'
				description='Meeting recordings'
				className='bg-yellow-1'
				handleClick={() => push('/recordings')}
			/>

			{!callDetails ? (
				<MeetingModal
					isOpen={meetingState === 'isScheduleMeeting'}
					onClose={() => setMeetingState(undefined)}
					title='Create Meeting'
					handleClick={createMeeting}>
					<div className='flex flex-col gap-2.5'>
						<label className='text-base text-normal leading-[22px] text-sky-2'>Add a description</label>
						<Textarea
							className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 max-h-40'
							onChange={(e) => {
								setValues({ ...values, description: e.target.value });
							}}
						/>
					</div>
					<div className='flex w-full flex-col gap-2.5'>
						<label className='text-base text-normal leading-[22px] text-sky-2'>Select date and time</label>
						<DatePicker
							selected={values.dateTime}
							onChange={(date) => setValues({ ...values, dateTime: date! })}
							showTimeSelect
							timeFormat='HH:mm'
							timeIntervals={15}
							timeCaption='time'
							dateFormat='MMMM d, yyyy h:mm aa'
							className='w-full rounded bg-dark-3 p-2 focus:outline-none'
						/>
					</div>
				</MeetingModal>
			) : (
				<MeetingModal
					isOpen={meetingState === 'isScheduleMeeting'}
					onClose={() => setMeetingState(undefined)}
					title='Meeting Created'
					className='text-center'
					handleClick={() => {
						navigator.clipboard.writeText(meetingLink);
						toast({ title: 'Link copied!' });
					}}
					image='/assets/icons/checked.svg'
					buttonIcon='/assets/icons/copy.svg'
					buttonText='Copy Meeting Link'
				/>
			)}
			<MeetingModal
				isOpen={meetingState === 'isInstantMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Start an Instant Meeting'
				className='text-center'
				buttonText='Start Meeting'
				handleClick={createMeeting}
			/>

			<MeetingModal
				isOpen={meetingState === 'isJoiningMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Type the link here'
				className='text-center'
				buttonText='Join Meeting'
				handleClick={() => push(values.link)}>
				<Input
					placeholder='Meeting link'
					className='border-none bg-dakr-3 focus-visible:ring-0 focus-visible:ring-offset-0'
					onChange={(e) => setValues({ ...values, link: e.target.value })}
				/>
			</MeetingModal>
		</section>
	);
};

export default MeetingTypeList;