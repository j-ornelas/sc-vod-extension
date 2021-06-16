require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3003;

async function getTitle() {
  const { clientID, clientSecret } = process.env;
  const tokenRequestOptions = {
    method: 'POST',
  };
  const tokenRequest = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`,
    tokenRequestOptions,
  );
  const { access_token } = await tokenRequest.json();

  const titleRequestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Client-Id': clientID,
    },
  };

  const titleRequest = await fetch(
    'https://api.twitch.tv/helix/search/channels?query=scvodarchives',
    titleRequestOptions,
  );
  const { data } = await titleRequest.json();
  return data[0].title;
}

let _stream_title = 'something went wrong getting stream title';
setInterval(async function() {
  const liveTitle = await getTitle();
  if (_stream_title !== liveTitle) {
    const oldTitle = _stream_title;
    console.log('updating stream title...');
    _stream_title = liveTitle;
    console.log('updated title from ', oldTitle, ' to ', _stream_title);
  }
}, 30000);

app.get('/', cors(), async (req, res) => {
  res.json({ title: _stream_title });
});

app.listen(port, () => {
  console.log(`vod archive server running at http://localhost:${port}`);
});
