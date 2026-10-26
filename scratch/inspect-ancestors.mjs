import { spawn } from 'node:child_process';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9344;

const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--disable-gpu',
  '--no-first-run',
  '--window-size=1280,800',
  'http://localhost:5173'
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const targets = await listRes.json();
  const pageTarget = targets.find(t => t.type === 'page');

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const curId = id++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === curId) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await new Promise(r => ws.addEventListener('open', r));

  await send('Page.enable');
  await send('DOM.enable');
  await send('Runtime.enable');

  const result = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = document.querySelector('.nav-cta-btn');
        let cur = btn;
        const parents = [];
        while (cur && cur !== document.body) {
          const s = window.getComputedStyle(cur);
          const b = window.getComputedStyle(cur, '::before');
          const a = window.getComputedStyle(cur, '::after');
          parents.push({
            tag: cur.tagName,
            class: cur.className,
            border: s.border,
            boxShadow: s.boxShadow,
            outline: s.outline,
            beforeContent: b.content,
            beforeBorder: b.border,
            afterContent: a.content,
            afterBorder: a.border
          });
          cur = cur.parentElement;
        }
        return parents;
      })()
    `,
    returnByValue: true
  });

  console.log(JSON.stringify(result.result.value, null, 2));

  ws.close();
} catch (err) {
  console.error(err);
} finally {
  chrome.kill();
}
