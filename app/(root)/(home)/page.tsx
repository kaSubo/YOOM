import MeetingTypeList from '@/components/MeetingTypeList';
import { LiveDate, LiveTime } from '@/components/DateTime';
import UpcomingBadge from '@/components/UpcomingBadge';

const Home = () => {

	return (
		<section className='flex size-full flex-col gap-10 text-white'>
			<div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
				<div className='flex h-full flex-col justify-between p-6 max-md:px-5 max-md:py-8 lg:p-11'>
					<UpcomingBadge />
					<div className='flex flex-col gap-2'>
						
            <LiveTime />
            <LiveDate />
						
					</div>
				</div>
			</div>

      <MeetingTypeList />
		</section>
	);
};

export default Home;