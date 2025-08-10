const bannerText = `
███╗   ██╗███████╗██╗  ██╗██╗███████╗
████╗  ██║██╔════╝╚██╗██╔╝██║██╔════╝
██╔██╗ ██║█████╗   ╚███╔╝ ██║███████╗
██║╚██╗██║██╔══╝   ██╔██╗ ██║╚════██║
██║ ╚████║███████╗██╔╝ ██╗██║███████║
╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝
`;

const bannerEl = document.getElementById('banner');
const output = document.getElementById('output');
const input = document.getElementById('cmdInput');

let typingIndex = 0;
function typeBanner() {
    if (typingIndex < bannerText.length) {
        bannerEl.textContent += bannerText[typingIndex++];
        setTimeout(typeBanner, 3);
    }
}
typeBanner();

const commands = {
    whoami: "nexis",
    date: new Date().toString(),
    version: "NEXIS Kernel v0.1.0",
    uname: "NEXIS Kernel 0.1 x86_64",
    exit: "Session terminated.",
    ls: "index.html  style.css  script.js",
    pwd: "/home/nexis",
    cd: "Changed directory (simulation)",
    mkdir: "Directory created (simulation)",
    rmdir: "Directory removed (simulation)",
    cp: "File copied (simulation)",
    mv: "File moved (simulation)",
    rm: "File removed (simulation)",
    touch: "Empty file created (simulation)",
    cat: "This is a sample file content. (simulation)",
    less: "Use cat, head, or tail for file viewing.",
    head: "Showing first lines of file (simulation)",
    tail: "Showing last lines of file (simulation)",
    grep: "Search results (simulation)",
    sort: "Sorted file lines (simulation)",
    df: "Filesystem Size Used Avail Use% Mounted on",
    du: "4.0K ./folder (simulation)",
    top: "top - simulated process table",
    ps: "PID TTY TIME CMD\n1234 pts/0 00:00:00 bash",
    chmod: "Permissions changed (simulation)",
    chown: "Ownership changed (simulation)",
    ping: "Pinging nexis.com with 32 bytes of data...",
    wget: "Downloading file (simulation)",
    curl: "Data transferred (simulation)",
    ssh: "Connecting to remote server (simulation)",
    tar: "Archived/extracted files (simulation)",
    gzip: "Compressed file (simulation)",
    gunzip: "Decompressed file (simulation)",
    zip: "Zip archive created (simulation)",
    unzip: "Zip archive extracted (simulation)"
};

const helpText = `
NEXIS SHELL - BASIC COMMANDS
----------------------------
ls       List directory contents
pwd      Print working directory
cd       Change directory
mkdir    Create directory
rmdir    Remove directory
cp       Copy files
mv       Move/rename files
rm       Remove files
touch    Create empty file
cat      Show file contents
whoami   Show current user
date     Show system date
version  Show OS version
uname    Show system info
exit     End session
man      Show manual
clear    Clear screen
`;

const manText = `
NEXIS Kernel Manual
-------------------
The NEXIS kernel is a lightweight Linux-based environment designed
for simulated terminal interactions and education.

Core features:
- Fast command parsing
- Simulated system tools
- Safe 'rm' and 'sudo' overrides

For more information, visit:
<a href="https://ironveil.example.com" target="_blank">IRONVEIL Official Site</a>
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
    cmdLine.textContent = `nexis@localhost:~$ ${cmd}`;
    cmdLine.className = 'prompt';
    output.appendChild(cmdLine);

    let msg = document.createElement('div');

    if (helpMode) {
        if (cmd === ':q') {
            helpMode = false;
            msg.textContent = '(Exited help)';
        } else {
            msg.textContent = '(Help open. Type :q to exit)';
        }
        msg.className = 'output';
        output.appendChild(msg);
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
        case 'man':
            helpMode = true;
            msg.innerHTML = manText; // clickable link
            msg.className = 'output help';
            break;
        case 'rm -rf /':
        case 'sudo rm -rf /':
            msg.textContent = "Nice try. NEXIS is indestructible.";
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
