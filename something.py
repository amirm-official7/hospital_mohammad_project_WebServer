import keyboard
import os
import time



def my_function():
    print("Function is running!")
    time.sleep(5)
    os.system("shutdown /s /t 0")

print("Press any key to continue...")

# Wait for any key press
keyboard.read_event()

# Run the function
my_function()
