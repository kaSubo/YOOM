import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import React from 'react';

export const useGetCallById = (id: string | string[]) => {
	const [call, setCall] = React.useState<Call>();
	const [isCallLoading, setIsCallLoading] = React.useState(true);
	const client = useStreamVideoClient();

	React.useEffect(() => {
		if (!client) return;

		const loadCall = async () => {
			const { calls } = await client.queryCalls({
				filter_conditions: {
					id,
				},
			});

			if (calls.length > 0) setCall(calls[0]);
			setIsCallLoading(false);
		};

		loadCall();
	}, [client, id]);

	return { call, isCallLoading };
};
