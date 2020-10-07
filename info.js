
var commandsInfo = {
      "help": "Shows list of implemented commands or info about a specific command.",
      "clear": "Clears the screen.",
      "skills": "Shows a list of my skills.",
      "experience": "Shows a list of my working experience.",
      "education": "Shows a list of my education information.",
      "projects": "Shows a list of projects that I'm working on currently.",
      "aboutme": "Shows a short summary about me.",
      "interests": "Shows a list of my interests.",
      "contact": "Let's get in touch.",
      "resume": "Shows a link to my PDF Résumé."
};

/* Resume information*/

var skillsInfo = "• C language\n" +
  "• Python language\n" +
  "• Git\n" +
  "• Linux\n" +
  "• Operating Systems concepts\n" +
  "• Basic networking concepts\n" +
  "• Basic web scraping knowledge\n" +
  "• Basic web development (HTMl, CSS, JS, PHP)\n" +
  "• Strong problem solving and debugging skills\n" +
  "• Creativity and ability to learn quickly\n" +
  "• Exceptional communication\n" +
  "• Successful working in a team environment, as well as independently \n" +
  "• The ability to work under pressure and multi-task\n" +
  "• The ability to follow instructions and deliver quality results\n" +
  "• The ability to quickly come up to speed on a new project\n";

var experienceInfo = 
"Dec 2018 - Jul 2020\n" +
"RT-RK, Embedded Software Engineer\n" +
"MotionWise project\n" +
"The MotionWise project is a configurable Platform Software solution for Automotive ECUs (Electronic Control Unit) created by Austrian company TTTech\n" +
"• Writing internal tools in Python for the RT-RK custom testing framework\n" +
"• Fixing bugs in the RT-RK custom testing framework\n" +
"• Writing new features in Python for the RT-RK custom testing framework\n" +
"• Writing APIs in Python for Wireshark, CANoe and internal TTTech tools\n" +
"• Reading C source code of the MotionWise core features in order to implement platform tests in Python\n" +
"• Writing and automating tests for the Time Synchronization feature of MotionWise\n" +
"• Writing documentation for tests in PTC software\n" +
"• Writing documentation for APIs in Python\n" +


"\nApr 2016 - Dec 2018\n" +
"RT-RK, Embedded Software Engineer\n" +
"Harman project - Automotive Digital Television system\n" +
"Software components and turnkey solutions for in-car STB (Set TopBox) and TV products based on iWedia software\n" +
"• Developing STB features in C\n" +
"• Debugging the software in GDB (multi-threaded C software)\n" +
"• Creating a dynamic code analysis build using CLANG sanitizers\n" +


"\nFeb 2016 - Apr 2016\n" + 
"RT-RK, Embedded Software Engineering intern\n" + 
"Harman project - Automotive Digital Television system\n" + 
"Software components and turnkey solutions for in-car STB (Set TopBox) and TV products based on iWedia software\n" + 
"• Debugging the software in GDB (multi-threaded C software)\n" + 
"• Performing dynamic code analysis using Valgrind\n" + 


"\nJun 2015 - Feb 2016\n" +
"RT-RK, Compiler Tools Engineering intern\n" +
"LLVM Project\n" +
"The LLVM compiler infrastructure project is a collection of modular andreusable compiler and toolchain technologies used for developingcompiler frontends and backends\n" +
"• Implementing and maintaining LLVM support for MIPS and microMIPS processors\n" +
"• Translating the MIPS ISA (Instruction Set Architecture) to LLVM’s tableGen language\n" +
"• Implementing MIPS instructions to the LLVM backend\n" +


"\nSep 2013 - Feb 2014\n" +
"T-COM,  Technical Support\n" +
"Student job at Croatian Telecom T-COM\n" +
"• Supporting telecom field technicians\n" +
"• Remote configuration of DSLAM (Digital Subscriber Line AccessMultiplexer) devices\n" +
"• Remote configuration of telecom user router\n" +


"\nSep 2009 - Jun 2010\n" +
"POINT, Computer Service Intern\n" +
"Internship at a local computer service shop while in high school\n" +
"• Installing Operating Systems on customer PC’s\n" +
"• Diagnosing and fixing common PC hardware and software problems\n";


