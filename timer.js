window.onload = function()
{  
  let mumei_id = 'UC3n5uGu18FoCy23ggWWp8tA';  //Channel ID
  //Fetch arguments
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'X-APIKEY': XAPI_KEY} ,
    body: '{"sort":"newest", "lang":["en","ja"],"target":["stream"],"conditions":[],"vch":["'+mumei_id+'"],"org":["Hololive"],"comment":[],"paginated":true,"offset":0,"limit":15}'
  };
  
  //Searches for streams that have/had mumei featured at least at some point in them
  fetch('https://holodex.net/api/v2/search/videoSearch', options)
  .then((response) => response.json())
  .then((data) => 
  {
    //I don't think these variables should be here but it works so am not touching it
    let stream_id = 0;        //id of the stream mumei is present on
    let is_live = false;      //is she live
    let is_past = false;      //variable needed to check if stream is upcoming or a one that ended already
    let is_mumei;             //is it on Mumei's channel or not
  
  //Since holodex puts upcoming scheduled streams in front of ongoing live streams
  //because they are technically newer this mess checks if one of the 5 newest streams
  //are actually live or just scheduled upcoming streams
  
  while(!is_live && stream_id < 15)
  {
    if (data.items[stream_id].status == "live" )
      is_live = true;
    else
      stream_id++;
  }
  
  if(is_live)
  {
    //Checks if the stream is on mumei's channel or not
    if (data.items[stream_id].channel.id == mumei_id)
      is_mumei = true;
    else
    {
    //I found that if she appears on someone's stream and she's streaming at the same time
    //sometimes her stream can be the 2nd one on the list or maybe even further
    //so this checks if up to 15 items on the list is actually her
    //probably would need some more work but it works for now
        is_mumei = false;
      for (i = 1; i < 15; i++)
      {
        if (data.items[i].channel.id == mumei_id && data.items[i].status == "live" )
        {
          is_mumei = true;
          stream_id = i;
        }
      }
    }
    live(data.items[stream_id].channel.id, data.items[stream_id].title, data.items[stream_id].id, is_mumei);
  }
  else
  {
  //Have to check which stream in the array is actually a stream and not an upcoming one
  //so I can display time since that moment
  //there probably is a smarter way to do this but this works so it's good enough for now
  stream_id = 0;
  while (!is_past && stream_id < 15)
  {
    if (data.items[stream_id].status != "upcoming" && data.items[stream_id].status != "missing")
      is_past = true;
    else
      stream_id++;
  }
  //Displays the countdown since last stream
    lastStreamDate = new Date(data.items[stream_id].available_at);
    html_timer();
    timer(correct_time(lastStreamDate, data.items[stream_id].duration));
    getRandomSadImage();
  }
//console.log(data);
  if(is_live)
  {
    if (is_mumei)
      document.getElementById('title').innerHTML = "MUMEI IS LIVE";
    else 
      document.getElementById('title').innerHTML = "MUMEI IS HERE";
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = '/assets/happy.ico';
  }
})
}

function correct_time(old_date, str_dur)
{
  hours = Math.floor(str_dur / 3600);
  str_dur %= 3600;
  minutes = Math.floor(str_dur / 60);
  seconds = str_dur % 60;

  old_date.setHours(old_date.getHours() + hours)
  old_date.setMinutes(old_date.getMinutes() + minutes)
  old_date.setSeconds(old_date.getSeconds() + seconds)
  
  return old_date;
}

function html_timer()
{
  //BEAUTIFUL way to add all these elements! (I hate it)
  document.getElementById('countup1').innerHTML += '<span>It&#39;s been </span>'
  document.getElementById('countup1').innerHTML += '<strong><span id="days">00</span>'
  document.getElementById('countup1').innerHTML += '<strong><span> days </span>'
  document.getElementById('countup1').innerHTML += '<strong><span id="hours">00</span>'
  document.getElementById('countup1').innerHTML += '<strong><span> hours </span>'
  document.getElementById('countup1').innerHTML += '<strong><span id="minutes">00</span>'
  document.getElementById('countup1').innerHTML += '<strong><span> minutes </span>'
  document.getElementById('countup1').innerHTML += '<strong><span id="seconds">00</span>'
  document.getElementById('countup1').innerHTML += '<strong><span> seconds </span>'
  document.getElementById('countup1').innerHTML += '<span>since last stream</span>'
  document.getElementById('status').innerHTML = 'MUMEI PLEASE COME BACK'
}

function live(channel_id, title, vid_id, is_mumei)
{
  document.getElementById("result").innerHTML = `<img id="happy" src="assets/happy.png">`;
  //Checks if the stream is on mumei's channel or not
  if (is_mumei)
    document.getElementById('status').innerHTML = 'MUMEI IS LIVE'
  else
    document.getElementById('status').innerHTML = 'MUMEI IS HERE'

  //Fetches stream info of the channel mumei is streaming/featured on
  fetch('https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&maxResults=2&channelId='+channel_id+'&type=upload&key=' + GAPI_KEY)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.items[0].snippet.title == title)
        document.getElementById('live').innerHTML += '<img class="thumb" style="width:131px; height:99px; justify-content: left;" src="'+data.items[0].snippet.thumbnails.maxres.url+'">'
      else
        document.getElementById('live').innerHTML += '<img class="thumb" style="width:131px; height:99px; justify-content: left;" src="'+data.items[1].snippet.thumbnails.maxres.url+'">'
      document.getElementById('live').innerHTML += '<a href="https://www.youtube.com/watch?v='+vid_id+'">'+title
    })
  //Adding the little silly live text in the top right
  const live = document.getElementById("live");
  let icon = document.createElement("div");
    icon.setAttribute('id', 'live-icon');
  let svg = document.createElement("svg");
  let g = document.createElement("g");
    g.setAttribute('fill', 'white');
  let path = document.createElement("path");
    path.setAttribute('d', 'M9 8.00004C9 8.55004 8.55 9.00004 8 9.00004C7.45 9.00004 7 8.55004 7 8.00004C7 7.45004 7.45 7.00004 8 7.00004C8.55 7.00004 9 7.45004 9 8.00004ZM10.11 10.13L10.82 10.84C11.55 10.11 12 9.11004 12 8.00004C12 6.89004 11.55 5.89004 10.82 5.16004L10.11 5.87004C10.66 6.42004 11 7.17004 11 8.00004C11 8.83004 10.66 9.58004 10.11 10.13ZM5.18 10.84L5.89 10.13C5.34 9.58004 5 8.83004 5 8.00004C5 7.17004 5.34 6.42004 5.89 5.87004L5.18 5.16004C4.45 5.89004 4 6.89004 4 8.00004C4 9.11004 4.45 10.11 5.18 10.84ZM12.23 12.25L12.94 12.96C14.21 11.69 15 9.94004 15 8.00004C15 6.06004 14.21 4.31004 12.94 3.04004L12.23 3.75004C13.32 4.84004 14 6.34004 14 8.00004C14 9.66004 13.32 11.16 12.23 12.25ZM3.06 12.96L3.77 12.25C2.68 11.16 2 9.66004 2 8.00004C2 6.34004 2.68 4.84004 3.77 3.75004L3.06 3.04004C1.79 4.31004 1 6.06004 1 8.00004C1 9.94004 1.79 11.69 3.06 12.96Z')
  let live_text = document.createElement("p");
    live_text.setAttribute('id', 'live-text');
    live_text.textContent = 'LIVE';
  
  live.appendChild(icon);
  icon.appendChild(svg);
  svg.appendChild(g);
  g.appendChild(path);
  live.appendChild(live_text);
}

function timer(lastStreamDate)
{
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
}