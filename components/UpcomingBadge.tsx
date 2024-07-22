'use client';

import React from 'react';
import { useGetCalls } from '@/hooks/useGetCalls';

const UpcomingBadge = () => {
  const { upcomingCalls } = useGetCalls();

  console.log(upcomingCalls)

	return (
		<h2 className='glassmorphism max-w-xl rounded py-2 text-center text-base font-light'>
			{`Upcoming meeting at: ${upcomingCalls[0]?.state.startsAt!.toLocaleString()}`}
		</h2>
	);
};

export default UpcomingBadge;
