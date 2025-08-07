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
  whoami: `ironveil`,
  date: new Date().toString(),
  version: `IronVeil v0.1.2-alpha`,
  uname: `IronVeil Kernel 0.1 x86_64`,
  exit: `Session terminated.`,
};

const helpText = `
IRONVEIL LINUX SHELL - COMMAND HELP

Basic Commands:
  ls         List directory contents
  man        Display the manual
  cat        Display file contents
  help       Show this help menu
  clear      Clear the screen
  whoami     Show current user
  date       Show system date
  version    Show OS version
  uname      System information
  echo       Echo text
  exit       Terminate session

File Commands:
  pwd        Print working directory
  cd         Change directory
  mkdir      Create directory
  rmdir      Remove directory
  cp         Copy files
  mv         Move/rename files
  rm         Remove files
  touch      Create empty file

Viewing Commands:
  less       Scroll file view
  head       Show first lines
  tail       Show last lines
  grep       Search text
  sort       Sort lines

System Commands:
  df         Disk space
  du         Disk usage
  top        Task manager
  ps         Process status

Permissions:
  chmod      Change permissions
  chown      Change ownership

Networking:
  ping       Ping network
  wget       Download file
  curl       Transfer data
  ssh        Secure shell

Archiving:
  tar        Archive tool
  gzip       Compress
  gunzip     Decompress
  zip        Create zip
  unzip      Extract zip

(:q to quit help)
`;

let helpMode = false;

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

  if (helpMode) {
    if (cmd === ':q') {
      helpMode = false;
      msg.textContent = '(Exited help)';
      msg.className = 'output';
      output.appendChild(msg);
    } else {
      msg.textContent = '(Help open. Type :q to exit)';
      msg.className = 'output';
      output.appendChild(msg);
    }
    return;
  }

  switch (cmd) {
    case 'clear':
      output.innerHTML = '';
      return;
    case 'help':
      helpMode = true;
      msg.textContent = helpText;
      msg.className = 'output help';
      break;
    case 'rm -rf /':
      msg.textContent = "Nice try mortal. Only root can destroy the universe.";
      msg.className = 'output danger';
      break;
    case 'sudo rm -rf /':
      msg.textContent = "AI detected attempted existential erasure. Please seek sysadmin therapy.";
      msg.className = 'output danger';
      break;
    default:
      if (cmd.startsWith('echo ')) {
        msg.textContent = cmd.slice(5);
      } else if (commands[cmd]) {
        msg.textContent = commands[cmd];
      } else {
        msg.textContent = `Command not found: ${cmd}`;
      }
  }

  msg.className = msg.className || 'output';
  output.appendChild(msg);
  window.scrollTo(0, document.body.scrollHeight);
}
