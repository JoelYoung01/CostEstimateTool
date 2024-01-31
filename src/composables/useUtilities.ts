interface UtilityComposable {
  /**
   * Returns a date object that is one week from the current date.
   */
  nextWeek: () => Date;
}

export function useUtilities(): UtilityComposable {
  const nextWeek = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  };

  return {
    nextWeek
  };
}
