const output = document.getElementById("output");
const inputEl = document.getElementById("input");

let buffer = "";
let history = [];
let historyIndex = -1;
let currentInput = "";

const commands = {
  help() {
    return `
available commands:
  help        show this message
  ls          list files
  about       about me
  books       my favorite computer books
  echo <txt>  print text
  clear       clear screen
  exit        back to main site
`;
  },

  ls() {
    return `
system.log
`;
  },

  about() {
    return `
Hi, I'm Filka.

Ever since I was a kid, the world of hacking has fascinated me. I set out to build a thorough understanding of how computers work, from hardware to software.

I first earned a high school degree in Electronics, followed by a university degree in Computer Engineering. During my time at the university, I used my free time to deepen my understanding of operating systems and computer networks.

Throughout my career, I've developed expertise in compilers, embedded systems, Linux, fuzzing, penetration testing, and web exploitation.
Now I'm looking to further expand my skills in web and mobile penetration testing.

skills:
- C
- Python
- Linux
- Networking
- Operating Systems
- Writing Fuzzers
- Writing Web Scrapers
- Penetration Testing
- Web Exploitation

interests:
- Ethical Hacking
- Hiking
- Skateboarding
- Reading
- Cooking
- Permaculture
- Music (Crust, Grind, Thrash, Dub, Reggae)
- Playing Guitar
- Everything DIY
`;
  },

  books() {
    return `
books:
- Operating System Concepts - Silberschatz - The Dinosaur Book
- Modern Operating Systems - Tanenbaum
- Operating Systems: Design and Implementation - Tanenbaum
- Computer Networks - Tanenbaum
- Compilers: Principles, Techniques, and Tools - Aho, Ullman, Sethi, Lam - The Dragon Book
- Structure and Interpretation of Computer Programs — Abelson & Sussman - The Wizard Book
- The Linux Command Line - Shotts
- C Programming Language - Kernighan & Ritchie
- The Art of Computer Programming - Knuth
- The Pragmatic Programmer — Hunt & Thomas
- The Art of Unix Programming — Raymond
- The Car Hacker's Handbook - Smith
- Black Hat GraphQL: Attacking Next Generation APIs - Aleks & Farhi
- The Web Application Hacker's Handbook - Stuttard & Pinto
`;
  },
  
  exit() {
  window.location.href = "index.html";
  return "";
},

  clear() {
    buffer = "";
    render();
    return "";
  },

  echo(args) {
    return args.join(" ");
  }
};

function render() {
  output.textContent = buffer;
  output.scrollTop = output.scrollHeight;
}

function print(text = "") {
  buffer += text + "\n";
  render();
}

async function typePrint(text, speed = 10) {
  for (let c of text) {
    buffer += c;
    render();
    await new Promise(r => setTimeout(r, speed));
  }
  buffer += "\n";
  render();
}

let isRunning = false;

async function runCommand(cmd) {
  if (isRunning) return;
  isRunning = true;

  print(`visitor@SIGSEGV:~$ ${cmd}`);

  if (!cmd.trim()) {
    isRunning = false;
    return;
  }

  history.push(cmd);
  historyIndex = history.length;

  const [name, ...args] = cmd.split(" ");

  if (commands[name]) {
    const result = commands[name](args);
    if (result) await typePrint(result.trim());
  } else {
    await typePrint("command not found");
  }

  isRunning = false;
}


document.addEventListener("keydown", async e => {
  if (isRunning) return;

  if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  }
  else if (e.key === "Enter") {
    const cmd = currentInput;
    currentInput = "";
    inputEl.textContent = "";
    await runCommand(cmd);
  }
  else if (e.key === "ArrowUp") {
    if (historyIndex > 0) historyIndex--;
    currentInput = history[historyIndex] || "";
  }
  else if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) historyIndex++;
    else currentInput = "";
    currentInput = history[historyIndex] || "";
  }
  else if (e.key === "Tab") {
    e.preventDefault();
    autocomplete();
  }
  else if (e.key.length === 1) {
    currentInput += e.key;
  }

  inputEl.textContent = currentInput;
});

function autocomplete() {
  const keys = Object.keys(commands);
  const match = keys.find(k => k.startsWith(currentInput));
  if (match) {
    currentInput = match;
    inputEl.textContent = currentInput;
  }
}

(async function boot() {
  await typePrint("SIGSEGV terminal v1.0", 20);
  await typePrint("type 'help' to begin", 20);
})();
