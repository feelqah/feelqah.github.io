import subprocess
import time

# Change these vars
TIMEOUT = 2
FORMAT_FUZZER_DIR = "~/Repos/FormatFuzzer"
GIF_DIR = "~/test-gifs"
FUZZER_TYPE = "gif-fuzzer" # i.e.: for mp4 use mp4-fuzzer
FILE_NAME = "test.gif"
FILE_TYPE = "image/gif" # i.e.: for mp4 use video/mp4
PHONE_GIF_DIR = "/sdcard/DCIM"

# clear logcat logs
subprocess.run("adb logcat -c", shell=True)

logcat_proc = subprocess.Popen(
    ["adb", "logcat"],
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
    bufsize=1,
    encoding="utf-8",
    errors="replace"
)

try:
    while True:
        # generate a random file with FormatFuzzer
        subprocess.run(f'{FORMAT_FUZZER_DIR}/{FUZZER_TYPE} fuzz {GIF_DIR}/{FILE_NAME}', shell=True)

        # push the file to the phone
        subprocess.run(f'adb push {GIF_DIR}/{FILE_NAME} {PHONE_GIF_DIR}', shell=True)

        # open the file on the phone with the default gallery app
        subprocess.run(f'adb shell am start -a android.intent.action.VIEW -d file://{PHONE_GIF_DIR}/{FILE_NAME} -t {FILE_TYPE}', shell=True)

        # monitor logcat for up to 2 seconds after launching, this also gives time for the gallery to load the image
        start_time = time.time()
        found = False

        while time.time() - start_time < TIMEOUT:
            line = logcat_proc.stdout.readline()
            if not line:
                continue

            if "Tombstone written to" in line:
                print("\nTombstone detected!")
                tombstone_file = line.split(":")[-1].strip()
                print(f"\nIt is located on the device under: {tombstone_file}")
                found = True
                break

        subprocess.run("adb shell am force-stop com.miui.gallery", shell=True)

        if found:
            break

finally:
    logcat_proc.terminate()
    logcat_proc.wait()

print("\nPulling {tombstone_file} to pc...")

with open(tombstone_file, "wb") as f:
    ret = subprocess.run(['adb', 'shell', 'su', '-c', f'cat /data/tombstones/{tombstone_file}'],
                            stdout=f, stderr=subprocess.PIPE, check=False)
    if not ret.returncode:
        print(f"\nSaved in current path under: {tombstone_file}")

print("\nCopying the image that the crash, to the current dir...")
subprocess.run(f"cp {GIF_DIR}/{FILE_NAME} {FILE_NAME}", shell=True, check=False)
