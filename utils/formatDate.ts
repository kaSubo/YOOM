export const formatDate = (date: string) => {
	const newDate = new Date(date);

	const year = newDate.getUTCFullYear();
	const month = String(newDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
	const day = String(newDate.getUTCDate()).padStart(2, '0');
	const hours = String(newDate.getUTCHours()).padStart(2, '0');
	const minutes = String(newDate.getUTCMinutes()).padStart(2, '0');
	const seconds = String(newDate.getUTCSeconds()).padStart(2, '0');

	const formattedDate = `${year}-${month}-${day}${' '}${hours}:${minutes}:${seconds}`;

	return formattedDate;
};
