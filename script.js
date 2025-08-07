const bannerText = `
██╗██████╗  ██████╗ ███╗   ██╗██╗   ██╗███████╗██╗██╗     
██║██╔══██╗██╔═══██╗████╗  ██║██║   ██║██╔════╝██║██║     
██║██████╔╝██║   ██║██╔██╗ ██║██║   ██║█████╗  ██║██║     
██║██╔══██╗██║   ██║██║╚██╗██║╚██╗ ██╔╝██╔══╝  ██║██║     
██║██║  ██║╚██████╔╝██║ ╚████║ ╚████╔╝ ███████╗██║███████╗
╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝  ╚═══╝  ╚══════╝╚═╝╚══════╝
`;

const banner = document.getElementById('banner');
const output = document.getElementById('output');
const input = document.getElementById('cmdInput');

let typingIndex = 0;
function typeBanner() {
  if (typingIndex < bannerText.length) {
    banner.textContent += bannerText[typingIndex++];
    setTimeout(typeBanner, 3);
  }
}
typeBanner();

const commands = {
  help: `Available commands:\nhelp, clear, whoami, date, version, uname, echo [text], exit, rm -rf /, sudo rm -rf /`,
  whoami: `ironveil`,
  date: new Date().toString(),
  version: `IronVeil v0.1.2-alpha`,
  uname: `IronVeil Kernel 0.1 x86_64`,
  exit: `Session terminated.`,
  clear: 'CLEAR_SCREEN',
};

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = input.value.trim();
    handleCommand(command);
    input.value = '';
  }
});

function handleCommand(cmd) {
  const cmdLine = document.createElement('div');
  cmdLine.textContent = `ironveil@localhost:~$ ${cmd}`;
  cmdLine.className = 'prompt';
  output.appendChild(cmdLine);

  let msg = document.createElement('div');

  if (cmd === 'clear') {
    output.innerHTML = '';
    return;
  }

  if (cmd.startsWith('echo ')) {
    msg.textContent = cmd.slice(5);
  } else if (cmd === 'rm -rf /') {
    msg.textContent = "Nice try mortal. Only root can destroy the universe.";
    msg.className = 'output danger';
  } else if (cmd === 'sudo rm -rf /') {
    msg.textContent = "AI detected attempted existential erasure. Please seek sysadmin therapy.";
    msg.className = 'output danger';
  } else if (commands[cmd]) {
    msg.textContent = commands[cmd];
  } else {
    msg.textContent = `Command not found: ${cmd}`;
  }

  msg.className = msg.className || 'output';
  output.appendChild(msg);
  window.scrollTo(0, document.body.scrollHeight);
  }
