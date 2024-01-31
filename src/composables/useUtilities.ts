export function useUtilities() {
  const nextWeek = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  };

  return {
    nextWeek
  };
}
