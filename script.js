const terminal = document.getElementById('terminal');
const input = document.getElementById('input');

let currentDir = '~/';
let inHelpView = false;

const banner = `
██╗██████╗  ██████╗ ███╗   ██╗██╗   ██╗███████╗██╗██╗     
██║██╔══██╗██╔═══██╗████╗  ██║██║   ██║██╔════╝██║██║     
██║██████╔╝██║   ██║██╔██╗ ██║██║   ██║█████╗  ██║██║     
██║██╔══██╗██║   ██║██║╚██╗██║╚██╗ ██╔╝██╔══╝  ██║██║     
██║██║  ██║╚██████╔╝██║ ╚████║ ╚████╔╝ ███████╗██║███████╗
╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝  ╚═══╝  ╚══════╝╚═╝╚══════╝
`;

const helpText = `
Available commands:

Navigation and Files:
ls        - Lists the contents of a directory.
pwd       - Prints the current working directory.
cd        - Changes the current directory.
mkdir     - Creates new directories.
rmdir     - Removes empty directories.
cp        - Copies files or directories.
mv        - Moves or renames files or directories.
rm        - Deletes files or directories.
touch     - Creates empty files or updates file timestamps.

Viewing and Editing:
cat       - Displays the contents of a file.
less      - Displays file contents page by page.
head      - Displays the beginning of a file.
tail      - Displays the end of a file.
grep      - Searches for patterns within files.
sort      - Sorts the lines of a text file.

System Info:
uname     - Displays system information.
whoami    - Shows the current username.
df        - Reports disk space usage.
du        - Estimates file space usage.
top       - Displays real-time process info.
ps        - Shows running processes.

Permissions:
chmod     - Changes file permissions.
chown     - Changes file ownership.

Networking:
ping      - Tests network connectivity.
wget      - Downloads files.
curl      - Transfers data with URLs.
ssh       - Connects to remote servers.

Archiving:
tar       - Archives and extracts files.
gzip/gunzip - Compresses/decompresses files.
zip/unzip - Zip compression and decompression.

Help:
man       - Displays manual pages.
info      - Displays info pages.
`;

const writeToTerminal = (text) => {
  terminal.innerHTML += `${text}\n`;
  terminal.scrollTop = terminal.scrollHeight;
};

const showPrompt = () => {
  terminal.innerHTML += `<span class="prompt">ironveil@cli:${currentDir}$</span> `;
};

const handleCommand = (command) => {
  const args = command.trim().split(/\s+/);
  const base = args[0];

  if (inHelpView && base === ':q') {
    inHelpView = false;
    writeToTerminal('');
    return;
  }

  switch (base) {
    case 'clear':
      terminal.innerHTML = '';
      return;
    case 'help':
      writeToTerminal(helpText);
      return;
    case 'ls':
      writeToTerminal('bin  boot  dev  etc  home  lib  opt  root  usr  var');
      return;
    case 'pwd':
      writeToTerminal(currentDir);
      return;
    case 'cd':
      currentDir = args[1] || '~/';
      return;
    case 'mkdir':
      writeToTerminal(`mkdir: created directory '${args[1] || 'newdir'}'`);
      return;
    case 'rmdir':
      writeToTerminal(`rmdir: removed directory '${args[1] || 'dir'}'`);
      return;
    case 'cp':
      writeToTerminal(`cp: copied '${args[1]}' to '${args[2]}'`);
      return;
    case 'mv':
      writeToTerminal(`mv: moved '${args[1]}' to '${args[2]}'`);
      return;
    case 'rm':
      writeToTerminal(`rm: deleted '${args[1] || 'file.txt'}'`);
      return;
    case 'touch':
      writeToTerminal(`touch: created file '${args[1] || 'new.txt'}'`);
      return;
    case 'cat':
      writeToTerminal('This is a dummy file.\nLorem ipsum dolor sit amet.');
      return;
    case 'head':
      writeToTerminal('First few lines...');
      return;
    case 'tail':
      writeToTerminal('Last few lines...');
      return;
    case 'less':
    case 'man':
      inHelpView = true;
      writeToTerminal(helpText);
      writeToTerminal('\n(press :q to quit)');
      return;
    case 'grep':
      writeToTerminal('Matched pattern: dummy result');
      return;
    case 'sort':
      writeToTerminal('1\n2\n3\nA\nB\nC');
      return;
    case 'uname':
      writeToTerminal('IronVeil Kernel 1.0.0');
      return;
    case 'whoami':
      writeToTerminal('ironveil');
      return;
    case 'df':
      writeToTerminal('/dev/sda1    50G   20G   30G  40% /');
      return;
    case 'du':
      writeToTerminal('4.0K    ./docs\n8.0K    ./src');
      return;
    case 'top':
      writeToTerminal('top - simulated output\nPID  CPU  MEM  CMD');
      return;
    case 'ps':
      writeToTerminal('PID  TTY          TIME CMD\n1234 pts/0    00:00:01 bash');
      return;
    case 'chmod':
      writeToTerminal('Permissions changed.');
      return;
    case 'chown':
      writeToTerminal('Owner changed.');
      return;
    case 'ping':
      writeToTerminal('Pinging 127.0.0.1... Success');
      return;
    case 'wget':
      writeToTerminal('wget: downloaded dummy.txt');
      return;
    case 'curl':
      writeToTerminal('curl: fetched data from URL');
      return;
    case 'ssh':
      writeToTerminal('ssh: connected to dummy@host');
      return;
    case 'tar':
      writeToTerminal('tar: archive created');
      return;
    case 'gzip':
    case 'gunzip':
      writeToTerminal(`${base}: compression done`);
      return;
    case 'zip':
    case 'unzip':
      writeToTerminal(`${base}: archive processed`);
      return;
    case 'info':
      writeToTerminal('Info page loaded.');
      return;
    case 'version':
      writeToTerminal('IronVeil CLI version 1.0.0');
      return;
    case 'echo':
      writeToTerminal(args.slice(1).join(' '));
      return;
    case 'exit':
      writeToTerminal('Session terminated.');
      input.disabled = true;
      return;
    case 'rm':
    case 'rm -rf /':
    case 'sudo rm -rf /':
      writeToTerminal("💣 Just kidding! IronVeil is indestructible.");
      return;
    default:
      writeToTerminal(`${base}: command not found`);
  }
};

const bootTerminal = async () => {
  terminal.innerHTML = '';
  for (let char of banner) {
    terminal.innerHTML += char;
    await new Promise(r => setTimeout(r, 3));
  }
  terminal.innerHTML += '\n\nWelcome to IronVeil OS. Type "help" to get started.\n\n';
  showPrompt();
};

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const command = input.value.trim();
    terminal.innerHTML += input.value + '\n';
    handleCommand(command);
    input.value = '';
    if (!inHelpView) showPrompt();
  }
});

bootTerminal();