var educationInfo = 
"2016 Master's degree - Computer Engineer\n" +
"Faculty of Electrical Engineering Osijek\n" +
"Notable courses:\n" +
"Computer Architecture, Computer Networks, Programming in C/C++, Operating Systems, Web programming and Real-time Computer Systems\n" +
"Graduation paper:\n" +
"Transport protocol Stream Control Transmission Protocol (SCTP) in distributed  application development\n" +


"\n2010 High School Diploma – Electronics technician\n" +
"Electrical Engineering and Traffic School Osijek\n" +
"Notable classes:\n" +
"Digital electronics, C Programming, Intro to Microprocessors, Robotics\n" +
"Graduation paper:\n" +
"Laser beam amplitude modulation\n" +
"Electronics projects where sound from an mp3 player was sent over a laser beam to a photoresistor which was connected to an amplifier and a speaker\n";


var projectsInfo = {
  "Little Computer 3 Virtual Machine": "https://github.com/feelqah/LC3_VM",
  "Simple 'Toy' Shell": "https://github.com/feelqah/ToyShell",
  "Website Spell Checker for Croatian websites": "https://github.com/feelqah/CroSiteSpellCheck"
};

var aboutmeInfo = "Embedded Software Engineer from Osijek, Croatia, with 5 years experience in Embedded and Automotive field and\n" +
  "an extensive range of skills including software development, debugging, task automation and software testing.\n" +
  "\nAlso, I volunteer at a local dog shelter and try to live eco-friendly as possible with a DIY mindset \n" +
  "(always trying to build stuff from scratch, no matter the field).\n";

var interestsInfo =
"• Software Development\n" +
"• Electronics  \n" +
"• Cyber Security\n" +
"• Ethical Hacking \n" +
"• Physics\n" +
"• Eastern Philosophy\n" +
"• Psychology \n" +
"• Everything DIY \n" +
"• Permaculture gardening\n" +
"• Cooking\n" +
"• Hiking\n" +
"• Animal Welfare \n" +
"• Social Justice \n" +
"• Activism\n";

var contactInfo = [
  "email: <a href='mailto :fmaric.os@gmail.com'>fmaric.os@gmail.com</a><br/>",
  "phone: +385976472678 <br/>"
];


var specs =
"<pre>" +
"                   -`                    feelqah@github\n" +
"                  .o+`                   OS: Arch Linux\n" +
"                 `ooo/                   Kernel: x86_64 Linux 5.8.13-arch1-1\n" +
"                `+oooo:                  Uptime: 1h 7m\n" +
"               `+oooooo:                 Packages: 622\n" +
"               -+oooooo+:                Shell: bash 5.0.18\n" +
"             `/:-:++oooo+:               Resolution: 1920x1080\n" +
"            `/++++/+++++++:              WM: i3\n" +
"           `/++++++++++++++:             GTK Theme: Adwaita [GTK3]\n" +
"          `/+++ooooooooooooo/`           Disk: 10G / 454G (3%)\n" +
"         ./ooosssso++osssssso+`          CPU: Intel Pentium G860 @ 2x 3GHz [36.0°C]\n" +
"        .oossssso-````/ossssss+`         GPU: AMD/ATI Cape Verde PRO [Radeon HD 7750/8740 / R7 250E]\n" +
"       -osssssso.      :ssssssso.        RAM: 1145MiB / 7851MiB\n" +
"      :osssssss/        osssso+++.\n" +
"     /ossssssss/        +ssssooo/-\n" +
"   `/ossssso+/:-        -:/+osssso+-\n" +
"  `+sso+:-`                 `.-/+oso:\n" +
" `++:.                           `-/+/\n" +
" .`                                 `"
"</pre>";

var files = {
  "/" : ["bin", "dev", "home", "lib64", "media", "opt", "root", "sbin", "sys", "usr", "boot", "etc", "lib", "lost+found", "mnt", "proc", "run", "srv", "tmp", "var"],
  "home" : ["feelqah"],
  "feelqah" : ["resume.sh"]
};
