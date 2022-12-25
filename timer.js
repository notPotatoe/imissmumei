window.onload = function() {

  const url = `https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&maxResults=1&channelId=UC3n5uGu18FoCy23ggWWp8tA&type=upload&key=${API_KEY}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Parse the response to extract the date and time of the last stream
    const lastStreamDate = new Date(data.items[0].snippet.publishedAt);

    // Set up a timer to update the countdown every second
    setInterval(function() {
      // Calculate the difference between the current time and the date and time of the last stream
      const timeDifference = Date.now() - lastStreamDate.getTime();

      // Calculate the number of days, hours, minutes, and seconds
      const secondsInADay = 60 * 60 * 1000 * 24;
      const secondsInAHour = 60 * 60 * 1000;
      const days = Math.floor(timeDifference / (secondsInADay) * 1);
      const hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
      const mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
      const secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);

      // Update the countdown elements on the page with the updated values
      document.getElementById('days').innerHTML = days;
      document.getElementById('hours').innerHTML = hours;
      document.getElementById('minutes').innerHTML = mins;
      document.getElementById('seconds').innerHTML = secs;
    }, 1000);
  });
}

