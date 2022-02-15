class Habit {
  constructor(id, title, frequency, startDate = new Date(), days = []) {
    this.id = id;
    startDate.setHours(0, 0, 0, 0);
    this.startDate = new Date(startDate);
    this.days = days;
    this.frequency = frequency;
    this.title = title;
  };

  findLastSunday(){
    let sunday = new Date();
    const currentDay = sunday.getDay();
    const currentDate = sunday.getDate();
    const lastSunday = currentDate - currentDay;
    sunday.setDate(lastSunday)
    return sunday;
  };
  
  getWeekData(){
    let frequency = this.frequency;
    let week = [];
    let days = this.days;
    let calcDate = new Date(this.findLastSunday());
  
    for (let day in frequency) {
      let diffInDays = this.calcDaysSinceStart(calcDate);
      //console.log(diffInDays);
      if(frequency[day] === true) {
        if (diffInDays < days.length && diffInDays >= 0){
          if(days[diffInDays] === true){
            week.push(2);
          } else {
            week.push(1);
          }
        } else {
          week.push(1);
        }
      } else {
        week.push(0);
      }
      calcDate.setDate(calcDate.getDate() + 1);
    }
  
    return week;
  };

  // Pass any date to find the difference in days from the start date to date.
  // Pass nothing to find the diffrerence in days from the start date to today.
  calcDaysSinceStart(date = new Date()){
    date.setHours(0, 0, 0, 0);
    let diffInTime = date.getTime() - this.startDate.getTime();
    let diffInDays = diffInTime / (1000 * 3600 * 24);
    diffInDays = Math.round(diffInDays);
    return diffInDays;
  }

  markDaysMissed(){
    const diffInDays = this.calcDaysSinceStart();
    if (diffInDays > this.days.length){
      for (let i = diffInDays - this.days.length; i > 0; i--){
        //console.log(i);
        this.days.push(false);
      }
    }
  }

  markTodayComplete(){
    const diffInDays = this.calcDaysSinceStart();
    if (diffInDays === this.days.length){
      this.days.push(true);  
    } else if (diffInDays > this.days.length) {
      this.markDaysMissed();
      this.markTodayComplete();
    }
  }
}

export { Habit };