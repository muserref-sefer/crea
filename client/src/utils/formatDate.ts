export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Invalid Date';
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
};