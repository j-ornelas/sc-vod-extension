let _title_text = '';

async function getCurrentMatch() {
  const content = await fetch('http://localhost:3003/');
  const text = await content.json();
  _title_text = `Now playing....${text.title}`;
  const footerLink = document.getElementById('sc_vod_a_link');
  if (footerLink) {
    footerLink.innerText = _title_text;
  }
}

async function updatePage() {
  if (!_title_text) await getCurrentMatch();
  // let rootElement = document.getElementById('popup-root');
  // if (rootElement) {
  //   rootElement.innerText = title;
  // }
  document.documentElement.style.height = '100%';
  document.body.style.height = '100%';
  document.documentElement.style.width = '100%';
  document.body.style.width = '100%';

  var div = document.createElement('div');
  var a = document.createElement('a');

  //append all elements
  document.body.appendChild(div);
  div.appendChild(a);
  //set attributes for div
  div.id = 'sc_vod_div_footer';
  div.style.position = 'fixed';
  div.style.bottom = '0%';
  div.style.right = '0%';
  div.style.width = '100%';
  div.style.display = 'flex';
  div.style.justifyContent = 'flex-end';
  div.style.zIndex = '999999';
  div.style.backgroundColor = '#191a1a';

  //set attributes for <a>
  a.id = 'sc_vod_a_link';
  a.href = 'https://twitch.tv/scvodarchives';
  a.target = '_blank';

  //set attributes for btn
  a.style.margin = '0';
  a.style.width = '100%';
  a.style.textAlign = 'right';
  a.style.fontFamily = 'Arial, Helvetica, sans-serif';
  a.style.fontSize = '12px';
  a.style.color = 'whitesmoke';
  a.style.paddingRight = '5px';
  a.innerText = _title_text;
}

setInterval(getCurrentMatch, 3000);
updatePage();
